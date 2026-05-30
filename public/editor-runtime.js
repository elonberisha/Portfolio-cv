/*
 * editor-runtime.js — generic, template-agnostic in-place editor.
 *
 * Loaded inside the studio's sandboxed iframe alongside the student's pageHtml.
 * It works on ANY DOM (no per-template code):
 *   - text-leaf elements become contentEditable; edits saved on blur
 *   - hovering/selecting a block shows a toolbar: drag-reorder, duplicate
 *     ("add card"), delete, hide
 *   - clicking an image lets you replace its src (parent handles upload)
 *   - serialized HTML is posted back to the parent (debounced) for persistence
 *
 * Communication with the studio parent via postMessage:
 *   -> parent: { type: 'editor:change', html }      (debounced autosave)
 *   -> parent: { type: 'editor:ready' }
 *   -> parent: { type: 'editor:requestImage', id }  (ask for an upload)
 *   -> parent: { type: 'editor:outline', fields }   (the template's editable text)
 *   -> parent: { type: 'editor:fieldInput', id, value } (canvas edit -> sidebar)
 *   <- parent: { type: 'editor:setImage', id, url } (deliver uploaded url)
 *   <- parent: { type: 'editor:setField', id, value } (sidebar edit -> canvas)
 *   <- parent: { type: 'editor:applyField', field, value }
 */
(function () {
  'use strict'

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, IMG: 1, svg: 1, SVG: 1, BR: 1, HR: 1, INPUT: 1 }
  var BLOCK_TAGS = {
    SECTION: 1, ARTICLE: 1, DIV: 1, LI: 1, FIGURE: 1, ASIDE: 1, HEADER: 1, FOOTER: 1, NAV: 1,
  }
  var saveTimer = null
  var outlineTimer = null
  var pendingImg = null
  var imgSeq = 0
  var fieldSeq = 0

  function isTextLeaf(el) {
    if (SKIP_TAGS[el.tagName]) return false
    if (el.hasAttribute('data-no-edit')) return false
    // A leaf if it has no element children (only text).
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 1) return false
    }
    return el.textContent.trim().length > 0
  }

  function nearestBlock(el) {
    while (el && el !== document.body) {
      if (BLOCK_TAGS[el.tagName] || el.hasAttribute('data-block')) return el
      el = el.parentElement
    }
    return null
  }

  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(function () {
      var clone = document.body.cloneNode(true)
      // Strip editor-only artifacts before serializing.
      clone.querySelectorAll('[data-editor-ui]').forEach(function (n) { n.remove() })
      clone.querySelectorAll('[contenteditable]').forEach(function (n) {
        n.removeAttribute('contenteditable')
      })
      clone.querySelectorAll('.ed-hover,.ed-selected').forEach(function (n) {
        n.classList.remove('ed-hover'); n.classList.remove('ed-selected')
      })
      var styles = ''
      document.querySelectorAll('style[data-template-style]').forEach(function (s) {
        styles += s.outerHTML + '\n'
      })
      parent.postMessage({ type: 'editor:change', html: styles + clone.innerHTML }, '*')
    }, 600)
  }

  // ---- inline text editing -------------------------------------------------
  function onTextInput(e) {
    var el = e.currentTarget
    scheduleSave()
    parent.postMessage({
      type: 'editor:fieldInput',
      id: el.getAttribute('data-ed-field'),
      value: el.textContent,
    }, '*')
  }

  function enableText() {
    var all = document.body.querySelectorAll('*')
    all.forEach(function (el) {
      if (isTextLeaf(el)) {
        if (el.getAttribute('contenteditable') !== 'true') {
          el.setAttribute('contenteditable', 'true')
          el.addEventListener('blur', scheduleSave)
          el.addEventListener('input', onTextInput)
        }
        if (!el.hasAttribute('data-ed-field')) {
          el.setAttribute('data-ed-field', 'f' + (++fieldSeq))
        }
      }
    })
  }

  // ---- editable-text outline (drives the sidebar Details form) -------------
  function labelFor(el) {
    var t = el.tagName
    if (/^H[1-6]$/.test(t)) return 'Heading'
    if (t === 'A') return 'Link text'
    if (t === 'BUTTON') return 'Button'
    if (t === 'LI') return 'List item'
    if (t === 'BLOCKQUOTE') return 'Quote'
    if (t === 'P') return 'Paragraph'
    return 'Text'
  }

  function postOutline() {
    var list = []
    document.querySelectorAll('[data-ed-field]').forEach(function (el) {
      if (el.closest('[data-editor-ui]')) return
      var v = el.textContent.trim()
      if (!v) return
      list.push({
        id: el.getAttribute('data-ed-field'),
        label: labelFor(el),
        value: el.textContent,
        multiline: el.tagName === 'P' || el.tagName === 'BLOCKQUOTE' || v.length > 60,
      })
    })
    parent.postMessage({ type: 'editor:outline', fields: list }, '*')
  }

  function scheduleOutline() {
    if (outlineTimer) clearTimeout(outlineTimer)
    outlineTimer = setTimeout(postOutline, 200)
  }

  // ---- block toolbar -------------------------------------------------------
  var toolbar = null
  var current = null

  function buildToolbar() {
    var bar = document.createElement('div')
    bar.setAttribute('data-editor-ui', '1')
    bar.style.cssText =
      'position:absolute;z-index:2147483647;display:none;gap:4px;' +
      'background:#1a1714;border-radius:8px;padding:4px;box-shadow:0 6px 24px rgba(0,0,0,.35)'
    ;['drag', 'dup', 'del', 'hide'].forEach(function (action) {
      var b = document.createElement('button')
      b.setAttribute('data-editor-ui', '1')
      b.type = 'button'
      b.textContent = { drag: '⠿', dup: '+', del: '×', hide: '◐' }[action]
      b.title = { drag: 'Drag to reorder', dup: 'Duplicate', del: 'Delete', hide: 'Hide' }[action]
      b.style.cssText =
        'all:unset;cursor:pointer;color:#f5f1ea;font:600 14px system-ui;' +
        'width:26px;height:26px;display:grid;place-items:center;border-radius:5px'
      b.addEventListener('mouseenter', function () { b.style.background = '#d35234' })
      b.addEventListener('mouseleave', function () { b.style.background = 'transparent' })
      if (action === 'drag') {
        b.style.cursor = 'grab'
        b.addEventListener('mousedown', startDrag)
      } else {
        b.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation()
          if (!current) return
          if (action === 'dup') {
            var copy = current.cloneNode(true)
            // Fresh field ids for the duplicated subtree.
            copy.removeAttribute('data-ed-field')
            copy.querySelectorAll('[data-ed-field]').forEach(function (n) {
              n.removeAttribute('data-ed-field')
            })
            current.parentNode.insertBefore(copy, current.nextSibling)
            enableText()
          } else if (action === 'del') {
            current.remove(); hideToolbar()
          } else if (action === 'hide') {
            current.style.display = 'none'
          }
          scheduleSave(); scheduleOutline()
        })
      }
      bar.appendChild(b)
    })
    document.body.appendChild(bar)
    return bar
  }

  function positionToolbar(el) {
    var r = el.getBoundingClientRect()
    toolbar.style.display = 'flex'
    toolbar.style.top = (window.scrollY + r.top - 34) + 'px'
    toolbar.style.left = (window.scrollX + r.left) + 'px'
  }

  function hideToolbar() {
    if (toolbar) toolbar.style.display = 'none'
    if (current) current.classList.remove('ed-selected')
    current = null
  }

  // ---- drag to reorder among siblings -------------------------------------
  var dragging = null
  function startDrag(e) {
    e.preventDefault()
    if (!current) return
    dragging = current
    dragging.style.opacity = '0.5'
    document.addEventListener('mousemove', onDragMove, true)
    document.addEventListener('mouseup', endDrag, true)
  }
  function onDragMove(e) {
    if (!dragging) return
    var sibs = Array.prototype.filter.call(
      dragging.parentNode.children,
      function (c) { return c !== dragging && c.nodeType === 1 && !c.hasAttribute('data-editor-ui') },
    )
    for (var i = 0; i < sibs.length; i++) {
      var r = sibs[i].getBoundingClientRect()
      if (e.clientY < r.top + r.height / 2) {
        dragging.parentNode.insertBefore(dragging, sibs[i]); return
      }
    }
    var last = sibs[sibs.length - 1]
    if (last) dragging.parentNode.insertBefore(dragging, last.nextSibling)
  }
  function endDrag() {
    if (dragging) { dragging.style.opacity = ''; dragging = null; scheduleSave(); scheduleOutline() }
    document.removeEventListener('mousemove', onDragMove, true)
    document.removeEventListener('mouseup', endDrag, true)
  }

  // ---- hover/select wiring -------------------------------------------------
  function wireBlocks() {
    document.body.addEventListener('mouseover', function (e) {
      var b = nearestBlock(e.target)
      if (b && b !== current) { b.classList.add('ed-hover') }
    })
    document.body.addEventListener('mouseout', function (e) {
      var b = nearestBlock(e.target)
      if (b) b.classList.remove('ed-hover')
    })
    document.body.addEventListener('click', function (e) {
      if (e.target.closest('[data-editor-ui]')) return
      if (e.target.tagName === 'IMG') { return replaceImage(e.target) }
      if (e.target.getAttribute('contenteditable') === 'true') return
      var b = nearestBlock(e.target)
      if (!b) return hideToolbar()
      if (current) current.classList.remove('ed-selected')
      current = b
      current.classList.add('ed-selected')
      positionToolbar(b)
    }, true)
    window.addEventListener('scroll', function () { if (current) positionToolbar(current) })
  }

  // ---- image replace -------------------------------------------------------
  function replaceImage(img) {
    var id = 'img-' + (++imgSeq)
    img.setAttribute('data-ed-img', id)
    pendingImg = img
    parent.postMessage({ type: 'editor:requestImage', id: id }, '*')
  }

  // ---- inject editor chrome styles ----------------------------------------
  function injectStyles() {
    var s = document.createElement('style')
    s.setAttribute('data-editor-ui', '1')
    s.textContent =
      '.ed-hover{outline:1px dashed #d35234!important;outline-offset:2px}' +
      '.ed-selected{outline:2px solid #d35234!important;outline-offset:2px}' +
      '[contenteditable=true]:focus{outline:2px solid #2d8a4f;outline-offset:2px}' +
      'img{cursor:pointer}'
    document.head.appendChild(s)
  }

  // ---- parent messages -----------------------------------------------------
  window.addEventListener('message', function (e) {
    var d = e.data || {}
    if (d.type === 'editor:setImage' && d.url) {
      var img = document.querySelector('[data-ed-img="' + d.id + '"]') || pendingImg
      if (img) { img.setAttribute('src', d.url); img.removeAttribute('data-ed-img'); scheduleSave() }
    }
    if (d.type === 'editor:applyField') {
      var slot = document.querySelector('[data-field="' + d.field + '"]')
      if (slot) { slot.textContent = d.value; scheduleSave() }
    }
    if (d.type === 'editor:setField') {
      var node = document.querySelector('[data-ed-field="' + d.id + '"]')
      if (node) { node.textContent = d.value; scheduleSave() }
    }
  })

  function init() {
    // Mark template styles so we can re-serialize them with the body.
    document.querySelectorAll('style').forEach(function (s) {
      if (!s.hasAttribute('data-editor-ui')) s.setAttribute('data-template-style', '1')
    })
    injectStyles()
    enableText()
    toolbar = buildToolbar()
    wireBlocks()
    postOutline()
    parent.postMessage({ type: 'editor:ready' }, '*')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

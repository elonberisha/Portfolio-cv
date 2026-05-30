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
 *   -> parent: { type: 'editor:outline', sections } (template structure, grouped)
 *   -> parent: { type: 'editor:fieldInput', id, value } (canvas edit -> sidebar)
 *   <- parent: { type: 'editor:setImage', id, url } (deliver uploaded url)
 *   <- parent: { type: 'editor:setField', id, value } (sidebar edit -> canvas;
 *               targets a text node OR a link/attr field, e.g. an <a> href)
 *   <- parent: { type: 'editor:addItem', listId }    (add a card to a list)
 *   <- parent: { type: 'editor:removeItem', itemId } (remove a card)
 *   <- parent: { type: 'editor:removeField', id }    (delete a text / link field)
 *   <- parent: { type: 'editor:moveItem', itemId, dir } (reorder a card up/down)
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
  var attrSeq = 0

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
      // Drop editor bookkeeping attributes so saved HTML stays clean.
      clone.querySelectorAll('[data-ed-field],[data-ed-item],[data-ed-list],[data-ed-img],[data-ed-attr]').forEach(function (n) {
        n.removeAttribute('data-ed-field'); n.removeAttribute('data-ed-item')
        n.removeAttribute('data-ed-list'); n.removeAttribute('data-ed-img')
        n.removeAttribute('data-ed-attr'); n.removeAttribute('data-ed-attrkey')
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
      if (el.closest('[data-editor-ui]')) return
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
      // Links carry a hidden href (social / project URLs) the canvas can't
      // surface as plain text — expose it as a sidebar field. In-page anchors
      // (href="#…") are navigation, not content, so skip them.
      if (el.tagName === 'A') {
        var href = el.getAttribute('href')
        if (href && href.charAt(0) !== '#' && !el.hasAttribute('data-ed-attr')) {
          el.setAttribute('data-ed-attr', 'a' + (++attrSeq))
          el.setAttribute('data-ed-attrkey', 'href')
        }
      }
    })
  }

  // ---- structural outline (drives the sidebar Details form) ----------------
  // The template renders as a flat-ish sequence; we group it into named
  // sections (Header / Experience / Projects …) by heading boundaries and
  // landmark elements, and detect repeated sibling blocks as add/remove lists.
  var LANDMARK = { SECTION: 1, HEADER: 1, FOOTER: 1, ARTICLE: 1, ASIDE: 1, NAV: 1, MAIN: 1 }

  function labelFor(el) {
    var t = el.tagName
    if (/^H[1-6]$/.test(t)) return 'Heading'
    if (t === 'A') return 'Link'
    if (t === 'BUTTON') return 'Button'
    if (t === 'LI') return 'List item'
    if (t === 'BLOCKQUOTE') return 'Quote'
    if (t === 'P') return 'Paragraph'
    return 'Text'
  }

  // h2–h6 delimit sections; h1 is treated as a title inside the header.
  function headingLevel(el) { var m = /^H([2-6])$/.exec(el.tagName); return m ? +m[1] : 0 }

  function classifySection(text) {
    var s = (text || '').toLowerCase()
    if (/experience|work history|employment|career/.test(s)) return 'Experience'
    if (/project|portfolio|selected work|case stud/.test(s)) return 'Projects'
    if (/education|academic|study|degree|school|universit/.test(s)) return 'Education'
    if (/about|summary|profile|\bbio\b|intro/.test(s)) return 'About'
    if (/skill|stack|\btools\b|expertise|\btech\b/.test(s)) return 'Skills'
    if (/language/.test(s)) return 'Languages'
    if (/award|honou?r|achievement|recognition|certif/.test(s)) return 'Awards'
    if (/contact|get in touch|reach me|\bemail\b/.test(s)) return 'Contact'
    return null
  }

  function itemLabelFor(type) {
    return {
      Experience: 'experience', Projects: 'project', Education: 'education',
      Skills: 'skill', Languages: 'language', Awards: 'award', Contact: 'contact',
    }[type] || 'item'
  }

  function signature(el) {
    return el.tagName + '.' + Array.prototype.slice.call(el.classList).sort().join('.')
  }

  // Descend through single-element wrappers to the real content container.
  function findContentRoot() {
    var node = document.body
    while (true) {
      var kids = Array.prototype.filter.call(node.children, function (c) {
        return c.nodeType === 1 && !c.hasAttribute('data-editor-ui') &&
          c.tagName !== 'STYLE' && c.tagName !== 'SCRIPT'
      })
      if (kids.length === 1 && kids[0].children.length > 0) node = kids[0]
      else return node
    }
  }

  function textFieldObj(el) {
    var v = el.textContent
    return {
      id: el.getAttribute('data-ed-field'),
      label: labelFor(el),
      value: v,
      multiline: el.tagName === 'P' || el.tagName === 'BLOCKQUOTE' || v.trim().length > 60,
    }
  }

  // Friendly label for a link's URL field, guessed from the host or its text.
  function linkLabelFor(el) {
    var h = (el.getAttribute('href') || '').toLowerCase()
    var t = (el.textContent || '').trim().toLowerCase()
    if (/^mailto:/.test(h) || /\bemail\b/.test(t)) return 'Email link'
    if (/^tel:/.test(h) || /\bphone\b|\bcall\b/.test(t)) return 'Phone link'
    if (/github\.com/.test(h) || /github/.test(t)) return 'GitHub URL'
    if (/linkedin\.com/.test(h) || /linkedin/.test(t)) return 'LinkedIn URL'
    if (/twitter\.com|x\.com/.test(h) || /twitter/.test(t)) return 'Twitter / X URL'
    if (/instagram\.com/.test(h) || /instagram/.test(t)) return 'Instagram URL'
    if (/dribbble\.com/.test(h) || /dribbble/.test(t)) return 'Dribbble URL'
    if (/behance\.net/.test(h) || /behance/.test(t)) return 'Behance URL'
    if (/youtube\.com|youtu\.be/.test(h) || /youtube/.test(t)) return 'YouTube URL'
    if (/medium\.com/.test(h) || /medium/.test(t)) return 'Medium URL'
    if (/\bdemo\b|\blive\b|\bwebsite\b|\bsite\b/.test(t)) return 'Live / demo URL'
    return 'Link URL'
  }

  function attrFieldObj(el) {
    var key = el.getAttribute('data-ed-attrkey') || 'href'
    return {
      id: el.getAttribute('data-ed-attr'),
      label: linkLabelFor(el),
      value: el.getAttribute(key) || '',
      multiline: false,
      kind: 'attr',
    }
  }

  // Editable markers (text leaves + link URLs) inside el, in document order.
  function markersIn(el) {
    var out = []
    el.querySelectorAll('[data-ed-field],[data-ed-attr]').forEach(function (n) {
      if (!n.closest('[data-editor-ui]')) out.push(n)
    })
    return out
  }

  // One marker may carry a text field and/or a link-URL field.
  function fieldsFor(el) {
    var fs = []
    if (el.hasAttribute('data-ed-field')) fs.push(textFieldObj(el))
    if (el.hasAttribute('data-ed-attr')) fs.push(attrFieldObj(el))
    return fs
  }

  function collectFields(el) {
    var out = []
    markersIn(el).forEach(function (n) {
      fieldsFor(n).forEach(function (f) { out.push(f) })
    })
    return out
  }

  function buildSections() {
    var root = findContentRoot()
    var children = Array.prototype.filter.call(root.children, function (c) {
      return c.nodeType === 1 && !c.hasAttribute('data-editor-ui') &&
        c.tagName !== 'STYLE' && c.tagName !== 'SCRIPT'
    })

    // 1) Slice the flat child sequence into raw sections.
    var raw = []
    var cur = null
    children.forEach(function (el) {
      if (headingLevel(el)) {
        cur = { headingEl: el, landmarkEl: null, nodes: [el] }
        raw.push(cur)
      } else if (LANDMARK[el.tagName]) {
        raw.push({ headingEl: null, landmarkEl: el, nodes: [el] })
        cur = null
      } else {
        if (!cur) { cur = { headingEl: null, landmarkEl: null, nodes: [] }; raw.push(cur) }
        cur.nodes.push(el)
      }
    })
    if (!raw.length) return []

    // 2) Build each section's fields + repeatable lists.
    var secSeq = 0, listSeq = 0, itemSeq = 0
    var out = []
    raw.forEach(function (sec, idx) {
      secSeq++
      var titleText = ''
      if (sec.headingEl) titleText = sec.headingEl.textContent.trim()
      else if (sec.landmarkEl) {
        var h = sec.landmarkEl.querySelector('h1,h2,h3,h4,h5,h6')
        if (h) titleText = h.textContent.trim()
      }
      var type = classifySection(titleText)
      if (!type && sec.landmarkEl === null && sec.headingEl === null && idx === 0) type = 'Header'
      if (!type && sec.landmarkEl && sec.landmarkEl.tagName === 'HEADER') type = 'Header'
      if (!type && sec.landmarkEl && sec.landmarkEl.tagName === 'FOOTER') type = 'Contact'
      var label = type || (titleText ? titleText.slice(0, 40) : 'Section ' + secSeq)

      // Where repeated cards live: landmark's own children, else the
      // non-heading nodes that follow the heading.
      var scan
      if (sec.landmarkEl) {
        scan = Array.prototype.filter.call(sec.landmarkEl.children, function (c) {
          return c.nodeType === 1 && !c.hasAttribute('data-editor-ui')
        })
      } else {
        scan = sec.nodes.filter(function (n) { return !headingLevel(n) })
      }

      var fields = []
      var lists = []

      // The heading itself becomes the section's first editable field.
      if (sec.headingEl && sec.headingEl.hasAttribute('data-ed-field')) {
        var hf = textFieldObj(sec.headingEl); hf.label = 'Title'; fields.push(hf)
      }

      var i = 0
      while (i < scan.length) {
        var sig = signature(scan[i])
        var members = [scan[i]]
        var j = i + 1
        while (j < scan.length && signature(scan[j]) === sig) { members.push(scan[j]); j++ }
        var rich = members.filter(function (m) { return markersIn(m).length > 0 })
        if (members.length >= 2 && rich.length >= 2) {
          listSeq++
          var listId = 'l' + listSeq
          var items = []
          members.forEach(function (m) {
            itemSeq++
            var itemId = 'i' + itemSeq
            m.setAttribute('data-ed-item', itemId)
            m.setAttribute('data-ed-list', listId)
            items.push({ id: itemId, fields: collectFields(m) })
          })
          lists.push({ id: listId, itemLabel: itemLabelFor(type), items: items })
        } else {
          for (var k = 0; k < members.length; k++) {
            collectFields(members[k]).forEach(function (f) { fields.push(f) })
          }
        }
        i = j
      }

      if (!fields.length && !lists.length) return
      out.push({ id: 's' + secSeq, type: type || '', label: label, fields: fields, lists: lists })
    })
    return out
  }

  function postOutline() {
    parent.postMessage({ type: 'editor:outline', sections: buildSections() }, '*')
  }

  function scheduleOutline() {
    if (outlineTimer) clearTimeout(outlineTimer)
    outlineTimer = setTimeout(postOutline, 200)
  }

  function stripEdIds(node) {
    node.removeAttribute('data-ed-field')
    node.removeAttribute('data-ed-item')
    node.removeAttribute('data-ed-list')
    node.removeAttribute('data-ed-attr')
    node.removeAttribute('data-ed-attrkey')
    node.querySelectorAll('[data-ed-field],[data-ed-item],[data-ed-list],[data-ed-attr]').forEach(function (n) {
      n.removeAttribute('data-ed-field'); n.removeAttribute('data-ed-item')
      n.removeAttribute('data-ed-list'); n.removeAttribute('data-ed-attr')
      n.removeAttribute('data-ed-attrkey')
    })
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
            stripEdIds(copy) // fresh ids for the duplicated subtree
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
      else {
        var link = document.querySelector('[data-ed-attr="' + d.id + '"]')
        if (link) {
          link.setAttribute(link.getAttribute('data-ed-attrkey') || 'href', d.value)
          scheduleSave()
        }
      }
    }
    if (d.type === 'editor:addItem' && d.listId) {
      var members = document.querySelectorAll('[data-ed-list="' + d.listId + '"]')
      if (members.length) {
        var last = members[members.length - 1]
        var copy = last.cloneNode(true)
        stripEdIds(copy)
        last.parentNode.insertBefore(copy, last.nextSibling)
        enableText(); scheduleSave(); scheduleOutline()
      }
    }
    if (d.type === 'editor:removeItem' && d.itemId) {
      var item = document.querySelector('[data-ed-item="' + d.itemId + '"]')
      if (item) { item.remove(); scheduleSave(); scheduleOutline() }
    }
    if (d.type === 'editor:removeField' && d.id) {
      var fEl = document.querySelector('[data-ed-field="' + d.id + '"]') ||
                document.querySelector('[data-ed-attr="' + d.id + '"]')
      if (fEl) { fEl.remove(); scheduleSave(); scheduleOutline() }
    }
    if (d.type === 'editor:moveItem' && d.itemId) {
      var mv = document.querySelector('[data-ed-item="' + d.itemId + '"]')
      if (mv) {
        var lid = mv.getAttribute('data-ed-list')
        if (d.dir === 'up') {
          var prev = mv.previousElementSibling
          if (prev && prev.getAttribute('data-ed-list') === lid) mv.parentNode.insertBefore(mv, prev)
        } else {
          var next = mv.nextElementSibling
          if (next && next.getAttribute('data-ed-list') === lid) mv.parentNode.insertBefore(next, mv)
        }
        scheduleSave(); scheduleOutline()
      }
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

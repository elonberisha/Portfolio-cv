'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import StudioSidebar, { type SidebarInitial, type OutlineSection } from './StudioSidebar'
import styles from './studio.module.css'

// Patch a single field's value wherever it lives in the section tree.
function patchField(sections: OutlineSection[], id: string, value: string): OutlineSection[] {
  return sections.map((s) => ({
    ...s,
    fields: s.fields.map((f) => (f.id === id ? { ...f, value } : f)),
    lists: s.lists.map((l) => ({
      ...l,
      items: l.items.map((it) => ({
        ...it,
        fields: it.fields.map((f) => (f.id === id ? { ...f, value } : f)),
      })),
    })),
  }))
}

type Props = {
  initialHtml: string
  templateName: string | null
  details: SidebarInitial
}

// Wrap the stored page fragment into a full document and inject the generic
// editor runtime. The iframe is sandboxed (allow-scripts only) for isolation.
function buildSrcDoc(html: string) {
  return `<!doctype html><html><head><meta charset="utf-8">
<base href="/">
<style>body{margin:0}</style>
</head><body>${html}
<script src="/editor-runtime.js"><\/script>
</body></html>`
}

export default function StudioClient({ initialHtml, templateName, details }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pendingImgId = useRef<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [hasHtml] = useState(Boolean(initialHtml.trim()))
  const [sections, setSections] = useState<OutlineSection[]>([])

  const save = useCallback(async (html: string) => {
    setStatus('saving')
    try {
      const res = await fetch('/api/portfolio-page', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pageHtml: html }),
      })
      setStatus(res.ok ? 'saved' : 'idle')
    } catch {
      setStatus('idle')
    }
  }, [])

  // Edit one of the template's own text nodes from the sidebar Details form.
  const setField = useCallback((id: string, value: string) => {
    setSections((prev) => patchField(prev, id, value))
    frameRef.current?.contentWindow?.postMessage({ type: 'editor:setField', id, value }, '*')
  }, [])

  // Add / remove a repeated card (e.g. an experience entry) from the sidebar.
  const addItem = useCallback((listId: string) => {
    frameRef.current?.contentWindow?.postMessage({ type: 'editor:addItem', listId }, '*')
  }, [])
  const removeItem = useCallback((itemId: string) => {
    frameRef.current?.contentWindow?.postMessage({ type: 'editor:removeItem', itemId }, '*')
  }, [])

  // Upload a replacement image to Media, then deliver its URL to the iframe.
  const uploadImage = useCallback(async (file: File) => {
    const id = pendingImgId.current
    const fd = new FormData()
    fd.append('file', file)
    fd.append('alt', file.name)
    try {
      const res = await fetch('/api/media', { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      const url = data?.doc?.url
      if (url && id && frameRef.current?.contentWindow) {
        frameRef.current.contentWindow.postMessage({ type: 'editor:setImage', id, url }, '*')
      }
    } catch {
      /* ignore */
    } finally {
      pendingImgId.current = null
    }
  }, [])

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const d = e.data || {}
      if (d.type === 'editor:change' && typeof d.html === 'string') {
        save(d.html)
      } else if (d.type === 'editor:requestImage') {
        pendingImgId.current = d.id
        fileRef.current?.click()
      } else if (d.type === 'editor:outline' && Array.isArray(d.sections)) {
        setSections(d.sections)
      } else if (d.type === 'editor:fieldInput' && d.id) {
        setSections((prev) => patchField(prev, d.id, d.value))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [save])

  return (
    <div className={styles.studio}>
      <StudioSidebar
        initial={details}
        status={status}
        templateName={templateName}
        sections={sections}
        onSetField={setField}
        onAddItem={addItem}
        onRemoveItem={removeItem}
      />

      <div className={styles.canvasWrap}>
        {hasHtml ? (
          <iframe
            ref={frameRef}
            className={styles.canvas}
            title="Portfolio editor"
            sandbox="allow-scripts"
            srcDoc={buildSrcDoc(initialHtml)}
          />
        ) : (
          <div className={styles.empty}>
            <h2>Preparing your template…</h2>
            <p>
              We couldn’t generate an editable snapshot yet. Fill in your details on the
              left, or re-select your template.
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) uploadImage(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}

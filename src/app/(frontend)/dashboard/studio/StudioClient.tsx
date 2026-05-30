'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './studio.module.css'

type Props = {
  initialHtml: string
  templateName: string | null
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

export default function StudioClient({ initialHtml, templateName }: Props) {
  const router = useRouter()
  const frameRef = useRef<HTMLIFrameElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pendingImgId = useRef<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [hasHtml] = useState(Boolean(initialHtml.trim()))

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
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [save])

  return (
    <div className={styles.studio}>
      <header className={styles.bar}>
        <div className={styles.barLeft}>
          <span className={styles.kicker}>Studio</span>
          <b>{templateName || 'Your template'}</b>
        </div>
        <div className={styles.barRight}>
          <span className={styles.status} data-state={status}>
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : 'Edit anything below'}
          </span>
          <Link href="/dashboard/edit" className={styles.secondary}>
            Quick form
          </Link>
          <Link href="/dashboard/cv" className={styles.primary}>
            Next: CV →
          </Link>
        </div>
      </header>

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
            We couldn’t generate an editable snapshot yet. You can still fill in your
            details with the quick form, or try re-selecting your template.
          </p>
          <div className={styles.emptyActions}>
            <Link href="/dashboard/edit" className={styles.primary}>
              Open quick form
            </Link>
            <Link href="/templates" className={styles.secondary}>
              Re-select template
            </Link>
          </div>
        </div>
      )}

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

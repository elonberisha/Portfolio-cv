'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import StudioSidebar, {
  type SidebarInitial,
  type OutlineSection,
  type StudioTab,
} from './StudioSidebar'
import StudioLoader from './StudioLoader'
import styles from './studio.module.css'

/* Patch a single field's value wherever it lives in the section tree. */
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

/* Patch a link/button href wherever it lives. */
function patchHref(sections: OutlineSection[], id: string, href: string): OutlineSection[] {
  return sections.map((s) => ({
    ...s,
    fields: s.fields.map((f) => (f.id === id ? { ...f, href } : f)),
    lists: s.lists.map((l) => ({
      ...l,
      items: l.items.map((it) => ({
        ...it,
        fields: it.fields.map((f) => (f.id === id ? { ...f, href } : f)),
      })),
    })),
  }))
}

type Device = 'desktop' | 'tablet' | 'mobile'
const DEVICE_W: Record<Device, number | null> = { desktop: null, tablet: 820, mobile: 390 }

export type PortfolioData = {
  firstName: string; lastName: string; email: string
  headline: string; bio: string; phone: string; location: string; website: string
  experience: any[]; education: any[]; skills: any[]
}

type Props = {
  initialHtml: string
  templateName: string | null
  templateSlug: string | null
  details: SidebarInitial
  subdomain?: string | null
  portfolioData?: PortfolioData | null
  portfolioId?: string
}

function buildSrcDoc(html: string) {
  return `<!doctype html><html><head><meta charset="utf-8">
<base href="/">
<style>body{margin:0}</style>
</head><body>${html}
<script src="/editor-runtime.js"><\/script>
</body></html>`
}

/* Match a field label to portfolioData using keyword heuristics.
   Called once per field on first editor:outline — kept intentionally simple. */
function resolveFieldValue(label: string, pd: PortfolioData): string | null {
  const l = label.toLowerCase().trim()
  const fullName = [pd.firstName, pd.lastName].filter(Boolean).join(' ')

  // Full name (must check before single "name" to avoid partial matches)
  if (l === 'name' || l === 'full name' || l === 'your name') return fullName || null
  if (l.includes('name') && !l.includes('company') && !l.includes('employer') && !l.includes('institution') && !l.includes('project') && !l.includes('course')) return fullName || null
  if (l.includes('first') && l.includes('name')) return pd.firstName || null
  if (l.includes('last')  && l.includes('name')) return pd.lastName  || null

  // Headline / role / tagline
  if (l === 'headline' || l === 'tagline' || l === 'role' || l === 'position' || l === 'job title') return pd.headline || null
  if (l.includes('headline') || l.includes('tagline')) return pd.headline || null
  if (l.includes('role') || l.includes('position')) return pd.headline || null
  if (l.includes('title') && !l.includes('project') && !l.includes('section') && !l.includes('page') && !l.includes('work')) return pd.headline || null

  // Bio / about
  if (l === 'bio' || l === 'about' || l === 'summary' || l === 'introduction' || l === 'description') return pd.bio || null
  if (l.includes('about') || l.includes('bio') || l.includes('summary') || l.includes('introduction')) return pd.bio || null

  // Contact
  if (l.includes('email')) return pd.email || null
  if (l.includes('phone') || l.includes('tel') || l.includes('mobile')) return pd.phone || null
  if (l === 'location' || l === 'city' || l === 'address' || l === 'based in') return pd.location || null
  if (l.includes('location') || l.includes('city') || l.includes('address')) return pd.location || null
  if (l === 'website' || l === 'url' || l === 'web' || l === 'site') return pd.website || null
  if (l.includes('website') || l.includes('personal url')) return pd.website || null

  return null
}

export default function StudioClient({ initialHtml, templateName, templateSlug, details, subdomain, portfolioData, portfolioId }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const pendingImgId = useRef<string | null>(null)
  const didInject = useRef(false)

  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [hasHtml] = useState(Boolean(initialHtml.trim()))
  const [sections, setSections] = useState<OutlineSection[]>([])
  const [published, setPublished] = useState(details.published)
  const [loading, setLoading] = useState(true)   // shown until editor:outline fires

  /* UI state */
  const [tab, setTab] = useState<StudioTab>('content')
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const [device, setDevice] = useState<Device>('desktop')

  /* Default the focused section to the first one we receive. */
  useEffect(() => {
    if (!activeSectionId && sections.length) setActiveSectionId(sections[0].id)
  }, [sections, activeSectionId])

  /* Persistence */
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

  const togglePublish = useCallback(async () => {
    const next = !published
    setPublished(next)
    try {
      await fetch('/api/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ published: next }),
      })
    } catch {
      setPublished(!next)
    }
  }, [published])

  /* Canvas messaging */
  const post = useCallback((msg: Record<string, unknown>) => {
    frameRef.current?.contentWindow?.postMessage(msg, '*')
  }, [])

  const setField = useCallback((id: string, value: string) => {
    setSections((prev) => patchField(prev, id, value))
    post({ type: 'editor:setField', id, value })
  }, [post])

  const setHref = useCallback((id: string, href: string) => {
    setSections((prev) => patchHref(prev, id, href))
    post({ type: 'editor:setHref', id, href })
  }, [post])

  const addItem = useCallback((listId: string) => post({ type: 'editor:addItem', listId }), [post])
  const removeItem = useCallback((itemId: string) => post({ type: 'editor:removeItem', itemId }), [post])
  const removeField = useCallback((id: string) => post({ type: 'editor:removeField', id }), [post])
  const moveItem = useCallback(
    (itemId: string, dir: 'up' | 'down') => post({ type: 'editor:moveItem', itemId, dir }),
    [post],
  )
  const reorderItem = useCallback(
    (listId: string, from: number, to: number) =>
      post({ type: 'editor:reorderItem', listId, from, to }),
    [post],
  )
  const focusOnCanvas = useCallback((id: string) => post({ type: 'editor:focus', id }), [post])
  const requestImageFor = useCallback((id: string) => {
    pendingImgId.current = id
    fileRef.current?.click()
  }, [])

  const uploadImage = useCallback(async (file: File) => {
    const id = pendingImgId.current
    const fd = new FormData()
    fd.append('file', file)
    fd.append('alt', file.name)
    try {
      const res = await fetch('/api/media', { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      const url = data?.doc?.url
      if (url && id) post({ type: 'editor:setImage', id, url })
    } catch {
      /* ignore */
    } finally {
      pendingImgId.current = null
    }
  }, [post])

  /* First-run portfolio data injection.
     Only runs when there is no saved HTML snapshot yet (fresh template).
     Once the auto-save fires the snapshot is permanent — no need to inject again. */
  const injectPortfolioData = useCallback((incoming: OutlineSection[]) => {
    if (!portfolioData || didInject.current) return
    // If we already have a saved snapshot the user's data is baked in — skip.
    if (hasHtml) return
    // Require at least one non-empty value so we don't fire with blank data.
    const hasContent = portfolioData.firstName || portfolioData.headline || portfolioData.bio || portfolioData.email
    if (!hasContent) return

    for (const section of incoming) {
      for (const field of section.fields) {
        const val = resolveFieldValue(field.label, portfolioData)
        if (val) post({ type: 'editor:setField', id: field.id, value: val })
      }
    }
    didInject.current = true
  }, [portfolioData, hasHtml, post])

  /* Inbound canvas events */
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const d = e.data || {}
      if (d.type === 'editor:change' && typeof d.html === 'string') {
        save(d.html)
      } else if (d.type === 'editor:requestImage') {
        requestImageFor(d.id)
      } else if (d.type === 'editor:outline' && Array.isArray(d.sections)) {
        setSections(d.sections)
        setLoading(false)   // template is ready - dismiss the loader
        injectPortfolioData(d.sections)
      } else if (d.type === 'editor:fieldInput' && d.id) {
        setSections((prev) => patchField(prev, d.id, d.value))
      } else if (d.type === 'editor:select' && d.id) {
        setSelectedFieldId(d.id)
        if (d.sectionId) { setActiveSectionId(d.sectionId); setSidebarOpen(true) }
        if (d.kind && (d.kind === 'link' || d.kind === 'button' || d.kind === 'nav')) {
          setTab('elements')
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [save, requestImageFor, injectPortfolioData])

  const deviceW = DEVICE_W[device]
  const statusText = status === 'saving' ? 'Saving...' : status === 'saved' ? 'All changes saved' : 'Auto-saves'

  return (
    <div
      className={styles.studio}
      data-collapsed={collapsed}
      data-drawer-open={sidebarOpen}
    >
      {/* Top command bar */}
      <header className={styles.topbar}>
        <div className={styles.tbLeft}>
          <button
            type="button"
            className={styles.iconGhost}
            onClick={() => { setCollapsed((c) => !c); setSidebarOpen((o) => !o) }}
            title={collapsed ? 'Show editor' : 'Hide editor'}
            aria-label="Toggle editor panel"
          >
            <span className={styles.panelGlyph} data-on={!collapsed} />
          </button>
          <div className={styles.tbTitle}>
            <span className={styles.tbKicker}>Studio</span>
            <b>{templateName || 'Your template'}</b>
          </div>
          <span className={styles.saveDot} data-state={status} title={statusText}>
            <i />{statusText}
          </span>
        </div>

        <div className={styles.tbCenter} role="group" aria-label="Preview device">
          {(['desktop', 'tablet', 'mobile'] as Device[]).map((d) => (
            <button
              key={d}
              type="button"
              className={styles.devBtn}
              data-on={device === d}
              onClick={() => setDevice(d)}
              title={d[0].toUpperCase() + d.slice(1)}
              aria-label={d}
            >
              <span className={styles[`dev_${d}` as keyof typeof styles] as string} />
            </button>
          ))}
        </div>

        <div className={styles.tbRight}>
          <a
            className={styles.previewLink}
            href={subdomain ? `https://${subdomain}` : '#'}
            target="_blank"
            rel="noreferrer"
          >
            Preview ↗
          </a>
          <button
            type="button"
            className={styles.publishBtn}
            data-live={published}
            onClick={togglePublish}
          >
            <span className={styles.pubGlow} />
            {published ? 'Published' : 'Publish'}
          </button>
        </div>
      </header>

      {/* Body: sidebar + canvas */}
      <div className={styles.body}>
        {/* Scrim for drawer mode (tablet / mobile) */}
        <div
          className={styles.scrim}
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!sidebarOpen}
        />

        <StudioSidebar
          tab={tab}
          onTab={setTab}
          sections={sections}
          activeSectionId={activeSectionId}
          onPickSection={(id) => { setActiveSectionId(id); focusOnCanvas(id) }}
          selectedFieldId={selectedFieldId}
          published={published}
          onTogglePublish={togglePublish}
          subdomain={subdomain ?? null}
          onSetField={setField}
          onSetHref={setHref}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onRemoveField={removeField}
          onMoveItem={moveItem}
          onReorderItem={reorderItem}
          onRequestImage={requestImageFor}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={styles.canvasWrap}>
          {/* Loading overlay - visible until editor:outline fires */}
          <StudioLoader show={loading} />

          {(hasHtml || templateSlug) ? (
            <div
              className={styles.deviceHolder}
              data-device={device}
              style={deviceW ? ({ ['--device-w' as string]: `${deviceW}px` }) : undefined}
            >
              {device !== 'desktop' && (
                <div className={styles.deviceBar} aria-hidden>
                  <span />{subdomain || 'you.portfolio-cv.online'}
                </div>
              )}
              {hasHtml ? (
                <iframe
                  ref={frameRef}
                  className={styles.canvas}
                  title="Portfolio editor"
                  sandbox="allow-scripts"
                  srcDoc={buildSrcDoc(initialHtml)}
                />
              ) : (
                <iframe
                  ref={frameRef}
                  className={styles.canvas}
                  title="Portfolio editor"
                  sandbox="allow-scripts allow-same-origin"
                  src={`/preview.html?id=${encodeURIComponent(templateSlug!)}`}
                />
              )}
            </div>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyGlyph}>✦</div>
              <h2>No template selected</h2>
              <p>Go back and pick a template to get started.</p>
            </div>
          )}

          {/* Floating hint - click-to-edit affordance, dismissable */}
          <CanvasHint />

          {/* Reopen tab when collapsed on desktop */}
          {collapsed && (
            <button
              type="button"
              className={styles.reopenTab}
              onClick={() => { setCollapsed(false); setSidebarOpen(true) }}
            >
              ‹ Editor
            </button>
          )}

          {/* Floating editor button for mobile/tablet drawer */}
          <button
            type="button"
            className={styles.fab}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open editor"
          >
            Edit content
          </button>
        </main>
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

function CanvasHint() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    try { if (localStorage.getItem('studioHintSeen')) setShow(false) } catch { /* ignore */ }
  }, [])
  if (!show) return null
  return (
    <div className={styles.canvasHint}>
      <span>Click any text, image, or button on the page to edit it in place.</span>
      <button
        type="button"
        onClick={() => { setShow(false); try { localStorage.setItem('studioHintSeen', '1') } catch { /* ignore */ } }}
        aria-label="Dismiss"
      >
        Got it
      </button>
    </div>
  )
}

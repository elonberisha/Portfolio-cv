'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  FACULTY_FILTERS,
  TEMPLATE_CATALOG,
  type FacultyGroup,
  type TemplateCatalogItem,
} from '@/lib/templateCatalog'
import { TEMPLATE_THUMBS } from '@/components/landing/LandingThumbs'

import styles from './page.module.css'

type FilterValue = 'all' | FacultyGroup

// Build a quick lookup: template slug → Thumb component
const THUMB_MAP = Object.fromEntries(TEMPLATE_THUMBS.map(t => [t.id, t.Thumb]))

// Logical width the real template renders at; the iframe is scaled down to the
// card width so the card shows a true-to-life shrunk preview of the page.
const DESIGN_WIDTH = 1200

/**
 * Lazy, scaled live preview of the real template page (/preview.html?id=slug).
 * Only mounts the iframe once the card scrolls near the viewport, and scales to
 * whatever width the card currently is. Used for templates that don't have a
 * hand-built <Thumb /> mini-component.
 */
function IframePreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(DESIGN_WIDTH ? 0.34 : 1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      if (el.clientWidth > 0) setScale(el.clientWidth / DESIGN_WIDTH)
    })
    ro.observe(el)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)

    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff' }}>
      {visible && (
        <iframe
          src={`/preview.html?id=${slug}`}
          title={`${slug} preview`}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_WIDTH * 1.5,
            border: 0,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

function TemplatePreview({ template }: { template: TemplateCatalogItem }) {
  const Thumb = THUMB_MAP[template.slug]

  if (Thumb) {
    return (
      <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
        {/* Browser chrome dots */}
        <div style={{
          display: 'flex', gap: 5, padding: '8px 10px',
          background: 'rgba(0,0,0,.04)',
          borderBottom: '1px solid rgba(0,0,0,.07)',
          flexShrink: 0,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
        </div>
        {/* Real thumbnail — fills remaining height */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <Thumb />
        </div>
        {/* Bottom meta strip */}
        <div className={styles.previewFooter} style={{ padding: '7px 12px' }}>
          <span>{template.tone}</span>
          <b>{template.groups[0]}</b>
        </div>
      </div>
    )
  }

  // No hand-built Thumb → embed the real template page, scaled into the card.
  return (
    <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
      {/* Browser chrome dots */}
      <div style={{
        display: 'flex', gap: 5, padding: '8px 10px',
        background: 'rgba(0,0,0,.04)',
        borderBottom: '1px solid rgba(0,0,0,.07)',
        flexShrink: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.18)' }} />
      </div>
      {/* Live scaled preview — fills remaining height */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <IframePreview slug={template.slug} />
      </div>
      {/* Bottom meta strip */}
      <div className={styles.previewFooter} style={{ padding: '7px 12px' }}>
        <span>{template.tone}</span>
        <b>{template.groups[0]}</b>
      </div>
    </div>
  )
}

export default function TemplateChooser({ activeSlugs }: { activeSlugs?: string[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectedSlug, setSelectedSlug] = useState('')
  const [message, setMessage] = useState('')

  // Only show templates the admin has marked active in the DB. If the DB
  // returned nothing (empty/unseeded), fall back to the full code catalog.
  const catalog = useMemo(() => {
    if (!activeSlugs || activeSlugs.length === 0) return TEMPLATE_CATALOG
    const active = new Set(activeSlugs)
    return TEMPLATE_CATALOG.filter((template) => active.has(template.slug))
  }, [activeSlugs])

  const templates = useMemo(() => {
    if (filter === 'all') return catalog
    return catalog.filter((template) => template.groups.includes(filter))
  }, [filter, catalog])

  function countForFilter(value: FilterValue) {
    if (value === 'all') return catalog.length
    return catalog.filter((template) => template.groups.includes(value)).length
  }

  async function chooseTemplate(slug: string) {
    setSelectedSlug(slug)
    setMessage('')

    try {
      const res = await fetch('/api/select-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug }),
      })

      if (res.status === 401) {
        router.push(`/signup?template=${slug}`)
        return
      }

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Could not select this template.')
        return
      }

      router.push(`/dashboard?template=${slug}`)
      router.refresh()
    } catch {
      setMessage('Could not select this template. Please try again.')
    } finally {
      setSelectedSlug('')
    }
  }

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filterGroup} aria-label="Filter templates by faculty group">
          {FACULTY_FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`${styles.filterButton} ${filter === item.value ? styles.activeFilter : ''}`}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
              <span>{countForFilter(item.value)}</span>
            </button>
          ))}
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.grid}>
        {templates.map((template) => (
          <article key={template.slug} className={styles.card}>
            <TemplatePreview template={template} />
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span>{template.groupLabel}</span>
                <b>{template.tone}</b>
              </div>
              <h2>{template.name}</h2>
              <p>{template.description}</p>
              <div className={styles.bestFor}>{template.bestFor}</div>
              <div className={styles.sections}>
                {template.sections.map((section) => (
                  <span key={section}>{section}</span>
                ))}
              </div>
              <div className={styles.cardActions}>
                <Link
                  href={`/templates/${template.slug}/preview`}
                  className={styles.previewButton}
                >
                  Preview
                </Link>
                <button
                  type="button"
                  className={styles.chooseButton}
                  disabled={selectedSlug === template.slug}
                  onClick={() => chooseTemplate(template.slug)}
                >
                  {selectedSlug === template.slug ? 'Selecting...' : 'Choose'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

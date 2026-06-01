'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

import {
  FACULTY_FILTERS,
  TEMPLATE_CATALOG,
  type FacultyGroup,
  type TemplateCatalogItem,
} from '@/lib/templateCatalog'

import styles from './page.module.css'

type FilterValue = 'all' | FacultyGroup

// ── Loading overlay shown after "Choose" is clicked ───────
const PHRASES = [
  'Setting the stage for your story.',
  'Arranging the canvas.',
  'This one suits you well.',
  'Almost ready for you.',
]

const STEPS = [
  'Saving your choice',
  'Preparing the editor',
  'Loading your template',
  'Getting it ready',
]

function SelectingOverlay({ name }: { name: string }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [activeSteps, setActiveSteps] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % PHRASES.length), 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const delays = [600, 1400, 2400]
    const timers = delays.map((d, i) => setTimeout(() => setActiveSteps(i + 2), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <style>{`
        @keyframes _ov_turn  { to { transform: rotate(360deg); } }
        @keyframes _ov_glow  { from { opacity: 0.5; } to { opacity: 1; } }
        @keyframes _ov_crawl { 0% { width: 0% } 100% { width: 75% } }
        @keyframes _ov_pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(0.65);opacity:0.4} }

        ._ov_shell {
          position: fixed; inset: 0; z-index: 9999;
          background: color-mix(in oklab, var(--ink,#1a1714) 97%, #000);
          display: flex; flex-direction: column;
          animation: none;
        }
        ._ov_bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: rgba(247,243,235,0.08); overflow: hidden;
        }
        ._ov_fill {
          height: 100%;
          background: var(--accent,#7b2440);
          border-radius: 0 2px 2px 0;
          animation: _ov_crawl 4s cubic-bezier(0.05,0.65,0.4,1) forwards;
        }
        ._ov_body {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 40px; padding: 40px 24px;
        }
        ._ov_name {
          font-family: var(--mono, monospace);
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--accent, #7b2440);
        }
        ._ov_glyph {
          font-size: 28px; color: var(--accent,#7b2440); line-height: 1;
          animation: _ov_turn 18s linear infinite, _ov_glow 3s ease-in-out infinite alternate;
        }
        ._ov_phrase_slot {
          position: relative; width: 100%; max-width: 460px; height: 2.8em;
          text-align: center;
        }
        ._ov_phrase {
          position: absolute; inset: 0; margin: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif,Georgia,serif);
          font-weight: 400;
          font-size: clamp(17px,2.2vw,25px);
          letter-spacing: -0.015em; line-height: 1.3;
          color: var(--paper,#f7f3eb);
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transition: opacity 0.5s ease, clip-path 0.55s cubic-bezier(0.4,0,0.2,1);
        }
        ._ov_phrase[data-active='true'] {
          opacity: 1; clip-path: inset(0 0% 0 0);
        }
        ._ov_steps {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 12px;
          min-width: 210px; max-width: 270px;
        }
        ._ov_step {
          display: flex; align-items: center; gap: 11px;
          opacity: 0; transform: translateX(-10px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        ._ov_step[data-visible='true'] { opacity: 1; transform: translateX(0); }
        ._ov_dot {
          flex-shrink: 0; width: 7px; height: 7px; border-radius: 50%;
          background: rgba(247,243,235,0.2);
          transition: background 0.3s, box-shadow 0.3s;
        }
        ._ov_dot[data-active='true'] {
          background: var(--accent,#7b2440);
          animation: _ov_pulse 1.4s ease-in-out infinite;
        }
        ._ov_step[data-done='true'] ._ov_dot {
          background: var(--live,#2a7d46);
          animation: none;
          box-shadow: 0 0 0 3px rgba(42,125,70,0.2);
        }
        ._ov_step_label {
          flex: 1; font-family: var(--mono,monospace); font-size: 12px;
          letter-spacing: 0.03em;
          color: rgba(247,243,235,0.35);
          transition: color 0.3s;
        }
        ._ov_step[data-visible='true']:not([data-done='true']) ._ov_step_label {
          color: var(--paper,#f7f3eb);
        }
        ._ov_step[data-done='true'] ._ov_step_label { color: rgba(247,243,235,0.3); }
        ._ov_check {
          font-family: var(--mono,monospace); font-size: 11px;
          color: var(--live,#2a7d46); min-width: 14px; text-align: right;
          opacity: 0; transition: opacity 0.25s;
        }
        ._ov_step[data-done='true'] ._ov_check { opacity: 1; }
      `}</style>

      <div className="_ov_shell" aria-live="assertive" role="status" aria-label="Loading template">
        <div className="_ov_bar"><div className="_ov_fill" /></div>
        <div className="_ov_body">
          <span className="_ov_name">{name}</span>
          <div className="_ov_glyph" aria-hidden>✦</div>

          <div className="_ov_phrase_slot" aria-live="polite" aria-atomic="true">
            {PHRASES.map((p, i) => (
              <span key={p} className="_ov_phrase" data-active={i === phraseIdx ? 'true' : 'false'} aria-hidden={i !== phraseIdx}>
                {p}
              </span>
            ))}
          </div>

          <ol className="_ov_steps" aria-label="Loading steps">
            {STEPS.map((step, i) => {
              const visible = i < activeSteps
              const done    = visible && i < activeSteps - 1
              const active  = visible && !done
              return (
                <li key={step} className="_ov_step" data-visible={visible ? 'true' : 'false'} data-done={done ? 'true' : 'false'}>
                  <span className="_ov_dot" data-active={active ? 'true' : 'false'} aria-hidden />
                  <span className="_ov_step_label">{step}</span>
                  <span className="_ov_check" aria-hidden>{done ? '✓' : ''}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}

// ── Static thumbnail preview ───────────────────────────────
function TemplatePreview({ template }: { template: TemplateCatalogItem }) {
  return (
    <div className={styles.preview} style={{ padding: 0, overflow: 'hidden' }}>
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
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#fff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/template-thumbs/${template.slug}.webp`}
          alt={`${template.name} template preview`}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
          }}
        />
      </div>
      <div className={styles.previewFooter} style={{ padding: '7px 12px' }}>
        <span>{template.tone}</span>
        <b>{template.groups[0]}</b>
      </div>
    </div>
  )
}

// ── Main chooser ───────────────────────────────────────────
export default function TemplateChooser({ activeSlugs }: { activeSlugs?: string[] }) {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectingSlug, setSelectingSlug] = useState('')
  const [selectingName, setSelectingName] = useState('')
  const [message, setMessage] = useState('')

  const catalog = useMemo(() => {
    if (!activeSlugs || activeSlugs.length === 0) return TEMPLATE_CATALOG
    const active = new Set(activeSlugs)
    return TEMPLATE_CATALOG.filter((t) => active.has(t.slug))
  }, [activeSlugs])

  const templates = useMemo(() => {
    if (filter === 'all') return catalog
    return catalog.filter((t) => t.groups.includes(filter))
  }, [filter, catalog])

  function countForFilter(value: FilterValue) {
    if (value === 'all') return catalog.length
    return catalog.filter((t) => t.groups.includes(value)).length
  }

  async function chooseTemplate(slug: string, name: string) {
    setSelectingSlug(slug)
    setSelectingName(name)
    setMessage('')

    try {
      const res = await fetch('/api/select-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug }),
      })

      if (res.status === 401) {
        // Not logged in — hard-navigate so auth cookie is re-evaluated
        window.location.href = `/signup?template=${slug}`
        return
      }

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Could not select this template.')
        setSelectingSlug('')
        setSelectingName('')
        return
      }

      // Hard navigation keeps the overlay visible until the new page actually
      // loads. Using router.push + router.refresh() can race and reset client
      // state, which makes the overlay vanish without navigating.
      window.location.href = data.redirect || `/dashboard?template=${slug}`
    } catch {
      setMessage('Could not select this template. Please try again.')
      setSelectingSlug('')
      setSelectingName('')
    }
  }

  return (
    <>
      {/* Full-screen loading overlay */}
      {selectingSlug && <SelectingOverlay name={selectingName} />}

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
                <Link href={`/templates/${template.slug}/preview`} className={styles.previewButton}>
                  Preview
                </Link>
                <button
                  type="button"
                  className={styles.chooseButton}
                  disabled={Boolean(selectingSlug)}
                  onClick={() => chooseTemplate(template.slug, template.name)}
                >
                  {selectingSlug === template.slug ? 'Selecting…' : 'Choose'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

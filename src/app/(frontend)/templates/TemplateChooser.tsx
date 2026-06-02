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

// Duration of ONE full loading cycle. Every user sees at least one complete
// cycle; if setup is still in flight when a cycle ends, the overlay restarts
// from 0 (see the coordinator effect in TemplateChooser). Keep this in sync
// with the `_ov_crawl` animation duration in the overlay styles below.
const LOOP_MS = 4000

function SelectingOverlay({ name }: { name: string }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [activeSteps, setActiveSteps] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % PHRASES.length), 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    // Reveal each step in turn, then mark them ALL done just before the cycle
    // ends so a completed loop reads as a finished pass before it repeats.
    const reveal = [600, 1400, 2400].map((d, i) => setTimeout(() => setActiveSteps(i + 2), d))
    const finish = setTimeout(() => setActiveSteps(STEPS.length + 1), LOOP_MS - 450)
    return () => { reveal.forEach(clearTimeout); clearTimeout(finish) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes _ov_turn  { to { transform: rotate(360deg); } }
        @keyframes _ov_glow  { from { opacity: 0.5; } to { opacity: 1; } }
        @keyframes _ov_crawl { 0% { width: 0% } 92% { width: 88% } 100% { width: 100% } }
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
  // Loop coordination for the loading overlay. `cycle` bumps each time a full
  // loading loop completes — its value is used as the overlay's React key so
  // the animation remounts and restarts from 0. Work results land in refs so
  // the coordinator can read them at each loop boundary without re-rendering.
  const [cycle, setCycle] = useState(0)
  const pendingRedirect = useRef<string | null>(null)
  const selectFailed = useRef<string | null>(null)

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
    // Kick off the overlay and reset loop state.
    pendingRedirect.current = null
    selectFailed.current = null
    setCycle(0)
    setSelectingName(name)
    setMessage('')
    setSelectingSlug(slug)

    // Fire the request in the background. We do NOT navigate here — the
    // coordinator effect navigates only at a loop boundary, guaranteeing every
    // user sees at least one full loading cycle even when this resolves fast.
    try {
      const res = await fetch('/api/select-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug }),
      })

      if (res.status === 401) {
        // Not logged in — send to signup (cookie re-evaluated on hard nav).
        pendingRedirect.current = `/signup?template=${slug}`
        return
      }

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        selectFailed.current = (data && data.error) || 'Could not select this template.'
        return
      }

      pendingRedirect.current = (data && data.redirect) || `/dashboard?template=${slug}`
    } catch {
      selectFailed.current = 'Could not select this template. Please try again.'
    }
  }

  // Loop coordinator: runs once per loading cycle. At each loop boundary it
  // decides whether to navigate (work done), abort (work failed), or loop
  // again (work still pending). The minimum wait is exactly one LOOP_MS because
  // the first decision only happens after the first cycle completes.
  useEffect(() => {
    if (!selectingSlug) return
    const t = setTimeout(() => {
      if (selectFailed.current) {
        // Surface the error and tear down the overlay.
        setMessage(selectFailed.current)
        selectFailed.current = null
        pendingRedirect.current = null
        setSelectingSlug('')
        setSelectingName('')
        setCycle(0)
        return
      }
      if (pendingRedirect.current) {
        // Hard navigation keeps the overlay up until the next page paints.
        window.location.href = pendingRedirect.current
        return
      }
      // Still preparing — restart the animation and run another loop.
      setCycle((c) => c + 1)
    }, LOOP_MS)
    return () => clearTimeout(t)
  }, [selectingSlug, cycle])

  return (
    <>
      {/* Full-screen loading overlay — keyed on `cycle` so each completed loop
          remounts and replays the animation from 0 until setup is ready. */}
      {selectingSlug && <SelectingOverlay key={cycle} name={selectingName} />}

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

'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './AiImprove.module.css'

type Mode = 'improve' | 'shorten' | 'grammar' | 'professional'

const MODES: { id: Mode; label: string }[] = [
  { id: 'improve', label: 'Improve' },
  { id: 'shorten', label: 'Shorten' },
  { id: 'grammar', label: 'Fix grammar' },
  { id: 'professional', label: 'Professional' },
]

// Fetch the feature flag once per page load, shared across every instance.
let statusPromise: Promise<boolean> | null = null
function fetchStatus(): Promise<boolean> {
  if (!statusPromise) {
    statusPromise = fetch('/api/ai/status', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => !!d?.enabled)
      .catch(() => false)
  }
  return statusPromise
}

/**
 * Inline "Improve with AI" affordance for a single text field. Suggests a
 * rewrite (the student picks the style) and previews it — nothing is written
 * until the student clicks "Use this". Renders nothing when AI isn't configured.
 */
export default function AiImprove({
  value,
  onAccept,
}: {
  value: string
  onAccept: (next: string) => void
}) {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    fetchStatus().then((e) => {
      if (alive) setEnabled(e)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  function close() {
    setOpen(false)
    setSuggestion('')
    setError('')
    setLoading(false)
  }

  async function run(mode: Mode) {
    const text = value.trim()
    if (!text) return
    setLoading(true)
    setError('')
    setSuggestion('')
    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text, mode }),
      })
      const d = await res.json().catch(() => null)
      if (res.ok && d?.text) setSuggestion(d.text)
      else setError(d?.error || 'Could not improve. Try again.')
    } catch {
      setError('Could not improve. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Hide entirely while the flag is loading or when AI isn't configured.
  if (enabled !== true) return null

  const empty = !value.trim()

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => (open ? close() : setOpen(true))}
        disabled={empty}
        title={empty ? 'Write something first' : 'Improve with AI'}
      >
        <span aria-hidden>✨</span> AI
      </button>

      {open && (
        <div
          className={styles.pop}
          role="dialog"
          aria-label="Improve with AI"
          onClick={(e) => e.preventDefault()}
        >
          {!suggestion ? (
            <>
              <p className={styles.lead}>Rewrite this text:</p>
              <div className={styles.modes}>
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={styles.mode}
                    onClick={() => run(m.id)}
                    disabled={loading}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              {loading && <p className={styles.note}>Improving…</p>}
              {error && <p className={styles.err}>{error}</p>}
            </>
          ) : (
            <div className={styles.preview}>
              <p className={styles.previewText}>{suggestion}</p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.accept}
                  onClick={() => {
                    onAccept(suggestion)
                    close()
                  }}
                >
                  Use this
                </button>
                <button type="button" className={styles.discard} onClick={() => setSuggestion('')}>
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

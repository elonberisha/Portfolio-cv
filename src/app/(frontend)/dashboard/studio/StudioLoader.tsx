'use client'

import { useEffect, useState } from 'react'
import styles from './StudioLoader.module.css'

const PHRASES = [
  'Making room for your story.',
  'A strong first impression takes a moment.',
  'Getting your canvas ready.',
  'Almost there.',
]

const STEPS = [
  'Loading template',
  'Setting up editor',
  'Reading your content',
  'Wiring the controls',
]

/* StudioLoader — shown while the canvas iframe is booting.
   `show` goes false the moment editor:outline fires (template is ready).
   The component fades out then self-unmounts after the transition. */
export default function StudioLoader({ show }: { show: boolean }) {
  const [phraseIdx, setPhraseIdx]   = useState(0)
  const [activeSteps, setActiveSteps] = useState(1)   // how many steps have appeared
  const [mounted, setMounted]       = useState(true)

  /* Rotate phrases */
  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % PHRASES.length), 2600)
    return () => clearInterval(id)
  }, [])

  /* Stagger steps in — independent of real progress (time-based simulation) */
  useEffect(() => {
    const delays = [900, 1900, 3000]
    const timers = delays.map((d, i) => setTimeout(() => setActiveSteps(i + 2), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  /* When show → false, wait for CSS transition to finish then unmount */
  useEffect(() => {
    if (!show) {
      const id = setTimeout(() => setMounted(false), 750)
      return () => clearTimeout(id)
    }
  }, [show])

  if (!mounted) return null

  return (
    <div className={styles.root} data-show={show} aria-hidden={!show}>
      {/* Thin progress line at top */}
      <div className={styles.bar}>
        <div className={styles.fill} data-done={!show} />
      </div>

      <div className={styles.body}>
        {/* Slow-rotating ✦ glyph — ambient, not spinner */}
        <div className={styles.glyph} aria-hidden>✦</div>

        {/* Phrase that wipes in and crossfades */}
        <div className={styles.phraseSlot} aria-live="polite" aria-atomic="true">
          {PHRASES.map((p, i) => (
            <span
              key={p}
              className={styles.phrase}
              data-active={i === phraseIdx}
              aria-hidden={i !== phraseIdx}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Sequential steps */}
        <ol className={styles.steps} aria-label="Loading steps">
          {STEPS.map((step, i) => {
            const visible = i < activeSteps
            const done    = visible && (i < activeSteps - 1 || !show)
            const active  = visible && !done
            return (
              <li
                key={step}
                className={styles.step}
                data-visible={visible}
                data-done={done}
              >
                <span className={styles.dot} data-active={active} aria-hidden />
                <span className={styles.stepLabel}>{step}</span>
                <span className={styles.checkmark} aria-hidden>
                  {done ? '✓' : ''}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

import styles from './studio.module.css'

export type OutlineField = {
  id: string
  label: string
  value: string
  multiline?: boolean
}
export type OutlineItem = { id: string; fields: OutlineField[] }
export type OutlineList = { id: string; itemLabel: string; items: OutlineItem[] }
export type OutlineSection = {
  id: string
  type: string
  label: string
  fields: OutlineField[]
  lists: OutlineList[]
}

export type SidebarInitial = {
  published: boolean
}

type Props = {
  initial: SidebarInitial
  status: 'idle' | 'saving' | 'saved'
  templateName: string | null
  // The template's structure, grouped into sections, streamed from the canvas.
  sections: OutlineSection[]
  onSetField: (id: string, value: string) => void
  onAddItem: (listId: string) => void
  onRemoveItem: (itemId: string) => void
  onRemoveField: (id: string) => void
  onMoveItem: (itemId: string, dir: 'up' | 'down') => void
}

export default function StudioSidebar({
  initial, status, templateName, sections, onSetField, onAddItem, onRemoveItem,
  onRemoveField, onMoveItem,
}: Props) {
  // Sections start open so the student sees their content right away; they can
  // still collapse any one to focus.
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [published, setPublished] = useState(initial.published)
  const [showTip, setShowTip] = useState(true)

  const isOpen = (id: string) => open[id] ?? true
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !(o[id] ?? true) }))

  async function togglePublish() {
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
  }

  const statusText = status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : 'Auto-saves'

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTop}>
        <span className={styles.kicker}>Studio</span>
        <b className={styles.sideTitle}>{templateName || 'Your template'}</b>
      </div>

      <div className={styles.sideScroll}>
        {showTip && (
          <div className={styles.tip}>
            <span>Click any text on the page to edit it. Hover a block to reorder, duplicate or delete.</span>
            <button type="button" onClick={() => setShowTip(false)} aria-label="Dismiss tip">×</button>
          </div>
        )}

        <div className={styles.sections}>
          {sections.length === 0 ? (
            <p className={styles.opHint}>
              Reading your template’s content… each part (header, experience, projects…) will
              appear here to edit.
            </p>
          ) : (
            sections.map((sec) => {
              const expanded = isOpen(sec.id)
              const count = sec.fields.length + sec.lists.reduce((n, l) => n + l.items.length, 0)
              return (
                <section className={styles.sec} key={sec.id}>
                  <button
                    type="button"
                    className={styles.secHead}
                    aria-expanded={expanded}
                    onClick={() => toggle(sec.id)}
                  >
                    <span className={styles.chevron} data-open={expanded}>›</span>
                    <span className={styles.secName}>{sec.label}</span>
                    <span className={styles.secMeta}>{count}</span>
                  </button>

                  {expanded && (
                    <div className={styles.secBody}>
                      {sec.fields.map((f) => (
                        <Field key={f.id} field={f} onChange={onSetField} onRemove={onRemoveField} />
                      ))}

                      {sec.lists.map((list) => (
                        <div className={styles.list} key={list.id}>
                          {list.items.map((item, idx) => (
                            <div className={styles.itemCard} key={item.id}>
                              <div className={styles.itemHead}>
                                <span>{capitalize(list.itemLabel)} {idx + 1}</span>
                                <span className={styles.itemTools}>
                                  <button
                                    type="button"
                                    className={styles.iconBtn}
                                    title="Move up"
                                    onClick={() => onMoveItem(item.id, 'up')}
                                    disabled={idx === 0}
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.iconBtn}
                                    title="Move down"
                                    onClick={() => onMoveItem(item.id, 'down')}
                                    disabled={idx === list.items.length - 1}
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.removeWide}
                                    onClick={() => onRemoveItem(item.id)}
                                  >
                                    Remove
                                  </button>
                                </span>
                              </div>
                              {item.fields.map((f) => (
                                <Field key={f.id} field={f} onChange={onSetField} onRemove={onRemoveField} />
                              ))}
                            </div>
                          ))}
                          <button type="button" className={styles.add} onClick={() => onAddItem(list.id)}>
                            + Add {list.itemLabel}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )
            })
          )}
        </div>
      </div>

      <div className={styles.sideFoot}>
        <div className={styles.footRow}>
          <label className={styles.pub}>
            <input type="checkbox" checked={published} onChange={togglePublish} />
            <span className={styles.pubText}>
              <b data-live={published}>{published ? 'Live' : 'Draft'}</b>
              <small>{published ? 'Visible at your subdomain' : 'Only you can see it'}</small>
            </span>
          </label>
          <span className={styles.status} data-state={status}>{statusText}</span>
        </div>
        <nav className={styles.footLinks}>
          <Link href="/dashboard/cv">Build CV {'->'}</Link>
          <Link href="/templates">Change template</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </aside>
  )
}

function Field({
  field, onChange, onRemove,
}: {
  field: OutlineField
  onChange: (id: string, v: string) => void
  onRemove?: (id: string) => void
}) {
  return (
    <label className={styles.field}>
      <span>
        {field.label}
        {onRemove && (
          <button
            type="button"
            className={styles.fieldDel}
            title="Delete this field"
            onClick={(e) => { e.preventDefault(); onRemove(field.id) }}
          >
            ×
          </button>
        )}
      </span>
      {field.multiline ? (
        <textarea rows={3} value={field.value} onChange={(e) => onChange(field.id, e.target.value)} />
      ) : (
        <input value={field.value} onChange={(e) => onChange(field.id, e.target.value)} />
      )}
    </label>
  )
}

function capitalize(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s
}

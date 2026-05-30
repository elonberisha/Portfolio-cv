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
}

type Tab = 'details' | 'ops'

export default function StudioSidebar({
  initial, status, templateName, sections, onSetField, onAddItem, onRemoveItem,
}: Props) {
  const [tab, setTab] = useState<Tab>('details')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [published, setPublished] = useState(initial.published)

  const isOpen = (id: string, index: number) => open[id] ?? index === 0
  const toggle = (id: string, index: number) =>
    setOpen((o) => ({ ...o, [id]: !(o[id] ?? index === 0) }))

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

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTop}>
        <span className={styles.kicker}>Studio</span>
        <b className={styles.sideTitle}>{templateName || 'Your template'}</b>
        <span className={styles.status} data-state={status}>
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'All changes saved' : 'Auto-saves as you edit'}
        </span>
      </div>

      <div className={styles.tabs}>
        <button type="button" className={tab === 'details' ? styles.tabActive : styles.tab} onClick={() => setTab('details')}>
          Details
        </button>
        <button type="button" className={tab === 'ops' ? styles.tabActive : styles.tab} onClick={() => setTab('ops')}>
          Operations
        </button>
      </div>

      <div className={styles.sideScroll}>
        {tab === 'details' && (
          <div className={styles.sections}>
            {sections.length === 0 ? (
              <p className={styles.opHint}>
                Reading your template’s content… each part (header, experience, projects…) will
                appear here to edit.
              </p>
            ) : (
              sections.map((sec, i) => {
                const expanded = isOpen(sec.id, i)
                const count = sec.fields.length + sec.lists.reduce((n, l) => n + l.items.length, 0)
                return (
                  <section className={styles.sec} key={sec.id}>
                    <button
                      type="button"
                      className={styles.secHead}
                      aria-expanded={expanded}
                      onClick={() => toggle(sec.id, i)}
                    >
                      <span className={styles.secName}>{sec.label}</span>
                      <span className={styles.secMeta}>{count}</span>
                      <span className={styles.chevron} data-open={expanded}>›</span>
                    </button>

                    {expanded && (
                      <div className={styles.secBody}>
                        {sec.fields.map((f) => (
                          <Field key={f.id} field={f} onChange={onSetField} />
                        ))}

                        {sec.lists.map((list) => (
                          <div className={styles.list} key={list.id}>
                            {list.items.map((item, idx) => (
                              <div className={styles.itemCard} key={item.id}>
                                <div className={styles.itemHead}>
                                  <span>{capitalize(list.itemLabel)} {idx + 1}</span>
                                  <button
                                    type="button"
                                    className={styles.removeWide}
                                    onClick={() => onRemoveItem(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                                {item.fields.map((f) => (
                                  <Field key={f.id} field={f} onChange={onSetField} />
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
        )}

        {tab === 'ops' && (
          <div className={styles.ops}>
            <div className={styles.opGroup}>
              <span className={styles.opLabel}>Edit on page</span>
              <p className={styles.opHint}>
                Click any text to edit it. Hover a block for the toolbar: drag to reorder,
                duplicate, delete, or hide. Click an image to replace it.
              </p>
            </div>

            <div className={styles.opGroup}>
              <span className={styles.opLabel}>Publish</span>
              <label className={styles.toggle}>
                <input type="checkbox" checked={published} onChange={togglePublish} />
                <span>{published ? 'Live at your subdomain' : 'Draft (not visible)'}</span>
              </label>
            </div>

            <div className={styles.opGroup}>
              <span className={styles.opLabel}>Quick links</span>
              <Link href="/dashboard/cv" className={styles.opLink}>Next: build your CV {'->'}</Link>
              <Link href="/templates" className={styles.opLink}>Change template</Link>
              <Link href="/dashboard" className={styles.opLink}>Back to dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

function Field({ field, onChange }: { field: OutlineField; onChange: (id: string, v: string) => void }) {
  return (
    <label className={styles.field}>
      <span>{field.label}</span>
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

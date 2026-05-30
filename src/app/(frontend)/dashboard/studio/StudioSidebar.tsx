'use client'

import { useState } from 'react'
import Link from 'next/link'

import styles from './studio.module.css'

export type CanvasField = {
  id: string
  label: string
  value: string
  multiline?: boolean
}

export type SidebarInitial = {
  published: boolean
}

type Props = {
  initial: SidebarInitial
  status: 'idle' | 'saving' | 'saved'
  templateName: string | null
  // The template's own editable text nodes, streamed live from the canvas.
  fields: CanvasField[]
  // Edit one of those nodes from the sidebar.
  onSetField: (id: string, value: string) => void
}

type Tab = 'details' | 'ops'

export default function StudioSidebar({ initial, status, templateName, fields, onSetField }: Props) {
  const [tab, setTab] = useState<Tab>('details')
  const [published, setPublished] = useState(initial.published)

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
          <div className={styles.detForm}>
            {fields.length === 0 ? (
              <p className={styles.opHint}>
                Loading your template’s content… each heading and text block will appear here to edit.
              </p>
            ) : (
              fields.map((f, i) => (
                <label className={styles.field} key={f.id}>
                  <span>{f.label}{labelSuffix(fields, i)}</span>
                  {f.multiline ? (
                    <textarea
                      rows={3}
                      value={f.value}
                      onChange={(e) => onSetField(f.id, e.target.value)}
                    />
                  ) : (
                    <input value={f.value} onChange={(e) => onSetField(f.id, e.target.value)} />
                  )}
                </label>
              ))
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

// Number repeated labels (Heading 1, Heading 2…) so fields stay distinguishable.
function labelSuffix(fields: CanvasField[], index: number) {
  const label = fields[index].label
  const sameBefore = fields.slice(0, index).filter((f) => f.label === label).length
  const sameTotal = fields.filter((f) => f.label === label).length
  return sameTotal > 1 ? ` ${sameBefore + 1}` : ''
}

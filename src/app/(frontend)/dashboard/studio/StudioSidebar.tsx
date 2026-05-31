'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'

import AiImprove from '@/components/AiImprove'

import styles from './studio.module.css'

/* ── Types (extended: links/buttons/nav are first-class) ── */
export type FieldKind = 'text' | 'link' | 'button' | 'nav' | 'image' | 'email' | 'social'

export type OutlineField = {
  id: string
  label: string
  value: string
  multiline?: boolean
  kind?: FieldKind
  href?: string
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

export type SidebarInitial = { published: boolean }
export type StudioTab = 'content' | 'elements' | 'design'

const SECTION_ICON: Record<string, string> = {
  header: '◆', hero: '◆', about: '✎', experience: '⊞', work: '⊞', projects: '⊡',
  education: '✦', skills: '⬡', awards: '★', contact: '✉', footer: '▭', gallery: '▦',
}
function iconFor(type: string) {
  return SECTION_ICON[type?.toLowerCase()] || '○'
}
function isLinkKind(k?: FieldKind) {
  return k === 'link' || k === 'button' || k === 'nav' || k === 'social' || k === 'email'
}

type Props = {
  tab: StudioTab
  onTab: (t: StudioTab) => void
  sections: OutlineSection[]
  activeSectionId: string | null
  onPickSection: (id: string) => void
  selectedFieldId: string | null
  published: boolean
  onTogglePublish: () => void
  subdomain: string | null
  onSetField: (id: string, value: string) => void
  onSetHref: (id: string, href: string) => void
  onAddItem: (listId: string) => void
  onRemoveItem: (itemId: string) => void
  onRemoveField: (id: string) => void
  onMoveItem: (itemId: string, dir: 'up' | 'down') => void
  onReorderItem: (listId: string, from: number, to: number) => void
  onRequestImage: (id: string) => void
  onClose: () => void
}

export default function StudioSidebar(props: Props) {
  const { tab, onTab, sections, activeSectionId } = props
  const active = sections.find((s) => s.id === activeSectionId) || sections[0] || null

  /* Every link/button/nav field across the whole page, for the Elements tab. */
  const elementGroups = useMemo(() => {
    const links: OutlineField[] = []
    const buttons: OutlineField[] = []
    const navs: OutlineField[] = []
    const socials: OutlineField[] = []
    const walk = (f: OutlineField) => {
      if (f.kind === 'button') buttons.push(f)
      else if (f.kind === 'nav') navs.push(f)
      else if (f.kind === 'social' || f.kind === 'email') socials.push(f)
      else if (f.kind === 'link') links.push(f)
    }
    sections.forEach((s) => {
      s.fields.forEach(walk)
      s.lists.forEach((l) => l.items.forEach((it) => it.fields.forEach(walk)))
    })
    return { links, buttons, navs, socials }
  }, [sections])

  return (
    <aside className={styles.sidebar}>
      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button type="button" role="tab" className={styles.tab} data-on={tab === 'content'} onClick={() => onTab('content')}>
          Content
        </button>
        <button type="button" role="tab" className={styles.tab} data-on={tab === 'elements'} onClick={() => onTab('elements')}>
          Elements
        </button>
        <button type="button" role="tab" className={styles.tab} data-on={tab === 'design'} onClick={() => onTab('design')}>
          Design
        </button>
        <button type="button" className={styles.drawerClose} onClick={props.onClose} aria-label="Close editor">×</button>
      </div>

      {/* Content tab = master/detail (pick ONE section → edit only its fields) */}
      {tab === 'content' && (
        <div className={styles.contentPane}>
          <nav className={styles.sectionRail} aria-label="Sections">
            {sections.length === 0 ? (
              <p className={styles.railEmpty}>Reading your template…</p>
            ) : (
              sections.map((s) => {
                const count = s.fields.length + s.lists.reduce((n, l) => n + l.items.length, 0)
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={styles.railItem}
                    data-on={s.id === active?.id}
                    onClick={() => props.onPickSection(s.id)}
                  >
                    <span className={styles.railIcon}>{iconFor(s.type)}</span>
                    <span className={styles.railName}>{s.label}</span>
                    <span className={styles.railCount}>{count}</span>
                  </button>
                )
              })
            )}
          </nav>

          <div className={styles.detail}>
            {active ? (
              <SectionDetail section={active} {...props} />
            ) : (
              <p className={styles.detailEmpty}>Each part of your page — header, projects, experience — will appear here to edit.</p>
            )}
          </div>
        </div>
      )}

      {/* Elements tab = the hidden things: links, buttons, navigation, socials */}
      {tab === 'elements' && (
        <div className={styles.scroll}>
          <p className={styles.paneIntro}>Edit every link, button and navigation target on your page — the things you can’t reach by clicking text.</p>
          <ElementGroup title="Navigation" hint="Menu links across the top of your page" items={elementGroups.navs} {...props} />
          <ElementGroup title="Buttons" hint="Call-to-action buttons (Download CV, Contact…)" items={elementGroups.buttons} {...props} />
          <ElementGroup title="Links" hint="Inline links inside your content" items={elementGroups.links} {...props} />
          <ElementGroup title="Social & contact" hint="Social handles and email targets" items={elementGroups.socials} {...props} />
          {elementGroups.navs.length + elementGroups.buttons.length + elementGroups.links.length + elementGroups.socials.length === 0 && (
            <p className={styles.detailEmpty}>No links detected yet. They’ll show up here once your template loads — or click a button on the page to jump straight to it.</p>
          )}
        </div>
      )}

      {/* Design tab = theme controls (posts editor:setTheme) */}
      {tab === 'design' && <DesignPane subdomain={props.subdomain} />}

      {/* Footer — publish lives in the top bar now; this is the forward step */}
      <div className={styles.sideFoot}>
        <div className={styles.pubMini} data-live={props.published}>
          <span className={styles.pubMiniDot} />
          {props.published
            ? <span>Live at <b>{props.subdomain || 'your subdomain'}</b></span>
            : <span>Draft — only you can see this</span>}
        </div>
        <Link href="/dashboard/cv" className={styles.nextBtn}>
          Next: Build your CV <span aria-hidden>→</span>
        </Link>
      </div>
    </aside>
  )
}

/* ── One section's fields + repeatable lists (drag to reorder) ── */
function SectionDetail({
  section, selectedFieldId, onSetField, onSetHref, onRemoveField, onRequestImage,
  onAddItem, onRemoveItem, onMoveItem, onReorderItem,
}: { section: OutlineSection } & Props) {
  return (
    <>
      <div className={styles.detailHead}>
        <h3>{section.label}</h3>
        <span className={styles.detailKind}>{section.type}</span>
      </div>

      {section.fields.map((f) => (
        <Field
          key={f.id}
          field={f}
          selected={f.id === selectedFieldId}
          onChange={onSetField}
          onHref={onSetHref}
          onRemove={onRemoveField}
          onImage={onRequestImage}
        />
      ))}

      {section.lists.map((list) => (
        <ListEditor
          key={list.id}
          list={list}
          selectedFieldId={selectedFieldId}
          onSetField={onSetField}
          onSetHref={onSetHref}
          onRemoveField={onRemoveField}
          onRequestImage={onRequestImage}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          onMoveItem={onMoveItem}
          onReorderItem={onReorderItem}
        />
      ))}
    </>
  )
}

function ListEditor({
  list, selectedFieldId, onSetField, onSetHref, onRemoveField, onRequestImage,
  onAddItem, onRemoveItem, onMoveItem, onReorderItem,
}: {
  list: OutlineList
  selectedFieldId: string | null
  onSetField: (id: string, v: string) => void
  onSetHref: (id: string, v: string) => void
  onRemoveField: (id: string) => void
  onRequestImage: (id: string) => void
  onAddItem: (listId: string) => void
  onRemoveItem: (itemId: string) => void
  onMoveItem: (itemId: string, dir: 'up' | 'down') => void
  onReorderItem: (listId: string, from: number, to: number) => void
}) {
  const dragFrom = useRef<number | null>(null)
  const [over, setOver] = useState<number | null>(null)

  return (
    <div className={styles.list}>
      <div className={styles.listLabel}>{capitalize(list.itemLabel)}s</div>
      {list.items.map((item, idx) => (
        <div
          key={item.id}
          className={styles.itemCard}
          data-over={over === idx}
          draggable
          onDragStart={() => { dragFrom.current = idx }}
          onDragOver={(e) => { e.preventDefault(); setOver(idx) }}
          onDragLeave={() => setOver((o) => (o === idx ? null : o))}
          onDrop={(e) => {
            e.preventDefault()
            const from = dragFrom.current
            if (from != null && from !== idx) onReorderItem(list.id, from, idx)
            dragFrom.current = null
            setOver(null)
          }}
          onDragEnd={() => { dragFrom.current = null; setOver(null) }}
        >
          <div className={styles.itemHead}>
            <span className={styles.grip} title="Drag to reorder" aria-hidden>⠿</span>
            <span className={styles.itemName}>{capitalize(list.itemLabel)} {idx + 1}</span>
            <span className={styles.itemTools}>
              <button type="button" className={styles.iconBtn} title="Move up" disabled={idx === 0} onClick={() => onMoveItem(item.id, 'up')}>↑</button>
              <button type="button" className={styles.iconBtn} title="Move down" disabled={idx === list.items.length - 1} onClick={() => onMoveItem(item.id, 'down')}>↓</button>
              <button type="button" className={styles.iconBtn} data-danger title="Remove" onClick={() => onRemoveItem(item.id)}>×</button>
            </span>
          </div>
          {item.fields.map((f) => (
            <Field
              key={f.id}
              field={f}
              selected={f.id === selectedFieldId}
              onChange={onSetField}
              onHref={onSetHref}
              onRemove={onRemoveField}
              onImage={onRequestImage}
            />
          ))}
        </div>
      ))}
      <button type="button" className={styles.add} onClick={() => onAddItem(list.id)}>
        + Add {list.itemLabel}
      </button>
    </div>
  )
}

/* ── Elements tab group ── */
function ElementGroup({
  title, hint, items, onSetField, onSetHref,
}: { title: string; hint: string; items: OutlineField[] } & Props) {
  if (!items.length) return null
  return (
    <section className={styles.elGroup}>
      <h4>{title}<small>{items.length}</small></h4>
      <p className={styles.elHint}>{hint}</p>
      {items.map((f) => (
        <div className={styles.linkRow} key={f.id}>
          <label className={styles.miniField}>
            <span>Label</span>
            <input value={f.value} onChange={(e) => onSetField(f.id, e.target.value)} />
          </label>
          <label className={styles.miniField}>
            <span>Links to</span>
            <input
              placeholder="https://…"
              value={f.href ?? ''}
              onChange={(e) => onSetHref(f.id, e.target.value)}
            />
          </label>
        </div>
      ))}
    </section>
  )
}

/* ── Design tab — theme controls (posts to canvas runtime) ── */
function DesignPane({ subdomain }: { subdomain: string | null }) {
  const post = (msg: Record<string, unknown>) => {
    document.querySelector('iframe')?.contentWindow?.postMessage(msg, '*')
  }
  const accents = ['#d35234', '#2d8a4f', '#2a6fdb', '#7a5ae0', '#1a1714', '#c9425f']
  const fonts = ['Fraunces / Inter', 'Manrope', 'IBM Plex', 'Space Grotesk']
  const [accent, setAccent] = useState(accents[0])
  const [font, setFont] = useState(fonts[0])
  const [density, setDensity] = useState('regular')
  return (
    <div className={styles.scroll}>
      <p className={styles.paneIntro}>Global look for your page. Changes apply live to the canvas.</p>

      <div className={styles.designBlock}>
        <h4>Accent colour</h4>
        <div className={styles.swatches}>
          {accents.map((c) => (
            <button
              key={c}
              type="button"
              className={styles.swatch}
              data-on={accent === c}
              style={{ background: c }}
              onClick={() => { setAccent(c); post({ type: 'editor:setTheme', accent: c }) }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      <div className={styles.designBlock}>
        <h4>Typography</h4>
        <select value={font} onChange={(e) => { setFont(e.target.value); post({ type: 'editor:setTheme', font: e.target.value }) }}>
          {fonts.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div className={styles.designBlock}>
        <h4>Density</h4>
        <div className={styles.seg}>
          {['compact', 'regular', 'roomy'].map((d) => (
            <button
              key={d}
              type="button"
              data-on={density === d}
              onClick={() => { setDensity(d); post({ type: 'editor:setTheme', density: d }) }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.designNote}>
        Your page is served at <b>{subdomain || 'you.portfolio-cv.online'}</b>. Connect a custom domain anytime from the dashboard.
      </div>
    </div>
  )
}

/* ── Generic field row (text / multiline / image / link) ── */
function Field({
  field, selected, onChange, onHref, onRemove, onImage,
}: {
  field: OutlineField
  selected?: boolean
  onChange: (id: string, v: string) => void
  onHref: (id: string, v: string) => void
  onRemove?: (id: string) => void
  onImage?: (id: string) => void
}) {
  const linky = isLinkKind(field.kind)
  return (
    <div className={styles.field} data-selected={selected}>
      <div className={styles.fieldLabel}>
        <span>{field.label}</span>
        <span className={styles.fieldTools}>
          {field.multiline && <AiImprove value={field.value} onAccept={(v) => onChange(field.id, v)} />}
          {onRemove && (
            <button type="button" className={styles.fieldDel} title="Delete" onClick={() => onRemove(field.id)}>×</button>
          )}
        </span>
      </div>

      {field.kind === 'image' ? (
        <button type="button" className={styles.imgField} onClick={() => onImage?.(field.id)}>
          <span className={styles.imgThumb} style={field.value ? { backgroundImage: `url(${field.value})` } : undefined} />
          <span>{field.value ? 'Replace image' : 'Upload image'}</span>
        </button>
      ) : field.multiline ? (
        <textarea rows={3} value={field.value} onChange={(e) => onChange(field.id, e.target.value)} />
      ) : (
        <input value={field.value} onChange={(e) => onChange(field.id, e.target.value)} />
      )}

      {linky && (
        <input
          className={styles.hrefInput}
          placeholder="https://…"
          value={field.href ?? ''}
          onChange={(e) => onHref(field.id, e.target.value)}
        />
      )}
    </div>
  )
}

function capitalize(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s
}

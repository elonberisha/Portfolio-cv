'use client'

import { useState } from 'react'
import { TEMPLATE_THUMBS, THUMB_MAP } from './LandingThumbs'

type FeaturedTemplate = {
  slug: string
  name: string
  tags: string[]
  url: string
}

const FILTERS = ['all', 'design', 'dev', 'business', 'serif', 'mono', 'minimal', 'warm']

type Card = {
  id: string
  name: string
  tags: string[]
  url: string
  Thumb: () => React.ReactElement
}

type Props = {
  featured?: FeaturedTemplate[]
  templateCount?: number
}

export default function TemplatesSection({ featured, templateCount }: Props) {
  const [filter, setFilter] = useState('all')

  // Prefer DB-driven featured templates; only those with a real Thumb component
  // can render. Fall back to the in-code list if the DB returned nothing.
  const cards: Card[] =
    featured && featured.length > 0
      ? featured
          .filter((t) => THUMB_MAP[t.slug])
          .map((t) => ({
            id: t.slug,
            name: t.name,
            tags: t.tags,
            url: t.url,
            Thumb: THUMB_MAP[t.slug],
          }))
      : TEMPLATE_THUMBS.map((t) => ({
          id: t.id,
          name: t.name,
          tags: t.tags,
          url: t.url,
          Thumb: t.Thumb,
        }))

  const total = templateCount ?? cards.length

  const items = filter === 'all' ? cards : cards.filter((t) => t.tags.includes(filter))
  const track = filter === 'all' ? [...items, ...items] : items

  return (
    <section id="templates" style={{ paddingTop: 96, paddingBottom: 0, maxWidth: 'none', padding: '96px 0 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div className="section-head">
          <div>
            <div className="kicker">{total} templates · 0 lookalikes</div>
            <h2>Pick a vibe. <em>Make it yours.</em></h2>
          </div>
          <div className="meta">
            <span>{cards.length} ready to ship</span>
            <span>updated weekly</span>
          </div>
        </div>
      </div>

      <div className="template-marquee">
        <div className="filter-row" style={{ maxWidth: 1320, margin: '0 auto' }}>
          <span className="label">Filter:</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pill${filter === f ? ' on' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all'
                ? `all · ${cards.length}`
                : `${f} · ${cards.filter((t) => t.tags.includes(f)).length}`}
            </button>
          ))}
        </div>
        <div
          className="track"
          key={filter}
          style={filter !== 'all' ? { animation: 'none', justifyContent: 'flex-start', flexWrap: 'wrap', padding: '12px 32px', maxWidth: 1320, margin: '0 auto' } : {}}
        >
          {track.map((tpl, i) => {
            const Thumb = tpl.Thumb
            const realIndex = i >= items.length ? i - items.length : i
            return (
              <div className="thumb" key={`${tpl.id}-${i}`}>
                <div className="thumb-chrome">
                  <div className="dots"><i></i><i></i><i></i></div>
                  <div className="url">{tpl.url}</div>
                  <span style={{ width: 12 }} />
                </div>
                <div className="thumb-port"><Thumb /></div>
                <div className="thumb-meta">
                  <h4>{tpl.name}</h4>
                  <span className="num">№ {String(realIndex + 1).padStart(2, '0')}</span>
                  <div className="tags">{tpl.tags.map((t) => (<span key={t}>{t}</span>))}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Device = 'desktop' | 'mobile'

export default function PreviewClient({
  slug,
  templateName,
}: {
  slug: string
  templateName: string
}) {
  const [device, setDevice] = useState<Device>('desktop')

  // Lock body scroll and cover Navbar/Footer
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const iframeSrc =
    device === 'mobile'
      ? `/preview.html?id=${slug}&mobile=1`
      : `/preview.html?id=${slug}`

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      background: '#0c0c0e',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* ── Toolbar ───────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 16px', height: 52, flexShrink: 0,
        background: '#18181b',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        zIndex: 10,
      }}>
        {/* Back */}
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,.65)', textDecoration: 'none',
            fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
            padding: '6px 10px', borderRadius: 7,
            border: '1px solid rgba(255,255,255,.1)',
            transition: 'background .15s, color .15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.07)'
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,.65)'
          }}
        >
          ← Dashboard
        </Link>

        {/* Template name */}
        <span style={{
          flex: 1, color: 'rgba(255,255,255,.45)',
          fontSize: 12, fontFamily: 'monospace',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {templateName}
        </span>

        {/* Device toggle */}
        <div style={{
          display: 'flex', gap: 2,
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 8, padding: 3,
        }}>
          {(['desktop', 'mobile'] as Device[]).map(d => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 6, border: 0,
                background: device === d ? 'rgba(255,255,255,.14)' : 'transparent',
                color: device === d ? '#fff' : 'rgba(255,255,255,.45)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'background .15s, color .15s',
              }}
            >
              {d === 'desktop' ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M6 14h4M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="11" height="14" viewBox="0 0 12 16" fill="none">
                  <rect x="1" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="6" cy="13.5" r="0.7" fill="currentColor"/>
                </svg>
              )}
              {d === 'desktop' ? 'Desktop' : 'Mobile'}
            </button>
          ))}
        </div>

        {/* Use template CTA */}
        <Link
          href={`/signup?template=${slug}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: '#d35234', color: '#fff', textDecoration: 'none',
            fontSize: 13, fontWeight: 700, padding: '7px 14px', borderRadius: 7,
            whiteSpace: 'nowrap',
            transition: 'background .15s, transform .12s',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#b8432a'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#d35234'
            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
          }}
        >
          Use this template →
        </Link>
      </div>

      {/* ── Preview area ──────────────────────────────── */}
      {device === 'desktop' ? (
        /* Full-bleed desktop iframe */
        <iframe
          key="desktop"
          src={iframeSrc}
          title={`${templateName} — desktop preview`}
          style={{ flex: 1, border: 0, display: 'block', width: '100%' }}
        />
      ) : (
        /* Centered phone frame */
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px 16px', overflow: 'hidden',
        }}>
          {/* Phone shell */}
          <div style={{
            position: 'relative',
            width: 390, height: 844,
            maxHeight: 'calc(100vh - 100px)',
            borderRadius: 48,
            background: '#1c1c1e',
            boxShadow: '0 0 0 1px rgba(255,255,255,.12), 0 40px 80px rgba(0,0,0,.7), inset 0 0 0 2px #2c2c2e',
            overflow: 'hidden',
          }}>
            {/* Dynamic island */}
            <div style={{
              position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
              width: 120, height: 34, background: '#000',
              borderRadius: 20, zIndex: 10,
            }} />
            {/* iframe inside phone */}
            <iframe
              key="mobile"
              src={iframeSrc}
              title={`${templateName} — mobile preview`}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                border: 0, borderRadius: 48,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './cv.module.css'

type PersonalInfo = {
  firstName?: string
  lastName?: string
  headline?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  nationality?: string
  website?: string
  about?: string
}
type Work = {
  jobTitle?: string
  employer?: string
  city?: string
  country?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
}
type Edu = {
  qualification?: string
  institution?: string
  city?: string
  country?: string
  startDate?: string
  endDate?: string
  description?: string
}
type Lang = { language?: string; mother?: boolean; level?: string }

export type CVData = {
  personalInfo?: PersonalInfo
  workExperience?: Work[]
  education?: Edu[]
  languageSkills?: Lang[]
  digitalSkills?: string
  otherSkills?: string
}

export type CVInitial = {
  source: 'builder' | 'upload' | null
  data: CVData
  fileUrl: string | null
}

const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'native']

export default function CVClient({ initial }: { initial: CVInitial }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'choose' | 'builder' | 'upload'>(
    initial.source === 'builder' ? 'builder' : initial.source === 'upload' ? 'upload' : 'choose',
  )
  const [data, setData] = useState<CVData>(initial.data || {})
  const [fileUrl, setFileUrl] = useState<string | null>(initial.fileUrl)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const pi = data.personalInfo || {}
  const work = data.workExperience || []
  const edu = data.education || []
  const langs = data.languageSkills || []

  function setPI(k: keyof PersonalInfo, v: string) {
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [k]: v } }))
  }
  function setList<T>(key: keyof CVData, idx: number, k: string, v: any) {
    setData((d) => {
      const arr = [...(((d[key] as unknown as T[]) || []) as any[])]
      arr[idx] = { ...arr[idx], [k]: v }
      return { ...d, [key]: arr }
    })
  }
  function addRow(key: keyof CVData, row: any) {
    setData((d) => ({ ...d, [key]: [...(((d[key] as any[]) || [])), row] }))
  }
  function removeRow(key: keyof CVData, idx: number) {
    setData((d) => ({ ...d, [key]: ((d[key] as any[]) || []).filter((_, i) => i !== idx) }))
  }

  async function saveBuilder() {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/cv', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ data }),
      })
      setMsg(res.ok ? 'CV saved.' : 'Could not save. Try again.')
    } catch {
      setMsg('Could not save. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function uploadPdf(file: File) {
    setSaving(true)
    setMsg('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/cv-upload', { method: 'POST', credentials: 'include', body: fd })
      const d = await res.json()
      if (res.ok) {
        setFileUrl(d.url)
        setMode('upload')
        setMsg('CV uploaded.')
      } else {
        setMsg(d.error || 'Upload failed.')
      }
    } catch {
      setMsg('Upload failed.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteCv() {
    setSaving(true)
    try {
      await fetch('/api/cv', { method: 'DELETE', credentials: 'include' })
      setFileUrl(null)
      setMode('choose')
      setMsg('')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className={styles.page}>
      <div className={`${styles.form} ${mode === 'builder' ? styles.formWide : ''}`}>
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}>Step 4 · Your CV</p>
            <h1>Europass CV</h1>
            <p className={styles.lede}>
              Build a Europass-standard CV with our editor, or upload your own PDF.
            </p>
          </div>
          <Link href="/dashboard" className={styles.back}>
            Done → Dashboard
          </Link>
        </header>

        {mode === 'choose' && (
          <div className={styles.choose}>
            <button type="button" className={styles.choiceCard} onClick={() => setMode('builder')}>
              <b>Build Europass CV</b>
              <span>Fill in a structured form. Fully editable anytime.</span>
            </button>
            <button type="button" className={styles.choiceCard} onClick={() => fileRef.current?.click()}>
              <b>Upload a PDF</b>
              <span>Already have a CV? Upload it. Replace or delete only.</span>
            </button>
          </div>
        )}

        {mode === 'upload' && (
          <section className={styles.block}>
            <div className={styles.blockHead}><span className={styles.num}>PDF</span><h2>Uploaded CV</h2></div>
            {fileUrl ? (
              <p className={styles.uploaded}>
                Your CV is uploaded.{' '}
                <a href={fileUrl} target="_blank" rel="noreferrer">View PDF</a>
              </p>
            ) : (
              <p>No file.</p>
            )}
            <div className={styles.rowActions}>
              <button type="button" className={styles.secondary} onClick={() => fileRef.current?.click()}>
                Replace PDF
              </button>
              <button type="button" className={styles.danger} onClick={deleteCv} disabled={saving}>
                Delete
              </button>
            </div>
          </section>
        )}

        {mode === 'builder' && (
          <>
          <div className={styles.builderGrid}>
            <section className={`${styles.block} ${styles.spanAll}`}>
              <div className={styles.blockHead}><span className={styles.num}>01</span><h2>Personal information</h2></div>
              <div className={styles.grid2}>
                <Field label="First name" value={pi.firstName} onChange={(v) => setPI('firstName', v)} />
                <Field label="Last name" value={pi.lastName} onChange={(v) => setPI('lastName', v)} />
                <Field label="Headline" value={pi.headline} onChange={(v) => setPI('headline', v)} />
                <Field label="Email" value={pi.email} onChange={(v) => setPI('email', v)} />
                <Field label="Phone" value={pi.phone} onChange={(v) => setPI('phone', v)} />
                <Field label="Website" value={pi.website} onChange={(v) => setPI('website', v)} />
                <Field label="City" value={pi.city} onChange={(v) => setPI('city', v)} />
                <Field label="Country" value={pi.country} onChange={(v) => setPI('country', v)} />
                <Field label="Date of birth" value={pi.dateOfBirth} onChange={(v) => setPI('dateOfBirth', v)} />
                <Field label="Nationality" value={pi.nationality} onChange={(v) => setPI('nationality', v)} />
              </div>
              <label className={styles.field}>
                <span>About / summary</span>
                <textarea rows={4} value={pi.about || ''} onChange={(e) => setPI('about', e.target.value)} />
              </label>
            </section>

            <section className={`${styles.block} ${styles.spanAll}`}>
              <div className={styles.blockHead}><span className={styles.num}>02</span><h2>Work experience</h2></div>
              {work.map((w, i) => (
                <div key={i} className={styles.cardRow}>
                  <div className={styles.stack}>
                    <div className={styles.grid2}>
                      <Field label="Job title" value={w.jobTitle} onChange={(v) => setList('workExperience', i, 'jobTitle', v)} />
                      <Field label="Employer" value={w.employer} onChange={(v) => setList('workExperience', i, 'employer', v)} />
                      <Field label="Start" value={w.startDate} onChange={(v) => setList('workExperience', i, 'startDate', v)} />
                      <Field label="End" value={w.endDate} onChange={(v) => setList('workExperience', i, 'endDate', v)} />
                    </div>
                    <label className={styles.field}>
                      <span>Description</span>
                      <textarea rows={2} value={w.description || ''} onChange={(e) => setList('workExperience', i, 'description', e.target.value)} />
                    </label>
                  </div>
                  <button type="button" className={styles.remove} onClick={() => removeRow('workExperience', i)}>×</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => addRow('workExperience', {})}>+ Add experience</button>
            </section>

            <section className={styles.block}>
              <div className={styles.blockHead}><span className={styles.num}>03</span><h2>Education & training</h2></div>
              {edu.map((e, i) => (
                <div key={i} className={styles.cardRow}>
                  <div className={styles.stack}>
                    <div className={styles.grid2}>
                      <Field label="Qualification" value={e.qualification} onChange={(v) => setList('education', i, 'qualification', v)} />
                      <Field label="Institution" value={e.institution} onChange={(v) => setList('education', i, 'institution', v)} />
                      <Field label="Start" value={e.startDate} onChange={(v) => setList('education', i, 'startDate', v)} />
                      <Field label="End" value={e.endDate} onChange={(v) => setList('education', i, 'endDate', v)} />
                    </div>
                  </div>
                  <button type="button" className={styles.remove} onClick={() => removeRow('education', i)}>×</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => addRow('education', {})}>+ Add education</button>
            </section>

            <section className={styles.block}>
              <div className={styles.blockHead}><span className={styles.num}>04</span><h2>Languages</h2></div>
              {langs.map((l, i) => (
                <div key={i} className={styles.row}>
                  <input placeholder="Language" value={l.language || ''} onChange={(e) => setList('languageSkills', i, 'language', e.target.value)} />
                  <select value={l.level || ''} onChange={(e) => setList('languageSkills', i, 'level', e.target.value)}>
                    <option value="">Level</option>
                    {LEVELS.map((lv) => <option key={lv} value={lv}>{lv.toUpperCase()}</option>)}
                  </select>
                  <button type="button" className={styles.remove} onClick={() => removeRow('languageSkills', i)}>×</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => addRow('languageSkills', {})}>+ Add language</button>
            </section>

            <section className={styles.block}>
              <div className={styles.blockHead}><span className={styles.num}>05</span><h2>Skills</h2></div>
              <Field label="Digital skills (comma-separated)" value={data.digitalSkills} onChange={(v) => setData((d) => ({ ...d, digitalSkills: v }))} />
              <label className={styles.field}>
                <span>Other skills</span>
                <textarea rows={3} value={data.otherSkills || ''} onChange={(e) => setData((d) => ({ ...d, otherSkills: e.target.value }))} />
              </label>
            </section>
          </div>

            <div className={styles.actions}>
              <button type="button" className={styles.save} onClick={saveBuilder} disabled={saving}>
                {saving ? 'Saving…' : 'Save CV'}
              </button>
              {msg && <span className={styles.msg}>{msg}</span>}
            </div>
          </>
        )}

        {mode !== 'builder' && msg && <p className={styles.msg}>{msg}</p>}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) uploadPdf(f)
          e.target.value = ''
        }}
      />
    </main>
  )
}

function Field({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

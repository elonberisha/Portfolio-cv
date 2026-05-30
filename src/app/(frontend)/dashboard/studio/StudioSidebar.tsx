'use client'

import { useState } from 'react'
import Link from 'next/link'

import styles from './studio.module.css'

const FACULTY_OPTIONS = [
  { value: 'tech', label: 'Tech & Engineering' },
  { value: 'business', label: 'Business & Management' },
  { value: 'law', label: 'Law & Politics' },
  { value: 'medical', label: 'Medical & Healthcare' },
  { value: 'creative', label: 'Creative & Media' },
  { value: 'education', label: 'Education & Social Sciences' },
  { value: 'sports', label: 'Sports' },
  { value: 'agriculture', label: 'Agriculture & Environment' },
]

const LINK_PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'website', label: 'Website' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'other', label: 'Other' },
]

type LinkRow = { platform: string; url: string }
type EduRow = { degree: string; institution: string; startDate: string; endDate: string }
type ProjectRow = { title: string; description: string; liveUrl: string }

export type SidebarInitial = {
  facultyGroup: string
  headline: string
  bio: string
  skills: string
  links: LinkRow[]
  education: EduRow[]
  projects: ProjectRow[]
  published: boolean
}

type Props = {
  initial: SidebarInitial
  status: 'idle' | 'saving' | 'saved'
  templateName: string | null
  // Push a field value onto the live canvas (data-field slots).
  onApplyField: (field: string, value: string) => void
}

type Tab = 'ops' | 'details'

export default function StudioSidebar({ initial, status, templateName, onApplyField }: Props) {
  const [tab, setTab] = useState<Tab>('ops')
  const [facultyGroup, setFacultyGroup] = useState(initial.facultyGroup)
  const [headline, setHeadline] = useState(initial.headline)
  const [bio, setBio] = useState(initial.bio)
  const [skills, setSkills] = useState(initial.skills)
  const [links, setLinks] = useState<LinkRow[]>(initial.links.length ? initial.links : [])
  const [education, setEducation] = useState<EduRow[]>(initial.education)
  const [projects, setProjects] = useState<ProjectRow[]>(initial.projects)
  const [published, setPublished] = useState(initial.published)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function saveDetails() {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          facultyGroup,
          headline,
          bio,
          links,
          education,
          projects,
          skills: skills.split(',').map((s) => s.trim()).filter(Boolean).map((name) => ({ name })),
        }),
      })
      setMsg(res.ok ? 'Saved.' : 'Could not save.')
      // Reflect text fields onto the canvas where slots exist.
      if (res.ok) {
        onApplyField('headline', headline)
        onApplyField('bio', bio)
      }
    } catch {
      setMsg('Could not save.')
    } finally {
      setSaving(false)
    }
  }

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
        <button type="button" className={tab === 'ops' ? styles.tabActive : styles.tab} onClick={() => setTab('ops')}>
          Operations
        </button>
        <button type="button" className={tab === 'details' ? styles.tabActive : styles.tab} onClick={() => setTab('details')}>
          Details
        </button>
      </div>

      <div className={styles.sideScroll}>
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

        {tab === 'details' && (
          <div className={styles.detForm}>
            <section className={styles.detBlock}>
              <h3>Basics</h3>
              <label className={styles.field}>
                <span>Faculty group</span>
                <select value={facultyGroup} onChange={(e) => setFacultyGroup(e.target.value)}>
                  <option value="">Select your field…</option>
                  {FACULTY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
              <label className={styles.field}>
                <span>Headline</span>
                <input value={headline} placeholder="CS student & web developer" onChange={(e) => setHeadline(e.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Short bio</span>
                <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Skills (comma-separated)</span>
                <input value={skills} placeholder="React, Python, Figma…" onChange={(e) => setSkills(e.target.value)} />
              </label>
            </section>

            <section className={styles.detBlock}>
              <h3>Links</h3>
              {links.map((row, i) => (
                <div className={styles.dRow} key={i}>
                  <select value={row.platform} onChange={(e) => setLinks(links.map((r, j) => j === i ? { ...r, platform: e.target.value } : r))}>
                    {LINK_PLATFORMS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <input value={row.url} placeholder="https://…" onChange={(e) => setLinks(links.map((r, j) => j === i ? { ...r, url: e.target.value } : r))} />
                  <button type="button" className={styles.remove} onClick={() => setLinks(links.filter((_, j) => j !== i))}>×</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => setLinks([...links, { platform: 'other', url: '' }])}>+ Add link</button>
            </section>

            <section className={styles.detBlock}>
              <h3>Education</h3>
              {education.map((row, i) => (
                <div className={styles.dCard} key={i}>
                  <input value={row.degree} placeholder="Degree" onChange={(e) => setEducation(education.map((r, j) => j === i ? { ...r, degree: e.target.value } : r))} />
                  <input value={row.institution} placeholder="Institution" onChange={(e) => setEducation(education.map((r, j) => j === i ? { ...r, institution: e.target.value } : r))} />
                  <div className={styles.dGrid2}>
                    <input value={row.startDate} placeholder="Start" onChange={(e) => setEducation(education.map((r, j) => j === i ? { ...r, startDate: e.target.value } : r))} />
                    <input value={row.endDate} placeholder="End" onChange={(e) => setEducation(education.map((r, j) => j === i ? { ...r, endDate: e.target.value } : r))} />
                  </div>
                  <button type="button" className={styles.removeWide} onClick={() => setEducation(education.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => setEducation([...education, { degree: '', institution: '', startDate: '', endDate: '' }])}>+ Add education</button>
            </section>

            <section className={styles.detBlock}>
              <h3>Projects & work</h3>
              {projects.map((row, i) => (
                <div className={styles.dCard} key={i}>
                  <input value={row.title} placeholder="Title" onChange={(e) => setProjects(projects.map((r, j) => j === i ? { ...r, title: e.target.value } : r))} />
                  <textarea rows={2} value={row.description} placeholder="What it is and what you did." onChange={(e) => setProjects(projects.map((r, j) => j === i ? { ...r, description: e.target.value } : r))} />
                  <input value={row.liveUrl} placeholder="Link (optional)" onChange={(e) => setProjects(projects.map((r, j) => j === i ? { ...r, liveUrl: e.target.value } : r))} />
                  <button type="button" className={styles.removeWide} onClick={() => setProjects(projects.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}
              <button type="button" className={styles.add} onClick={() => setProjects([...projects, { title: '', description: '', liveUrl: '' }])}>+ Add project</button>
            </section>

            <div className={styles.detActions}>
              <button type="button" className={styles.saveBtn} onClick={saveDetails} disabled={saving}>
                {saving ? 'Saving…' : 'Save details'}
              </button>
              {msg && <span className={styles.msg}>{msg}</span>}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

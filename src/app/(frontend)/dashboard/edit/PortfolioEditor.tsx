'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './editor.module.css'

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

export type EditorInitial = {
  facultyGroup: string
  headline: string
  bio: string
  links: LinkRow[]
  education: EduRow[]
  skills: string
  projects: ProjectRow[]
}

export default function PortfolioEditor({ initial }: { initial: EditorInitial }) {
  const router = useRouter()
  const [facultyGroup, setFacultyGroup] = useState(initial.facultyGroup)
  const [headline, setHeadline] = useState(initial.headline)
  const [bio, setBio] = useState(initial.bio)
  const [skills, setSkills] = useState(initial.skills)
  const [links, setLinks] = useState<LinkRow[]>(
    initial.links.length ? initial.links : [{ platform: 'linkedin', url: '' }],
  )
  const [education, setEducation] = useState<EduRow[]>(
    initial.education.length ? initial.education : [{ degree: '', institution: '', startDate: '', endDate: '' }],
  )
  const [projects, setProjects] = useState<ProjectRow[]>(
    initial.projects.length ? initial.projects : [{ title: '', description: '', liveUrl: '' }],
  )

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
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
          skills: skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((name) => ({ name })),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setMessage(data.error || 'Could not save. Please try again.')
        return
      }
      setMessage('Saved.')
      router.refresh()
    } catch {
      setMessage('Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={save}>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Portfolio setup</p>
          <h1>Fill in your details.</h1>
          <p className={styles.lede}>
            This is the data that fills your template. You can edit any of it later — nothing is published until
            you choose to.
          </p>
        </div>
        <Link href="/dashboard" className={styles.back}>
          {'<-'} Back to dashboard
        </Link>
      </header>

      {/* Basics */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.num}>01</span>
          <h2>Basics</h2>
        </div>
        <label className={styles.field}>
          <span>Faculty group</span>
          <select value={facultyGroup} onChange={(e) => setFacultyGroup(e.target.value)}>
            <option value="">Select your field…</option>
            {FACULTY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Headline</span>
          <input
            type="text"
            value={headline}
            placeholder="e.g. CS student & web developer"
            onChange={(e) => setHeadline(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>Short bio</span>
          <textarea
            rows={4}
            value={bio}
            placeholder="2–4 sentences about who you are and what you do."
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>Skills</span>
          <input
            type="text"
            value={skills}
            placeholder="Comma-separated: React, Python, Figma…"
            onChange={(e) => setSkills(e.target.value)}
          />
        </label>
      </section>

      {/* Links */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.num}>02</span>
          <h2>Links</h2>
        </div>
        {links.map((row, i) => (
          <div className={styles.row} key={i}>
            <select
              value={row.platform}
              onChange={(e) => setLinks(links.map((r, j) => (j === i ? { ...r, platform: e.target.value } : r)))}
            >
              {LINK_PLATFORMS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={row.url}
              placeholder="https://…"
              onChange={(e) => setLinks(links.map((r, j) => (j === i ? { ...r, url: e.target.value } : r)))}
            />
            <button type="button" className={styles.remove} onClick={() => setLinks(links.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button type="button" className={styles.add} onClick={() => setLinks([...links, { platform: 'other', url: '' }])}>
          + Add link
        </button>
      </section>

      {/* Education */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.num}>03</span>
          <h2>Education</h2>
        </div>
        {education.map((row, i) => (
          <div className={styles.cardRow} key={i}>
            <div className={styles.grid2}>
              <input
                type="text"
                value={row.degree}
                placeholder="Degree (e.g. BSc Computer Science)"
                onChange={(e) => setEducation(education.map((r, j) => (j === i ? { ...r, degree: e.target.value } : r)))}
              />
              <input
                type="text"
                value={row.institution}
                placeholder="Institution"
                onChange={(e) =>
                  setEducation(education.map((r, j) => (j === i ? { ...r, institution: e.target.value } : r)))
                }
              />
              <input
                type="text"
                value={row.startDate}
                placeholder="Start (e.g. 2022)"
                onChange={(e) =>
                  setEducation(education.map((r, j) => (j === i ? { ...r, startDate: e.target.value } : r)))
                }
              />
              <input
                type="text"
                value={row.endDate}
                placeholder="End (e.g. 2026 or Present)"
                onChange={(e) => setEducation(education.map((r, j) => (j === i ? { ...r, endDate: e.target.value } : r)))}
              />
            </div>
            <button
              type="button"
              className={styles.remove}
              onClick={() => setEducation(education.filter((_, j) => j !== i))}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.add}
          onClick={() => setEducation([...education, { degree: '', institution: '', startDate: '', endDate: '' }])}
        >
          + Add education
        </button>
      </section>

      {/* Projects */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.num}>04</span>
          <h2>Projects & work</h2>
        </div>
        {projects.map((row, i) => (
          <div className={styles.cardRow} key={i}>
            <div className={styles.stack}>
              <input
                type="text"
                value={row.title}
                placeholder="Title"
                onChange={(e) => setProjects(projects.map((r, j) => (j === i ? { ...r, title: e.target.value } : r)))}
              />
              <textarea
                rows={2}
                value={row.description}
                placeholder="What it is and what you did."
                onChange={(e) =>
                  setProjects(projects.map((r, j) => (j === i ? { ...r, description: e.target.value } : r)))
                }
              />
              <input
                type="text"
                value={row.liveUrl}
                placeholder="Link (optional)"
                onChange={(e) => setProjects(projects.map((r, j) => (j === i ? { ...r, liveUrl: e.target.value } : r)))}
              />
            </div>
            <button type="button" className={styles.remove} onClick={() => setProjects(projects.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.add}
          onClick={() => setProjects([...projects, { title: '', description: '', liveUrl: '' }])}
        >
          + Add project
        </button>
      </section>

      <div className={styles.actions}>
        <button type="submit" className={styles.save} disabled={saving}>
          {saving ? 'Saving…' : 'Save details'}
        </button>
        {message && <span className={styles.msg}>{message}</span>}
      </div>
    </form>
  )
}

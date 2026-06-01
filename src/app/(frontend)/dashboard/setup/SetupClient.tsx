'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import AiImprove from '@/components/AiImprove'
import styles from './setup.module.css'

// ── Types ──────────────────────────────────────────────────
type ExpRow = { role: string; company: string; type: string; startDate: string; endDate: string; current: boolean; description: string }
type EduRow = { degree: string; institution: string; startDate: string; endDate: string; gpa: string }
type ProjRow = { title: string; description: string; techStack: string; liveUrl: string; sourceUrl: string }
type PubRow  = { title: string; venue: string; url: string }
type ResRow  = { title: string; lab: string; description: string }
type PortRow = { title: string; category: string; description: string; externalUrl: string }
type CaseRow = { title: string; context: string; challenge: string; result: string }
type CompRow = { event: string; location: string; result: string }
type TeachRow = { course: string; institution: string; role: string }
type FieldRow = { site: string; cropOrSpecies: string; methodology: string }
type LinkRow  = { platform: string; url: string; label: string }
type LangRow  = { language: string; proficiency: string }

type Initial = {
  firstName: string; lastName: string; email: string
  headline: string; bio: string; phone: string; location: string; website: string
  experience: ExpRow[]; education: EduRow[]; projects: ProjRow[]
  publications: PubRow[]; research: ResRow[]; portfolioItems: PortRow[]
  caseStudies: CaseRow[]; competitions: CompRow[]; teaching: TeachRow[]; fieldwork: FieldRow[]
  skills: { name: string }[]; links: LinkRow[]; languages: LangRow[]
}

type Props = { initial: Initial; facultyGroup: string }

// ── Helpers ────────────────────────────────────────────────
function newExp(): ExpRow    { return { role: '', company: '', type: '', startDate: '', endDate: '', current: false, description: '' } }
function newEdu(): EduRow    { return { degree: '', institution: '', startDate: '', endDate: '', gpa: '' } }
function newProj(): ProjRow  { return { title: '', description: '', techStack: '', liveUrl: '', sourceUrl: '' } }
function newPub(): PubRow    { return { title: '', venue: '', url: '' } }
function newRes(): ResRow    { return { title: '', lab: '', description: '' } }
function newPort(): PortRow  { return { title: '', category: '', description: '', externalUrl: '' } }
function newCase(): CaseRow  { return { title: '', context: '', challenge: '', result: '' } }
function newComp(): CompRow  { return { event: '', location: '', result: '' } }
function newTeach(): TeachRow { return { course: '', institution: '', role: '' } }
function newField(): FieldRow { return { site: '', cropOrSpecies: '', methodology: '' } }
function newLink(): LinkRow  { return { platform: 'linkedin', url: '', label: '' } }
function newLang(): LangRow  { return { language: '', proficiency: 'b2' } }

const PLATFORM_OPTS = ['linkedin','github','website','twitter','dribbble','behance','youtube','other']
const PROFICIENCY_OPTS = ['native','c2','c1','b2','b1','a2','a1']
const EXP_TYPE_OPTS = ['fulltime','parttime','internship','freelance','volunteer']
const CREATIVE_CATS = ['visual','audio','video','writing','mixed']

// Labels for step 4 per faculty
function step4Meta(faculty: string) {
  switch (faculty) {
    case 'law':        return { heading: 'Publications', addLabel: 'Add publication' }
    case 'medical':    return { heading: 'Research & Rotations', addLabel: 'Add research entry' }
    case 'creative':   return { heading: 'Portfolio pieces', addLabel: 'Add piece' }
    case 'business':   return { heading: 'Case studies', addLabel: 'Add case study' }
    case 'sports':     return { heading: 'Competitions', addLabel: 'Add competition' }
    case 'education':  return { heading: 'Teaching & Conferences', addLabel: 'Add entry' }
    case 'agriculture': return { heading: 'Fieldwork', addLabel: 'Add site' }
    default:           return { heading: 'Projects & work', addLabel: 'Add project' }
  }
}

const STEP_LABELS = ['About you', 'Experience', 'Education', 'Work & projects', 'Skills & links']

// ── Component ─────────────────────────────────────────────
export default function SetupClient({ initial, facultyGroup }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Step 1 — personal
  const [firstName, setFirstName] = useState(initial.firstName)
  const [lastName,  setLastName]  = useState(initial.lastName)
  const [headline,  setHeadline]  = useState(initial.headline)
  const [bio,       setBio]       = useState(initial.bio)
  const [phone,     setPhone]     = useState(initial.phone)
  const [location,  setLocation]  = useState(initial.location)
  const [website,   setWebsite]   = useState(initial.website)

  // Step 2 — experience
  const [experience, setExperience] = useState<ExpRow[]>(
    initial.experience.length ? initial.experience.map((e: any) => ({
      role: e.role ?? '', company: e.company ?? '', type: e.type ?? '',
      startDate: e.startDate ? new Date(e.startDate).toISOString().slice(0,10) : '',
      endDate: e.endDate ? new Date(e.endDate).toISOString().slice(0,10) : '',
      current: !e.endDate, description: e.description ?? '',
    })) : []
  )

  // Step 3 — education
  const [education, setEducation] = useState<EduRow[]>(
    initial.education.length ? initial.education.map((e: any) => ({
      degree: e.degree ?? '', institution: e.institution ?? '',
      startDate: e.startDate ?? '', endDate: e.endDate ?? '', gpa: e.gpa ?? '',
    })) : []
  )

  // Step 4 — faculty-specific
  const [projects,      setProjects]      = useState<ProjRow[]>(initial.projects.map((p: any) => ({ title: p.title??'', description: p.description??'', techStack: p.techStack??'', liveUrl: p.liveUrl??'', sourceUrl: p.sourceUrl??'' })))
  const [publications,  setPublications]  = useState<PubRow[]>(initial.publications.map((p: any) => ({ title: p.title??'', venue: p.venue??'', url: p.url??'' })))
  const [research,      setResearch]      = useState<ResRow[]>(initial.research.map((r: any) => ({ title: r.title??'', lab: r.lab??'', description: r.description??'' })))
  const [portfolioItems,setPortfolioItems]= useState<PortRow[]>(initial.portfolioItems.map((p: any) => ({ title: p.title??'', category: p.category??'', description: p.description??'', externalUrl: p.externalUrl??'' })))
  const [caseStudies,   setCaseStudies]   = useState<CaseRow[]>(initial.caseStudies.map((c: any) => ({ title: c.title??'', context: c.context??'', challenge: c.challenge??'', result: c.result??'' })))
  const [competitions,  setCompetitions]  = useState<CompRow[]>(initial.competitions.map((c: any) => ({ event: c.event??'', location: c.location??'', result: c.result??'' })))
  const [teaching,      setTeaching]      = useState<TeachRow[]>(initial.teaching.map((t: any) => ({ course: t.course??'', institution: t.institution??'', role: t.role??'' })))
  const [fieldwork,     setFieldwork]     = useState<FieldRow[]>(initial.fieldwork.map((f: any) => ({ site: f.site??'', cropOrSpecies: f.cropOrSpecies??'', methodology: f.methodology??'' })))

  // Step 5 — skills + links + languages
  const [skillInput, setSkillInput] = useState('')
  const [skills,     setSkills]     = useState<string[]>(initial.skills.map((s: any) => s.name ?? '').filter(Boolean))
  const [links,      setLinks]      = useState<LinkRow[]>(initial.links.length ? initial.links.map((l: any) => ({ platform: l.platform??'linkedin', url: l.url??'', label: l.label??'' })) : [newLink()])
  const [languages,  setLanguages]  = useState<LangRow[]>(initial.languages.length ? initial.languages.map((l: any) => ({ language: l.language??'', proficiency: l.proficiency??'b2' })) : [])

  const s4 = step4Meta(facultyGroup)

  // ── Row helpers ───────────────────────────────────────────
  function updRow<T>(setter: React.Dispatch<React.SetStateAction<T[]>>, i: number, patch: Partial<T>) {
    setter((prev) => prev.map((row, idx) => idx === i ? { ...row, ...patch } : row) as T[])
  }

  // ── Save & navigate ───────────────────────────────────────
  const save = useCallback(async (payload: object, isFinal = false) => {
    setSaving(true)
    try {
      await fetch('/api/portfolio-setup', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...payload, ...(isFinal ? { final: true } : {}) }),
      })
    } catch { /* ignore */ } finally {
      setSaving(false)
    }
  }, [])

  function step1Payload() {
    return { firstName, lastName, headline, bio, phone, location, website }
  }
  function step2Payload() {
    return { experience }
  }
  function step3Payload() {
    return { education }
  }
  function step4Payload() {
    switch (facultyGroup) {
      case 'law':         return { publications }
      case 'medical':     return { research }
      case 'creative':    return { portfolioItems }
      case 'business':    return { caseStudies }
      case 'sports':      return { competitions }
      case 'education':   return { teaching }
      case 'agriculture': return { fieldwork }
      default:            return { projects }
    }
  }
  function step5Payload() {
    return {
      skills: skills.map((name) => ({ name })),
      links,
      languages,
    }
  }

  async function handleNext() {
    if (step === 1) { await save(step1Payload()); setStep(2) }
    else if (step === 2) { await save(step2Payload()); setStep(3) }
    else if (step === 3) { await save(step3Payload()); setStep(4) }
    else if (step === 4) { await save(step4Payload()); setStep(5) }
    else if (step === 5) { await save(step5Payload(), true); router.push('/dashboard/studio') }
  }

  async function handleSkip() {
    if (step < 5) setStep(step + 1)
    else router.push('/dashboard/studio')
  }

  function goToDashboard() { router.push('/dashboard') }

  // ── Progress ──────────────────────────────────────────────
  const pct = ((step - 1) / 4) * 100

  // ── Skill chip input ──────────────────────────────────────
  function addSkill() {
    const v = skillInput.trim()
    if (v && !skills.includes(v)) setSkills((p) => [...p, v])
    setSkillInput('')
  }

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className={styles.shell} data-theme={theme}>
      {/* ── Progress bar ────────────────────────────── */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      {/* ── Top header ──────────────────────────────── */}
      <header className={styles.topbar}>
        <div className={styles.tbLeft}>
          <span className={styles.tbKicker}>Studio</span>
          <span className={styles.tbDivider}>›</span>
          <span className={styles.tbTitle}>Portfolio setup</span>
        </div>
        <div className={styles.tbRight}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setTheme((t) => t === 'light' ? 'dark' : 'light')}
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '☽' : '☀'}
          </button>
          <button type="button" className={styles.skipAll} onClick={goToDashboard}>
            &larr; Dashboard
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* ── Step nav (desktop sidebar) ───────────── */}
        <nav className={styles.stepNav} aria-label="Setup steps">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <div
                key={n}
                className={styles.stepNavItem}
                data-done={done}
                data-active={active}
              >
                <span className={styles.stepDot}>{done ? '✓' : n}</span>
                <span className={styles.stepNavLabel}>{label}</span>
              </div>
            )
          })}
        </nav>

        {/* ── Main form ────────────────────────────── */}
        <main className={styles.main}>
          <div className={styles.stepIndicator} aria-live="polite">
            Step {step} of 5 — {STEP_LABELS[step - 1]}
          </div>

          {/* ── Step 1: About ─────────────────────── */}
          {step === 1 && (
            <div className={styles.formCard}>
              <h2 className={styles.stepHeading}>Tell us about you</h2>
              <p className={styles.stepDesc}>Fill in at least your name or headline — the studio uses this to personalise your template. Steps 2–5 are optional and can be done later.</p>

              <div className={styles.row2}>
                <Field label="First name">
                  <input className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Elon" />
                </Field>
                <Field label="Last name">
                  <input className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Berisha" />
                </Field>
              </div>

              <Field label="Headline / tagline">
                <input className={styles.input} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="CS student & web developer" />
              </Field>

              <Field label="About / bio">
                <textarea className={styles.textarea} rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short paragraph about who you are, what you study, and what you're passionate about." />
                <AiImprove value={bio} onAccept={setBio} />
              </Field>

              <div className={styles.row2}>
                <Field label="Email">
                  <input className={styles.input} type="email" value={initial.email} readOnly placeholder="you@uni.edu" />
                </Field>
                <Field label="Phone">
                  <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+383 44 000 000" />
                </Field>
              </div>

              <div className={styles.row2}>
                <Field label="Location">
                  <input className={styles.input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Pristina, Kosovo" />
                </Field>
                <Field label="Website">
                  <input className={styles.input} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yoursite.com" />
                </Field>
              </div>
            </div>
          )}

          {/* ── Step 2: Experience ────────────────── */}
          {step === 2 && (
            <div className={styles.formCard}>
              <h2 className={styles.stepHeading}>Work experience</h2>
              <p className={styles.stepDesc}>Add jobs, internships, freelance work, or volunteering. You can add more later in the studio.</p>

              {experience.map((row, i) => (
                <div key={i} className={styles.arrayCard}>
                  <div className={styles.arrayCardHeader}>
                    <span className={styles.arrayCardTitle}>{row.role || row.company || `Experience ${i + 1}`}</span>
                    <button type="button" className={styles.removeBtn} onClick={() => setExperience((p) => p.filter((_, idx) => idx !== i))} aria-label="Remove">✕</button>
                  </div>

                  <div className={styles.row2}>
                    <Field label="Role / title">
                      <input className={styles.input} value={row.role} onChange={(e) => updRow(setExperience, i, { role: e.target.value })} placeholder="Software Engineer" />
                    </Field>
                    <Field label="Company">
                      <input className={styles.input} value={row.company} onChange={(e) => updRow(setExperience, i, { company: e.target.value })} placeholder="Acme Corp" />
                    </Field>
                  </div>

                  <div className={styles.row3}>
                    <Field label="Type">
                      <select className={styles.select} value={row.type} onChange={(e) => updRow(setExperience, i, { type: e.target.value })}>
                        <option value="">Select…</option>
                        {EXP_TYPE_OPTS.map((o) => <option key={o} value={o}>{o[0].toUpperCase() + o.slice(1)}</option>)}
                      </select>
                    </Field>
                    <Field label="Start date">
                      <input className={styles.input} type="month" value={row.startDate?.slice(0, 7)} onChange={(e) => updRow(setExperience, i, { startDate: e.target.value })} />
                    </Field>
                    <Field label="End date">
                      <input className={styles.input} type="month" value={row.endDate?.slice(0, 7)} disabled={row.current} onChange={(e) => updRow(setExperience, i, { endDate: e.target.value })} />
                      <label className={styles.checkLabel}>
                        <input type="checkbox" checked={row.current} onChange={(e) => updRow(setExperience, i, { current: e.target.checked, endDate: e.target.checked ? '' : row.endDate })} />
                        Current
                      </label>
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea className={styles.textarea} rows={3} value={row.description} onChange={(e) => updRow(setExperience, i, { description: e.target.value })} placeholder="What did you do? What did you achieve?" />
                    <AiImprove value={row.description} onAccept={(v) => updRow(setExperience, i, { description: v })} />
                  </Field>
                </div>
              ))}

              <button type="button" className={styles.addBtn} onClick={() => setExperience((p) => [...p, newExp()])}>
                + Add experience
              </button>
            </div>
          )}

          {/* ── Step 3: Education ─────────────────── */}
          {step === 3 && (
            <div className={styles.formCard}>
              <h2 className={styles.stepHeading}>Education</h2>
              <p className={styles.stepDesc}>Your degree(s), institutions, and dates.</p>

              {education.map((row, i) => (
                <div key={i} className={styles.arrayCard}>
                  <div className={styles.arrayCardHeader}>
                    <span className={styles.arrayCardTitle}>{row.degree || row.institution || `Education ${i + 1}`}</span>
                    <button type="button" className={styles.removeBtn} onClick={() => setEducation((p) => p.filter((_, idx) => idx !== i))} aria-label="Remove">✕</button>
                  </div>

                  <div className={styles.row2}>
                    <Field label="Degree / qualification">
                      <input className={styles.input} value={row.degree} onChange={(e) => updRow(setEducation, i, { degree: e.target.value })} placeholder="BSc Computer Science" />
                    </Field>
                    <Field label="Institution">
                      <input className={styles.input} value={row.institution} onChange={(e) => updRow(setEducation, i, { institution: e.target.value })} placeholder="University of Pristina" />
                    </Field>
                  </div>

                  <div className={styles.row3}>
                    <Field label="Start">
                      <input className={styles.input} value={row.startDate} onChange={(e) => updRow(setEducation, i, { startDate: e.target.value })} placeholder="2021" />
                    </Field>
                    <Field label="End / expected">
                      <input className={styles.input} value={row.endDate} onChange={(e) => updRow(setEducation, i, { endDate: e.target.value })} placeholder="2025" />
                    </Field>
                    <Field label="GPA (optional)">
                      <input className={styles.input} value={row.gpa} onChange={(e) => updRow(setEducation, i, { gpa: e.target.value })} placeholder="9.5 / 10" />
                    </Field>
                  </div>
                </div>
              ))}

              <button type="button" className={styles.addBtn} onClick={() => setEducation((p) => [...p, newEdu()])}>
                + Add education
              </button>
            </div>
          )}

          {/* ── Step 4: Faculty-specific ──────────── */}
          {step === 4 && (
            <div className={styles.formCard}>
              <h2 className={styles.stepHeading}>{s4.heading}</h2>
              <p className={styles.stepDesc}>Showcase your best work. Add more later in the studio.</p>

              {/* tech / default — projects */}
              {(facultyGroup === 'tech' || !['law','medical','creative','business','sports','education','agriculture'].includes(facultyGroup)) && (
                <>
                  {projects.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.title || `Project ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setProjects((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <Field label="Project title">
                        <input className={styles.input} value={row.title} onChange={(e) => updRow(setProjects, i, { title: e.target.value })} placeholder="Personal portfolio" />
                      </Field>
                      <Field label="Description">
                        <textarea className={styles.textarea} rows={3} value={row.description} onChange={(e) => updRow(setProjects, i, { description: e.target.value })} placeholder="What does it do? What problem does it solve?" />
                        <AiImprove value={row.description} onAccept={(v) => updRow(setProjects, i, { description: v })} />
                      </Field>
                      <div className={styles.row2}>
                        <Field label="Tech stack">
                          <input className={styles.input} value={row.techStack} onChange={(e) => updRow(setProjects, i, { techStack: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
                        </Field>
                        <Field label="Live URL">
                          <input className={styles.input} value={row.liveUrl} onChange={(e) => updRow(setProjects, i, { liveUrl: e.target.value })} placeholder="https://…" />
                        </Field>
                      </div>
                      <Field label="Source code URL">
                        <input className={styles.input} value={row.sourceUrl} onChange={(e) => updRow(setProjects, i, { sourceUrl: e.target.value })} placeholder="https://github.com/…" />
                      </Field>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setProjects((p) => [...p, newProj()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* law — publications */}
              {facultyGroup === 'law' && (
                <>
                  {publications.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.title || `Publication ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setPublications((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <Field label="Title">
                        <input className={styles.input} value={row.title} onChange={(e) => updRow(setPublications, i, { title: e.target.value })} />
                      </Field>
                      <div className={styles.row2}>
                        <Field label="Venue / journal">
                          <input className={styles.input} value={row.venue} onChange={(e) => updRow(setPublications, i, { venue: e.target.value })} />
                        </Field>
                        <Field label="URL">
                          <input className={styles.input} value={row.url} onChange={(e) => updRow(setPublications, i, { url: e.target.value })} />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setPublications((p) => [...p, newPub()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* medical — research */}
              {facultyGroup === 'medical' && (
                <>
                  {research.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.title || `Research ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setResearch((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <div className={styles.row2}>
                        <Field label="Title / project">
                          <input className={styles.input} value={row.title} onChange={(e) => updRow(setResearch, i, { title: e.target.value })} />
                        </Field>
                        <Field label="Lab / PI">
                          <input className={styles.input} value={row.lab} onChange={(e) => updRow(setResearch, i, { lab: e.target.value })} />
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea className={styles.textarea} rows={3} value={row.description} onChange={(e) => updRow(setResearch, i, { description: e.target.value })} />
                        <AiImprove value={row.description} onAccept={(v) => updRow(setResearch, i, { description: v })} />
                      </Field>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setResearch((p) => [...p, newRes()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* creative — portfolio pieces */}
              {facultyGroup === 'creative' && (
                <>
                  {portfolioItems.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.title || `Piece ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setPortfolioItems((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <div className={styles.row2}>
                        <Field label="Title">
                          <input className={styles.input} value={row.title} onChange={(e) => updRow(setPortfolioItems, i, { title: e.target.value })} />
                        </Field>
                        <Field label="Category">
                          <select className={styles.select} value={row.category} onChange={(e) => updRow(setPortfolioItems, i, { category: e.target.value })}>
                            <option value="">Select…</option>
                            {CREATIVE_CATS.map((c) => <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea className={styles.textarea} rows={2} value={row.description} onChange={(e) => updRow(setPortfolioItems, i, { description: e.target.value })} />
                        <AiImprove value={row.description} onAccept={(v) => updRow(setPortfolioItems, i, { description: v })} />
                      </Field>
                      <Field label="External URL">
                        <input className={styles.input} value={row.externalUrl} onChange={(e) => updRow(setPortfolioItems, i, { externalUrl: e.target.value })} />
                      </Field>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setPortfolioItems((p) => [...p, newPort()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* business — case studies */}
              {facultyGroup === 'business' && (
                <>
                  {caseStudies.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.title || `Case study ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setCaseStudies((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <Field label="Title">
                        <input className={styles.input} value={row.title} onChange={(e) => updRow(setCaseStudies, i, { title: e.target.value })} />
                      </Field>
                      <div className={styles.row2}>
                        <Field label="Context">
                          <input className={styles.input} value={row.context} onChange={(e) => updRow(setCaseStudies, i, { context: e.target.value })} />
                        </Field>
                        <Field label="Result">
                          <input className={styles.input} value={row.result} onChange={(e) => updRow(setCaseStudies, i, { result: e.target.value })} />
                        </Field>
                      </div>
                      <Field label="Challenge">
                        <textarea className={styles.textarea} rows={2} value={row.challenge} onChange={(e) => updRow(setCaseStudies, i, { challenge: e.target.value })} />
                        <AiImprove value={row.challenge} onAccept={(v) => updRow(setCaseStudies, i, { challenge: v })} />
                      </Field>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setCaseStudies((p) => [...p, newCase()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* sports — competitions */}
              {facultyGroup === 'sports' && (
                <>
                  {competitions.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.event || `Competition ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setCompetitions((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <div className={styles.row3}>
                        <Field label="Event">
                          <input className={styles.input} value={row.event} onChange={(e) => updRow(setCompetitions, i, { event: e.target.value })} />
                        </Field>
                        <Field label="Location">
                          <input className={styles.input} value={row.location} onChange={(e) => updRow(setCompetitions, i, { location: e.target.value })} />
                        </Field>
                        <Field label="Result">
                          <input className={styles.input} value={row.result} onChange={(e) => updRow(setCompetitions, i, { result: e.target.value })} />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setCompetitions((p) => [...p, newComp()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* education faculty — teaching */}
              {facultyGroup === 'education' && (
                <>
                  {teaching.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.course || `Entry ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setTeaching((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <div className={styles.row3}>
                        <Field label="Course / title">
                          <input className={styles.input} value={row.course} onChange={(e) => updRow(setTeaching, i, { course: e.target.value })} />
                        </Field>
                        <Field label="Institution">
                          <input className={styles.input} value={row.institution} onChange={(e) => updRow(setTeaching, i, { institution: e.target.value })} />
                        </Field>
                        <Field label="Role">
                          <input className={styles.input} value={row.role} onChange={(e) => updRow(setTeaching, i, { role: e.target.value })} placeholder="TA, Lecturer…" />
                        </Field>
                      </div>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setTeaching((p) => [...p, newTeach()])}>+ {s4.addLabel}</button>
                </>
              )}

              {/* agriculture — fieldwork */}
              {facultyGroup === 'agriculture' && (
                <>
                  {fieldwork.map((row, i) => (
                    <div key={i} className={styles.arrayCard}>
                      <div className={styles.arrayCardHeader}>
                        <span className={styles.arrayCardTitle}>{row.site || `Site ${i + 1}`}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => setFieldwork((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                      </div>
                      <div className={styles.row2}>
                        <Field label="Site">
                          <input className={styles.input} value={row.site} onChange={(e) => updRow(setFieldwork, i, { site: e.target.value })} />
                        </Field>
                        <Field label="Crop / species">
                          <input className={styles.input} value={row.cropOrSpecies} onChange={(e) => updRow(setFieldwork, i, { cropOrSpecies: e.target.value })} />
                        </Field>
                      </div>
                      <Field label="Methodology">
                        <textarea className={styles.textarea} rows={2} value={row.methodology} onChange={(e) => updRow(setFieldwork, i, { methodology: e.target.value })} />
                        <AiImprove value={row.methodology} onAccept={(v) => updRow(setFieldwork, i, { methodology: v })} />
                      </Field>
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => setFieldwork((p) => [...p, newField()])}>+ {s4.addLabel}</button>
                </>
              )}
            </div>
          )}

          {/* ── Step 5: Skills & links ────────────── */}
          {step === 5 && (
            <div className={styles.formCard}>
              <h2 className={styles.stepHeading}>Skills, links & languages</h2>
              <p className={styles.stepDesc}>Add your skills as chips, social links, and languages you speak.</p>

              {/* Skills */}
              <Field label="Skills">
                <div className={styles.chipInput}>
                  <input
                    className={styles.input}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
                    placeholder="Type a skill and press Enter…"
                  />
                  <button type="button" className={styles.chipAdd} onClick={addSkill}>Add</button>
                </div>
                <div className={styles.chips}>
                  {skills.map((sk) => (
                    <span key={sk} className={styles.chip}>
                      {sk}
                      <button type="button" className={styles.chipRemove} onClick={() => setSkills((p) => p.filter((s) => s !== sk))} aria-label={`Remove ${sk}`}>✕</button>
                    </span>
                  ))}
                </div>
              </Field>

              {/* Links */}
              <div className={styles.sectionDivider}>Social & links</div>
              {links.map((row, i) => (
                <div key={i} className={styles.linkRow}>
                  <select className={styles.select} value={row.platform} onChange={(e) => updRow(setLinks, i, { platform: e.target.value })}>
                    {PLATFORM_OPTS.map((p) => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}
                  </select>
                  <input className={styles.input} value={row.url} onChange={(e) => updRow(setLinks, i, { url: e.target.value })} placeholder="https://…" />
                  <button type="button" className={styles.removeBtn} onClick={() => setLinks((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => setLinks((p) => [...p, newLink()])}>+ Add link</button>

              {/* Languages */}
              <div className={styles.sectionDivider}>Languages</div>
              {languages.map((row, i) => (
                <div key={i} className={styles.linkRow}>
                  <input className={styles.input} value={row.language} onChange={(e) => updRow(setLanguages, i, { language: e.target.value })} placeholder="Albanian, English…" />
                  <select className={styles.select} value={row.proficiency} onChange={(e) => updRow(setLanguages, i, { proficiency: e.target.value })}>
                    {PROFICIENCY_OPTS.map((p) => <option key={p} value={p}>{p === 'native' ? 'Native' : p.toUpperCase()}</option>)}
                  </select>
                  <button type="button" className={styles.removeBtn} onClick={() => setLanguages((p) => p.filter((_, idx) => idx !== i))}>✕</button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => setLanguages((p) => [...p, newLang()])}>+ Add language</button>
            </div>
          )}

          {/* ── Navigation ───────────────────────── */}
          <div className={styles.navRow}>
            {step > 1 && (
              <button type="button" className={styles.prevBtn} onClick={() => setStep(step - 1)} disabled={saving}>
                &larr; Back
              </button>
            )}
            {step > 1 && (
              <button type="button" className={styles.skipBtn} onClick={handleSkip} disabled={saving}>
                Skip for now &rarr;
              </button>
            )}
            <button type="button" className={styles.nextBtn} onClick={handleNext} disabled={saving}>
              {saving ? 'Saving…' : step === 5 ? 'Finish & go to studio ✦' : step === 1 ? 'Save & continue →' : 'Save & next →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

// ── Tiny helper component ──────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}

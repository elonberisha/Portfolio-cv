/**
 * Shared-profile sync helpers.
 *
 * The student's content lives in two places that must stay consistent:
 *  - the CV builder data (cvs.data — Europass shape)
 *  - the portfolio's structured fields (portfolios.headline/bio/education/…)
 *
 * These functions translate between the two shapes so editing one surface
 * carries the data over to the other. The mapping is intentionally
 * non-destructive: only fields that actually have content are emitted, so a
 * blank CV never wipes existing portfolio data.
 */

// ── CV builder shape (mirrors CVData in the CV builder client) ──────────
export type CvPersonal = {
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
export type CvWork = {
  jobTitle?: string
  employer?: string
  city?: string
  country?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
}
export type CvEdu = {
  qualification?: string
  institution?: string
  city?: string
  country?: string
  startDate?: string
  endDate?: string
  description?: string
}
export type CvLang = { language?: string; mother?: boolean; level?: string }
export type CvData = {
  personalInfo?: CvPersonal
  workExperience?: CvWork[]
  education?: CvEdu[]
  languageSkills?: CvLang[]
  digitalSkills?: string
  otherSkills?: string
}

// ── Portfolio structured fields we keep in sync ────────────────────────
export type PortfolioEdu = { degree: string; institution: string; startDate?: string; endDate?: string }
export type PortfolioExp = {
  company: string
  role: string
  startDate?: string
  endDate?: string
  description?: string
}
export type PortfolioLang = { language: string; proficiency?: string }
export type PortfolioSyncFields = {
  headline?: string
  bio?: string
  education?: PortfolioEdu[]
  experience?: PortfolioExp[]
  languages?: PortfolioLang[]
}

// Reads headline, bio, education[], experience[], languages[]. Kept loose so a
// Payload portfolio document is assignable without casting.
export type PortfolioLike = Record<string, any> | null | undefined

export type UserLike = Record<string, any> | null | undefined

// proficiency values accepted by both the portfolio schema and the CV builder
const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'native']

function s(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function asArray(v: unknown): any[] {
  return Array.isArray(v) ? v : []
}

// portfolio.experience.start/endDate are `date` typed — only emit a value the
// database will accept, otherwise drop it (free-text like "Present" → omitted).
function toIsoDate(v?: string): string | undefined {
  const t = s(v)
  if (!t) return undefined
  const d = new Date(t)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

// stored ISO date → plain text for the free-text CV inputs (YYYY-MM-DD)
function dateText(v?: string | null): string {
  const t = s(v)
  if (!t) return ''
  const d = new Date(t)
  return isNaN(d.getTime()) ? t : d.toISOString().slice(0, 10)
}

/**
 * Map saved CV builder data → the portfolio's structured fields. Returns only
 * the keys that carry content (so it never overwrites portfolio data with
 * blanks), and filters out rows missing the portfolio's required subfields.
 */
export function cvDataToPortfolioFields(data: CvData | null | undefined): PortfolioSyncFields {
  const d = data || {}
  const pi = d.personalInfo || {}
  const out: PortfolioSyncFields = {}

  const headline = s(pi.headline)
  if (headline) out.headline = headline

  const bio = s(pi.about)
  if (bio) out.bio = bio

  const education = asArray(d.education)
    .filter((e) => s(e.qualification) && s(e.institution))
    .map((e) => ({
      degree: s(e.qualification),
      institution: s(e.institution),
      startDate: s(e.startDate) || undefined,
      endDate: s(e.endDate) || undefined,
    }))
  if (education.length) out.education = education

  const experience = asArray(d.workExperience)
    .filter((w) => s(w.jobTitle) && s(w.employer))
    .map((w) => ({
      company: s(w.employer),
      role: s(w.jobTitle),
      startDate: toIsoDate(w.startDate),
      endDate: w.current ? undefined : toIsoDate(w.endDate),
      description: s(w.description) || undefined,
    }))
  if (experience.length) out.experience = experience

  const languages = asArray(d.languageSkills)
    .filter((l) => s(l.language))
    .map((l) => {
      const lvl = s(l.level).toLowerCase()
      const proficiency = l.mother ? 'native' : LEVELS.includes(lvl) ? lvl : undefined
      return proficiency ? { language: s(l.language), proficiency } : { language: s(l.language) }
    })
  if (languages.length) out.languages = languages

  return out
}

/**
 * Map the portfolio's structured fields (+ user account) → CV builder data.
 * Used to prefill the builder when a student has no CV yet, so the two stay
 * symmetric.
 */
export function portfolioToCvData(portfolio: PortfolioLike, user: UserLike): CvData {
  const p = portfolio || {}
  return {
    personalInfo: {
      firstName: s(user?.firstName),
      lastName: s(user?.lastName),
      headline: s(p.headline),
      email: s(user?.email),
      about: s(p.bio),
    },
    workExperience: asArray(p.experience).map((e) => ({
      jobTitle: s(e.role),
      employer: s(e.company),
      startDate: dateText(e.startDate),
      endDate: dateText(e.endDate),
      description: s(e.description),
    })),
    education: asArray(p.education).map((e) => ({
      qualification: s(e.degree),
      institution: s(e.institution),
      startDate: s(e.startDate),
      endDate: s(e.endDate),
    })),
    languageSkills: asArray(p.languages).map((l) => ({
      language: s(l.language),
      level: l.proficiency === 'native' ? '' : s(l.proficiency),
      mother: l.proficiency === 'native',
    })),
  }
}

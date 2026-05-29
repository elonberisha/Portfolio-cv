import 'server-only'

import { getPayload } from 'payload'
import config from '../payload/payload.config'

export type RecentDeploy = {
  subdomain: string
  url: string
  ago: string
}

export type FeaturedTemplate = {
  slug: string
  name: string
  tags: string[]
  url: string
}

export type FeaturedStudent = {
  name: string
  subdomain: string
  url: string
  templateSlug: string | null
  university: string | null
  facultyGroup: string | null
}

export type LandingData = {
  studentCount: number
  schoolCount: number
  countryCount: number
  templateCount: number
  activeSlugs: string[]
  featuredTemplates: FeaturedTemplate[]
  recentDeploys: RecentDeploy[]
  featuredStudents: FeaturedStudent[]
}

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/**
 * Single source of truth for everything the landing page renders from the DB.
 * Everything degrades gracefully: empty collections yield zero counts / empty
 * arrays, so the landing page never crashes on a fresh database.
 */
export async function getLandingData(): Promise<LandingData> {
  try {
    const payload = await getPayload({ config })

    const [students, schools, templates, publishedPortfolios] = await Promise.all([
      payload.count({
        collection: 'users',
        where: { role: { equals: 'student' } },
        overrideAccess: true,
      }),
      payload.find({
        collection: 'universities',
        where: { status: { equals: 'active' } },
        limit: 1000,
        depth: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'templates',
        where: { active: { equals: true } },
        limit: 1000,
        sort: 'sortOrder',
        depth: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'portfolios',
        where: { published: { equals: true } },
        limit: 12,
        sort: '-updatedAt',
        depth: 2,
        overrideAccess: true,
      }),
    ])

    const countries = new Set<string>()
    for (const uni of schools.docs) {
      if (uni.country) countries.add(String(uni.country).trim().toLowerCase())
    }

    const activeSlugs = templates.docs.map((t) => String(t.slug))

    const featuredTemplates: FeaturedTemplate[] = templates.docs
      .filter((t) => t.featuredOnLanding)
      .map((t) => ({
        slug: String(t.slug),
        name: String(t.name),
        tags: t.landingTags
          ? String(t.landingTags)
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        url: t.landingUrl ? String(t.landingUrl) : `${t.slug}.portfolio-cv.online`,
      }))

    const recentDeploys: RecentDeploy[] = []
    const featuredStudents: FeaturedStudent[] = []

    for (const p of publishedPortfolios.docs) {
      const owner = typeof p.owner === 'object' && p.owner ? p.owner : null
      const subdomain = owner?.subdomain ? String(owner.subdomain) : null
      if (!subdomain) continue

      const url = `${subdomain}.portfolio-cv.online`
      recentDeploys.push({
        subdomain,
        url,
        ago: relativeTime(new Date(p.updatedAt as string)),
      })

      const uni =
        owner && typeof owner.university === 'object' && owner.university
          ? String(owner.university.name)
          : null
      const tpl = typeof p.template === 'object' && p.template ? String(p.template.slug) : null
      const fullName = owner
        ? [owner.firstName, owner.lastName].filter(Boolean).join(' ').trim() || subdomain
        : subdomain

      featuredStudents.push({
        name: fullName,
        subdomain,
        url,
        templateSlug: tpl,
        university: uni,
        facultyGroup: owner?.facultyGroup ? String(owner.facultyGroup) : null,
      })
    }

    return {
      studentCount: students.totalDocs,
      schoolCount: schools.totalDocs,
      countryCount: countries.size,
      templateCount: templates.totalDocs,
      activeSlugs,
      featuredTemplates,
      recentDeploys: recentDeploys.slice(0, 8),
      featuredStudents: featuredStudents.slice(0, 6),
    }
  } catch {
    return {
      studentCount: 0,
      schoolCount: 0,
      countryCount: 0,
      templateCount: 0,
      activeSlugs: [],
      featuredTemplates: [],
      recentDeploys: [],
      featuredStudents: [],
    }
  }
}

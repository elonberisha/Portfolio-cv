import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { cvDataToPortfolioFields } from '@/lib/profileSync'

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}
function toIso(v: unknown): string | undefined {
  const t = str(v)
  if (!t) return undefined
  const d = new Date(t)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  // --- 1. User fields (personal step) ---
  const userUpdate: Record<string, unknown> = {}
  if (str(body.firstName)) userUpdate.firstName = str(body.firstName)
  if (str(body.lastName)) userUpdate.lastName = str(body.lastName)
  if (Object.keys(userUpdate).length) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: userUpdate,
      overrideAccess: true,
    })
  }

  // --- 2. Portfolio fields ---
  const portfolioData: Record<string, unknown> = {}

  if ('headline' in body) portfolioData.headline = str(body.headline)
  if ('bio' in body) portfolioData.bio = str(body.bio)
  // Flag that step 1 was submitted (even if all fields empty)
  const isStep1 = 'headline' in body || 'bio' in body
  if (isStep1) portfolioData.setupDone = true
  if ('email' in body) portfolioData.contactEmail = str(body.email)
  if ('phone' in body) portfolioData.phone = str(body.phone)
  if ('location' in body) portfolioData.location = str(body.location)
  if ('website' in body) portfolioData.website = str(body.website)

  if ('experience' in body) {
    portfolioData.experience = (body.experience ?? [])
      .filter((e: any) => str(e.role) && str(e.company))
      .map((e: any) => ({
        role: str(e.role),
        company: str(e.company),
        type: str(e.type) || undefined,
        startDate: toIso(e.startDate),
        endDate: e.current ? undefined : toIso(e.endDate),
        description: str(e.description) || undefined,
      }))
  }

  if ('education' in body) {
    portfolioData.education = (body.education ?? [])
      .filter((e: any) => str(e.degree) && str(e.institution))
      .map((e: any) => ({
        degree: str(e.degree),
        institution: str(e.institution),
        startDate: str(e.startDate) || undefined,
        endDate: str(e.endDate) || undefined,
        gpa: str(e.gpa) || undefined,
      }))
  }

  if ('projects' in body) {
    portfolioData.projects = (body.projects ?? [])
      .filter((p: any) => str(p.title))
      .map((p: any) => ({
        title: str(p.title),
        description: str(p.description) || undefined,
        techStack: str(p.techStack) || undefined,
        liveUrl: str(p.liveUrl) || undefined,
        sourceUrl: str(p.sourceUrl) || undefined,
      }))
  }

  // Faculty-specific step 4 arrays
  if ('publications' in body) {
    portfolioData.publications = (body.publications ?? [])
      .filter((p: any) => str(p.title))
      .map((p: any) => ({ title: str(p.title), venue: str(p.venue) || undefined, url: str(p.url) || undefined }))
  }
  if ('research' in body) {
    portfolioData.research = (body.research ?? [])
      .filter((r: any) => str(r.title))
      .map((r: any) => ({ title: str(r.title), lab: str(r.lab) || undefined, description: str(r.description) || undefined }))
  }
  if ('portfolioItems' in body) {
    portfolioData.portfolioItems = (body.portfolioItems ?? [])
      .filter((p: any) => str(p.title))
      .map((p: any) => ({ title: str(p.title), category: str(p.category) || undefined, description: str(p.description) || undefined, externalUrl: str(p.externalUrl) || undefined }))
  }
  if ('caseStudies' in body) {
    portfolioData.caseStudies = (body.caseStudies ?? [])
      .filter((c: any) => str(c.title))
      .map((c: any) => ({ title: str(c.title), context: str(c.context) || undefined, challenge: str(c.challenge) || undefined, result: str(c.result) || undefined }))
  }
  if ('competitions' in body) {
    portfolioData.competitions = (body.competitions ?? [])
      .filter((c: any) => str(c.event))
      .map((c: any) => ({ event: str(c.event), location: str(c.location) || undefined, result: str(c.result) || undefined }))
  }
  if ('teaching' in body) {
    portfolioData.teaching = (body.teaching ?? [])
      .filter((t: any) => str(t.course))
      .map((t: any) => ({ course: str(t.course), institution: str(t.institution) || undefined, role: str(t.role) || undefined }))
  }
  if ('fieldwork' in body) {
    portfolioData.fieldwork = (body.fieldwork ?? [])
      .filter((f: any) => str(f.site))
      .map((f: any) => ({ site: str(f.site), cropOrSpecies: str(f.cropOrSpecies) || undefined, methodology: str(f.methodology) || undefined }))
  }

  if ('skills' in body) {
    portfolioData.skills = (body.skills ?? [])
      .filter((s: any) => str(s.name))
      .map((s: any) => ({ name: str(s.name) }))
  }

  if ('links' in body) {
    portfolioData.links = (body.links ?? [])
      .filter((l: any) => str(l.url))
      .map((l: any) => ({ platform: str(l.platform) || 'other', url: str(l.url), label: str(l.label) || undefined }))
  }

  if ('languages' in body) {
    portfolioData.languages = (body.languages ?? [])
      .filter((l: any) => str(l.language))
      .map((l: any) => ({ language: str(l.language), proficiency: str(l.proficiency) || undefined }))
  }

  // Find or create portfolio
  const existing = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })
  const portfolio = existing.docs[0]

  // First time step 1 is saved: wipe the template snapshot so the studio
  // loads a fresh template and injects the form data without the old demo HTML
  // getting in the way. The auto-save will create a new snapshot with real data.
  if (isStep1 && !(portfolio as any)?.setupDone) {
    portfolioData.pageHtml = null
    portfolioData.templateSnapshotAt = null
  }

  if (portfolio) {
    await payload.update({
      collection: 'portfolios',
      id: portfolio.id,
      data: portfolioData,
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'portfolios',
      data: { owner: user.id, published: false, ...portfolioData },
      overrideAccess: true,
    })
  }

  // On final step: mark onboardingComplete + sync to CV
  if (body.final) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { onboardingComplete: true },
      overrideAccess: true,
    })

    // Sync portfolio -> CV so the CV builder is pre-filled too
    const updatedPortfolio = existing.docs[0]
      ? await payload.findByID({ collection: 'portfolios', id: existing.docs[0].id, overrideAccess: true })
      : null

    if (updatedPortfolio) {
      const cvFields = cvDataToPortfolioFields({
        personalInfo: {
          firstName: str((user as any).firstName),
          lastName: str((user as any).lastName),
          headline: str(updatedPortfolio.headline),
          email: str((user as any).email),
          about: str(updatedPortfolio.bio),
        },
        workExperience: ((updatedPortfolio.experience as any[]) ?? []).map((e: any) => ({
          jobTitle: str(e.role),
          employer: str(e.company),
          startDate: e.startDate ? new Date(e.startDate).toISOString().slice(0, 10) : '',
          endDate: e.endDate ? new Date(e.endDate).toISOString().slice(0, 10) : '',
          description: str(e.description),
        })),
        education: ((updatedPortfolio.education as any[]) ?? []).map((e: any) => ({
          qualification: str(e.degree),
          institution: str(e.institution),
          startDate: str(e.startDate),
          endDate: str(e.endDate),
        })),
      })
      // Update or create CV doc
      const existingCvs = await payload.find({
        collection: 'cvs',
        where: { owner: { equals: user.id } },
        limit: 1,
        overrideAccess: true,
      })
      if (existingCvs.docs[0]) {
        await payload.update({
          collection: 'cvs',
          id: existingCvs.docs[0].id,
          data: { data: cvFields as any },
          overrideAccess: true,
        })
      }
    }
  }

  return NextResponse.json({ ok: true })
}

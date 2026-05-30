import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'

const FACULTY_GROUPS = [
  'tech',
  'business',
  'law',
  'medical',
  'creative',
  'education',
  'sports',
  'agriculture',
] as const

type Incoming = {
  facultyGroup?: string
  headline?: string
  bio?: string
  published?: boolean
  links?: { platform?: string; url?: string; label?: string }[]
  education?: { degree?: string; institution?: string; startDate?: string; endDate?: string }[]
  skills?: { name?: string }[]
  projects?: { title?: string; description?: string; liveUrl?: string }[]
}

function str(v: unknown) {
  return typeof v === 'string' ? v.trim() : ''
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as Incoming | null
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  // Faculty group lives on the user, not the portfolio.
  const facultyGroup = str(body.facultyGroup)
  if (facultyGroup && (FACULTY_GROUPS as readonly string[]).includes(facultyGroup)) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { facultyGroup: facultyGroup as (typeof FACULTY_GROUPS)[number] },
      overrideAccess: true,
    })
  }

  // Only touch keys that are actually present so partial saves (e.g. just
  // toggling `published`) don't wipe other fields.
  const data: Record<string, unknown> = {}
  if ('headline' in body) data.headline = str(body.headline)
  if ('bio' in body) data.bio = str(body.bio)
  if (typeof body.published === 'boolean') data.published = body.published
  if ('links' in body) {
    data.links = (body.links ?? [])
      .filter((l) => str(l.url))
      .map((l) => ({ platform: str(l.platform) || 'other', url: str(l.url), label: str(l.label) }))
  }
  if ('education' in body) {
    data.education = (body.education ?? [])
      .filter((e) => str(e.degree) || str(e.institution))
      .map((e) => ({
        degree: str(e.degree),
        institution: str(e.institution),
        startDate: str(e.startDate) || undefined,
        endDate: str(e.endDate) || undefined,
      }))
  }
  if ('skills' in body) {
    data.skills = (body.skills ?? []).filter((s) => str(s.name)).map((s) => ({ name: str(s.name) }))
  }
  if ('projects' in body) {
    data.projects = (body.projects ?? [])
      .filter((p) => str(p.title))
      .map((p) => ({ title: str(p.title), description: str(p.description), liveUrl: str(p.liveUrl) }))
  }

  const existing = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })

  const portfolio = existing.docs[0]

  if (portfolio) {
    await payload.update({
      collection: 'portfolios',
      id: portfolio.id,
      data,
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'portfolios',
      data: { owner: user.id, published: false, ...data },
      overrideAccess: true,
    })
  }

  return NextResponse.json({ ok: true })
}

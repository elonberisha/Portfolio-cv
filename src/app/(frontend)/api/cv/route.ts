import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { cvDataToPortfolioFields, type CvData } from '@/lib/profileSync'

async function findCv(payload: any, userId: string | number) {
  const res = await payload.find({
    collection: 'cvs',
    where: { owner: { equals: userId } },
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] || null
}

// Mirror the saved CV data into the student's portfolio structured fields so
// the two surfaces stay in sync (and the data survives a template switch).
// Non-fatal: the CV is already saved regardless of whether this succeeds.
async function syncToPortfolio(payload: any, userId: string | number, data: CvData) {
  const fields = cvDataToPortfolioFields(data)
  if (Object.keys(fields).length === 0) return

  const existing = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: userId } },
    limit: 1,
    overrideAccess: true,
  })
  const portfolio = existing.docs[0]

  if (portfolio) {
    await payload.update({
      collection: 'portfolios',
      id: portfolio.id,
      data: fields,
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'portfolios',
      data: { owner: userId, published: false, ...fields },
      overrideAccess: true,
    })
  }
}

// PATCH /api/cv — save the Europass builder data for the current user.
export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as { data?: unknown } | null
  if (!body || typeof body.data !== 'object') {
    return NextResponse.json({ error: 'Missing data.' }, { status: 400 })
  }

  const payload = await getPayload({ config })
  const existing = await findCv(payload, user.id)

  if (existing) {
    await payload.update({
      collection: 'cvs',
      id: existing.id,
      data: { source: 'builder', data: body.data },
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'cvs',
      data: { owner: user.id, source: 'builder', data: body.data },
      overrideAccess: true,
    })
  }

  // Carry the structured data over to the portfolio. Never let a sync hiccup
  // fail the CV save the student just made.
  try {
    await syncToPortfolio(payload, user.id, body.data as CvData)
  } catch (err) {
    console.error('CV → portfolio sync failed:', err)
  }

  // Finishing the CV step completes onboarding.
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { onboardingComplete: true },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}

// DELETE /api/cv — remove the current user's CV (built or uploaded).
export async function DELETE() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })

  const payload = await getPayload({ config })
  const existing = await findCv(payload, user.id)
  if (existing) {
    await payload.delete({ collection: 'cvs', id: existing.id, overrideAccess: true })
  }
  return NextResponse.json({ ok: true })
}

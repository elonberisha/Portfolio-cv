import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'

async function findCv(payload: any, userId: string | number) {
  const res = await payload.find({
    collection: 'cvs',
    where: { owner: { equals: userId } },
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] || null
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

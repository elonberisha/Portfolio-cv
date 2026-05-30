import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { sanitizeHtml } from '@/lib/sanitizeHtml'

// PATCH /api/portfolio-page — persist the studio-edited page HTML for the
// current user's portfolio. Always sanitized server-side before storing.
export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as { pageHtml?: string } | null
  if (!body || typeof body.pageHtml !== 'string') {
    return NextResponse.json({ error: 'Missing pageHtml.' }, { status: 400 })
  }

  const clean = sanitizeHtml(body.pageHtml)
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })

  const portfolio = existing.docs[0]
  if (!portfolio) {
    return NextResponse.json({ error: 'No portfolio to update.' }, { status: 404 })
  }

  await payload.update({
    collection: 'portfolios',
    id: portfolio.id,
    data: { pageHtml: clean, templateSnapshotAt: portfolio.templateSnapshotAt || new Date().toISOString() },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}

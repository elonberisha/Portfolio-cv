import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'

// POST /api/cv-upload — accept a PDF, store it in Media, and point the user's
// CV at it with source 'upload' (replace/delete only on the frontend).
export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
  }
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed.' }, { status: 400 })
  }

  const payload = await getPayload({ config })
  const buffer = Buffer.from(await file.arrayBuffer())

  const media = await payload.create({
    collection: 'media',
    data: { alt: `CV — ${user.email}`, owner: user.id },
    file: { data: buffer, mimetype: file.type, name: file.name, size: buffer.length },
    overrideAccess: true,
  })

  const existing = await payload.find({
    collection: 'cvs',
    where: { owner: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })
  const cv = existing.docs[0]

  if (cv) {
    await payload.update({
      collection: 'cvs',
      id: cv.id,
      data: { source: 'upload', file: media.id },
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'cvs',
      data: { owner: user.id, source: 'upload', file: media.id },
      overrideAccess: true,
    })
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { onboardingComplete: true },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true, url: (media as any).url })
}

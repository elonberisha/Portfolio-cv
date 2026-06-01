import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { getTemplateBySlug, TEMPLATE_CATALOG } from '@/lib/templateCatalog'
import { snapshotTemplateHtml } from '@/lib/templateSnapshot'

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Please sign up or sign in first.' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as { slug?: string } | null
  const slug = body?.slug || ''
  const templateConfig = getTemplateBySlug(slug)

  if (!templateConfig) {
    return NextResponse.json({ error: 'Template not found.' }, { status: 404 })
  }

  const payload = await getPayload({ config })

  const existingTemplates = await payload.find({
    collection: 'templates',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  const template =
    existingTemplates.docs[0] ||
    (await payload.create({
      collection: 'templates',
      data: {
        name: templateConfig.name,
        slug: templateConfig.slug,
        description: templateConfig.description,
        compatibleGroups: templateConfig.groups,
        componentName: templateConfig.componentName,
        sortOrder: TEMPLATE_CATALOG.findIndex((item) => item.slug === slug),
        active: true,
      },
      overrideAccess: true,
    }))

  const existingPortfolios = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })

  const portfolio = existingPortfolios.docs[0]

  // Snapshot the chosen template's rendered HTML so the studio can edit it.
  // Fails soft (empty string) if headless rendering isn't available.
  const pageHtml = await snapshotTemplateHtml(templateConfig.slug)
  const snapshotData = pageHtml
    ? { pageHtml, templateSnapshotAt: new Date().toISOString() }
    : {}

  if (portfolio) {
    await payload.update({
      collection: 'portfolios',
      id: portfolio.id,
      data: { template: template.id, ...snapshotData },
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'portfolios',
      data: {
        owner: user.id,
        template: template.id,
        published: false,
        ...snapshotData,
      },
      overrideAccess: true,
    })
  }

  return NextResponse.json({
    ok: true,
    redirect: '/dashboard/setup',
    template: {
      id: template.id,
      slug: templateConfig.slug,
      name: templateConfig.name,
    },
  })
}

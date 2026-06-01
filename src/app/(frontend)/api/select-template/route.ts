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

  // Save template association immediately — no snapshot yet, so redirect is instant.
  let portfolioId: string | number
  if (portfolio) {
    await payload.update({
      collection: 'portfolios',
      id: portfolio.id,
      // Clear stale pageHtml when the user switches templates.
      data: { template: template.id, pageHtml: null, templateSnapshotAt: null },
      overrideAccess: true,
    })
    portfolioId = portfolio.id
  } else {
    const created = await payload.create({
      collection: 'portfolios',
      data: { owner: user.id, template: template.id, published: false },
      overrideAccess: true,
    })
    portfolioId = created.id
  }

  // Fire snapshot in background — does NOT block the redirect.
  // If puppeteer is unavailable it returns '' and nothing is written.
  void snapshotTemplateHtml(templateConfig.slug).then(async (pageHtml) => {
    if (!pageHtml) return
    try {
      await payload.update({
        collection: 'portfolios',
        id: portfolioId,
        data: { pageHtml, templateSnapshotAt: new Date().toISOString() },
        overrideAccess: true,
      })
    } catch {
      // Best-effort — studio live-iframe fallback handles the no-snapshot case.
    }
  })

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

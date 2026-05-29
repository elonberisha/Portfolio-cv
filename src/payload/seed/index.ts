import type { Payload } from 'payload'

import { TEMPLATE_CATALOG } from '../../lib/templateCatalog'
import { LANDING_TEMPLATE_MAP } from '../../lib/landingTemplates'

/**
 * Idempotent database seed, run from Payload `onInit`.
 *
 *  1. Seeds the real Kosovo universities (only if the collection is empty), so
 *     the landing-page "schools / countries" stats are real from day one.
 *  2. Upserts the in-code template catalog into the `templates` collection so
 *     the DB mirrors the code. Admins can then toggle active / featured /
 *     ordering, and the landing page + gallery read straight from the DB.
 *
 * Safe to run on every boot: nothing is duplicated, existing admin edits to
 * sortOrder / active / featured flags are preserved (we only fill in the
 * code-owned fields and never override management toggles after creation).
 */

const KOSOVO_UNIVERSITIES: Array<{
  name: string
  city: string
  website: string
  type: 'university' | 'college' | 'vocational' | 'academy' | 'other'
  domains: string[]
}> = [
  { name: 'Universiteti i Prishtinës "Hasan Prishtina"', city: 'Prishtinë', website: 'https://uni-pr.edu', type: 'university', domains: ['uni-pr.edu', 'student.uni-pr.edu'] },
  { name: 'Universiteti i Prizrenit "Ukshin Hoti"', city: 'Prizren', website: 'https://uni-prizren.com', type: 'university', domains: ['uni-prizren.com'] },
  { name: 'Universiteti i Pejës "Haxhi Zeka"', city: 'Pejë', website: 'https://unhz.eu', type: 'university', domains: ['unhz.eu'] },
  { name: 'Universiteti i Gjakovës "Fehmi Agani"', city: 'Gjakovë', website: 'https://uni-gjk.org', type: 'university', domains: ['uni-gjk.org'] },
  { name: 'Universiteti i Mitrovicës "Isa Boletini"', city: 'Mitrovicë', website: 'https://umib.net', type: 'university', domains: ['umib.net'] },
  { name: 'Universiteti i Gjilanit "Kadri Zeka"', city: 'Gjilan', website: 'https://uni-gjilan.net', type: 'university', domains: ['uni-gjilan.net'] },
  { name: 'Universiteti i Shkencave të Aplikuara në Ferizaj', city: 'Ferizaj', website: 'https://ushaf.net', type: 'university', domains: ['ushaf.net'] },
  { name: 'UBT — University for Business and Technology', city: 'Prishtinë', website: 'https://ubt-uni.net', type: 'university', domains: ['ubt-uni.net'] },
  { name: 'Kolegji AAB', city: 'Prishtinë', website: 'https://aab-edu.net', type: 'college', domains: ['aab-edu.net'] },
  { name: 'RIT Kosovo (A.U.K)', city: 'Prishtinë', website: 'https://rit.edu/kosovo', type: 'university', domains: ['auk.org', 'rit.edu'] },
  { name: 'Kolegji Universum', city: 'Prishtinë', website: 'https://universum-ks.org', type: 'college', domains: ['universum-ks.org'] },
  { name: 'Kolegji Riinvest', city: 'Prishtinë', website: 'https://riinvest.net', type: 'college', domains: ['riinvest.net'] },
  { name: 'Kolegji Heimerer', city: 'Prishtinë', website: 'https://kolegji-heimerer.eu', type: 'college', domains: ['kolegji-heimerer.eu'] },
  { name: 'Akademia e Shkencave dhe Arteve të Kosovës', city: 'Prishtinë', website: 'https://ashak.org', type: 'academy', domains: ['ashak.org'] },
]

async function seedUniversities(payload: Payload): Promise<void> {
  const existing = await payload.count({ collection: 'universities' })
  if (existing.totalDocs > 0) {
    return
  }

  for (const uni of KOSOVO_UNIVERSITIES) {
    await payload.create({
      collection: 'universities',
      data: {
        name: uni.name,
        country: 'Kosovo',
        city: uni.city,
        website: uni.website,
        type: uni.type,
        emailDomains: uni.domains.map((domain) => ({ domain })),
        status: 'active',
      },
      overrideAccess: true,
    })
  }

  payload.logger.info(`[seed] Created ${KOSOVO_UNIVERSITIES.length} universities`)
}

async function seedTemplates(payload: Payload): Promise<void> {
  let created = 0

  for (let i = 0; i < TEMPLATE_CATALOG.length; i++) {
    const tpl = TEMPLATE_CATALOG[i]
    const landing = LANDING_TEMPLATE_MAP[tpl.slug]

    const existing = await payload.find({
      collection: 'templates',
      where: { slug: { equals: tpl.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const codeFields = {
      name: tpl.name,
      description: tpl.description,
      compatibleGroups: tpl.groups,
      componentName: tpl.componentName,
      tone: tpl.tone,
    }

    if (existing.docs[0]) {
      // Refresh code-owned fields only; preserve admin toggles & ordering.
      await payload.update({
        collection: 'templates',
        id: existing.docs[0].id,
        data: codeFields,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'templates',
        data: {
          ...codeFields,
          slug: tpl.slug,
          sortOrder: i,
          active: true,
          featuredOnLanding: Boolean(landing),
          landingTags: landing ? landing.tags.join(', ') : undefined,
          landingUrl: landing ? landing.url : undefined,
        },
        overrideAccess: true,
      })
      created++
    }
  }

  if (created > 0) {
    payload.logger.info(`[seed] Created ${created} templates`)
  }

  // Prune DB templates that no longer exist in the code catalog, so the DB
  // always mirrors code (e.g. removed test templates disappear everywhere).
  const codeSlugs = new Set(TEMPLATE_CATALOG.map((tpl) => tpl.slug))
  const all = await payload.find({
    collection: 'templates',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  let removed = 0
  for (const doc of all.docs) {
    if (!codeSlugs.has(String(doc.slug))) {
      await payload.delete({ collection: 'templates', id: doc.id, overrideAccess: true })
      removed++
    }
  }

  if (removed > 0) {
    payload.logger.info(`[seed] Removed ${removed} stale templates`)
  }
}

export async function seedDatabase(payload: Payload): Promise<void> {
  try {
    await seedUniversities(payload)
    await seedTemplates(payload)
  } catch (err) {
    payload.logger.error({ err }, '[seed] Failed to seed database')
  }
}

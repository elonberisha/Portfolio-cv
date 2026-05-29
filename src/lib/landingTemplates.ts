/**
 * Landing-page metadata for the 25 templates that have a real <Thumb /> preview
 * component in `src/components/landing/LandingThumbs.tsx`.
 *
 * This is the single source of truth for which templates are featured in the
 * landing marquee, their filter tags, and the sample subdomain shown in the
 * browser chrome. The seed script (`src/payload/seed`) reads this to populate
 * the `featuredOnLanding`, `landingTags`, and `landingUrl` fields on the
 * `templates` collection, so the landing page can render straight from the DB.
 *
 * To feature a new template on the landing page: add its <Thumb /> to
 * LandingThumbs.tsx and an entry here keyed by the template slug.
 */

export type LandingTemplateMeta = {
  slug: string
  tags: string[]
  url: string
}

export const LANDING_TEMPLATES: LandingTemplateMeta[] = [
  { slug: 'terminal', tags: ['dev', 'mono'], url: 'jordan.portfolio-cv.online' },
  { slug: 'editorial', tags: ['design', 'serif'], url: 'lina.portfolio-cv.online' },
  { slug: 'brutalist', tags: ['dev', 'raw'], url: 'jordan.dev' },
  { slug: 'y2k', tags: ['design', 'retro'], url: 'lina_marc.geocities' },
  { slug: 'swiss', tags: ['business', 'grid'], url: 'amara.okonkwo.com' },
  { slug: 'playful', tags: ['design', 'warm'], url: 'lina.studio' },
  { slug: '3d', tags: ['dev', 'depth'], url: 'jpark.computer' },
  { slug: 'notebook', tags: ['personal', 'warm'], url: 'amara.notes' },
  { slug: 'newspaper', tags: ['business', 'print'], url: 'amara.times' },
  { slug: 'corporate', tags: ['dev', 'clean'], url: 'jordanpark.portfolio-cv.online' },
  { slug: 'boarding', tags: ['dev', 'ticket'], url: 'folio.air/jordan' },
  { slug: 'museum', tags: ['design', 'serif'], url: 'galleria/lina' },
  { slug: 'tcg', tags: ['dev', 'holo'], url: 'folio.tcg/jordan' },
  { slug: 'manifesto', tags: ['design', 'type'], url: 'lina.manifesto' },
  { slug: 'atlas', tags: ['business', 'map'], url: 'atlas/amara' },
  { slug: 'receipt', tags: ['business', 'mono'], url: 'folio.mart/amara' },
  { slug: 'library', tags: ['design', 'archive'], url: 'library/lina' },
  { slug: 'poster', tags: ['design', 'riso'], url: 'lina.tour/26' },
  { slug: 'finder', tags: ['dev', 'os'], url: '~/folio/jordan' },
  { slug: 'botanical', tags: ['business', 'archive'], url: 'herbarium/amara' },
  { slug: 'resume', tags: ['business', 'cv'], url: 'amara.cv' },
  { slug: 'bento', tags: ['design', 'modular'], url: 'lina.cards' },
  { slug: 'notion', tags: ['business', 'doc'], url: 'amara.notion.site' },
  { slug: 'spare', tags: ['design', 'minimal'], url: 'lina.studio' },
  { slug: 'blog', tags: ['dev', 'blog'], url: 'jpark.dev' },
]

export const LANDING_TEMPLATE_MAP: Record<string, LandingTemplateMeta> =
  Object.fromEntries(LANDING_TEMPLATES.map((t) => [t.slug, t]))

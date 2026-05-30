/* Template catalog metadata — id/name/tags/url for the 25 demo templates.
   Thumbnails are served as real images from /template-thumbs/*.webp. */

export type TemplateThumbnail = {
  id: string
  name: string
  tags: string[]
  url: string
}

export const TEMPLATE_THUMBS: TemplateThumbnail[] = [
  { id: 'terminal',  name: 'Terminal',         tags: ['dev', 'mono'],         url: 'jordan.portfolio-cv.online' },
  { id: 'editorial', name: 'Editorial',        tags: ['design', 'serif'],     url: 'lina.portfolio-cv.online' },
  { id: 'brutalist', name: 'Brutalist',        tags: ['dev', 'raw'],          url: 'jordan.dev' },
  { id: 'y2k',       name: 'Y2K',              tags: ['design', 'retro'],     url: 'lina_marc.geocities' },
  { id: 'swiss',     name: 'Swiss Grid',       tags: ['business', 'grid'],    url: 'amara.okonkwo.com' },
  { id: 'playful',   name: 'Playful',          tags: ['design', 'warm'],      url: 'lina.studio' },
  { id: '3d',        name: 'Experimental',     tags: ['dev', 'depth'],        url: 'jpark.computer' },
  { id: 'notebook',  name: 'Notebook',         tags: ['personal', 'warm'],    url: 'amara.notes' },
  { id: 'newspaper', name: 'Newspaper',        tags: ['business', 'print'],   url: 'amara.times' },
  { id: 'corporate', name: 'Corporate',        tags: ['dev', 'clean'],        url: 'jordanpark.portfolio-cv.online' },
  { id: 'boarding',  name: 'Boarding Pass',    tags: ['dev', 'ticket'],       url: 'folio.air/jordan' },
  { id: 'museum',    name: 'Museum',           tags: ['design', 'serif'],     url: 'galleria/lina' },
  { id: 'tcg',       name: 'Trading Card',     tags: ['dev', 'holo'],         url: 'folio.tcg/jordan' },
  { id: 'manifesto', name: 'Manifesto',        tags: ['design', 'type'],      url: 'lina.manifesto' },
  { id: 'atlas',     name: 'Atlas',            tags: ['business', 'map'],     url: 'atlas/amara' },
  { id: 'receipt',   name: 'Receipt',          tags: ['business', 'mono'],    url: 'folio.mart/amara' },
  { id: 'library',   name: 'Library Card',     tags: ['design', 'archive'],   url: 'library/lina' },
  { id: 'poster',    name: 'Concert Poster',   tags: ['design', 'riso'],      url: 'lina.tour/26' },
  { id: 'finder',    name: 'Finder Window',    tags: ['dev', 'os'],           url: '~/folio/jordan' },
  { id: 'botanical', name: 'Botanical Plate',  tags: ['business', 'archive'], url: 'herbarium/amara' },
  { id: 'resume',    name: 'Resume',           tags: ['business', 'cv'],      url: 'amara.cv' },
  { id: 'bento',     name: 'Bento Grid',       tags: ['design', 'modular'],   url: 'lina.cards' },
  { id: 'notion',    name: 'Notion Doc',       tags: ['business', 'doc'],     url: 'amara.notion.site' },
  { id: 'spare',     name: 'Spare',            tags: ['design', 'minimal'],   url: 'lina.studio' },
  { id: 'blog',      name: 'Blog Journal',     tags: ['dev', 'blog'],         url: 'jpark.dev' },
]

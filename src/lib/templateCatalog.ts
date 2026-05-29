export type FacultyGroup =
  | 'tech'
  | 'business'
  | 'law'
  | 'medical'
  | 'creative'
  | 'education'
  | 'sports'
  | 'agriculture'

export type TemplateCatalogItem = {
  slug: string
  name: string
  group: FacultyGroup
  groups: FacultyGroup[]
  groupLabel: string
  description: string
  bestFor: string
  sections: string[]
  tone: string
  componentName: string
}

export const FACULTY_FILTERS: { value: 'all' | FacultyGroup; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tech', label: 'Tech & Engineering' },
  { value: 'business', label: 'Business' },
  { value: 'law', label: 'Law & Politics' },
  { value: 'medical', label: 'Medical' },
  { value: 'creative', label: 'Creative & Media' },
  { value: 'education', label: 'Education' },
  { value: 'sports', label: 'Sports' },
  { value: 'agriculture', label: 'Agriculture' },
]

const groupLabels: Record<FacultyGroup, string> = {
  tech: 'Tech & Engineering',
  business: 'Business & Management',
  law: 'Law & Politics',
  medical: 'Medical & Healthcare',
  creative: 'Creative & Media',
  education: 'Education & Social Sciences',
  sports: 'Sports',
  agriculture: 'Agriculture & Environment',
}

const groupCopy: Record<FacultyGroup, Pick<TemplateCatalogItem, 'sections' | 'bestFor'>> = {
  tech: {
    bestFor: 'Computer science, engineering, architecture, telecom, energy, math',
    sections: ['Projects', 'Research', 'Tools', 'Awards'],
  },
  business: {
    bestFor: 'Economics, business, management, finance, tourism, administration',
    sections: ['Case studies', 'Experience', 'Skills', 'Metrics'],
  },
  law: {
    bestFor: 'Law, politics, international relations, security, criminology',
    sections: ['Writing', 'Research', 'Moot court', 'Practice areas'],
  },
  medical: {
    bestFor: 'Medicine, nursing, dentistry, pharmacy, radiology, veterinary',
    sections: ['Rotations', 'Clinical skills', 'Research', 'Certificates'],
  },
  creative: {
    bestFor: 'Art, music, acting, design, journalism, media, multimedia',
    sections: ['Selected work', 'Media', 'Exhibitions', 'Awards'],
  },
  education: {
    bestFor: 'Psychology, philosophy, philology, education, social sciences',
    sections: ['Research', 'Teaching', 'Writing', 'Languages'],
  },
  sports: {
    bestFor: 'Sports, physical culture, coaching, training, sports science',
    sections: ['Stats', 'Competitions', 'Training', 'Highlights'],
  },
  agriculture: {
    bestFor: 'Agriculture, environment, ecology, agronomy, sustainability',
    sections: ['Fieldwork', 'Methods', 'Findings', 'Lab skills'],
  },
}

const rawTemplates: Array<[
  string,
  string,
  string,
  string,
  string,
  FacultyGroup[],
]> = [
  ['terminal', 'Terminal', 'Command-line aesthetic with type-on hero.', 'Tpl01Terminal', 'Mono', ['tech']],
  ['editorial', 'Editorial', 'Print-magazine in the browser. Big italic serif, drop caps.', 'Tpl02Editorial', 'Serif', ['creative', 'education']],
  ['brutalist', 'Brutalist', 'Bordered, oversized, no apologies. Marquee header, full-bleed type.', 'Tpl03Brutalist', 'Raw', ['tech', 'creative']],
  ['y2k', 'Y2K', '1999 personal homepage energy with windowed UI, marquees, and counters.', 'Tpl04Y2K', 'Retro', ['creative']],
  ['swiss', 'Swiss Grid', 'Strict 12-column grid, numbered sections, hairline rules.', 'Tpl05Swiss', 'Grid', ['business', 'tech']],
  ['playful', 'Playful', 'Floating shapes, sticker tags, and hard-shadowed cards.', 'Tpl06Playful', 'Warm', ['creative', 'education']],
  ['3d', 'Experimental', 'Gradient mesh background, perspective project cards, and ticker movement.', 'Tpl073D', 'Depth', ['tech', 'creative']],
  ['notebook', 'Notebook', 'Graph-paper background, taped index cards, and student notes.', 'Tpl08Notebook', 'Personal', ['education', 'creative', 'agriculture']],
  ['newspaper', 'Newspaper', 'Broadsheet layout with masthead, deck, drop initial, and columns.', 'Tpl09Newspaper', 'Print', ['business', 'law']],
  ['corporate', 'Corporate', 'Restrained recruiter-ready profile with credential overlay.', 'Tpl10Corporate', 'Clean', ['tech', 'business', 'law']],
  ['boarding', 'Boarding Pass', 'Flight-ticket layout with dashed perforation, barcode, gate, and seat.', 'Tpl11BoardingPass', 'Ticket', ['tech', 'business']],
  ['museum', 'Museum Wall', 'Gallery exhibition layout with title plate and numbered vitrine cards.', 'Tpl12Museum', 'Gallery', ['creative']],
  ['tcg', 'Trading Card', 'Collectible card profile with stat bars and presentation flair.', 'Tpl13TradingCard', 'Card', ['tech', 'sports']],
  ['manifesto', 'Manifesto', 'Typographic poster profile with numbered principles.', 'Tpl14Manifesto', 'Type', ['creative', 'education']],
  ['atlas', 'Atlas', 'Cartographic survey with map logic, compass details, and marginalia.', 'Tpl15Atlas', 'Map', ['business', 'agriculture', 'education']],
  ['receipt', 'Receipt', 'Thermal-paper CV with itemized line items and subtotals.', 'Tpl16Receipt', 'Mono', ['business']],
  ['library', 'Library Card', 'Catalog-card profile with typewriter cards and archive structure.', 'Tpl17Library', 'Archive', ['education', 'creative']],
  ['poster', 'Concert Poster', 'Riso-overprint poster layout with bold event-poster energy.', 'Tpl18Poster', 'Riso', ['creative', 'sports']],
  ['finder', 'Finder Window', 'macOS Finder-inspired layout with sidebar, file list, and preview pane.', 'Tpl19Finder', 'OS', ['tech']],
  ['botanical', 'Botanical Plate', 'Herbarium specimen sheet with Latin captions and field notes.', 'Tpl20Botanical', 'Botanical', ['agriculture', 'creative', 'medical']],
  ['resume', 'Resume', 'Designed two-column CV with sidebar, skills, and awards.', 'Tpl21Resume', 'CV', ['business', 'law', 'medical', 'tech']],
  ['bento', 'Bento Grid', 'Modular dashboard of varied-size tiles for projects and highlights.', 'Tpl22Bento', 'Modular', ['creative', 'tech']],
  ['notion', 'Notion Doc', 'Block-based document with cover, properties bar, and callouts.', 'Tpl23Notion', 'Doc', ['business', 'education', 'law']],
  ['spare', 'Spare', 'Whitespace-forward, type-driven profile with quiet emphasis.', 'Tpl24Spare', 'Minimal', ['creative', 'education']],
  ['blog', 'Blog Journal', 'Writer-developer blog with featured post, dated archive, and sidebar bio.', 'Tpl25Blog', 'Blog', ['tech', 'education', 'creative']],
  ['blueprint', 'Blueprint Grid', 'Engineering blueprint paper with title block and dimensioned annotations.', 'Tpl26Blueprint', 'Drawing', ['tech']],
  ['circuit', 'Circuit Board', 'PCB layout aesthetic with copper traces and chip-like project blocks.', 'Tpl27Circuit', 'PCB', ['tech']],
  ['specsheet', 'Spec Sheet', 'Chip datasheet style with features, specs, pinout, and ordering info.', 'Tpl28SpecSheet', 'Datasheet', ['tech']],
  ['quarterly', 'Quarterly Report', 'Annual report aesthetic with KPIs, charts, and executive summary.', 'Tpl29Quarterly', 'Finance', ['business']],
  ['bloomberg', 'Bloomberg Terminal', 'Trading-terminal profile with tickers, panels, and analyst-style blocks.', 'Tpl30Bloomberg', 'Trading', ['business']],
  ['ledger', 'Ledger', 'Accounting-paper layout with entries, debits, credits, and balanced stamp.', 'Tpl31Ledger', 'Accounting', ['business']],
  ['legalbrief', 'Legal Brief', 'Court filing layout with line-numbered margin and IRAC sections.', 'Tpl32LegalBrief', 'Filing', ['law']],
  ['gazette', 'Official Gazette', 'Government publication style with numbered articles and formal serif.', 'Tpl33Gazette', 'Gov', ['law']],
  ['transcript', 'Hearing Record', 'Court transcript layout with Q/A format, exhibits, and certificate.', 'Tpl34Transcript', 'Transcript', ['law']],
  ['chart', 'Patient Chart', 'Hospital chart with vitals strip, problem list, and medication table.', 'Tpl35PatientChart', 'EHR', ['medical']],
  ['anatomy', 'Anatomical Plate', 'Classical anatomy plate with figure labels and medical notes.', 'Tpl36Anatomy', 'Plate', ['medical']],
  ['rx', 'Rx Prescription', 'Prescription-pad layout with signature, dosage lines, refills, and QR.', 'Tpl37Rx', 'Pad', ['medical']],
  ['magazine', 'Magazine Spread', 'Glossy magazine spread with cover, deck, byline, and columns.', 'Tpl38Magazine', 'Print', ['creative']],
  ['risozine', 'Riso Zine', 'Layered overprint zine with hand-set type and page-counter dots.', 'Tpl39RisoZine', 'Riso', ['creative']],
  ['photofolio', 'Photo Folio', 'Contact-sheet film frames with marked crops and light-table feel.', 'Tpl40PhotoFolio', 'Film', ['creative']],
  ['paper', 'Research Paper', 'APA-style academic paper with title page, abstract, tables, and references.', 'Tpl41ResearchPaper', 'APA', ['education']],
  ['fieldnotes', 'Field Notebook', 'Field journal with ruled paper, taped photos, and observation notes.', 'Tpl42FieldNotebook', 'Fieldwork', ['education']],
  ['syllabus', 'Syllabus', 'Course syllabus layout with weekly schedule, rubric, and office hours.', 'Tpl43Syllabus', 'Course', ['education']],
  ['scoreboard', 'Scoreboard', 'Stadium scoreboard profile with LED score, clock, and team stats.', 'Tpl44Scoreboard', 'Scoreboard', ['sports']],
  ['athletecard', 'Athlete Card', 'Sports trading-card profile with front card and stat-table back.', 'Tpl45AthleteCard', 'Card', ['sports']],
  ['traininglog', 'Training Log', 'Training journal with sessions, lifts, reps, and progress charts.', 'Tpl46TrainingLog', 'Log', ['sports']],
  ['fieldjournal', 'Field Journal', 'Working farm journal with date headers, crop notes, and weather marks.', 'Tpl47FieldJournal', 'Journal', ['agriculture']],
  ['almanac', 'Harvest Almanac', 'Farmer almanac with monthly calendar, planting, and harvest tables.', 'Tpl48Almanac', 'Calendar', ['agriculture']],
  ['soilmap', 'Soil Map', 'Soil survey layout with contour lines, plot polygons, and hatched legend.', 'Tpl49SoilMap', 'Map', ['agriculture']],
  ['silkiron', 'Silk & Iron', 'Dark chambers legal profile with gilded portrait frame and formal rules.', 'Tpl50SilkIron', 'Chambers', ['law']],
  ['redacted', 'Redacted', 'Human-rights case file profile with confidential-stamped sections.', 'Tpl51Redacted', 'Rights', ['law']],
  ['lexfutura', 'Lex Futura', 'LegalTech dashboard profile with live status, KPIs, and sharp structure.', 'Tpl52LexFutura', 'Tech', ['law']],
  ['vitalsmonitor', 'White Coat', 'Warm medical profile with clinical identity, skill pills, and care focus.', 'Tpl53VitalsMonitor', 'Clinic', ['medical']],
  ['thelancet', 'Anatomy Atlas', 'Classical medical illustration profile with labeled anatomy and research tone.', 'Tpl54Lancet', 'Research', ['medical']],
  ['pathologylab', 'Clinic Blue', 'Modern hospital profile with ID aesthetic, dot-skill grid, and clean cards.', 'Tpl55PathologyLab', 'Hospital', ['medical']],
  ['surgicalbrief', 'Grand Rounds', 'Teaching-hospital case presentation with case cards and clinical sidebar.', 'Tpl56SurgicalBrief', 'Teaching', ['medical']],
  ['nhsclinical', 'Caduceus', 'Formal medical credential profile with diploma feel and progress bars.', 'Tpl57NhsClinical', 'Formal', ['medical']],
]

export const TEMPLATE_CATALOG: TemplateCatalogItem[] = rawTemplates.map(
  ([slug, name, description, componentName, tone, groups]) => {
    const group = groups[0]
    return {
      slug,
      name,
      group,
      groups,
      groupLabel: groups.map((item) => groupLabels[item]).join(', '),
      description,
      bestFor: groupCopy[group].bestFor,
      sections: groupCopy[group].sections,
      tone,
      componentName,
    }
  },
)

export function getTemplateBySlug(slug: string) {
  return TEMPLATE_CATALOG.find((template) => template.slug === slug)
}

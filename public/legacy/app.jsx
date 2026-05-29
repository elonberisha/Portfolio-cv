/* global React, ReactDOM, BrowserFrame, PhoneFrame,
   Tpl01Terminal, Tpl02Editorial, Tpl03Brutalist, Tpl04Y2K, Tpl05Swiss,
   Tpl06Playful, Tpl073D, Tpl08Notebook, Tpl09Newspaper, Tpl10Corporate,
   Tpl11BoardingPass, Tpl12Museum, Tpl13TradingCard, Tpl14Manifesto, Tpl15Atlas,
   Tpl16Receipt, Tpl17Library, Tpl18Poster, Tpl19Finder, Tpl20Botanical,
   Tpl21Resume, Tpl22Bento, Tpl23Notion, Tpl24Spare, Tpl25Blog,
   Tpl26Blueprint, Tpl27Circuit, Tpl28SpecSheet, Tpl29Quarterly, Tpl30Bloomberg, Tpl31Ledger,
   Tpl32LegalBrief, Tpl33Gazette, Tpl34Transcript, Tpl35PatientChart, Tpl36Anatomy, Tpl37Rx,
   Tpl38Magazine, Tpl39RisoZine, Tpl40PhotoFolio, Tpl41ResearchPaper, Tpl42FieldNotebook, Tpl43Syllabus,
   Tpl44Scoreboard, Tpl45AthleteCard, Tpl46TrainingLog, Tpl47FieldJournal, Tpl48Almanac, Tpl49SoilMap,
   Tpl50SilkIron, Tpl51Redacted, Tpl52LexFutura,
   Tpl53VitalsMonitor, Tpl54Lancet, Tpl55PathologyLab, Tpl56SurgicalBrief, Tpl57NhsClinical,
   Tpl58EupassClassic, Tpl59EupassModern, Tpl60EupassMinimal, Tpl61EupassExecutive, Tpl62EupassFresh,
   TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, useTweaks, PERSONAS, DEPARTMENT_GROUPS, TEMPLATE_GROUP_MAP */

const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "active": 0,
  "group": "all",
  "dark_0": true
}/*EDITMODE-END*/;

const TEMPLATES = [
  // 25 ORIGINAL templates (unchanged) ---------------------
  { id: "terminal",  name: "Terminal",          comp: Tpl01Terminal,  persona: "developer", tags: ["dev", "mono"], url: "jordan.portfolio-cv.online",
    blurb: "Command-line aesthetic with type-on hero." },
  { id: "editorial", name: "Editorial",         comp: Tpl02Editorial, persona: "designer",  tags: ["design", "serif"], url: "lina.portfolio-cv.online",
    blurb: "Print-magazine in the browser. Big italic serif, drop caps." },
  { id: "brutalist", name: "Brutalist",         comp: Tpl03Brutalist, persona: "developer", tags: ["dev", "raw"], url: "jordan.portfolio-cv.online",
    blurb: "Bordered, oversized, no apologies. Marquee header, full-bleed type." },
  { id: "y2k",       name: "Y2K",               comp: Tpl04Y2K,       persona: "designer",  tags: ["design", "retro"], url: "lina.portfolio-cv.online",
    blurb: "1999 personal homepage energy — windowed UI, marquees, visitor counter." },
  { id: "swiss",     name: "Swiss Grid",        comp: Tpl05Swiss,     persona: "business",  tags: ["business", "grid"], url: "amara.portfolio-cv.online",
    blurb: "Strict 12-column grid, numbered sections, hairline rules." },
  { id: "playful",   name: "Playful",           comp: Tpl06Playful,   persona: "designer",  tags: ["design", "warm"], url: "lina.portfolio-cv.online",
    blurb: "Bouncy floating shapes, sticker tags, hard-shadowed cards." },
  { id: "3d",        name: "Experimental",      comp: Tpl073D,        persona: "developer", tags: ["dev", "depth"], url: "jordan.portfolio-cv.online",
    blurb: "Gradient mesh background, perspective-tilted project cards, infinite ticker." },
  { id: "notebook",  name: "Notebook",          comp: Tpl08Notebook,  persona: "business",  tags: ["personal", "warm"], url: "amara.portfolio-cv.online",
    blurb: "Graph-paper bg, polaroid headshot, taped index cards, doodle arrows." },
  { id: "newspaper", name: "Newspaper",         comp: Tpl09Newspaper, persona: "business",  tags: ["business", "print"], url: "amara.portfolio-cv.online",
    blurb: "Broadsheet layout. Masthead, deck, drop initial, multi-column body." },
  { id: "corporate", name: "Corporate",         comp: Tpl10Corporate, persona: "developer", tags: ["dev", "clean"], url: "jordan.portfolio-cv.online",
    blurb: "Restrained, recruiter-ready. Headshot with credential overlay." },
  { id: "boarding",  name: "Boarding Pass",     comp: Tpl11BoardingPass, persona: "developer", tags: ["dev", "ticket"], url: "jordan.portfolio-cv.online",
    blurb: "Flight-ticket layout. Dashed perforation, barcode, gate + seat." },
  { id: "museum",    name: "Museum Wall",       comp: Tpl12Museum,    persona: "designer", tags: ["design", "serif"], url: "lina.portfolio-cv.online",
    blurb: "Gallery exhibition. Title plate, vitrine cards numbered as plates." },
  { id: "tcg",       name: "Trading Card",      comp: Tpl13TradingCard, persona: "developer", tags: ["dev", "holo"], url: "jordan.portfolio-cv.online",
    blurb: "Pokemon/MTG card collection. Holo foil sweep, HP & stat bars." },
  { id: "manifesto", name: "Manifesto",         comp: Tpl14Manifesto, persona: "designer", tags: ["design", "type"], url: "lina.portfolio-cv.online",
    blurb: "Typographic poster. No images, all type. Six numbered principles." },
  { id: "atlas",     name: "Atlas",             comp: Tpl15Atlas,     persona: "business", tags: ["business", "map"], url: "amara.portfolio-cv.online",
    blurb: "Cartographic survey. Compass rose, lat/long marginalia." },
  { id: "receipt",   name: "Receipt",           comp: Tpl16Receipt,   persona: "business", tags: ["business", "mono"], url: "amara.portfolio-cv.online",
    blurb: "Thermal-paper grocery receipt. Itemized line items, subtotals." },
  { id: "library",   name: "Library Card",      comp: Tpl17Library,   persona: "designer", tags: ["design", "archive"], url: "lina.portfolio-cv.online",
    blurb: "Dewey catalog drawer. Typewriter cards, call numbers." },
  { id: "poster",    name: "Concert Poster",    comp: Tpl18Poster,    persona: "designer", tags: ["design", "riso"], url: "lina.portfolio-cv.online",
    blurb: "Riso-overprint concert poster. Skewed red+blue stripes." },
  { id: "finder",    name: "Finder Window",     comp: Tpl19Finder,    persona: "developer", tags: ["dev", "os"], url: "jordan.portfolio-cv.online",
    blurb: "macOS Finder. Sidebar, file list, preview pane, terminal block." },
  { id: "botanical", name: "Botanical Plate",   comp: Tpl20Botanical, persona: "business", tags: ["business", "serif"], url: "amara.portfolio-cv.online",
    blurb: "Herbarium specimen sheet. Latin captions, pressed-and-pinned field notes." },
  { id: "resume",    name: "Resume",            comp: Tpl21Resume,    persona: "business", tags: ["business", "cv"], url: "amara.portfolio-cv.online",
    blurb: "Designed two-column CV — sidebar with avatar + skills bars + awards." },
  { id: "bento",     name: "Bento Grid",        comp: Tpl22Bento,     persona: "designer", tags: ["design", "modular"], url: "lina.portfolio-cv.online",
    blurb: "Modular dashboard of varied-size tiles — read.cv vibe." },
  { id: "notion",    name: "Notion Doc",        comp: Tpl23Notion,    persona: "business", tags: ["business", "doc"], url: "amara.portfolio-cv.online",
    blurb: "Block-based document. Cover, page icon, properties bar, callouts." },
  { id: "spare",     name: "Spare",             comp: Tpl24Spare,     persona: "designer", tags: ["design", "minimal"], url: "lina.portfolio-cv.online",
    blurb: "Heavy whitespace, single accent, type-driven. No images." },
  { id: "blog",      name: "Blog Journal",      comp: Tpl25Blog,      persona: "developer", tags: ["dev", "blog"], url: "jordan.portfolio-cv.online",
    blurb: "Writer-developer blog. Featured post, dated archive, sidebar with bio." },

  // 24 NEW department-specific templates ----------------------------
  // Tech & Engineering -------------------------------------
  { id: "blueprint", name: "Blueprint Grid",    comp: Tpl26Blueprint, persona: "developer", tags: ["tech", "drawing"], url: "jordan.portfolio-cv.online",
    blurb: "Engineering blueprint paper, title block, dimensioned annotations. For architects + civil/mech eng." },
  { id: "circuit",   name: "Circuit Board",     comp: Tpl27Circuit,   persona: "developer", tags: ["tech", "pcb"], url: "jordan.portfolio-cv.online",
    blurb: "PCB layout aesthetic with copper traces, IC chips holding projects. For EE / CE." },
  { id: "specsheet", name: "Spec Sheet",        comp: Tpl28SpecSheet, persona: "developer", tags: ["tech", "datasheet"], url: "jordan.portfolio-cv.online",
    blurb: "Chip datasheet style — features, electrical chars, pinout, ordering info." },
  // Business & Management ----------------------------------
  { id: "quarterly", name: "Quarterly Report",  comp: Tpl29Quarterly, persona: "business", tags: ["business", "finance"], url: "amara.portfolio-cv.online",
    blurb: "Annual report aesthetic. Cover, KPIs, bar chart, executive summary." },
  { id: "bloomberg", name: "Bloomberg Terminal", comp: Tpl30Bloomberg, persona: "business", tags: ["business", "trading"], url: "amara.portfolio-cv.online",
    blurb: "Orange-on-black trading terminal. Tickers, function-key panels, ANALYST recommendation." },
  { id: "ledger",    name: "Ledger",            comp: Tpl31Ledger,    persona: "business", tags: ["business", "accounting"], url: "amara.portfolio-cv.online",
    blurb: "Green-bar accounting paper. Journal entries, debits/credits, balanced stamp." },
  // Law & Politics -----------------------------------------
  { id: "legalbrief", name: "Legal Brief",      comp: Tpl32LegalBrief, persona: "law", tags: ["law", "filing"], url: "endrit.portfolio-cv.online",
    blurb: "Court filing layout — line-numbered margin, IRAC sections, signature block." },
  { id: "gazette",   name: "Official Gazette",  comp: Tpl33Gazette,   persona: "law", tags: ["law", "gov"], url: "endrit.portfolio-cv.online",
    blurb: "Government publication style. Numbered articles, seal, formal serif." },
  { id: "transcript", name: "Hearing Record",   comp: Tpl34Transcript, persona: "law", tags: ["law", "transcript"], url: "endrit.portfolio-cv.online",
    blurb: "Court transcript — Q/A format, line-numbered, exhibit markers, certificate." },
  // Medical & Healthcare -----------------------------------
  { id: "chart",     name: "Patient Chart",     comp: Tpl35PatientChart, persona: "med", tags: ["med", "ehr"], url: "era.portfolio-cv.online",
    blurb: "Hospital chart — vitals strip, problem list, medication table, attending sig." },
  { id: "anatomy",   name: "Anatomical Plate",  comp: Tpl36Anatomy,   persona: "med", tags: ["med", "plate"], url: "era.portfolio-cv.online",
    blurb: "Gray's-Anatomy style with numbered figure + Latin captions + plate." },
  { id: "rx",        name: "Rx Prescription",   comp: Tpl37Rx,        persona: "med", tags: ["med", "pad"], url: "era.portfolio-cv.online",
    blurb: "Prescription pad. ℞ symbol, dosage lines, signature, refills, QR." },
  // Creative & Media ---------------------------------------
  { id: "magazine",  name: "Magazine Spread",   comp: Tpl38Magazine,  persona: "designer", tags: ["creative", "print"], url: "lina.portfolio-cv.online",
    blurb: "Glossy magazine — full-bleed cover, deck, byline, column body, masthead." },
  { id: "risozine",  name: "Riso Zine",         comp: Tpl39RisoZine,  persona: "designer", tags: ["creative", "riso"], url: "lina.portfolio-cv.online",
    blurb: "Pink+blue layered overprint zine. Hand-set type, page-counter dots." },
  { id: "photofolio", name: "Photo Folio",      comp: Tpl40PhotoFolio, persona: "film", tags: ["creative", "film"], url: "noor.portfolio-cv.online",
    blurb: "Contact-sheet film frames numbered + marked + cropped, light-table feel." },
  // Education & Social Sciences ----------------------------
  { id: "paper",     name: "Research Paper",    comp: Tpl41ResearchPaper, persona: "edu", tags: ["edu", "apa"], url: "klara.portfolio-cv.online",
    blurb: "APA-style academic paper. Title page, abstract, tables, references." },
  { id: "fieldnotes", name: "Field Notebook",   comp: Tpl42FieldNotebook, persona: "edu", tags: ["edu", "fieldwork"], url: "klara.portfolio-cv.online",
    blurb: "Anthropology field journal — ruled paper, taped photos, doodle arrows." },
  { id: "syllabus",  name: "Syllabus",          comp: Tpl43Syllabus,  persona: "edu", tags: ["edu", "course"], url: "klara.portfolio-cv.online",
    blurb: "Course syllabus — header, weekly schedule, grading rubric, office hours." },
  // Sports -------------------------------------------------
  { id: "scoreboard", name: "Scoreboard",       comp: Tpl44Scoreboard, persona: "sport", tags: ["sport", "scoreboard"], url: "marko.portfolio-cv.online",
    blurb: "Stadium scoreboard. Big LED-style score, period clock, team stats split." },
  { id: "athletecard", name: "Athlete Card",    comp: Tpl45AthleteCard, persona: "sport", tags: ["sport", "card"], url: "marko.portfolio-cv.online",
    blurb: "Sports trading-card aesthetic — card front + stat-table back." },
  { id: "traininglog", name: "Training Log",    comp: Tpl46TrainingLog, persona: "sport", tags: ["sport", "log"], url: "marko.portfolio-cv.online",
    blurb: "Gym training journal — date-stamped sessions, lifts/reps, charted progress." },
  // Agriculture & Environment ------------------------------
  { id: "fieldjournal", name: "Field Journal",  comp: Tpl47FieldJournal, persona: "agri", tags: ["agri", "journal"], url: "ardit.portfolio-cv.online",
    blurb: "Working farm journal — date headers, crop notes, weather marks." },
  { id: "almanac",   name: "Harvest Almanac",   comp: Tpl48Almanac,   persona: "agri", tags: ["agri", "calendar"], url: "ardit.portfolio-cv.online",
    blurb: "Farmer's almanac — month-by-month calendar, planting & harvest tables." },
  { id: "soilmap",   name: "Soil Map",          comp: Tpl49SoilMap,   persona: "agri", tags: ["agri", "map"], url: "ardit.portfolio-cv.online",
    blurb: "USDA-style soil survey — contour lines, plot polygons, hatched legend." },

  // Law — extra high-quality alternates -------------------------
  { id: "silkiron",  name: "Silk & Iron",       comp: Tpl50SilkIron,  persona: "ewan_kavanagh", tags: ["law", "chambers"], url: "ewan.portfolio-cv.online",
    blurb: "Luxury dark chambers profile — navy + gold, EB Garamond, gilded portrait frame, heraldic rules." },
  { id: "redacted",  name: "Redacted",          comp: Tpl51Redacted,  persona: "ewan_kavanagh", tags: ["law", "rights"], url: "ewan.portfolio-cv.online",
    blurb: "Human-rights case file — typewriter font, CONFIDENTIAL stamp, mugshot, exhibit-labelled sections." },
  { id: "lexfutura", name: "Lex Futura",        comp: Tpl52LexFutura, persona: "ewan_kavanagh", tags: ["law", "tech"], url: "ewan.portfolio-cv.online",
    blurb: "LegalTech dashboard — Unbounded font, electric blue, hexagonal headshot, live status bar, KPI cards." },
  // Medicine — extra high-quality alternates ----------------------
  { id: "vitalsmonitor", name: "White Coat",       comp: Tpl53VitalsMonitor,  persona: "eve_hartwell", tags: ["med", "clinic"],   url: "eve.portfolio-cv.online",
    blurb: "Warm doctor's profile — forest green + white + gold, stethoscope portrait, DM Sans + Lora, skills with coloured level pills." },
  { id: "thelancet",     name: "Anatomy Atlas",   comp: Tpl54Lancet,         persona: "eve_hartwell", tags: ["med", "research"], url: "eve.portfolio-cv.online",
    blurb: "Classical medical illustration — warm ivory + burgundy, anatomical heart SVG with Latin labels, Gray's Anatomy aesthetic." },
  { id: "pathologylab",  name: "Clinic Blue",     comp: Tpl55PathologyLab,   persona: "eve_hartwell", tags: ["med", "hospital"], url: "eve.portfolio-cv.online",
    blurb: "Modern hospital profile — deep medical blue + white, hospital ID aesthetic, dot-skill grid, clean card layout, allergy chip." },
  { id: "surgicalbrief", name: "Grand Rounds",    comp: Tpl56SurgicalBrief,  persona: "eve_hartwell", tags: ["med", "teaching"], url: "eve.portfolio-cv.online",
    blurb: "Teaching-hospital case presentation — warm cream + teal, Fraunces serif, case cards, vitals sidebar, stethoscope portrait." },
  { id: "nhsclinical",   name: "Caduceus",        comp: Tpl57NhsClinical,    persona: "eve_hartwell", tags: ["med", "formal"],   url: "eve.portfolio-cv.online",
    blurb: "Formal medical credential — navy + gold, EB Garamond, caduceus SVG, gold ring portrait, skill progress bars, diploma feel." },
  // Eupass Standard CV — 5 universal professional styles ---------------
  { id: "eupass-classic",   name: "Eupass · Classic",     comp: Tpl58EupassClassic,   persona: "ewan_kavanagh",  tags: ["cv", "formal"],    url: "ewan.portfolio-cv.online",
    blurb: "Traditional Europass-structured CV — blue accent, serif headings, CEFR language table, timeline layout." },
  { id: "eupass-modern",    name: "Eupass · Modern",      comp: Tpl59EupassModern,    persona: "eve_hartwell",   tags: ["cv", "clean"],     url: "eve.portfolio-cv.online",
    blurb: "Card-based Europass-structured CV — teal accent, rounded sections, pill-shaped skill chips." },
  { id: "eupass-minimal",   name: "Eupass · Minimal",     comp: Tpl60EupassMinimal,   persona: "developer",      tags: ["cv", "minimal"],   url: "jordan.portfolio-cv.online",
    blurb: "Whitespace-forward Europass-structured CV — neutral tones, hairline rules, quiet typography." },
  { id: "eupass-executive", name: "Eupass · Executive",   comp: Tpl61EupassExecutive, persona: "business",       tags: ["cv", "premium"],   url: "amara.portfolio-cv.online",
    blurb: "Bold Europass-structured CV — dark navy header, gold accents, Playfair Display serif headings." },
  { id: "eupass-fresh",     name: "Eupass · Fresh",       comp: Tpl62EupassFresh,     persona: "adam_lyle",      tags: ["cv", "friendly"],  url: "adam.portfolio-cv.online",
    blurb: "Approachable Europass-structured CV — green accent, rounded cards, dashed section dividers." },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    const groupId = params.get("group");
    const nextTweaks = {};
    const templateIndex = TEMPLATES.findIndex((tp) => tp.id === templateId);

    if (templateIndex >= 0) nextTweaks.active = templateIndex;
    if (groupId && (groupId === "all" || DEPARTMENT_GROUPS.some((group) => group.id === groupId))) {
      nextTweaks.group = groupId;
    } else if (templateIndex >= 0) {
      const firstGroup = (TEMPLATE_GROUP_MAP[TEMPLATES[templateIndex].id] || [])[0];
      if (firstGroup) nextTweaks.group = firstGroup;
    }

    if (Object.keys(nextTweaks).length) {
      setTweak(nextTweaks);
    }
  }, [setTweak]);

  const activeGroup = t.group || "all";

  // Filter templates by selected group
  const filtered = useMemo(() => {
    if (activeGroup === "all") return TEMPLATES.map((tp, i) => ({ ...tp, _idx: i }));
    return TEMPLATES.map((tp, i) => ({ ...tp, _idx: i }))
      .filter(tp => (TEMPLATE_GROUP_MAP[tp.id] || []).includes(activeGroup));
  }, [activeGroup]);

  // Active index within the FULL list. Clamp on filter change.
  const fullActive = Math.max(0, Math.min(TEMPLATES.length - 1, t.active ?? 0));
  const activeInFiltered = filtered.findIndex(tp => tp._idx === fullActive);
  const activeIdx = activeInFiltered === -1 ? (filtered[0]?._idx ?? 0) : fullActive;
  const tpl = TEMPLATES[activeIdx];
  const dark = !!t[`dark_${activeIdx}`];
  const Comp = tpl.comp;
  const personaObj = PERSONAS[tpl.persona] || PERSONAS.developer;

  useEffect(() => {
    document.getElementById("desk-port")?.scrollTo(0, 0);
    document.getElementById("phone-port")?.scrollTo(0, 0);
  }, [activeIdx, dark]);

  // If active not in filtered, jump to first filtered
  useEffect(() => {
    if (filtered.length && !filtered.some(tp => tp._idx === fullActive)) {
      setTweak("active", filtered[0]._idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup]);

  const goPrev = () => {
    const i = filtered.findIndex(tp => tp._idx === activeIdx);
    if (i > 0) setTweak("active", filtered[i - 1]._idx);
  };
  const goNext = () => {
    const i = filtered.findIndex(tp => tp._idx === activeIdx);
    if (i < filtered.length - 1) setTweak("active", filtered[i + 1]._idx);
  };

  return (
    <div>
      <div className="shell-top">
        <div className="shell-brand">
          <span className="mark">PORTFOLIO-CV/</span>
          <span className="title"><b>62 templates · 8 departments</b> — students pick by faculty, then by style</span>
        </div>
        <div className="shell-meta">v1.0 · {TEMPLATES.length} templates · {DEPARTMENT_GROUPS.length} groups</div>
      </div>

      {/* Faculty / department filter bar */}
      <div className="tab-strip" role="tablist" style={{ background: 'color-mix(in oklab, var(--paper) 95%, black)', borderBottom: '1px solid var(--hairline)' }}>
        <button className="tab" data-active={activeGroup === "all" ? 1 : 0} onClick={() => setTweak("group", "all")}>
          <span className="num">ALL</span>
          <span>All faculties</span>
          <span className="num" style={{ marginLeft: 4 }}>· {TEMPLATES.length}</span>
        </button>
        {DEPARTMENT_GROUPS.map(g => {
          const cnt = TEMPLATES.filter(tp => (TEMPLATE_GROUP_MAP[tp.id] || []).includes(g.id)).length;
          return (
            <button key={g.id} className="tab" data-active={activeGroup === g.id ? 1 : 0} onClick={() => setTweak("group", g.id)}>
              <span className="num" style={{ color: g.accent }}>{g.icon}</span>
              <span>{g.short}</span>
              <span className="num" style={{ marginLeft: 4 }}>· {cnt}</span>
            </button>
          );
        })}
      </div>

      {/* Template strip — only filtered ones */}
      <div className="tab-strip" role="tablist" style={{ top: 113, borderTop: 0 }}>
        {filtered.map((tp) => (
          <button key={tp.id} className="tab" data-active={tp._idx === activeIdx ? 1 : 0} onClick={() => setTweak("active", tp._idx)}>
            <span className="num">{String(tp._idx + 1).padStart(2, "0")}</span>
            <span>{tp.name}</span>
          </button>
        ))}
      </div>

      <div className="stage">
        <div className="stage-head">
          <div>
            <div className="kicker">Template {String(activeIdx + 1).padStart(2, "0")} / {TEMPLATES.length} · {tpl.tags.join(" · ")} · persona: {tpl.persona}</div>
            <h2>{tpl.name}</h2>
            <p className="blurb">{tpl.blurb}</p>
            <div style={{ fontFamily: 'var(--shell-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.04em' }}>
              SUITS → {(TEMPLATE_GROUP_MAP[tpl.id] || []).map(gid => {
                const g = DEPARTMENT_GROUPS.find(d => d.id === gid);
                return g ? g.short : gid;
              }).join(" · ")}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
            <div className="tags">
              <span className="tag">{personaObj.faculty || personaObj.role}</span>
              <span className="tag">{dark ? "dark" : "light"}</span>
            </div>
            <div className="nav-arrows">
              <button onClick={goPrev} aria-label="prev">←</button>
              <button onClick={goNext} aria-label="next">→</button>
            </div>
          </div>
        </div>

        <div className="frames">
          <div className="frame-wrap">
            <div className="frame-cap"><span className="dot"></span>Desktop · 1280×800 · scrolls inside frame</div>
            <BrowserFrame url={tpl.url} scrollId="desk-port" studentName={personaObj.name}>
              <Comp mode="desktop" dark={dark} />
            </BrowserFrame>
          </div>
          <div className="frame-wrap">
            <div className="frame-cap"><span className="dot"></span>Mobile · 375×812</div>
            <PhoneFrame scrollId="phone-port" studentName={personaObj.name}>
              <Comp mode="mobile" dark={dark} />
            </PhoneFrame>
          </div>
        </div>
      </div>

      <div className="shell-foot">
        <span>{tpl.id}.tpl · {filtered.length} in this faculty · {TEMPLATES.length} total</span>
        <span>← / → switch · click any tab</span>
      </div>

      <TweaksPanel>
        <TweakSection label="Faculty filter" />
        <TweakSelect
          label="Department"
          value={activeGroup}
          options={[
            { value: "all", label: `All — ${TEMPLATES.length} templates` },
            ...DEPARTMENT_GROUPS.map(g => ({
              value: g.id,
              label: `${g.icon} ${g.name} — ${TEMPLATES.filter(tp => (TEMPLATE_GROUP_MAP[tp.id] || []).includes(g.id)).length}`
            }))
          ]}
          onChange={(v) => setTweak("group", v)}
        />
        <TweakSection label="Template" />
        <TweakSelect
          label="Active"
          value={activeIdx}
          options={filtered.map((tp) => ({
            value: tp._idx,
            label: `${String(tp._idx + 1).padStart(2, "0")} — ${tp.name}`
          }))}
          onChange={(v) => setTweak("active", Number(v))}
        />
        <TweakRadio
          label="Theme"
          value={dark ? "dark" : "light"}
          options={["light", "dark"]}
          onChange={(v) => setTweak(`dark_${activeIdx}`, v === "dark")}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* global React, PERSONAS */

/* ═══════════════════════════════════════════════════════════════════
   CLAUDE DESIGN WRAPPERS
   Templates built by Claude Design (IIFE pattern) need thin wrappers
   to pass the correct persona and conform to { mode, dark } API.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── LAW (T32–T34) ─── Claude Design IIFE → wrapper ───────────── */

function Tpl50SilkIron({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t50, { persona, mode, dark });
}

function Tpl51Redacted({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t51, { persona, mode, dark });
}

function Tpl52LexFutura({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t52, { persona, mode, dark });
}

/* ─── MEDICINE (T53–T57) ─── Claude Design IIFE → wrapper ──────── */

function Tpl53VitalsMonitor({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t53, { persona, mode, dark });
}

function Tpl54Lancet({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t54, { persona, mode, dark });
}

function Tpl55PathologyLab({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t55, { persona, mode, dark });
}

function Tpl56SurgicalBrief({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t56, { persona, mode, dark });
}

function Tpl57NhsClinical({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t57, { persona, mode, dark });
}

function Tpl32LegalBrief({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t32cd, { persona, mode, dark });
}

function Tpl33Gazette({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t33cd, { persona, mode, dark });
}

function Tpl34Transcript({ mode, dark }) {
  const persona = PERSONAS.ewan_kavanagh;
  return React.createElement(window.Template_t34cd, { persona, mode, dark });
}

/* ─── MEDICAL (T35–T37) ─── Claude Design IIFE → wrapper ───────── */

function Tpl35PatientChart({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t35cd, { persona, mode, dark });
}

function Tpl36Anatomy({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t36cd, { persona, mode, dark });
}

function Tpl37Rx({ mode, dark }) {
  const persona = PERSONAS.eve_hartwell;
  return React.createElement(window.Template_t37cd, { persona, mode, dark });
}

/* ─── SPORTS (T44–T46) ─── Claude Design IIFE → wrapper ────────── */

function Tpl44Scoreboard({ mode, dark }) {
  const persona = PERSONAS.mark_holloway;
  return React.createElement(window.Template_t26, { persona, mode, dark });
}

function Tpl45AthleteCard({ mode, dark }) {
  const persona = PERSONAS.mark_holloway;
  return React.createElement(window.Template_t27, { persona, mode, dark });
}

function Tpl46TrainingLog({ mode, dark }) {
  const persona = PERSONAS.mark_holloway;
  return React.createElement(window.Template_t46cd, { persona, mode, dark });
}

/* ─── AGRICULTURE (T47–T48) ─── Claude Design IIFE → wrapper ───── */

function Tpl47FieldJournal({ mode, dark }) {
  const persona = PERSONAS.adam_lyle;
  return React.createElement(window.Template_t47cd, { persona, mode, dark });
}

function Tpl48Almanac({ mode, dark }) {
  const persona = PERSONAS.adam_lyle;
  return React.createElement(window.Template_t48cd, { persona, mode, dark });
}

/* ─────────────────────────────────────────────────────────────────
   49 — SOIL MAP  ·  agriculture / environment (soil survey aesthetic)
   Signature: USDA-style soil map — contour lines, plot polygons,
              legend with hatched fills, geological notes.
   (No Claude Design version — keeping original implementation)
   ───────────────────────────────────────────────────────────────── */
const T49_CSS = `
.t49{ font-family: "IBM Plex Mono", monospace; background: #e8e0c4; color: #2a2010; min-height: 100%; padding: 0; font-size: 12px; line-height: 1.6;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(80,60,30,.10) 0 1.5px, transparent 2px),
    radial-gradient(circle at 88% 30%, rgba(80,60,30,.10) 0 1.5px, transparent 2px),
    radial-gradient(circle at 30% 70%, rgba(80,60,30,.08) 0 2px, transparent 2.5px);
  background-size: 8px 8px, 10px 10px, 14px 14px;
}
.t49.dark{ background-color: #1a160a; color: #e8e0c4; }
.t49 .head-49{ padding: 22px 28px 16px; border-bottom: 2px solid currentColor; display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; }
.t49-mobile .head-49{ grid-template-columns: 1fr; }
.t49 .head-49 .qd{ font-size: 10px; letter-spacing: 0.18em; opacity: .65; text-transform: uppercase; }
.t49 .head-49 h1{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: clamp(28px, 4.5vw, 46px); margin: 8px 0 4px; line-height: 1; letter-spacing: -0.005em; }
.t49 .head-49 .strap-49{ font-family: "EB Garamond", serif; font-style: italic; font-size: 14px; opacity: .85; max-width: 500px; }
.t49 .head-49 .compass{ width: 70px; aspect-ratio: 1; border: 1.5px solid currentColor; border-radius: 999px; position: relative; }
.t49 .head-49 .compass::before{ content: "N"; position: absolute; top: 4px; left: 50%; transform: translateX(-50%); font-size: 10px; letter-spacing: 0.16em; }
.t49 .head-49 .compass::after{ content: ""; position: absolute; top: 14%; left: 50%; width: 1px; height: 72%; background: currentColor; transform: translateX(-50%); }
.t49 .head-49 .compass i{ position: absolute; inset: 8px; border-radius: 999px; border: 1px dashed currentColor; opacity: .55; }
.t49 .map-area{ padding: 18px 28px; border-bottom: 2px solid currentColor; }
.t49 .map-area .map-lbl{ display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.18em; opacity: .65; text-transform: uppercase; padding-bottom: 8px; }
.t49 .map-grid{ background: #f8eed4; border: 1.5px solid currentColor; padding: 12px; position: relative; aspect-ratio: 16/9; max-height: 360px; overflow: hidden; }
.t49.dark .map-grid{ background: #221a0a; }
.t49 .map-grid svg{ width: 100%; height: 100%; }
.t49 .map-grid svg .contour{ fill: none; stroke: #5a4a1a; stroke-width: 0.8; }
.t49.dark .map-grid svg .contour{ stroke: #d4c898; }
.t49 .map-grid svg .plot{ stroke: currentColor; stroke-width: 1.5; }
.t49 .map-grid svg .plot.p1{ fill: rgba(122, 90, 30, .25); }
.t49 .map-grid svg .plot.p2{ fill: rgba(90, 122, 60, .3); }
.t49 .map-grid svg .plot.p3{ fill: rgba(60, 90, 122, .25); }
.t49 .map-grid svg .plot.p4{ fill: rgba(180, 140, 80, .3); }
.t49 .map-grid svg .plot.p5{ fill: rgba(100, 80, 60, .35); }
.t49 .map-grid svg .label-map{ font-family: "IBM Plex Mono", monospace; font-size: 10px; fill: currentColor; }
.t49 .map-grid svg .leader-line{ stroke: currentColor; stroke-width: 0.5; fill: none; stroke-dasharray: 3 2; }
.t49 .map-grid svg .road{ stroke: #c44a1f; stroke-width: 1.5; fill: none; }
.t49 .legend-49{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border: 1.5px solid currentColor; margin-top: 14px; font-size: 11px; }
.t49-mobile .legend-49{ grid-template-columns: repeat(2, 1fr); }
.t49 .legend-49 > div{ padding: 8px 10px; border-right: 1px solid currentColor; }
.t49 .legend-49 > div:last-child{ border-right: 0; }
.t49-mobile .legend-49 > div:nth-child(2n){ border-right: 0; }
.t49-mobile .legend-49 > div{ border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; }
.t49 .legend-49 .sw{ display: inline-block; width: 20px; height: 12px; border: 1px solid currentColor; margin-right: 6px; vertical-align: middle; }
.t49 .legend-49 .sw.s1{ background: rgba(122, 90, 30, .35); }
.t49 .legend-49 .sw.s2{ background: rgba(90, 122, 60, .4); }
.t49 .legend-49 .sw.s3{ background: rgba(60, 90, 122, .35); }
.t49 .legend-49 .sw.s4{ background: rgba(180, 140, 80, .4); }
.t49 .legend-49 .sw.s5{ background: rgba(100, 80, 60, .45); }
.t49 .legend-49 b{ font-family: "EB Garamond", serif; font-style: italic; font-weight: 700; font-size: 13px; display: block; }
.t49 .legend-49 small{ display: block; font-size: 10px; opacity: .65; letter-spacing: 0.04em; }
.t49 section{ padding: 20px 28px; border-bottom: 1.5px solid currentColor; }
.t49 section h2{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 22px; margin: 0 0 12px; letter-spacing: -0.005em; display: flex; justify-content: space-between; align-items: baseline; }
.t49 section h2 small{ font-family: "IBM Plex Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; font-weight: 400; }
.t49 .row-49{ display: grid; grid-template-columns: 90px 1fr 110px 80px; gap: 14px; padding: 8px 0; border-bottom: 1px dashed color-mix(in oklab, currentColor 22%, transparent); font-size: 12px; align-items: baseline; }
.t49-mobile .row-49{ grid-template-columns: 80px 1fr 60px; }
.t49-mobile .row-49 .org-49{ display: none; }
.t49 .row-49 .lat{ font-size: 10px; opacity: .65; letter-spacing: 0.04em; }
.t49 .row-49 b{ font-family: "EB Garamond", serif; font-style: italic; font-weight: 700; font-size: 14px; }
.t49 .row-49 .org-49{ font-size: 10px; opacity: .65; }
.t49 .row-49 .yr{ font-size: 10px; opacity: .55; text-align: right; }
.t49 .quote-49{ padding: 14px 18px; border-left: 4px solid currentColor; background: color-mix(in oklab, currentColor 5%, transparent); font-style: italic; font-family: "EB Garamond", serif; font-size: 16px; line-height: 1.45; }
.t49 .quote-49 cite{ display: block; font-family: "IBM Plex Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-top: 8px; }
.t49 .colophon-49{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; display: flex; justify-content: space-between; padding: 14px 28px; }
`;
function Tpl49SoilMap({ mode, dark }) {
  const p = PERSONAS.agri;
  return (<>
    <style>{T49_CSS}</style>
    <div className={`t49 ${mode === 'mobile' ? 't49-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="head-49">
        <div>
          <div className="qd">★ folio soil survey · sheet 014 · quad korça-04 · 1:5000</div>
          <h1>{p.name}</h1>
          <div className="strap-49">A soil-survey style record of plots, placements, and field notes — surveyed from {p.location}, 40.61°N · 20.78°E.</div>
        </div>
        <div className="compass"><i></i></div>
      </div>

      <div className="map-area">
        <div className="map-lbl"><span>SHEET № 014 / 099</span><span>★ KORÇA VALLEY · ALB</span><span>SCALE 1:5000</span></div>
        <div className="map-grid">
          <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet">
            {/* contour lines */}
            <path className="contour" d="M 40 90 Q 200 60 360 90 Q 460 120 560 90" />
            <path className="contour" d="M 40 130 Q 200 100 360 130 Q 460 160 560 130" />
            <path className="contour" d="M 40 170 Q 200 140 360 170 Q 460 200 560 170" />
            <path className="contour" d="M 40 210 Q 200 180 360 210 Q 460 240 560 210" />
            <path className="contour" d="M 40 250 Q 200 220 360 250 Q 460 280 560 250" />

            {/* plot polygons — projects */}
            <path className="plot p1" d="M 60 80 L 180 70 L 200 150 L 80 160 Z" />
            <path className="plot p2" d="M 220 60 L 350 80 L 340 160 L 210 145 Z" />
            <path className="plot p3" d="M 380 70 L 510 90 L 500 170 L 360 155 Z" />
            <path className="plot p4" d="M 80 180 L 220 170 L 230 270 L 90 280 Z" />
            <path className="plot p5" d="M 260 180 L 410 195 L 400 280 L 250 270 Z" />

            {/* road */}
            <path className="road" d="M 20 300 Q 200 270 380 290 Q 480 300 580 270" />

            {/* labels */}
            <text className="label-map" x="100" y="118">P-01 · Atelier</text>
            <text className="label-map" x="260" y="110">P-02 · Forme</text>
            <text className="label-map" x="420" y="125">P-03 · Notturno</text>
            <text className="label-map" x="115" y="230">P-04 · Civic</text>
            <text className="label-map" x="305" y="235">P-05 · Untitled</text>
            <text className="label-map" x="40" y="80" style={{ fontSize: 9 }}>contour 240m</text>
            <text className="label-map" x="40" y="260" style={{ fontSize: 9 }}>contour 200m</text>
            <text className="label-map" x="500" y="300" style={{ fontSize: 9 }}>rd · korça-rrjepë</text>

            {/* legend marks */}
            <circle cx="40" cy="40" r="3" fill="currentColor" />
            <text className="label-map" x="50" y="44">N 40°36′</text>
            <circle cx="560" cy="40" r="3" fill="currentColor" />
            <text className="label-map" x="500" y="44">E 20°47′</text>
          </svg>
        </div>
        <div className="legend-49">
          {p.projects.slice(0, 5).map((pr, i) => (
            <div key={i}><span className={`sw s${i+1}`}></span>P-{String(i+1).padStart(2,"0")}<br/><b>{pr.title}</b><small>{pr.kind} · {pr.year}</small></div>
          ))}
        </div>
      </div>

      <section>
        <h2>Soil reading · projects · all plots<small>{p.projects.length} surveyed</small></h2>
        {p.projects.map((pr, i) => (
          <div className="row-49" key={i}>
            <span className="lat">{(40 + i * 0.05).toFixed(2)}°N · {(20 + i * 0.07).toFixed(2)}°E</span>
            <span><b>{pr.title}</b><div style={{ opacity: .75, fontSize: 11, fontFamily: '"EB Garamond",serif', fontStyle: 'italic' }}>{pr.note}</div></span>
            <span className="org-49">{pr.kind}</span>
            <span className="yr">{pr.year}</span>
          </div>
        ))}
      </section>

      <section>
        <h2>Stations crossed · experience<small>{p.experience.length} placements</small></h2>
        {p.experience.map((e, i) => (
          <div className="row-49" key={i} style={{ gridTemplateColumns: mode === 'mobile' ? '80px 1fr' : '90px 1fr 130px 80px' }}>
            <span className="lat">{(40 + i * 0.3).toFixed(2)}°N</span>
            <span><b>{e.role}</b><div style={{ opacity: .75, fontSize: 11, fontFamily: '"EB Garamond",serif', fontStyle: 'italic' }}>{e.org} · {e.note}</div></span>
            {mode !== 'mobile' && <span className="org-49">{e.org}</span>}
            {mode !== 'mobile' && <span className="yr">{e.time}</span>}
          </div>
        ))}
      </section>

      <section>
        <h2>Schools mapped · education<small>and honours</small></h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 22 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 4 }}>★ schooling</div>
            {p.education.map((e, i) => (<div className="row-49" key={i} style={{ gridTemplateColumns: '80px 1fr' }}><span className="lat">{e.time}</span><span><b>{e.degree}</b><div style={{ opacity: .75, fontSize: 11, fontFamily: '"EB Garamond",serif', fontStyle: 'italic' }}>{e.org}</div></span></div>))}
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 4 }}>★ honours</div>
            {p.awards.map((a, i) => (<div className="row-49" key={i} style={{ gridTemplateColumns: '60px 1fr' }}><span className="lat">{a.year}</span><span><b>{a.name}</b></span></div>))}
          </div>
        </div>
      </section>

      <section>
        <h2>Surveyor's note · reference</h2>
        <div className="quote-49">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}</cite></div>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr 1fr', gap: 18 }}>
          <div><div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 4 }}>★ instruments</div><p style={{ margin: 0, fontStyle: 'italic', fontFamily: '"EB Garamond", serif' }}>{p.skills.join(" · ")}</p></div>
          <div><div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 4 }}>★ tongues</div><p style={{ margin: 0, fontStyle: 'italic', fontFamily: '"EB Garamond", serif' }}>{p.languages.join(" · ")}</p></div>
          <div><div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 4 }}>★ currently surveying</div>{p.now.map((n, i) => (<div key={i} style={{ fontStyle: 'italic', fontFamily: '"EB Garamond", serif', fontSize: 12, padding: '2px 0' }}>· {n}</div>))}</div>
        </div>
      </section>

      <div className="colophon-49"><span>★ folio soil survey · sheet 014</span><span>surveyor: {p.name} · {p.email}</span><span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span></div>
    </div>
  </>);
}

/* ─── Register all wrappers as globals so preview.html's TEMPLATE_MAP
       can resolve them. These Claude Design versions intentionally override
       the original Tpl32–37 defined in templates-g.jsx (loaded earlier). ─── */
Object.assign(window, {
  Tpl32LegalBrief, Tpl33Gazette, Tpl34Transcript,
  Tpl35PatientChart, Tpl36Anatomy, Tpl37Rx,
  Tpl44Scoreboard, Tpl45AthleteCard, Tpl46TrainingLog,
  Tpl47FieldJournal, Tpl48Almanac, Tpl49SoilMap,
  Tpl50SilkIron, Tpl51Redacted, Tpl52LexFutura,
  Tpl53VitalsMonitor, Tpl54Lancet, Tpl55PathologyLab,
  Tpl56SurgicalBrief, Tpl57NhsClinical,
});


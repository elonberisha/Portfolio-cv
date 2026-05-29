/* global React, PERSONAS */

/* ─────────────────────────────────────────────────────────────────
   26 — BLUEPRINT GRID  ·  tech persona (suits arch / civil / mech eng)
   Signature: engineering drawing paper, title block, dimensions, line weights.
   ───────────────────────────────────────────────────────────────── */
const T26_CSS = `
.t26{ font-family: "JetBrains Mono", monospace; background: #1a4a6b; color: #e8f1f7; min-height: 100%; padding: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px);
  background-size: 12px 12px, 12px 12px, 60px 60px, 60px 60px;
}
.t26.dark{ background: #061829; }
.t26 .frame{ border: 1px solid currentColor; margin: 16px; padding: 22px 26px 26px; }
.t26 .titleblock{ border: 1px solid currentColor; display: grid; grid-template-columns: 1fr 240px; margin-bottom: 30px; }
.t26-mobile .titleblock{ grid-template-columns: 1fr; }
.t26 .titleblock .main-tb{ padding: 16px 18px; border-right: 1px solid currentColor; }
.t26-mobile .titleblock .main-tb{ border-right: 0; border-bottom: 1px solid currentColor; }
.t26 .titleblock .meta-tb{ padding: 14px 16px; font-size: 10px; line-height: 1.55; }
.t26 .titleblock .meta-tb .r{ display: grid; grid-template-columns: 70px 1fr; gap: 4px; padding: 3px 0; border-bottom: 1px solid color-mix(in oklab, currentColor 20%, transparent); }
.t26 .titleblock .meta-tb .r:last-child{ border-bottom: 0; }
.t26 .titleblock .meta-tb .r b{ font-weight: 400; opacity: .55; letter-spacing: 0.1em; text-transform: uppercase; font-size: 9px; }
.t26 h1{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: clamp(34px, 5vw, 56px); line-height: 1; letter-spacing: -0.01em; margin: 0 0 8px; text-transform: uppercase; }
.t26 .sub{ font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; }
.t26 .crosshair{ width: 18px; height: 18px; position: relative; display: inline-block; vertical-align: middle; margin-right: 8px; }
.t26 .crosshair::before, .t26 .crosshair::after{ content: ""; position: absolute; background: currentColor; }
.t26 .crosshair::before{ top: 50%; left: 0; right: 0; height: 1px; }
.t26 .crosshair::after{ left: 50%; top: 0; bottom: 0; width: 1px; }
.t26 .sheet{ border: 1px solid currentColor; padding: 16px 18px; margin-bottom: 14px; position: relative; }
.t26 .sheet .sheet-num{ position: absolute; top: -10px; right: 16px; background: #1a4a6b; padding: 0 8px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .8; }
.t26.dark .sheet .sheet-num{ background: #061829; }
.t26 h2{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; margin: 0 0 14px; display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px dashed currentColor; }
.t26 h2 small{ font-weight: 400; opacity: .55; }
.t26 .dim-grid{ display: grid; grid-template-columns: 80px 1fr 90px 70px; gap: 12px; padding: 8px 0; border-bottom: 1px dashed color-mix(in oklab, currentColor 25%, transparent); align-items: baseline; font-size: 12px; }
.t26-mobile .dim-grid{ grid-template-columns: 70px 1fr 60px; }
.t26-mobile .dim-grid .kind{ display: none; }
.t26 .dim-grid .dim{ font-size: 10px; opacity: .55; letter-spacing: 0.08em; }
.t26 .dim-grid b{ font-weight: 700; }
.t26 .dim-grid .desc{ font-size: 11px; opacity: .85; line-height: 1.4; }
.t26 .dim-grid .kind{ font-size: 10px; opacity: .65; letter-spacing: 0.08em; }
.t26 .dim-grid .yr{ font-size: 10px; opacity: .55; text-align: right; letter-spacing: 0.08em; }
.t26 .legend{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding: 14px 0; border-top: 1px dashed currentColor; border-bottom: 1px dashed currentColor; margin-bottom: 18px; }
.t26-mobile .legend{ grid-template-columns: repeat(2, 1fr); }
.t26 .legend > div{ font-size: 10px; }
.t26 .legend > div b{ display: block; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; margin-bottom: 4px; }
.t26 .legend > div small{ opacity: .55; letter-spacing: 0.1em; text-transform: uppercase; font-size: 9px; }
.t26 .notes{ font-size: 11px; line-height: 1.6; opacity: .85; padding: 12px 14px; border: 1px dashed currentColor; }
.t26 .notes b{ display: block; margin-bottom: 6px; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; opacity: 1; }
.t26 .footer-tb{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; border: 1px solid currentColor; margin-top: 20px; font-size: 10px; }
.t26-mobile .footer-tb{ grid-template-columns: 1fr; }
.t26 .footer-tb > div{ padding: 10px 14px; border-right: 1px solid currentColor; }
.t26 .footer-tb > div:last-child{ border-right: 0; }
.t26-mobile .footer-tb > div{ border-right: 0; border-bottom: 1px solid currentColor; }
.t26 .footer-tb b{ opacity: .55; display: block; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
`;
function Tpl26Blueprint({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T26_CSS}</style>
    <div className={`t26 ${mode === 'mobile' ? 't26-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="frame">
        <div className="titleblock">
          <div className="main-tb">
            <div className="sub"><span className="crosshair"></span>DWG № F-014 · Plot: {p.location}</div>
            <h1>{p.name}</h1>
            <div className="sub" style={{ marginTop: 6 }}>{p.role} · {p.school}</div>
          </div>
          <div className="meta-tb">
            <div className="r"><b>Drawn by</b><span>{p.name.split(" ").map(n=>n[0]).join(".")}.</span></div>
            <div className="r"><b>Scale</b><span>1:1 — life-size</span></div>
            <div className="r"><b>Date</b><span>12 / 05 / 26</span></div>
            <div className="r"><b>Sheet</b><span>01 of 04</span></div>
            <div className="r"><b>Status</b><span>FOR REVIEW</span></div>
          </div>
        </div>

        <div className="sheet">
          <div className="sheet-num">SHEET 01 · KEY DATA</div>
          <h2>Tagline <small>plate · abstract</small></h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>{p.tagline}</p>
          <div className="legend" style={{ marginBottom: 0, marginTop: 18 }}>
            <div><b>{p.projects.length}</b><small>Drawings on file</small></div>
            <div><b>{p.experience.length}</b><small>Sites worked</small></div>
            <div><b>{p.awards.length}</b><small>Distinctions</small></div>
            <div><b>{p.languages.length}</b><small>Languages</small></div>
          </div>
        </div>

        <div className="sheet">
          <div className="sheet-num">SHEET 02 · PROJECTS</div>
          <h2>Drawings <small>{p.projects.length} sheets</small></h2>
          {p.projects.map((pr, i) => (
            <div className="dim-grid" key={i}>
              <span className="dim">DWG-{String(i+1).padStart(3,"0")}</span>
              <div><b>{pr.title}</b><div className="desc">{pr.note}</div></div>
              <span className="kind">{pr.kind}</span>
              <span className="yr">{pr.year}</span>
            </div>
          ))}
        </div>

        <div className="sheet">
          <div className="sheet-num">SHEET 03 · WORK LOG</div>
          <h2>Sites worked <small>experience</small></h2>
          {p.experience.map((e, i) => (
            <div className="dim-grid" key={i} style={{ gridTemplateColumns: mode === 'mobile' ? '80px 1fr 60px' : '110px 1fr 130px 80px' }}>
              <span className="dim">{e.time.split(" ").pop()}</span>
              <div><b>{e.role}</b> · {e.org}<div className="desc">{e.note}</div></div>
              {mode !== 'mobile' && <span className="kind">{e.org}</span>}
              <span className="yr">{e.time}</span>
            </div>
          ))}
        </div>

        <div className="sheet">
          <div className="sheet-num">SHEET 04 · GENERAL NOTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 14 }}>
            <div className="notes">
              <b>Education</b>
              {p.education.map((e, i) => (<div key={i} style={{ marginBottom: 6 }}>· {e.degree} — {e.org} ({e.time})</div>))}
            </div>
            <div className="notes">
              <b>Materials list (skills)</b>
              {p.skills.join(" · ")}
            </div>
            <div className="notes">
              <b>Awards stamped</b>
              {p.awards.map((a, i) => (<div key={i} style={{ marginBottom: 4 }}>★ {a.name} — {a.year}</div>))}
            </div>
            <div className="notes">
              <b>Currently on the drafting table</b>
              {p.now.map((n, i) => (<div key={i} style={{ marginBottom: 4 }}>· {n}</div>))}
            </div>
          </div>
        </div>

        <div className="footer-tb">
          <div><b>Surveyor</b>{p.name}</div>
          <div><b>Email</b>{p.email}</div>
          <div><b>Folio</b>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   27 — CIRCUIT BOARD  ·  tech persona (suits EE / CE / CS)
   Signature: PCB traces, IC chips holding projects, copper layer feel.
   ───────────────────────────────────────────────────────────────── */
const T27_CSS = `
.t27{ font-family: "JetBrains Mono", monospace; background: #0a3622; color: #c5e8b4; min-height: 100%; padding: 0; position: relative; }
.t27.dark{ background: #021810; color: #b0d8a0; }
.t27 .board{ padding: 24px 24px 50px; position: relative; overflow: hidden; }
.t27 .traces{ position: absolute; inset: 0; pointer-events: none; opacity: .35; }
.t27 .traces svg{ width: 100%; height: 100%; }
.t27 .traces svg path{ stroke: #f7c948; stroke-width: 2; fill: none; }
.t27 .traces svg circle{ fill: #f7c948; }
.t27 .inner-27{ position: relative; z-index: 1; }
.t27 .silkscreen{ display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .75; padding-bottom: 14px; border-bottom: 1px solid currentColor; margin-bottom: 22px; }
.t27 h1{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: clamp(36px, 5.5vw, 64px); line-height: 1; letter-spacing: -0.01em; text-transform: uppercase; margin: 0 0 6px; }
.t27 .sub-27{ font-size: 11px; opacity: .75; letter-spacing: 0.1em; margin-bottom: 18px; }
.t27 .chip{ background: #14110b; color: #f7c948; padding: 14px 18px 22px; border-radius: 4px; margin: 14px 0; box-shadow: 0 0 0 1px rgba(247,201,72,.4), 0 6px 14px rgba(0,0,0,.4); position: relative; }
.t27 .chip::before, .t27 .chip::after{ content: ""; position: absolute; left: -8px; right: -8px; height: 6px; display: flex; justify-content: space-around; }
.t27 .chip .pins{ position: absolute; left: -8px; right: -8px; display: flex; justify-content: space-around; pointer-events: none; }
.t27 .chip .pins-top{ top: -4px; }
.t27 .chip .pins-bot{ bottom: -4px; }
.t27 .chip .pins i{ width: 6px; height: 6px; background: #c0c0c0; display: block; }
.t27 .chip .chip-id{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .7; text-transform: uppercase; }
.t27 .chip .chip-name{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 22px; letter-spacing: -0.01em; margin: 4px 0 6px; text-transform: uppercase; }
.t27 .chip .chip-desc{ font-size: 12px; line-height: 1.5; opacity: .85; }
.t27 .chip .chip-pins-row{ display: flex; justify-content: space-between; margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(247,201,72,.3); font-size: 10px; opacity: .65; }
.t27 h2{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; margin: 30px 0 14px; padding-bottom: 4px; border-bottom: 1px solid currentColor; display: flex; justify-content: space-between; }
.t27 .led{ display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #ff4040; box-shadow: 0 0 6px #ff4040; margin-right: 8px; vertical-align: middle; }
.t27 .led.g{ background: #6df5a4; box-shadow: 0 0 6px #6df5a4; }
.t27 .pad-grid{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.t27-mobile .pad-grid{ grid-template-columns: 1fr; }
.t27 .pad{ border: 1px solid currentColor; padding: 12px 14px; font-size: 11px; line-height: 1.5; }
.t27 .pad b{ font-size: 13px; font-weight: 700; }
.t27 .pad .role-27{ display: block; opacity: .65; font-size: 10px; margin-top: 4px; letter-spacing: 0.06em; text-transform: uppercase; }
.t27 .resistor-row{ display: flex; flex-wrap: wrap; gap: 8px; padding: 10px 0; }
.t27 .resistor-row .res{ display: inline-flex; align-items: center; gap: 6px; background: #c5e8b4; color: #0a3622; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; }
.t27.dark .resistor-row .res{ background: #b0d8a0; color: #021810; }
.t27 .resistor-row .res i{ width: 8px; height: 4px; background: #c44a1f; display: inline-block; border-radius: 1px; }
.t27 .resistor-row .res:nth-child(3n) i{ background: #1c4f8a; }
.t27 .resistor-row .res:nth-child(5n) i{ background: #5a2a2a; }
.t27 .pwr{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; border: 1px solid currentColor; margin-top: 24px; font-size: 10px; }
.t27-mobile .pwr{ grid-template-columns: 1fr; }
.t27 .pwr > div{ padding: 10px 12px; border-right: 1px solid currentColor; }
.t27 .pwr > div:last-child{ border-right: 0; }
.t27-mobile .pwr > div{ border-right: 0; border-bottom: 1px solid currentColor; }
.t27 .pwr b{ display: block; opacity: .55; letter-spacing: 0.14em; text-transform: uppercase; font-size: 9px; margin-bottom: 4px; }
`;
function Tpl27Circuit({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T27_CSS}</style>
    <div className={`t27 ${mode === 'mobile' ? 't27-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="board">
        <div className="traces" aria-hidden="true">
          <svg viewBox="0 0 600 800" preserveAspectRatio="none">
            <path d="M 20 60 L 200 60 L 200 200 L 580 200" />
            <path d="M 580 80 L 400 80 L 400 320 L 20 320" />
            <path d="M 20 460 L 300 460 L 300 600 L 580 600" />
            <path d="M 20 720 L 580 720" />
            <circle cx="200" cy="200" r="4" />
            <circle cx="400" cy="320" r="4" />
            <circle cx="300" cy="600" r="4" />
          </svg>
        </div>

        <div className="inner-27">
          <div className="silkscreen">
            <span>{'<'}REV 1.4 · 2026{'>'}</span><span>● PWR · ● TX · ● RX</span><span>FOLIO/PCB</span>
          </div>
          <h1>{p.name}</h1>
          <div className="sub-27"><span className="led g"></span>{p.role} · {p.school} · {p.location}</div>

          <p style={{ fontSize: 13, lineHeight: 1.6, opacity: .85, maxWidth: 620, margin: '0 0 22px' }}>{p.tagline}</p>

          <h2><span>U1 — U{p.projects.length} · Project ICs</span><small style={{ fontWeight: 400, opacity: .55, letterSpacing: '0.1em' }}>{p.projects.length} chips</small></h2>
          {p.projects.map((pr, i) => (
            <div className="chip" key={i}>
              <div className="pins pins-top">{Array.from({length: 7}, (_,k)=>(<i key={k}/>))}</div>
              <div className="pins pins-bot">{Array.from({length: 7}, (_,k)=>(<i key={k}/>))}</div>
              <div className="chip-id">U{i+1} · {pr.kind.toUpperCase().replace(/\s+/g, "")}-{pr.year.slice(-2)}</div>
              <div className="chip-name">{pr.title}</div>
              <div className="chip-desc">{pr.note}</div>
              <div className="chip-pins-row">
                <span>Vdd 3.3V</span><span>tx/rx</span><span>GND</span>
              </div>
            </div>
          ))}

          <h2><span>J1 — J{p.experience.length} · Headers / experience</span></h2>
          <div className="pad-grid">
            {p.experience.map((e, i) => (
              <div className="pad" key={i}>
                <b>{e.role}</b><span className="role-27">{e.org} · {e.time}</span>
                <div style={{ marginTop: 6, fontSize: 11, opacity: .85 }}>{e.note}</div>
              </div>
            ))}
          </div>

          <h2><span>R1 — R{p.skills.length} · Resistors / skills</span></h2>
          <div className="resistor-row">
            {p.skills.map((s, i) => (<span className="res" key={s}><i/>{s}</span>))}
          </div>

          <h2><span>EEPROM · CV data</span></h2>
          <div className="pad-grid">
            <div className="pad">
              <b>EDU · Education</b>
              <div style={{ marginTop: 6, fontSize: 11, opacity: .85 }}>
                {p.education.map((e, i) => (<div key={i}>· {e.degree} — {e.org} ({e.time})</div>))}
              </div>
            </div>
            <div className="pad">
              <b>AWD · Awards</b>
              <div style={{ marginTop: 6, fontSize: 11, opacity: .85 }}>
                {p.awards.map((a, i) => (<div key={i}>★ {a.name} ({a.year})</div>))}
              </div>
            </div>
            <div className="pad">
              <b>NOW · Currently</b>
              <div style={{ marginTop: 6, fontSize: 11, opacity: .85 }}>
                {p.now.map((n, i) => (<div key={i}>● {n}</div>))}
              </div>
            </div>
            <div className="pad">
              <b>LNG · Languages</b>
              <div style={{ marginTop: 6, fontSize: 11, opacity: .85 }}>{p.languages.join(" · ")}</div>
            </div>
          </div>

          <div className="pwr">
            <div><b>I/O · Email</b>{p.email}</div>
            <div><b>UART · Github</b>{p.socials[0]}</div>
            <div><b>HOST</b>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   28 — SPEC SHEET  ·  tech (suits CS / general eng)
   Signature: chip datasheet — features list, electrical characteristics,
              pin diagram, ordering info.
   ───────────────────────────────────────────────────────────────── */
const T28_CSS = `
.t28{ font-family: "Inter", sans-serif; background: #ffffff; color: #14181f; min-height: 100%; padding: 22px 26px 50px; font-size: 12px; line-height: 1.5; }
.t28.dark{ background: #0d1117; color: #e6e9ef; }
.t28 .ds-head{ display: grid; grid-template-columns: 1fr auto; padding-bottom: 16px; border-bottom: 2px solid currentColor; margin-bottom: 22px; align-items: end; }
.t28 .ds-head .partname{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; }
.t28 .ds-head h1{ font-family: "Inter", sans-serif; font-weight: 700; font-size: clamp(36px, 5vw, 56px); line-height: 1; letter-spacing: -0.025em; margin: 6px 0 4px; }
.t28 .ds-head .deck-28{ font-size: 14px; opacity: .8; max-width: 560px; }
.t28 .ds-head .meta-28{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.04em; text-align: right; line-height: 1.7; opacity: .75; }
.t28 .ds-head .meta-28 b{ color: var(--c-acc, #2d8a4f); font-weight: 600; }
.t28 h2{ font-family: "Inter", sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 8px; background: #14181f; color: #fff; margin: 26px 0 0; display: flex; justify-content: space-between; }
.t28.dark h2{ background: #e6e9ef; color: #0d1117; }
.t28 h2 small{ font-family: "JetBrains Mono", monospace; font-weight: 400; opacity: .65; letter-spacing: 0.06em; }
.t28 .row28{ display: grid; grid-template-columns: 24px 1fr 200px 70px; gap: 0; padding: 9px 8px; border-bottom: 1px solid currentColor; font-size: 12px; align-items: baseline; }
.t28-mobile .row28{ grid-template-columns: 24px 1fr 70px; }
.t28-mobile .row28 .b28{ display: none; }
.t28 .row28 .n28{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; letter-spacing: 0.06em; }
.t28 .row28 .a28 b{ font-weight: 600; }
.t28 .row28 .b28{ font-size: 11px; opacity: .7; font-family: "JetBrains Mono", monospace; }
.t28 .row28 .c28{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .65; text-align: right; }
.t28 .features-row{ display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0; border-left: 1px solid currentColor; border-right: 1px solid currentColor; margin-bottom: 0; }
.t28-mobile .features-row{ grid-template-columns: 1fr 1fr; }
.t28 .features-row > div{ padding: 12px 12px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor; font-size: 11px; }
.t28 .features-row > div:nth-child(4n){ border-right: 0; }
.t28-mobile .features-row > div:nth-child(2n){ border-right: 0; }
.t28-mobile .features-row > div{ border-right: 1px solid currentColor; }
.t28 .features-row > div b{ display: block; font-family: "JetBrains Mono", monospace; font-size: 9px; opacity: .55; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
.t28 .pin-diagram{ display: grid; grid-template-columns: 1fr; gap: 0; padding: 14px 8px; border-left: 1px solid currentColor; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; font-size: 11px; }
.t28 .pin{ display: grid; grid-template-columns: 50px 24px 1fr; gap: 12px; padding: 5px 0; align-items: baseline; border-bottom: 1px dashed color-mix(in oklab, currentColor 25%, transparent); }
.t28 .pin:last-child{ border-bottom: 0; }
.t28 .pin .pn{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; }
.t28 .pin b{ font-weight: 600; }
.t28 .summary-28{ font-size: 13px; line-height: 1.65; padding: 14px 16px; border: 1px solid currentColor; border-top: 0; }
.t28 .summary-28 p{ margin: 0; max-width: 640px; }
.t28 .order-28{ display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0; border: 1px solid currentColor; border-top: 0; }
.t28-mobile .order-28{ grid-template-columns: 1fr 1fr; }
.t28 .order-28 > div{ padding: 12px 14px; border-right: 1px solid currentColor; font-size: 11px; }
.t28 .order-28 > div:nth-child(4n){ border-right: 0; }
.t28-mobile .order-28 > div:nth-child(2n){ border-right: 0; }
.t28 .order-28 b{ display: block; font-family: "JetBrains Mono", monospace; font-size: 9px; opacity: .55; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
.t28 .order-28 .val{ font-family: "JetBrains Mono", monospace; font-size: 12px; }
`;
function Tpl28SpecSheet({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T28_CSS}</style>
    <div className={`t28 ${mode === 'mobile' ? 't28-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="ds-head">
        <div>
          <div className="partname">PART № JP-2026 · {p.role.toUpperCase()} · REV 4.0</div>
          <h1>{p.name}</h1>
          <div className="deck-28">{p.tagline} <b>Status:</b> Available for full-time / new grad · September 2026.</div>
        </div>
        <div className="meta-28">
          <b>UWaterloo CS</b><br/>
          GPA <b>3.92 / 4.0</b><br/>
          {p.location}<br/>
          {p.email}
        </div>
      </div>

      <h2>1.0 Features <small>at a glance</small></h2>
      <div className="features-row">
        <div><b>Languages</b>Go · Rust · Python · TypeScript</div>
        <div><b>Domains</b>Distributed systems, storage, infra</div>
        <div><b>Internships</b>4 (Stripe, Shopify, etc.)</div>
        <div><b>Repos</b>14 public · 2.1k commits in 2025</div>
        <div><b>Education</b>BSc CS · UWaterloo · ETH exchange</div>
        <div><b>Awards</b>{p.awards.length} distinctions</div>
        <div><b>Open source</b>tinyk8s · ferro-db · lex.fish</div>
        <div><b>Availability</b>September 2026 · relocate-ready</div>
      </div>

      <h2>2.0 Selected projects <small>{p.projects.length} entries</small></h2>
      <div style={{ border: '1px solid currentColor', borderTop: 0 }}>
        {p.projects.map((pr, i) => (
          <div className="row28" key={i}>
            <span className="n28">{String(i+1).padStart(2, "0")}</span>
            <span className="a28"><b>{pr.title}</b> — <span style={{ opacity: .8 }}>{pr.note}</span></span>
            <span className="b28">{pr.kind}</span>
            <span className="c28">{pr.year}</span>
          </div>
        ))}
      </div>

      <h2>3.0 Experience <small>professional</small></h2>
      <div style={{ border: '1px solid currentColor', borderTop: 0 }}>
        {p.experience.map((e, i) => (
          <div className="row28" key={i}>
            <span className="n28">{String(i+1).padStart(2, "0")}</span>
            <span className="a28"><b>{e.role}</b> · {e.org} — <span style={{ opacity: .8 }}>{e.note}</span></span>
            <span className="b28">{e.org}</span>
            <span className="c28">{e.time.split(" ").pop()}</span>
          </div>
        ))}
      </div>

      <h2>4.0 Pinout <small>cv at a glance</small></h2>
      <div className="pin-diagram">
        {p.education.map((e, i) => (<div className="pin" key={i}><span className="pn">EDU{i+1}</span><span>{e.time}</span><span><b>{e.degree}</b> — {e.org}</span></div>))}
        {p.awards.map((a, i) => (<div className="pin" key={i}><span className="pn">AWD{i+1}</span><span>{a.year}</span><span>{a.name}</span></div>))}
      </div>

      <h2>5.0 Application notes <small>tagline</small></h2>
      <div className="summary-28">
        <p>{p.tagline} Looking for software engineering roles in distributed systems, storage, or developer infra. Comfortable in Go and Rust production codebases, comfortable in a Linux machine, and most comfortable on a team that ships small, careful pieces of work.</p>
      </div>

      <h2>6.0 Ordering information <small>contact</small></h2>
      <div className="order-28">
        <div><b>Part №</b><span className="val">JP-2026</span></div>
        <div><b>Email</b><span className="val">{p.email}</span></div>
        <div><b>Repo</b><span className="val">{p.socials[0]}</span></div>
        <div><b>Online</b><span className="val">{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   29 — QUARTERLY REPORT  ·  business (finance / accounting)
   Signature: annual report style with cover, KPIs, charts, exec summary.
   ───────────────────────────────────────────────────────────────── */
const T29_CSS = `
.t29{ font-family: "Inter", sans-serif; background: #f5f3ee; color: #1a1714; min-height: 100%; padding: 0; font-size: 13px; line-height: 1.55; }
.t29.dark{ background: #0d0d10; color: #efece4; }
.t29 .topbar-29{ display: flex; justify-content: space-between; padding: 14px 28px; border-bottom: 1px solid currentColor; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; }
.t29 .cover{ padding: 56px 28px 36px; border-bottom: 1px solid currentColor; }
.t29-mobile .cover{ padding: 32px 18px; }
.t29 .cover .yr{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .65; }
.t29 .cover h1{ font-family: "Inter", sans-serif; font-weight: 700; font-size: clamp(40px, 6vw, 78px); line-height: 0.95; letter-spacing: -0.035em; margin: 18px 0 14px; max-width: 720px; }
.t29 .cover .deck-29{ font-size: 17px; line-height: 1.45; max-width: 580px; opacity: .85; }
.t29 .cover .who{ margin-top: 26px; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.06em; display: flex; gap: 24px; opacity: .75; }
.t29-mobile .cover .who{ flex-direction: column; gap: 6px; }
.t29 section.r-section{ padding: 36px 28px; border-bottom: 1px solid currentColor; }
.t29-mobile section.r-section{ padding: 26px 18px; }
.t29 .r-head{ display: grid; grid-template-columns: 1fr auto; align-items: baseline; padding-bottom: 16px; border-bottom: 1px solid currentColor; margin-bottom: 22px; }
.t29 .r-head .num-29{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; }
.t29 .r-head h2{ font-family: "Inter", sans-serif; font-weight: 700; font-size: clamp(22px, 3vw, 32px); margin: 4px 0 0; letter-spacing: -0.02em; }
.t29 .kpis{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid currentColor; }
.t29-mobile .kpis{ grid-template-columns: repeat(2, 1fr); }
.t29 .kpi{ padding: 22px 22px 18px; border-right: 1px solid currentColor; border-bottom: 0; }
.t29 .kpi:nth-child(4n){ border-right: 0; }
.t29-mobile .kpi{ border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; }
.t29-mobile .kpi:nth-child(2n){ border-right: 0; }
.t29 .kpi .lbl-k{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; }
.t29 .kpi .v-k{ font-family: "Inter", sans-serif; font-weight: 700; font-size: 36px; letter-spacing: -0.035em; line-height: 1; margin: 6px 0 6px; }
.t29 .kpi .ch-k{ font-size: 11px; font-family: "JetBrains Mono", monospace; }
.t29 .kpi .ch-k.up{ color: #1f7a3f; }
.t29 .kpi .ch-k.up::before{ content: "▲ "; }
.t29 .chart-29{ height: 100px; display: flex; align-items: end; gap: 5px; margin: 18px 0 6px; padding-top: 12px; border-top: 1px dashed currentColor; }
.t29 .chart-29 i{ flex: 1; background: currentColor; min-height: 4px; opacity: .85; }
.t29 .chart-29 i.acc{ background: #1f7a3f; opacity: 1; }
.t29 .ax-29{ display: flex; justify-content: space-between; font-family: "JetBrains Mono", monospace; font-size: 9px; opacity: .55; letter-spacing: 0.06em; padding-bottom: 8px; }
.t29 .ledger-29{ width: 100%; border-collapse: collapse; font-family: "Inter", sans-serif; font-size: 13px; }
.t29 .ledger-29 th{ text-align: left; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: .55; padding: 8px 10px; border-bottom: 1px solid currentColor; font-weight: 500; }
.t29 .ledger-29 td{ padding: 10px 10px; border-bottom: 1px solid color-mix(in oklab, currentColor 20%, transparent); vertical-align: top; }
.t29 .ledger-29 td.r{ text-align: right; font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .75; }
.t29 .ledger-29 td b{ font-weight: 600; }
.t29 .pull-29{ font-family: "Instrument Serif", serif; font-style: italic; font-size: 26px; line-height: 1.3; padding: 24px 28px; max-width: 720px; }
.t29 .pull-29 cite{ display: block; font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-top: 14px; }
.t29 .summary-29{ font-size: 14px; line-height: 1.65; max-width: 720px; }
.t29 .summary-29 p{ margin: 0 0 10px; }
.t29 .summary-29 p::first-letter{ font-family: "Instrument Serif", serif; font-size: 3em; float: left; line-height: 0.9; padding: 4px 8px 0 0; font-style: italic; font-weight: 400; }
.t29 .grid2{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t29-mobile .grid2{ grid-template-columns: 1fr; }
.t29 .foot-29{ padding: 22px 28px; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .75; }
`;
function Tpl29Quarterly({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T29_CSS}</style>
    <div className={`t29 ${mode === 'mobile' ? 't29-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="topbar-29"><span>portfolio-cv.online · Q2 · 2026</span><span>{p.location}</span><span>Public · for distribution</span></div>

      <section className="cover">
        <div className="yr">Annual Review · 2025 — 2026</div>
        <h1>{p.name} <span style={{ opacity: .55, fontWeight: 400 }}>— {p.role}</span></h1>
        <p className="deck-29">{p.tagline} What follows is a working annual review — projects shipped, positions held, what's next.</p>
        <div className="who">
          <span><b style={{ opacity: 1, color: '#1f7a3f' }}>School</b> · {p.school}</span>
          <span><b style={{ opacity: 1, color: '#1f7a3f' }}>Based</b> · {p.location}</span>
          <span><b style={{ opacity: 1, color: '#1f7a3f' }}>Email</b> · {p.email}</span>
        </div>
      </section>

      <section className="r-section">
        <div className="r-head"><div><div className="num-29">Section 01</div><h2>Key figures · this year</h2></div></div>
        <div className="kpis">
          <div className="kpi"><div className="lbl-k">Projects shipped</div><div className="v-k">{p.projects.length}</div><div className="ch-k up">+{p.projects.length - 2} vs. last year</div></div>
          <div className="kpi"><div className="lbl-k">Positions held</div><div className="v-k">{p.experience.length}</div><div className="ch-k up">+1</div></div>
          <div className="kpi"><div className="lbl-k">Newsletter subs</div><div className="v-k">4.2k</div><div className="ch-k up">+82%</div></div>
          <div className="kpi"><div className="lbl-k">Honours</div><div className="v-k">{p.awards.length}</div><div className="ch-k up">+1</div></div>
        </div>
        <div className="chart-29">
          {[20, 25, 30, 28, 32, 38, 42, 48, 52, 64, 70, 82].map((h, i) => (<i key={i} style={{ height: `${h}%` }} className={i > 8 ? 'acc' : ''} />))}
        </div>
        <div className="ax-29">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (<span key={m}>{m}</span>))}</div>
      </section>

      <section className="r-section">
        <div className="r-head"><div><div className="num-29">Section 02</div><h2>Letter from the desk</h2></div></div>
        <div className="summary-29">
          <p>This was the year operations stopped being the only thing I noticed. I came to HEC after two years at Lori, and the analytical training has begun to settle in — modelling, market structure, the calmer pace of writing.</p>
          <p>What I'm planning for next year: more research with operators in West Africa, an internship outside consulting, and a quieter newsletter that goes deeper, less often. The line items below describe how the work landed.</p>
        </div>
      </section>

      <section className="r-section">
        <div className="r-head"><div><div className="num-29">Section 03</div><h2>Projects · line items</h2></div><span className="num-29">{p.projects.length} items · in order</span></div>
        <table className="ledger-29">
          <thead><tr><th style={{ width: 60 }}>№</th><th>Project</th><th>Type</th><th className="r" style={{ textAlign: 'right' }}>Year</th></tr></thead>
          <tbody>
            {p.projects.map((pr, i) => (<tr key={i}><td className="r">{String(i+1).padStart(2,"0")}</td><td><b>{pr.title}</b><div style={{ opacity: .7, fontSize: 12, marginTop: 2 }}>{pr.note}</div></td><td className="r" style={{ textAlign: 'left' }}>{pr.kind}</td><td className="r">{pr.year}</td></tr>))}
          </tbody>
        </table>
      </section>

      <section className="r-section">
        <div className="r-head"><div><div className="num-29">Section 04</div><h2>Experience · in service of</h2></div></div>
        <table className="ledger-29">
          <tbody>
            {p.experience.map((e, i) => (<tr key={i}><td className="r" style={{ width: 100 }}>{e.time}</td><td><b>{e.role}</b> · {e.org}<div style={{ opacity: .7, fontSize: 12, marginTop: 2 }}>{e.note}</div></td></tr>))}
          </tbody>
        </table>
      </section>

      <div className="pull-29">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}, in last year's reference letter</cite></div>

      <section className="r-section">
        <div className="r-head"><div><div className="num-29">Section 05</div><h2>Notes · education, languages, what's next</h2></div></div>
        <div className="grid2">
          <table className="ledger-29">
            <thead><tr><th>Education</th><th className="r" style={{ textAlign: 'right' }}>Years</th></tr></thead>
            <tbody>{p.education.map((e, i) => (<tr key={i}><td><b>{e.degree}</b><div style={{ opacity: .7, fontSize: 12 }}>{e.org}</div></td><td className="r">{e.time}</td></tr>))}</tbody>
          </table>
          <table className="ledger-29">
            <thead><tr><th>Honours</th><th className="r" style={{ textAlign: 'right' }}>Year</th></tr></thead>
            <tbody>{p.awards.map((a, i) => (<tr key={i}><td><b>{a.name}</b></td><td className="r">{a.year}</td></tr>))}</tbody>
          </table>
        </div>
        <div style={{ marginTop: 18, fontSize: 13, lineHeight: 1.6 }}>
          <b style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: .65 }}>What's next</b>
          <ul style={{ paddingLeft: 18, margin: '6px 0 0' }}>{p.now.map((n, i) => (<li key={i} style={{ marginBottom: 4 }}>{n}</li>))}</ul>
        </div>
      </section>

      <div className="foot-29"><span>End of report</span><span>{p.email}</span><span>printed digitally, 100% recycled bits</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   30 — BLOOMBERG TERMINAL  ·  business / finance
   Signature: orange-on-black trading terminal. Tickers, panels, function keys.
   ───────────────────────────────────────────────────────────────── */
const T30_CSS = `
.t30{ font-family: "JetBrains Mono", monospace; background: #0a0a0a; color: #f9a437; min-height: 100%; padding: 0; font-size: 12px; line-height: 1.55; }
.t30 .topbar-30{ background: #1c1410; padding: 6px 12px; display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.08em; border-bottom: 1px solid #f9a437; }
.t30 .topbar-30 b{ color: #f9a437; }
.t30 .topbar-30 .clock{ color: #6df5a4; }
.t30 .ticker-row{ background: #000; padding: 6px 12px; font-size: 11px; overflow: hidden; border-bottom: 1px solid #f9a437; white-space: nowrap; }
.t30 .ticker-row div{ display: inline-block; animation: t30tick 32s linear infinite; }
@keyframes t30tick{ to{ transform: translateX(-50%) } }
.t30 .ticker-row span{ padding: 0 18px; }
.t30 .ticker-row .up{ color: #6df5a4; }
.t30 .ticker-row .dn{ color: #ff5c5c; }
.t30 .head-30{ padding: 18px 16px; border-bottom: 1px solid #f9a437; }
.t30 .head-30 h1{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: clamp(28px, 4.5vw, 52px); line-height: 1; letter-spacing: -0.01em; margin: 6px 0 4px; color: #f9a437; text-transform: uppercase; }
.t30 .head-30 .px{ font-size: 11px; opacity: .75; letter-spacing: 0.06em; }
.t30 .panes{ display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.t30-mobile .panes{ grid-template-columns: 1fr; }
.t30 .pane{ border: 1px solid #f9a437; border-top: 0; border-left: 0; padding: 12px 14px; min-height: 200px; }
.t30 .pane:nth-child(odd){ border-left: 1px solid #f9a437; }
.t30-mobile .pane{ border-left: 1px solid #f9a437; }
.t30 .pane h3{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #f9a437; margin: 0 0 10px; padding-bottom: 4px; border-bottom: 1px dashed #f9a437; display: flex; justify-content: space-between; }
.t30 .pane h3 small{ font-weight: 400; opacity: .65; color: #c5c5c5; }
.t30 .row-30{ display: grid; grid-template-columns: 60px 1fr 90px 50px; gap: 8px; padding: 4px 0; border-bottom: 1px dotted rgba(249,164,55,.25); color: #c5c5c5; font-size: 11px; align-items: baseline; }
.t30-mobile .row-30{ grid-template-columns: 50px 1fr 50px; }
.t30-mobile .row-30 .meta30{ display: none; }
.t30 .row-30 .yr30{ color: #f9a437; font-size: 10px; }
.t30 .row-30 b{ color: #f9a437; font-weight: 700; }
.t30 .row-30 .meta30{ font-size: 10px; opacity: .7; }
.t30 .row-30 .up{ color: #6df5a4; text-align: right; }
.t30 .row-30 .dn{ color: #ff5c5c; text-align: right; }
.t30 .kv-30{ display: grid; grid-template-columns: 110px 1fr; gap: 6px; padding: 4px 0; font-size: 11px; }
.t30 .kv-30 b{ color: #f9a437; font-weight: 400; }
.t30 .kv-30 span{ color: #c5c5c5; }
.t30 .chart-30{ display: flex; gap: 1px; align-items: end; height: 70px; padding: 8px 0; }
.t30 .chart-30 i{ flex: 1; background: #f9a437; min-height: 2px; }
.t30 .chart-30 i.dn{ background: #ff5c5c; }
.t30 .footer-30{ background: #1c1410; padding: 8px 12px; display: flex; gap: 14px; flex-wrap: wrap; font-size: 10px; border-top: 1px solid #f9a437; }
.t30 .footer-30 span{ color: #c5c5c5; }
.t30 .footer-30 span b{ color: #f9a437; background: #f9a437; color: #000; padding: 0 5px; font-weight: 700; margin-right: 4px; }
.t30 .blink-cur{ display: inline-block; width: 8px; height: 12px; background: #f9a437; vertical-align: middle; margin-left: 4px; animation: t30blink 0.9s steps(1) infinite; }
@keyframes t30blink{ 50%{ opacity: 0; } }
`;
function Tpl30Bloomberg({ mode, dark }) {
  const p = PERSONAS.business;
  const ticker = ['AOKW +12.4', 'STRTG +3.2', 'MKTPL -0.4', 'BAIN +1.8', 'LORI +24.0', 'HEC +0.7', 'NEWS +85.0', 'PARIS +0.1'];
  return (<>
    <style>{T30_CSS}</style>
    <div className={`t30 ${mode === 'mobile' ? 't30-mobile' : ''}`}>
      <div className="topbar-30">
        <span><b>AOKW &lt;CV&gt;</b> CN Equity · Curriculum Vitae</span>
        <span className="clock">12 MAY 26 · 14:22 PARIS</span>
        <span>HELP &lt;F1&gt; · MENU &lt;F2&gt; · NEWS &lt;F4&gt;</span>
      </div>
      <div className="ticker-row">
        <div>{[...ticker, ...ticker].map((t, i) => {
          const [n, v] = t.split(' ');
          const up = v.startsWith('+');
          return (<span key={i}>{n} <span className={up ? 'up' : 'dn'}>{v}</span></span>);
        })}</div>
      </div>

      <div className="head-30">
        <div className="px">AOKW &lt;Equity&gt; · {p.role.toUpperCase()} · {p.school.toUpperCase()}</div>
        <h1>{p.name}<span className="blink-cur"></span></h1>
        <div className="px" style={{ marginTop: 8 }}>{p.tagline}</div>
      </div>

      <div className="panes">
        <div className="pane">
          <h3><span>BIO &lt;F1&gt;</span><small>profile</small></h3>
          <div className="kv-30"><b>Role</b><span>{p.role}</span></div>
          <div className="kv-30"><b>School</b><span>{p.school}</span></div>
          <div className="kv-30"><b>Based</b><span>{p.location}</span></div>
          <div className="kv-30"><b>Status</b><span style={{ color: '#6df5a4' }}>OPEN · STRATEGY/PRODUCT</span></div>
          <div className="kv-30"><b>Avail</b><span>Sept 2026 · relocate</span></div>
          <div className="kv-30"><b>Email</b><span>{p.email}</span></div>
          <div className="kv-30"><b>Languages</b><span>{p.languages.length} · {p.languages.slice(0, 2).join(", ")}</span></div>
        </div>

        <div className="pane">
          <h3><span>HOLDINGS &lt;F2&gt;</span><small>projects · {p.projects.length} positions</small></h3>
          {p.projects.map((pr, i) => (
            <div className="row-30" key={i}>
              <span className="yr30">{pr.year}</span>
              <span><b>{pr.title.toUpperCase()}</b><div className="meta30">{pr.note}</div></span>
              <span className="meta30">{pr.kind}</span>
              <span className={i % 2 === 0 ? 'up' : 'dn'}>{i % 2 === 0 ? '+' : '-'}{(Math.random() * 14 + 2).toFixed(1)}%</span>
            </div>
          ))}
          <div className="chart-30" style={{ marginTop: 10 }}>
            {Array.from({length: 28}, (_, i) => (<i key={i} style={{ height: `${30 + (i * 17 + 30) % 70}%` }} className={i > 18 ? '' : i % 4 === 0 ? 'dn' : ''} />))}
          </div>
        </div>

        <div className="pane">
          <h3><span>EMPLOYMENT &lt;F3&gt;</span><small>experience</small></h3>
          {p.experience.map((e, i) => (
            <div className="row-30" key={i} style={{ gridTemplateColumns: mode === 'mobile' ? '80px 1fr' : '110px 1fr 100px' }}>
              <span className="yr30">{e.time}</span>
              <span><b>{e.role.toUpperCase()}</b> · {e.org}<div className="meta30">{e.note}</div></span>
              {mode !== 'mobile' && <span className="meta30">{e.org}</span>}
            </div>
          ))}
        </div>

        <div className="pane">
          <h3><span>FUNDAMENTALS &lt;F4&gt;</span><small>education · awards</small></h3>
          {p.education.map((e, i) => (
            <div className="row-30" key={i} style={{ gridTemplateColumns: '90px 1fr' }}>
              <span className="yr30">{e.time}</span>
              <span><b>{e.degree.toUpperCase()}</b><div className="meta30">{e.org}</div></span>
            </div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 6, borderTop: '1px dashed rgba(249,164,55,.3)' }}>
            <div style={{ color: '#f9a437', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Awards</div>
            {p.awards.map((a, i) => (
              <div key={i} className="row-30" style={{ gridTemplateColumns: '60px 1fr' }}>
                <span className="yr30">{a.year}</span><span><b>{a.name.toUpperCase()}</b></span>
              </div>
            ))}
          </div>
        </div>

        <div className="pane">
          <h3><span>NEWS &lt;F5&gt;</span><small>writing · talks</small></h3>
          {p.writing.map((w, i) => (
            <div key={i} className="row-30" style={{ gridTemplateColumns: '60px 1fr 100px' }}>
              <span className="yr30">{w.year}</span><span><b>{w.title.toUpperCase()}</b></span><span className="meta30">{w.where}</span>
            </div>
          ))}
        </div>

        <div className="pane">
          <h3><span>ANALYST &lt;F6&gt;</span><small>reference</small></h3>
          <div style={{ color: '#c5c5c5', fontSize: 12, lineHeight: 1.55, padding: '6px 0' }}>"{p.testimonials[0].quote}"</div>
          <div style={{ color: '#f9a437', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 10 }}>— {p.testimonials[0].author}</div>
          <div style={{ marginTop: 16, borderTop: '1px dashed rgba(249,164,55,.3)', paddingTop: 10 }}>
            <div style={{ color: '#f9a437', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Recommendation</div>
            <div style={{ color: '#6df5a4', fontSize: 14, fontWeight: 700, marginTop: 4 }}>STRONG BUY · 12-MTH TARGET: NEW GRAD SOC</div>
          </div>
        </div>
      </div>

      <div className="footer-30">
        <span><b>F1</b>BIO</span><span><b>F2</b>HOLD</span><span><b>F3</b>EMPL</span><span><b>F4</b>FUND</span><span><b>F5</b>NEWS</span><span><b>F6</b>ANLY</span><span><b>GO</b>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   31 — LEDGER  ·  business (accounting / finance)
   Signature: green-bar accounting paper, debits/credits, columns.
   ───────────────────────────────────────────────────────────────── */
const T31_CSS = `
.t31{ font-family: "JetBrains Mono", monospace; background: #e8efe2; color: #1d1d1d; min-height: 100%; padding: 20px; font-size: 12px; line-height: 1.6;
  background-image: repeating-linear-gradient(180deg, #e8efe2 0 22px, #d4e6c5 22px 44px);
}
.t31.dark{ background-color: #131815; color: #d4e6c5;
  background-image: repeating-linear-gradient(180deg, #131815 0 22px, #1c241d 22px 44px);
}
.t31 .doc-31{ background: rgba(255,255,255,.5); border: 1.5px solid currentColor; padding: 0; }
.t31.dark .doc-31{ background: rgba(0,0,0,.15); }
.t31 .head-31{ padding: 16px 22px; border-bottom: 1.5px solid currentColor; }
.t31 .head-31 .acct{ font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; }
.t31 .head-31 h1{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: clamp(28px, 4.5vw, 48px); margin: 6px 0; letter-spacing: -0.01em; line-height: 1; text-transform: uppercase; }
.t31 .head-31 .sub-31{ font-size: 11px; opacity: .8; }
.t31 .head-31 .meta-31{ display: flex; gap: 22px; margin-top: 12px; font-size: 11px; flex-wrap: wrap; opacity: .85; }
.t31-mobile .head-31 .meta-31{ gap: 8px; flex-direction: column; }
.t31 .head-31 .meta-31 b{ opacity: .55; letter-spacing: 0.08em; text-transform: uppercase; font-size: 9px; }
.t31 .sect-31{ padding: 14px 22px; border-bottom: 1.5px solid currentColor; }
.t31 .sect-31 h2{ font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; margin: 0 0 12px; display: flex; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid currentColor; }
.t31 .row-31{ display: grid; grid-template-columns: 80px 1fr 140px 90px 90px; gap: 10px; padding: 6px 0; border-bottom: 1px dotted currentColor; font-size: 11px; align-items: baseline; }
.t31-mobile .row-31{ grid-template-columns: 70px 1fr 70px; }
.t31-mobile .row-31 .ref, .t31-mobile .row-31 .cr{ display: none; }
.t31 .row-31:last-child{ border-bottom: 0; }
.t31 .row-31 .date{ font-size: 10px; opacity: .7; }
.t31 .row-31 .desc-31{ font-weight: 400; }
.t31 .row-31 .desc-31 b{ font-weight: 700; }
.t31 .row-31 .desc-31 small{ display: block; opacity: .65; font-size: 10px; margin-top: 2px; }
.t31 .row-31 .ref{ font-size: 10px; opacity: .65; }
.t31 .row-31 .dr, .t31 .row-31 .cr{ text-align: right; }
.t31 .row-31 .dr{ color: #1c3b1c; }
.t31.dark .row-31 .dr{ color: #6df5a4; }
.t31 .totals-31{ display: grid; grid-template-columns: 80px 1fr 140px 90px 90px; gap: 10px; padding: 12px 0 4px; font-weight: 700; font-size: 13px; border-top: 2px solid currentColor; }
.t31-mobile .totals-31{ grid-template-columns: 1fr 70px; }
.t31-mobile .totals-31 > span:not(:first-child):not(:last-child){ display: none; }
.t31 .totals-31 .lbl{ grid-column: 1 / 4; }
.t31-mobile .totals-31 .lbl{ grid-column: auto; }
.t31 .stamp-31{ display: inline-block; border: 2.5px solid #1c3b1c; color: #1c3b1c; padding: 4px 12px; font-weight: 700; letter-spacing: 0.18em; transform: rotate(-4deg); font-size: 11px; text-transform: uppercase; margin-top: 12px; }
.t31.dark .stamp-31{ color: #6df5a4; border-color: #6df5a4; }
.t31 .colophon-31{ padding: 14px 22px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .65; }
.t31-mobile .colophon-31{ flex-direction: column; gap: 4px; }
`;
function Tpl31Ledger({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T31_CSS}</style>
    <div className={`t31 ${mode === 'mobile' ? 't31-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="doc-31">
        <div className="head-31">
          <div className="acct">ACCOUNT № AO-2026 · CV · CAREER LEDGER</div>
          <h1>{p.name}</h1>
          <div className="sub-31">{p.role} · {p.school} · {p.tagline}</div>
          <div className="meta-31">
            <span><b>BOOKKEEPER</b><br/>{p.name.split(" ").map(n=>n[0]).join(".")}.</span>
            <span><b>OPEN</b><br/>{p.education[p.education.length-1].time.split("–")[0]}</span>
            <span><b>BALANCE</b><br/>OPEN</span>
            <span><b>STATUS</b><br/>OPEN FOR HIRE · SEP 2026</span>
            <span><b>EMAIL</b><br/>{p.email}</span>
          </div>
        </div>

        <div className="sect-31">
          <h2><span>JOURNAL · PROJECTS</span><span style={{ fontWeight: 400, opacity: .55 }}>{p.projects.length} ENTRIES</span></h2>
          <div className="row-31" style={{ fontWeight: 700, fontSize: 9, letterSpacing: '0.14em', opacity: .7, borderBottom: '1px solid currentColor', textTransform: 'uppercase' }}>
            <span>DATE</span><span>DESCRIPTION</span><span className="ref">CATEGORY</span><span className="dr">CREDIT</span><span className="cr">UNITS</span>
          </div>
          {p.projects.map((pr, i) => (
            <div className="row-31" key={i}>
              <span className="date">{pr.year}</span>
              <div className="desc-31"><b>{pr.title}</b><small>{pr.note}</small></div>
              <span className="ref">{pr.kind}</span>
              <span className="dr">+{(20 + i * 7).toFixed(2)}</span>
              <span className="cr">{i + 1}</span>
            </div>
          ))}
          <div className="totals-31"><span className="lbl">SUBTOTAL · PROJECTS</span><span></span><span></span><span className="dr">+{(p.projects.length * 25).toFixed(2)}</span><span>{p.projects.length}</span></div>
        </div>

        <div className="sect-31">
          <h2><span>JOURNAL · EXPERIENCE</span><span style={{ fontWeight: 400, opacity: .55 }}>{p.experience.length} ENTRIES</span></h2>
          {p.experience.map((e, i) => (
            <div className="row-31" key={i}>
              <span className="date">{e.time}</span>
              <div className="desc-31"><b>{e.role}</b> @ {e.org}<small>{e.note}</small></div>
              <span className="ref">{e.org}</span>
              <span className="dr">+{(40 + i * 10).toFixed(2)}</span>
              <span className="cr">{e.time.includes("–") ? "ongoing" : "1×"}</span>
            </div>
          ))}
          <div className="totals-31"><span className="lbl">SUBTOTAL · EXPERIENCE</span><span></span><span></span><span className="dr">+{(p.experience.length * 50).toFixed(2)}</span><span>{p.experience.length}</span></div>
        </div>

        <div className="sect-31">
          <h2><span>JOURNAL · EDUCATION · AWARDS</span></h2>
          {[...p.education, ...p.awards].map((it, i) => {
            const isEdu = 'degree' in it;
            return (
              <div className="row-31" key={i}>
                <span className="date">{isEdu ? it.time : it.year}</span>
                <div className="desc-31"><b>{isEdu ? it.degree : it.name}</b>{isEdu ? <small>{it.org}</small> : null}</div>
                <span className="ref">{isEdu ? "Education" : "Award"}</span>
                <span className="dr">+{isEdu ? "20.00" : "15.00"}</span>
                <span className="cr">★</span>
              </div>
            );
          })}
        </div>

        <div className="sect-31">
          <h2><span>NOTES</span></h2>
          <div style={{ fontSize: 11, lineHeight: 1.65, marginBottom: 8 }}>
            <b>● Currently:</b> {p.now.join(" · ")}
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.65, marginBottom: 8 }}>
            <b>● Skills:</b> {p.skills.join(" · ")}
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.65 }}>
            <b>● Languages:</b> {p.languages.join(" · ")}
          </div>
          <div className="stamp-31">★ BALANCED · APPROVED ★</div>
        </div>

        <div className="colophon-31">
          <span>End of period · {p.email}</span>
          <span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span>
          <span>Auditor: self · 2026</span>
        </div>
      </div>
    </div>
  </>);
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    Tpl26Blueprint, Tpl27Circuit, Tpl28SpecSheet,
    Tpl29Quarterly, Tpl30Bloomberg, Tpl31Ledger,
  });
}

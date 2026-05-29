// Template_t36cd — Anatomical Plate
// Vintage scientific-illustration plate as a CV. Parchment paper,
// engraving-style serif type, Roman numerals, hairline rules. The
// figure plate is a placeholder photo slot ("ad vivum") — everything
// else is the engraved key beneath it.
//
// Scoped under .t30 / .t30.dark (oxblood-on-leather night plate).

(function () {
  const SCOPE = "t36cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #efe4c8;
  --paper-2:   #e1d3b0;
  --ink:       #29180d;          /* sepia ink */
  --ink-2:     #4a3424;
  --muted:     #806648;
  --rule:      rgba(80, 50, 24, 0.32);
  --rule-soft: rgba(80, 50, 24, 0.16);
  --red:       #863018;          /* oxblood */
  --plate-bg:  linear-gradient(180deg, #c9b48a 0%, #8c7148 100%);
  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    radial-gradient(900px 600px at 20% 0%, rgba(255, 235, 200, 0.5) 0%, transparent 60%),
    radial-gradient(900px 600px at 100% 100%, rgba(140, 90, 40, 0.18) 0%, transparent 60%),
    var(--paper);
  color: var(--ink);
  font-family: "EB Garamond", "Cormorant Garamond", "Cardo", Georgia, serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #1a130c;
  --paper-2:   #251a10;
  --ink:       #ebdcb8;
  --ink-2:     #c6b58c;
  --muted:     #8f7d5c;
  --rule:      rgba(235, 220, 184, 0.32);
  --rule-soft: rgba(235, 220, 184, 0.14);
  --red:       #d68460;
  --plate-bg:  linear-gradient(180deg, #4a3a22 0%, #1f150a 100%);
}

/* paper stipple */
.${SCOPE}::before {
  content: "";
  position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(70, 40, 18, 0.06) 0.6px, transparent 0.7px),
    radial-gradient(rgba(70, 40, 18, 0.04) 0.5px, transparent 0.6px);
  background-size: 4px 4px, 9px 9px;
  background-position: 0 0, 2px 2px;
  pointer-events: none;
  z-index: 1;
}
.${SCOPE}.dark::before {
  background-image:
    radial-gradient(rgba(235, 220, 184, 0.05) 0.6px, transparent 0.7px),
    radial-gradient(rgba(235, 220, 184, 0.03) 0.5px, transparent 0.6px);
}

.${SCOPE}-page { position: relative; z-index: 2; padding: 36px 56px 44px; }
.${SCOPE}-page-m { position: relative; z-index: 2; padding: 50px 22px 60px; }

/* heavy outer rule (engraved plate edge) */
.${SCOPE}-rule {
  border-top: 1px solid var(--ink);
  border-bottom: 3px double var(--ink);
  margin: 0 0 14px;
}
.${SCOPE}-rule.btm { border-top: 3px double var(--ink); border-bottom: 1px solid var(--ink); margin: 14px 0 0; }

/* TITLE BLOCK */
.${SCOPE}-titleblock {
  text-align: center;
  padding: 18px 0 16px;
}
.${SCOPE}-titleblock .pre {
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--ink-2);
  letter-spacing: 0.04em;
}
.${SCOPE}-titleblock h1 {
  font-family: "EB Garamond", "Playfair Display", serif;
  font-weight: 600;
  font-size: 44px;
  line-height: 1.05;
  letter-spacing: 0.02em;
  margin: 4px 0 4px;
  text-transform: uppercase;
}
.${SCOPE}-titleblock h1 em {
  font-style: italic;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
}
.${SCOPE}-titleblock .sub {
  font-family: "EB Garamond", serif;
  font-variant-caps: small-caps;
  font-size: 14px;
  letter-spacing: 0.18em;
  color: var(--ink-2);
  margin-top: 6px;
}
.${SCOPE}-titleblock .ornament {
  display: block;
  font-family: "EB Garamond", serif;
  color: var(--red);
  font-size: 18px;
  margin: 8px 0;
  letter-spacing: 0.4em;
}

/* MAIN — figure plate + key */
.${SCOPE}-main {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 36px;
  margin-top: 18px;
}

.${SCOPE}-plate {
  position: relative;
  background: var(--plate-bg);
  height: 460px;
  border: 1.5px solid var(--ink);
  box-shadow:
    0 0 0 3px var(--paper),
    0 0 0 4px var(--ink),
    0 8px 24px rgba(0,0,0,0.18);
}
.${SCOPE}-plate::before {
  /* cross-hatched engraving feel */
  content: "";
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(45deg,  rgba(0,0,0,0.10) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 6px);
  pointer-events: none;
}
.${SCOPE}-plate .pl-num {
  position: absolute; top: -22px; left: 0;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-variant-caps: small-caps;
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--ink-2);
}
.${SCOPE}-plate .pl-cap {
  position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 13px;
  color: var(--ink-2);
  white-space: nowrap;
}
.${SCOPE}-plate .pl-mark {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-family: "EB Garamond", serif;
  color: var(--paper);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  text-align: center;
}
.${SCOPE}-plate .pl-mark b {
  display: block;
  font-style: italic;
  font-size: 28px;
  letter-spacing: 0.04em;
  text-transform: none;
  margin-bottom: 4px;
  font-variant-caps: small-caps;
}

.${SCOPE}-plate-vitals {
  margin-top: 48px;
  border-top: 1px solid var(--ink);
  padding-top: 10px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4px 18px;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 13.5px;
  color: var(--ink-2);
}
.${SCOPE}-plate-vitals b { color: var(--ink); font-style: normal; font-variant-caps: small-caps; font-weight: 400; letter-spacing: 0.04em; }

/* KEY (numbered Roman sections) */
.${SCOPE}-key { font-family: "EB Garamond", serif; }
.${SCOPE}-key .intro {
  font-style: italic;
  font-size: 14px;
  color: var(--ink-2);
  margin-bottom: 12px;
  line-height: 1.45;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 10px;
}
.${SCOPE}-key .intro b { font-style: normal; font-variant-caps: small-caps; letter-spacing: 0.06em; color: var(--ink); }

.${SCOPE}-fig {
  display: grid;
  grid-template-columns: 56px 1fr;
  column-gap: 14px;
  padding: 10px 0;
  border-bottom: 1px dotted var(--rule);
}
.${SCOPE}-fig:last-child { border-bottom: 0; }
.${SCOPE}-fig .num {
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 22px;
  color: var(--red);
  font-variant-caps: small-caps;
  letter-spacing: 0.02em;
  line-height: 1.1;
  border-right: 1px solid var(--rule);
  padding-right: 12px;
  text-align: right;
}
.${SCOPE}-fig h3 {
  margin: 0;
  font-family: "EB Garamond", serif;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.01em;
  color: var(--ink);
}
.${SCOPE}-fig h3 em {
  font-style: italic;
  font-weight: 400;
  color: var(--ink-2);
  font-size: 14px;
  margin-left: 6px;
}
.${SCOPE}-fig p {
  margin: 4px 0 0;
  font-style: italic;
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
}
.${SCOPE}-fig ul {
  margin: 6px 0 0;
  padding-left: 0;
  list-style: none;
  font-size: 13px;
  line-height: 1.5;
}
.${SCOPE}-fig ul li {
  padding-left: 16px;
  position: relative;
  border-bottom: 1px dotted var(--rule-soft);
  padding-bottom: 3px;
  margin-bottom: 4px;
}
.${SCOPE}-fig ul li:last-child { border-bottom: 0; }
.${SCOPE}-fig ul li::before {
  content: "—";
  position: absolute; left: 0; top: 0;
  color: var(--red);
}
.${SCOPE}-fig ul li b { font-variant-caps: small-caps; letter-spacing: 0.04em; color: var(--ink); }

.${SCOPE}-fig .grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 22px;
  margin-top: 6px;
  font-size: 13px;
}
.${SCOPE}-fig .grid > div {
  padding: 3px 0;
  border-bottom: 1px dotted var(--rule-soft);
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.${SCOPE}-fig .grid > div em {
  font-style: italic;
  color: var(--ink-2);
  font-size: 11.5px;
  font-variant-caps: small-caps;
  letter-spacing: 0.08em;
}

/* Bottom citation / signature */
.${SCOPE}-cite {
  margin-top: 22px;
  padding-top: 14px;
  border-top: 1px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 13px;
  color: var(--ink-2);
}
.${SCOPE}-cite b { font-style: normal; font-variant-caps: small-caps; letter-spacing: 0.06em; color: var(--ink); }
.${SCOPE}-cite .center { text-align: center; }
.${SCOPE}-cite .right { text-align: right; }
.${SCOPE}-cite .ornament {
  font-family: "EB Garamond", serif;
  color: var(--red);
  font-size: 16px;
  letter-spacing: 0.4em;
  text-align: center;
}

/* mobile tweaks */
.${SCOPE}-m-main { display: block; }
.${SCOPE}-m-plate { height: 280px; }
`;
    document.head.appendChild(s);
  }

  function Fig({ n, title, latin, children }) {
    return (
      <div className={`${SCOPE}-fig`}>
        <div className="num">{n}.</div>
        <div>
          <h3>{title}{latin && <em>— {latin}</em>}</h3>
          {children}
        </div>
      </div>
    );
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        <div className={`${SCOPE}-rule`}>
          <div className={`${SCOPE}-titleblock`}>
            <div className="pre">A treatise on the constitution of</div>
            <h1>{persona.name}</h1>
            <div className="ornament">❧ ✦ ❧</div>
            <div className="sub">{persona.field}  ·  {persona.year}  ·  {persona.institution}</div>
          </div>
        </div>

        <div className={`${SCOPE}-main`}>
          {/* Plate */}
          <div>
            <div className={`${SCOPE}-plate`}>
              <div className="pl-num">Plate IV. — drawn ad vivum, MMXXVI.</div>
              <div className="pl-mark">
                <b>Discipula</b>
                of the<br/>
                Royal Infirmary
              </div>
              <div className="pl-cap">Fig. principalis · portrait engraving · place here.</div>
            </div>
            <div className={`${SCOPE}-plate-vitals`}>
              <div><b>Natalis.</b><span> {persona.dob}</span></div>
              <div><b>Loc.</b><span> {persona.location}</span></div>
              <div><b>MRN.</b><span> {persona.mrn}</span></div>
              <div><b>Lang.</b><span> {persona.languages.length} tongues</span></div>
              <div><b>Æmail.</b><span> {persona.email}</span></div>
              <div><b>Tel.</b><span> {persona.phone}</span></div>
              <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
                <b>Inscriptio.</b><span> {persona.url}</span>
              </div>
            </div>
          </div>

          {/* Key */}
          <div className={`${SCOPE}-key`}>
            <div className="intro">
              The figure on the left, taken from life, is here described in its constituent
              parts; the candidate's <b>specialty interest</b>, namely <i>{persona.specialization}</i>,
              is treated more fully in <b>Fig. III</b> below.
            </div>

            <Fig n="I" title="Of the Clinical Rotations" latin="rotationes clinicæ">
              <ul>
                {persona.rotations.slice(0, 6).map((r, i) => (
                  <li key={i}>
                    <b>{r.service}</b> — {r.site}; <i>{r.period}</i>; under {r.lead}. {r.procedures}.
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="II" title="Of the Researches" latin="opera et investigationes">
              <ul>
                {persona.research.map((r, i) => (
                  <li key={i}>
                    <b>{r.title}</b> — <i>{r.venue}</i> ({r.year}); {r.role}, {r.status.toLowerCase()}.
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="III" title="Of the Clinical Skills" latin="ars medendi">
              <div className="grid">
                {persona.skills.clinical.map((sk, i) => (
                  <div key={i}>
                    <span>{sk.name}</span>
                    <em>{sk.level.toLowerCase()}</em>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 8 }}>
                <i>Software adjunctory:</i> {persona.skills.software.map(s => s.name).join(", ")}.
              </p>
            </Fig>

            <Fig n="IV" title="Of the Education" latin="studia et magisterium">
              <ul>
                {persona.education.map((e, i) => (
                  <li key={i}>
                    <b>{e.degree}</b> — {e.org}; <i>{e.period}</i>. {e.notes}
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="V" title="Of Sundry Awards" latin="prǣmia et honores">
              <div className="grid">
                {persona.awards.map((a, i) => (
                  <div key={i}>
                    <span>{a.name}</span>
                    <em>{a.org} · {a.year}</em>
                  </div>
                ))}
              </div>
            </Fig>

            <Fig n="VI" title="Of the Languages spoken" latin="linguæ">
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                {persona.languages.map((l, i) => (
                  <div key={i}>
                    <span>{l.name}</span>
                    <em>{l.cefr} · {l.level.toLowerCase()}</em>
                  </div>
                ))}
              </div>
            </Fig>

            <Fig n="VII" title="Of Extra-curricular labours" latin="munera adscitita">
              <ul>
                {persona.extras.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </Fig>
          </div>
        </div>

        <div className={`${SCOPE}-cite`}>
          <div>
            Drawn from life by <b>{persona.name}</b>, in the year of our Lord
            two thousand and twenty-six, at the Royal Infirmary, Edinburgh.
          </div>
          <div className="center">
            <div className="ornament">✦ ✦ ✦</div>
            <div style={{ marginTop: 4 }}>Plate <b>IV</b> of <b>VII</b> — Folio sextodecimo.</div>
            <div style={{ marginTop: 8 }}><b>{persona.url}</b></div>
          </div>
          <div className="right">
            For inquiries, correspond to: <br/>
            <b>{persona.email}</b><br/>
            <b>{persona.phone}</b><br/>
            <i>Curriculum Vitæ available in folio, on application.</i>
          </div>
        </div>
        <div className={`${SCOPE}-rule btm`} />
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-rule`}>
            <div className={`${SCOPE}-titleblock`} style={{ padding: "12px 0 10px" }}>
              <div className="pre">A treatise on the constitution of</div>
              <h1 style={{ fontSize: 28 }}>{persona.name}</h1>
              <div className="ornament" style={{ fontSize: 14 }}>❧ ✦ ❧</div>
              <div className="sub" style={{ fontSize: 11 }}>{persona.field}  ·  {persona.year}</div>
            </div>
          </div>

          <div className={`${SCOPE}-plate ${SCOPE}-m-plate`} style={{ height: 220 }}>
            <div className="pl-num">Plate IV. — drawn ad vivum.</div>
            <div className="pl-mark">
              <b>Discipula</b>
              <span style={{ fontSize: 10 }}>of the Royal Infirmary</span>
            </div>
            <div className="pl-cap" style={{ fontSize: 11 }}>Fig. principalis · portrait engraving.</div>
          </div>

          <div className={`${SCOPE}-plate-vitals`} style={{ marginTop: 40, fontSize: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div><b>Natalis.</b><span> {persona.dob}</span></div>
            <div><b>Loc.</b><span> {persona.location}</span></div>
            <div><b>MRN.</b><span> {persona.mrn}</span></div>
            <div><b>Tel.</b><span> {persona.phone}</span></div>
          </div>

          <div className={`${SCOPE}-key`} style={{ marginTop: 16 }}>
            <div className="intro" style={{ fontSize: 13 }}>
              The figure above, taken from life, is described below in its constituent parts; specialty interest in <i>{persona.specialization}</i>.
            </div>

            <Fig n="I" title="Clinical Rotations" latin="rotationes clinicæ">
              <ul>
                {persona.rotations.slice(0, 5).map((r, i) => (
                  <li key={i} style={{ fontSize: 12 }}>
                    <b>{r.service}</b> — {r.site}; <i>{r.period}</i>.
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="II" title="Researches" latin="investigationes">
              <ul>
                {persona.research.slice(0, 3).map((r, i) => (
                  <li key={i} style={{ fontSize: 12 }}>
                    <b>{r.title}</b> — <i>{r.venue}</i>, {r.year}.
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="III" title="Clinical Skills" latin="ars medendi">
              <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 4, fontSize: 12 }}>
                {persona.skills.clinical.slice(0, 6).map((sk, i) => (
                  <div key={i}>
                    <span>{sk.name}</span>
                    <em>{sk.level.toLowerCase()}</em>
                  </div>
                ))}
              </div>
            </Fig>

            <Fig n="IV" title="Education" latin="studia">
              <ul>
                {persona.education.map((e, i) => (
                  <li key={i} style={{ fontSize: 12 }}>
                    <b>{e.degree}</b> — {e.org}.
                  </li>
                ))}
              </ul>
            </Fig>

            <Fig n="V" title="Languages" latin="linguæ">
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12 }}>
                {persona.languages.map((l, i) => (
                  <div key={i}><span>{l.name}</span><em>{l.cefr}</em></div>
                ))}
              </div>
            </Fig>
          </div>

          <div className={`${SCOPE}-cite`} style={{ gridTemplateColumns: "1fr", textAlign: "center", fontSize: 12 }}>
            <div>
              Drawn from life by <b>{persona.name}</b>, MMXXVI.
            </div>
            <div className="ornament" style={{ marginTop: 6 }}>✦ ✦ ✦</div>
            <div style={{ marginTop: 4 }}>
              <b>{persona.email}</b><br/>
              <b>{persona.url}</b>
            </div>
          </div>
          <div className={`${SCOPE}-rule btm`} />
        </div>
      </div>
    );
  }

  function Template_t36cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t36cd = Template_t36cd;
})();


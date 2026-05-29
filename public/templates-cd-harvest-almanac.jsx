// Template_t48cd — Harvest Almanac
// Farmer's-almanac portfolio. Newsprint cream paper, two-tone print
// (black + farmhouse red), heavy display serif. Centerpiece is a
// 12-month grid laying out the year's portfolio events as almanac
// entries (sun/moon symbols + farmwork). Side columns carry
// "Receipts & Remedies" (skills) and a "Concerning the Author" tail.
//
// Scoped under .t36 / .t36.dark (smoke-cured night almanac).

(function () {
  const SCOPE = "t48cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:    #f3ecd2;
  --paper-2:  #e6dcb6;
  --ink:      #18120a;
  --ink-2:    #2f2417;
  --muted:    #6f5e3f;
  --rule:     rgba(24, 18, 10, 0.42);
  --rule-soft: rgba(24, 18, 10, 0.16);
  --red:      #962820;            /* farmhouse red */
  --red-soft: rgba(150, 40, 32, 0.12);

  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    radial-gradient(700px 500px at 100% 0%, rgba(150, 100, 30, 0.10), transparent 50%),
    radial-gradient(700px 500px at 0% 100%, rgba(150, 100, 30, 0.08), transparent 50%),
    var(--paper);
  color: var(--ink);
  font-family: "Newsreader", "Spectral", "PT Serif", Georgia, serif;
  font-size: 12.5px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:    #0d0b06;
  --paper-2:  #181308;
  --ink:      #ebe2c4;
  --ink-2:    #d0c39f;
  --muted:    #978770;
  --rule:     rgba(235, 226, 196, 0.32);
  --rule-soft: rgba(235, 226, 196, 0.14);
  --red:      #de7867;
  --red-soft: rgba(222, 120, 103, 0.14);
}

/* newsprint texture */
.${SCOPE}::before {
  content: ""; position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(40,25,10,0.05) 0.5px, transparent 0.7px),
    radial-gradient(rgba(40,25,10,0.03) 0.5px, transparent 0.6px);
  background-size: 3px 3px, 7px 7px;
  pointer-events: none; z-index: 1;
}
.${SCOPE}.dark::before {
  background-image:
    radial-gradient(rgba(235,226,196,0.05) 0.5px, transparent 0.6px),
    radial-gradient(rgba(235,226,196,0.03) 0.5px, transparent 0.6px);
}

.${SCOPE}-page { position: relative; z-index: 2; padding: 22px 32px 30px; }
.${SCOPE}-page-m { position: relative; z-index: 2; padding: 50px 16px 60px; }

/* COVER masthead */
.${SCOPE}-mast {
  text-align: center;
  border-top: 7px solid var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding: 10px 0 8px;
  margin-bottom: 0;
  position: relative;
}
.${SCOPE}-mast .est {
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.04em;
}
.${SCOPE}-mast h1 {
  font-family: "DM Serif Display", "Playfair Display", serif;
  font-weight: 400;
  font-size: 54px;
  line-height: 1;
  margin: 2px 0 4px;
  letter-spacing: -0.01em;
}
.${SCOPE}-mast h1 .sub {
  display: block;
  font-family: "Newsreader", serif;
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
  color: var(--red);
  margin-top: 2px;
}
.${SCOPE}-mast .for {
  font-family: "Newsreader", serif;
  font-size: 14px;
  font-style: italic;
  color: var(--ink-2);
  margin-top: 4px;
  letter-spacing: 0.01em;
}
.${SCOPE}-mast .for b {
  font-style: normal;
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--red);
}
.${SCOPE}-mast .stripe {
  border-top: 1px solid var(--ink);
  border-bottom: 3px solid var(--ink);
  padding: 4px 0;
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 11px;
  color: var(--ink-2);
  letter-spacing: 0.02em;
}
.${SCOPE}-mast .stripe > span { padding: 0 10px; border-right: 1px solid var(--rule); }
.${SCOPE}-mast .stripe > span:last-child { border-right: 0; }
.${SCOPE}-mast .stripe b { font-style: normal; font-variant-caps: small-caps; color: var(--ink); letter-spacing: 0.06em; }

/* Body grid */
.${SCOPE}-body {
  display: grid;
  grid-template-columns: 230px 1fr 230px;
  gap: 18px;
  margin-top: 16px;
}

/* Sidebar box */
.${SCOPE}-box {
  border: 1.5px solid var(--ink);
  margin-bottom: 12px;
  background: var(--paper);
}
.${SCOPE}-box .h {
  background: var(--ink);
  color: var(--paper);
  padding: 5px 10px;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-align: center;
}
.${SCOPE}-box.red .h { background: var(--red); }
.${SCOPE}-box .h small {
  display: block;
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 10.5px;
  margin-top: 1px;
  opacity: 0.9;
  letter-spacing: 0.04em;
}
.${SCOPE}-box .pad { padding: 8px 10px; }

/* astro / weather "sun & moon" */
.${SCOPE}-astro {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  line-height: 1.5;
}
.${SCOPE}-astro .row {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 6px;
  padding: 3px 0;
  border-bottom: 1px dotted var(--rule);
}
.${SCOPE}-astro .row:last-child { border-bottom: 0; }
.${SCOPE}-astro .row .g {
  font-size: 12px;
  color: var(--red);
  text-align: center;
}
.${SCOPE}-astro .row .l {
  font-family: "Newsreader", serif;
  font-size: 12px;
  color: var(--ink);
  letter-spacing: 0;
}
.${SCOPE}-astro .row .v { color: var(--muted); }

/* skills list / language list */
.${SCOPE}-recipe {
  font-family: "Newsreader", serif;
  font-size: 12px;
  line-height: 1.4;
}
.${SCOPE}-recipe .item {
  padding: 4px 0;
  border-bottom: 1px dotted var(--rule);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}
.${SCOPE}-recipe .item:last-child { border-bottom: 0; }
.${SCOPE}-recipe .item .nm { letter-spacing: 0.01em; }
.${SCOPE}-recipe .item .nm small {
  display: block;
  font-style: italic;
  color: var(--muted);
  font-size: 11px;
  margin-top: 1px;
}
.${SCOPE}-recipe .item .v {
  font-family: "DM Serif Display", serif;
  color: var(--red);
  font-size: 15px;
  align-self: center;
}

/* CENTRE — calendar grid */
.${SCOPE}-cal {
  border-top: 4px solid var(--ink);
  border-bottom: 4px solid var(--ink);
}
.${SCOPE}-cal .title {
  text-align: center;
  font-family: "DM Serif Display", serif;
  font-size: 22px;
  padding: 8px 0 4px;
  letter-spacing: 0.02em;
  border-bottom: 1px solid var(--ink);
}
.${SCOPE}-cal .title em {
  display: block;
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 13px;
  color: var(--red);
  margin-top: 2px;
  letter-spacing: 0;
}
.${SCOPE}-cal .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.${SCOPE}-month {
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: 10px 10px 12px;
}
.${SCOPE}-month:nth-child(3n) { border-right: 0; }
.${SCOPE}-month:nth-last-child(-n+3) { border-bottom: 0; }
.${SCOPE}-month .mh {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  align-items: baseline;
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 4px;
  margin-bottom: 6px;
}
.${SCOPE}-month .mh .n {
  font-family: "DM Serif Display", serif;
  font-size: 20px;
  color: var(--red);
  line-height: 1;
}
.${SCOPE}-month .mh .nm {
  font-family: "DM Serif Display", serif;
  font-size: 18px;
  letter-spacing: 0.04em;
}
.${SCOPE}-month .mh .lat {
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 11px;
  color: var(--muted);
}
.${SCOPE}-month .ev {
  font-family: "Newsreader", serif;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 4px;
}
.${SCOPE}-month .ev b {
  font-variant-caps: small-caps;
  letter-spacing: 0.04em;
  color: var(--red);
  font-weight: 600;
  margin-right: 4px;
}
.${SCOPE}-month .ev em { font-style: italic; color: var(--ink-2); }
.${SCOPE}-month .farm {
  margin-top: 6px;
  padding-top: 4px;
  border-top: 1px dotted var(--rule);
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--muted);
  letter-spacing: 0.04em;
}
.${SCOPE}-month .farm b { color: var(--ink); font-weight: 500; }

/* TAIL — concerning the author */
.${SCOPE}-tail {
  margin-top: 16px;
  border-top: 4px solid var(--ink);
  padding-top: 12px;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 18px;
  align-items: start;
}
.${SCOPE}-tail .crest {
  width: 80px; height: 80px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  display: grid; place-items: center;
  text-align: center;
  font-family: "DM Serif Display", serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  background: var(--paper-2);
  position: relative;
}
.${SCOPE}-tail .crest::after {
  content: ""; position: absolute; inset: 4px;
  border: 1px dashed var(--ink); border-radius: 50%; opacity: 0.6;
}
.${SCOPE}-tail .crest b {
  display: block;
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 16px;
  color: var(--red);
  font-weight: 400;
  margin-top: 1px;
}
.${SCOPE}-tail .body {
  font-family: "Newsreader", serif;
  font-size: 12.5px;
  line-height: 1.55;
}
.${SCOPE}-tail .body h2 {
  font-family: "DM Serif Display", serif;
  font-size: 22px;
  margin: 0 0 4px;
}
.${SCOPE}-tail .body h2 em {
  font-family: "Newsreader", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--red);
  letter-spacing: 0;
}
.${SCOPE}-tail .body p { margin: 4px 0; }
.${SCOPE}-tail .body p b { font-variant-caps: small-caps; letter-spacing: 0.04em; color: var(--red); }
.${SCOPE}-tail .right {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--ink);
  letter-spacing: 0.04em;
  text-align: right;
  line-height: 1.6;
}
.${SCOPE}-tail .right b { color: var(--red); font-weight: 500; }
`;
    document.head.appendChild(s);
  }

  // Build 12 months from persona data
  function buildMonths(persona) {
    const f = persona.fields;
    const r = persona.research;
    const e = persona.experience;
    const pub = persona.publications || [];
    return [
      { n: "I",   nm: "Jan", lat: "Ianuarius",
        sym: "❄", farmTip: "Soil sampling resumes in well-drained fields. Sharpen the bench tools.",
        ev: { b: "BENCH WORK", t: `${r[0].title}.`, em: `${r[0].venue}, ${r[0].status}.` } },
      { n: "II",  nm: "Feb", lat: "Februarius",
        sym: "☂", farmTip: `Irrigation design returned from ${f[2].loc}. Drip line ordered.`,
        ev: { b: "OVERSEAS", t: `${f[2].name}.`, em: `${f[2].outcome}` } },
      { n: "III", nm: "Mar", lat: "Martius",
        sym: "❀", farmTip: `Extension visits start; ${persona.publications[0]?.title.split(":")[0] || "field-walk briefings"} drafted.`,
        ev: { b: "EXTENSION", t: `${e[1].role}.`, em: `${e[1].org}; ${e[1].bullets[0]}` } },
      { n: "IV",  nm: "Apr", lat: "Aprilis",
        sym: "☀", farmTip: "Mid-point dissertation review; cover-crop residues incorporated.",
        ev: { b: "BSc THESIS", t: `${r[0].title}.`, em: `Supv: ${r[0].role}.` } },
      { n: "V",   nm: "May", lat: "Maius",
        sym: "✦", farmTip: `Drone-NDVI sweeps over the ${f[1].name.toLowerCase()} plots.`,
        ev: { b: "FIELD", t: `${f[1].name}.`, em: `${f[1].methods}.` } },
      { n: "VI",  nm: "Jun", lat: "Iunius",
        sym: "✿", farmTip: "Final-year examinations. Brief notebook fortnight.",
        ev: { b: "EXAMS", t: "BSc finals — Harper Adams.", em: "On track for Upper Second / First." } },
      { n: "VII", nm: "Jul", lat: "Iulius",
        sym: "☼", farmTip: "Hay made. Harvest preparations begin.",
        ev: { b: "AVAILABLE", t: "Open to soil-science roles.", em: "Extension · NGO · lab · farm-ops." } },
      { n: "VIII",nm: "Aug", lat: "Augustus",
        sym: "☀", farmTip: "James Hutton placement commences in Aberdeen.",
        ev: { b: "PLACEMENT", t: `${e[0].role}.`, em: `${e[0].org}; sampling NE Scotland.` } },
      { n: "IX",  nm: "Sep", lat: "September",
        sym: "♃", farmTip: "Cover-crop drilling window opens; mixes specified.",
        ev: { b: "FIELD", t: `${f[0].name}.`, em: `${f[0].crop}; ${f[0].outcome.split(";")[0]}.` } },
      { n: "X",   nm: "Oct", lat: "October",
        sym: "☾", farmTip: "Upland-grassland datasets frozen for the ELMS app.",
        ev: { b: "DATA FREEZE", t: `${f[3].name}.`, em: `${f[3].outcome}` } },
      { n: "XI",  nm: "Nov", lat: "November",
        sym: "✦", farmTip: "Conference season. Submit poster to BSAS Annual.",
        ev: { b: "CONFERENCE", t: r[1].title + ".", em: `${r[1].venue}, ${r[1].year}.` } },
      { n: "XII", nm: "Dec", lat: "December",
        sym: "❄", farmTip: "Family farm: calving cover; lambing prep.",
        ev: { b: "HOME FARM", t: `${e[3].role}.`, em: `${e[3].org}; ${e[3].bullets[0]}` } },
    ];
  }

  function Desktop({ persona }) {
    const months = buildMonths(persona);
    const langs = persona.languages;
    return (
      <div className={`${SCOPE}-page`}>
        <div className={`${SCOPE}-mast`}>
          <div className="est">Est. 2026 — printed at Newport, Salop.</div>
          <h1>The Harper Almanack<span className="sub">For the Year of our Lord 2026</span></h1>
          <div className="for">
            <b>Compleat</b> for the use of <b>{persona.name.toUpperCase()}</b>,
            sometime student of <em>{persona.institution}</em>,
            and intending Soil Surveyor of Aberdeen-shire.
          </div>
          <div className="stripe">
            <span><b>VOL.</b> XXVI</span>
            <span><b>No.</b> 26</span>
            <span><b>POPULATION</b> &mdash; one</span>
            <span><b>PRICE</b> two-pence</span>
          </div>
        </div>

        <div className={`${SCOPE}-body`}>
          {/* LEFT — astronomical, vitals */}
          <div>
            <div className={`${SCOPE}-box`}>
              <div className="h">Sun &amp; Moon<small>at Harper Adams</small></div>
              <div className="pad">
                <div className={`${SCOPE}-astro`}>
                  <div className="row"><span className="g">☉</span><span className="l">Rises (Jun 21)</span><span className="v">04:43</span></div>
                  <div className="row"><span className="g">☉</span><span className="l">Sets (Jun 21)</span><span className="v">21:34</span></div>
                  <div className="row"><span className="g">☽</span><span className="l">Full (May)</span><span className="v">23 day</span></div>
                  <div className="row"><span className="g">☿</span><span className="l">Latitude</span><span className="v">52.79° N</span></div>
                  <div className="row"><span className="g">♀</span><span className="l">Longitude</span><span className="v">2.40° W</span></div>
                  <div className="row"><span className="g">♃</span><span className="l">Elev.</span><span className="v">68 m AOD</span></div>
                </div>
              </div>
            </div>

            <div className={`${SCOPE}-box red`}>
              <div className="h">Of the Author</div>
              <div className="pad">
                <div className={`${SCOPE}-astro`}>
                  <div className="row"><span className="g">⌘</span><span className="l">Name</span><span className="v">{persona.name}</span></div>
                  <div className="row"><span className="g">★</span><span className="l">Born</span><span className="v">{persona.dob}</span></div>
                  <div className="row"><span className="g">▲</span><span className="l">Reads</span><span className="v">{persona.specialization.split(" · ")[0]}</span></div>
                  <div className="row"><span className="g">✦</span><span className="l">Avail.</span><span className="v">Aug 2026</span></div>
                </div>
              </div>
            </div>

            <div className={`${SCOPE}-box`}>
              <div className="h">Languages<small>spoken on the farm</small></div>
              <div className="pad">
                <div className={`${SCOPE}-recipe`}>
                  {langs.map((l, i) => (
                    <div className="item" key={i}>
                      <div className="nm">{l.name}<small>{l.level}</small></div>
                      <div className="v">{l.cefr}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${SCOPE}-box`}>
              <div className="h">Schooling</div>
              <div className="pad">
                <div className={`${SCOPE}-recipe`}>
                  {persona.education.map((e, i) => (
                    <div className="item" key={i}>
                      <div className="nm">{e.degree}<small>{e.org.split(" · ")[0]} · {e.period}</small></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CENTRE — calendar */}
          <div>
            <div className={`${SCOPE}-cal`}>
              <div className="title">
                The Year, Month by Month
                <em>portfolio &amp; farmwork for two-thousand and twenty-six</em>
              </div>
              <div className="grid">
                {months.map((m, i) => (
                  <div key={i} className={`${SCOPE}-month`}>
                    <div className="mh">
                      <span className="n">{m.n}.</span>
                      <span className="nm">{m.nm}</span>
                      <span className="lat">{m.sym} {m.lat}</span>
                    </div>
                    <div className="ev">
                      <b>{m.ev.b}.</b>
                      {m.ev.t}
                      <em> {m.ev.em}</em>
                    </div>
                    <div className="farm">
                      <b>FARMWORK.</b> {m.farmTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — receipts & remedies */}
          <div>
            <div className={`${SCOPE}-box red`}>
              <div className="h">Receipts<small>of the Equipment Bag</small></div>
              <div className="pad">
                <div className={`${SCOPE}-recipe`}>
                  {persona.skills.tech.slice(0, 6).map((sk, i) => (
                    <div className="item" key={i}>
                      <div className="nm">{sk.name.split(" · ")[0]}<small>{sk.name.split(" · ")[1] || "—"}</small></div>
                      <div className="v">{sk.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${SCOPE}-box`}>
              <div className="h">Remedies<small>field skills</small></div>
              <div className="pad">
                <div className={`${SCOPE}-recipe`}>
                  {persona.skills.practical.slice(0, 6).map((p, i) => (
                    <div className="item" key={i}><div className="nm">{p}</div></div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${SCOPE}-box`}>
              <div className="h">Publick Work</div>
              <div className="pad">
                <div className={`${SCOPE}-recipe`}>
                  {persona.publications.map((p, i) => (
                    <div className="item" key={i}>
                      <div className="nm">{p.title}<small>{p.venue}</small></div>
                      <div className="v">{String(p.year).slice(-2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAIL */}
        <div className={`${SCOPE}-tail`}>
          <div className="crest">
            HARPER<b>1901</b>ADAMS
          </div>
          <div className="body">
            <h2>Concerning the Author<em>—a brief word from the field.</em></h2>
            <p>
              <b>{persona.name.toUpperCase()}</b>, of {persona.location}, is a final-year
              <em> {persona.field}</em> at <em>{persona.institution}</em>, specialising in
              soil science and sustainable agronomy. Five field projects in his keeping,
              two papers under his pen, and a soil-survey placement at the
              <em> James Hutton Institute</em> until August next.
            </p>
            <p>
              He shall be available, the Lord willing, from <b>August 2026</b>, for
              extension, research, NGO and farm-operations work. The principal
              equipment in his bag is given on the right margin; the languages spoken
              on the farm, on the left.
            </p>
          </div>
          <div className="right">
            <b>By post — </b>{persona.location}<br/>
            <b>By wire — </b>{persona.phone}<br/>
            <b>By electrick post — </b>{persona.email}<br/>
            <b>By web — </b>{persona.url}<br/>
            <span style={{ color: "var(--muted)" }}>—— PRICE TWO-PENCE ——</span>
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    const months = buildMonths(persona);
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-mast`} style={{ paddingBottom: 6 }}>
            <div className="est" style={{ fontSize: 10 }}>Est. 2026 — Newport, Salop.</div>
            <h1 style={{ fontSize: 30 }}>The Harper Almanack<span className="sub" style={{ fontSize: 12 }}>For 2026</span></h1>
            <div className="for" style={{ fontSize: 11 }}>
              <b>Compleat</b> for <b>{persona.name.toUpperCase()}</b>.
            </div>
            <div className="stripe" style={{ fontSize: 9.5, gridTemplateColumns: "1fr 1fr 1fr" }}>
              <span><b>VOL.</b> XXVI</span>
              <span><b>POP.</b> one</span>
              <span><b>2d.</b></span>
            </div>
          </div>

          <div className={`${SCOPE}-box red`} style={{ marginTop: 12 }}>
            <div className="h" style={{ fontSize: 12 }}>Of the Author</div>
            <div className="pad">
              <div className={`${SCOPE}-astro`} style={{ fontSize: 10 }}>
                <div className="row"><span className="g">⌘</span><span className="l" style={{ fontSize: 11 }}>Name</span><span className="v">{persona.name}</span></div>
                <div className="row"><span className="g">▲</span><span className="l" style={{ fontSize: 11 }}>Reads</span><span className="v">{persona.specialization.split(" · ")[0]}</span></div>
                <div className="row"><span className="g">✦</span><span className="l" style={{ fontSize: 11 }}>Avail.</span><span className="v">Aug 2026</span></div>
              </div>
            </div>
          </div>

          <div className={`${SCOPE}-cal`} style={{ marginTop: 12 }}>
            <div className="title" style={{ fontSize: 16 }}>
              The Year, Month by Month
              <em style={{ fontSize: 11 }}>portfolio &amp; farmwork 2026</em>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {months.map((m, i) => (
                <div key={i} className={`${SCOPE}-month`} style={{ padding: "8px 8px 10px" }}>
                  <div className="mh" style={{ gap: 4 }}>
                    <span className="n" style={{ fontSize: 14 }}>{m.n}.</span>
                    <span className="nm" style={{ fontSize: 13 }}>{m.nm}</span>
                    <span className="lat" style={{ fontSize: 9 }}>{m.sym}</span>
                  </div>
                  <div className="ev" style={{ fontSize: 10.5 }}>
                    <b style={{ fontSize: 10 }}>{m.ev.b}.</b>{m.ev.t}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-box`} style={{ marginTop: 12 }}>
            <div className="h" style={{ fontSize: 12 }}>Receipts<small>equipment</small></div>
            <div className="pad">
              <div className={`${SCOPE}-recipe`} style={{ fontSize: 11 }}>
                {persona.skills.tech.slice(0, 6).map((sk, i) => (
                  <div className="item" key={i}>
                    <div className="nm">{sk.name.split(" · ")[0]}</div>
                    <div className="v" style={{ fontSize: 12 }}>{sk.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${SCOPE}-tail`} style={{ gridTemplateColumns: "1fr", textAlign: "center", paddingTop: 10 }}>
            <div className="body" style={{ fontSize: 11 }}>
              <h2 style={{ fontSize: 17 }}>Concerning the Author</h2>
              <p>{persona.name.toUpperCase()}, BSc cand., {persona.specialization.split(" · ")[0]}.</p>
            </div>
            <div className="right" style={{ fontSize: 10, textAlign: "center" }}>
              <b>{persona.email}</b><br/>
              <b>{persona.phone}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t48cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t48cd = Template_t48cd;
})();


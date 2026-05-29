// Template_t47cd — Field Journal
// Naturalist's field notebook: tea-stained cream paper, slab-serif
// printed labels and "ENTRY №" date stamps, handwritten observations
// in Kalam, sage-green accents and a brick-red wax seal. Each entry
// is a portfolio section — field projects, research, experience,
// skills, education, contact.
//
// Differentiated from t28 (graph paper + Caveat) by typography palette
// (slab serif + Kalam), tea-stained paper, and naturalist's pressed-
// specimen + coordinate decorations.
//
// Scoped under .t35 / .t35.dark (night-survey / forest).

(function () {
  const SCOPE = "t47cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #ece2c5;
  --paper-2:   #ddd0ad;
  --ink:       #2a1f10;          /* sepia ink */
  --ink-2:     #4a3a22;
  --muted:     #807058;
  --rule:      rgba(42, 31, 16, 0.30);
  --rule-soft: rgba(42, 31, 16, 0.14);
  --sage:      #4f6038;          /* sage green */
  --brick:     #963a25;          /* wax-seal red */
  --gold:      #b3892f;

  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    /* tea / coffee staining */
    radial-gradient(420px 380px at 92% 8%, rgba(120, 80, 30, 0.16), transparent 60%),
    radial-gradient(360px 320px at 10% 90%, rgba(120, 80, 30, 0.12), transparent 60%),
    var(--paper);
  color: var(--ink);
  font-family: "Zilla Slab", "Roboto Slab", "Bree Serif", Georgia, serif;
  font-size: 13.5px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #0d1410;
  --paper-2:   #16201a;
  --ink:       #dde4cf;
  --ink-2:     #b8c2a5;
  --muted:     #8a957a;
  --rule:      rgba(221, 228, 207, 0.30);
  --rule-soft: rgba(221, 228, 207, 0.14);
  --sage:      #9bb46e;
  --brick:     #d97b5a;
  --gold:      #e0c177;
}

/* paper grain */
.${SCOPE}::before {
  content: ""; position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(60, 30, 10, 0.05) 1px, transparent 1.2px),
    radial-gradient(rgba(60, 30, 10, 0.03) 0.6px, transparent 0.8px);
  background-size: 4px 4px, 9px 9px;
  pointer-events: none; z-index: 1;
}
.${SCOPE}.dark::before {
  background-image:
    radial-gradient(rgba(221, 228, 207, 0.04) 0.8px, transparent 1px),
    radial-gradient(rgba(221, 228, 207, 0.02) 0.5px, transparent 0.6px);
}

.${SCOPE}-page { position: relative; z-index: 2; padding: 22px 34px 32px; }
.${SCOPE}-page-m { position: relative; z-index: 2; padding: 50px 18px 60px; }

/* Cover header — like a leather field-book block */
.${SCOPE}-cover {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  border-top: 6px solid var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding: 12px 4px 12px;
  margin-bottom: 18px;
  position: relative;
}
.${SCOPE}-cover h1 {
  font-family: "Zilla Slab", serif;
  font-weight: 700;
  font-size: 38px;
  line-height: 1;
  margin: 0;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.${SCOPE}-cover h1 em {
  font-family: "Kalam", cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: var(--brick);
  margin-left: 12px;
}
.${SCOPE}-cover .sub {
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--ink-2);
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.04em;
  display: flex; gap: 18px; flex-wrap: wrap;
}
.${SCOPE}-cover .sub b { color: var(--sage); font-weight: 500; }
.${SCOPE}-cover .pressed {
  border: 1.5px solid var(--ink);
  background: var(--paper-2);
  padding: 8px 14px;
  text-align: center;
  font-family: "Zilla Slab", serif;
  letter-spacing: 0.08em;
  font-size: 11px;
  text-transform: uppercase;
  line-height: 1.35;
  position: relative;
  transform: rotate(2deg);
}
.${SCOPE}-cover .pressed b {
  display: block;
  font-family: "Kalam", cursive;
  font-size: 22px;
  letter-spacing: 0.04em;
  text-transform: none;
  color: var(--brick);
  font-weight: 700;
  margin-top: 2px;
}
.${SCOPE}-cover .pressed::after {
  content: "ⓅⓇⒺⓈⓈⒺⒹ";
  position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%);
  font-size: 8px; color: var(--muted); letter-spacing: 0.18em;
}

/* Topographic line divider */
.${SCOPE}-topo {
  margin: 4px 0 14px;
  height: 14px;
  background-image: repeating-linear-gradient(90deg,
    var(--rule) 0 14px, transparent 14px 18px),
    repeating-linear-gradient(180deg,
    var(--rule-soft) 0 1px, transparent 1px 6px);
}

/* Two-column layout */
.${SCOPE}-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
}

/* ENTRY */
.${SCOPE}-entry {
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--rule);
  position: relative;
}
.${SCOPE}-entry:last-child { border-bottom: 0; }
.${SCOPE}-entry .head {
  display: grid;
  grid-template-columns: 84px 1fr auto;
  gap: 14px;
  align-items: baseline;
  border-bottom: 1.5px solid var(--sage);
  padding-bottom: 6px;
  margin-bottom: 8px;
}
.${SCOPE}-entry .head .stamp {
  border: 1.5px solid var(--brick);
  color: var(--brick);
  text-align: center;
  padding: 4px 6px 3px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  line-height: 1.3;
  text-transform: uppercase;
  transform: rotate(-1.5deg);
}
.${SCOPE}-entry .head .stamp b {
  display: block;
  font-family: "Kalam", cursive;
  font-weight: 700;
  font-size: 17px;
  color: var(--brick);
  letter-spacing: 0;
  text-transform: none;
  margin-top: 1px;
}
.${SCOPE}-entry .head h2 {
  margin: 0;
  font-family: "Zilla Slab", serif;
  font-weight: 700;
  font-size: 21px;
  line-height: 1.1;
  letter-spacing: -0.005em;
  color: var(--ink);
}
.${SCOPE}-entry .head h2 small {
  display: block;
  font-family: "JetBrains Mono", monospace;
  font-weight: 400;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  margin-top: 3px;
}
.${SCOPE}-entry .head .coord {
  text-align: right;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.04em;
  line-height: 1.4;
}
.${SCOPE}-entry .head .coord b {
  color: var(--sage); font-weight: 500;
}

.${SCOPE}-entry .obs {
  font-family: "Kalam", cursive;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  color: var(--ink);
  margin: 6px 0 10px;
}

.${SCOPE}-entry .data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 20px;
  font-family: "JetBrains Mono", monospace;
  font-size: 11.5px;
  color: var(--ink);
  margin-top: 6px;
}
.${SCOPE}-entry .data > div {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  padding: 3px 0;
  border-bottom: 1px dotted var(--rule-soft);
}
.${SCOPE}-entry .data .l {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding-top: 1px;
}

.${SCOPE}-entry .outcome {
  margin-top: 8px;
  padding: 6px 10px;
  background: var(--paper-2);
  border-left: 3px solid var(--brick);
  font-family: "Kalam", cursive;
  font-size: 16px;
  color: var(--ink);
  line-height: 1.35;
}
.${SCOPE}-entry .outcome b {
  color: var(--brick);
  font-weight: 700;
  font-family: "Zilla Slab", serif;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-right: 4px;
}

/* SIDE column — sidebar info */
.${SCOPE}-side > div { margin-bottom: 16px; }
.${SCOPE}-side h3 {
  font-family: "Zilla Slab", serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 6px;
  color: var(--ink);
  border-bottom: 1.5px solid var(--sage);
  padding-bottom: 4px;
  display: flex; justify-content: space-between;
}
.${SCOPE}-side h3 small {
  font-family: "Kalam", cursive;
  font-size: 14px;
  color: var(--brick);
  letter-spacing: 0;
  text-transform: none;
  font-weight: 700;
}

/* Specimen tag — pressed leaf style */
.${SCOPE}-tag {
  background: var(--paper-2);
  border: 1.5px solid var(--ink);
  padding: 14px 16px;
  position: relative;
  transform: rotate(-2deg);
}
.${SCOPE}-tag::before {
  content: ""; position: absolute; top: 10px; left: 50%;
  transform: translateX(-50%);
  width: 12px; height: 12px;
  background: var(--paper);
  border: 1.5px solid var(--ink);
  border-radius: 50%;
}
.${SCOPE}-tag .latin {
  margin-top: 10px;
  font-family: "Zilla Slab", serif;
  font-style: italic;
  text-align: center;
  font-size: 14px;
  color: var(--sage);
  letter-spacing: 0.02em;
}
.${SCOPE}-tag .common {
  text-align: center;
  font-family: "Kalam", cursive;
  font-size: 18px;
  color: var(--ink);
  font-weight: 700;
  margin-top: 4px;
}
.${SCOPE}-tag .meta {
  margin-top: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.06em;
  line-height: 1.45;
  border-top: 1px dotted var(--rule);
  padding-top: 6px;
  text-align: center;
}

/* List blocks (skills, education) */
.${SCOPE}-list {
  background: var(--paper-2);
  border: 1px solid var(--ink);
  padding: 10px 12px;
}
.${SCOPE}-list .item {
  padding: 4px 0;
  border-bottom: 1px dotted var(--rule);
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}
.${SCOPE}-list .item:last-child { border-bottom: 0; }
.${SCOPE}-list .item .nm { font-family: "Zilla Slab", serif; font-weight: 500; line-height: 1.3; }
.${SCOPE}-list .item .nm small {
  display: block;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.04em;
  margin-top: 1px;
  font-weight: 400;
}
.${SCOPE}-list .item .v {
  font-family: "Kalam", cursive;
  color: var(--brick);
  font-size: 16px;
  font-weight: 700;
  align-self: center;
}

/* Sign-off block */
.${SCOPE}-sign {
  border-top: 6px solid var(--ink);
  margin-top: 22px;
  padding-top: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
}
.${SCOPE}-sign .body {
  font-family: "Kalam", cursive;
  font-size: 16px;
  color: var(--ink);
  line-height: 1.4;
}
.${SCOPE}-sign .sig {
  font-family: "Kalam", cursive;
  font-size: 30px;
  line-height: 1;
  color: var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 3px;
  display: inline-block;
  margin-top: 8px;
  transform: rotate(-1.5deg);
  transform-origin: bottom left;
}
.${SCOPE}-sign .stamp {
  border: 3px double var(--brick);
  border-radius: 50%;
  width: 96px; height: 96px;
  display: grid; place-items: center;
  text-align: center;
  font-family: "Zilla Slab", serif;
  color: var(--brick);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transform: rotate(-6deg);
  line-height: 1.25;
}
.${SCOPE}-sign .stamp b {
  display: block;
  font-family: "Kalam", cursive;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}
`;
    document.head.appendChild(s);
  }

  function Entry({ idx, date, title, sub, coord, obs, data, outcome }) {
    return (
      <div className={`${SCOPE}-entry`}>
        <div className="head">
          <div className="stamp">
            Entry №<b>{String(idx).padStart(3, "0")}</b>
            {date}
          </div>
          <h2>{title}<small>{sub}</small></h2>
          <div className="coord">
            {coord.map((c, i) => (
              <div key={i}><b>{c.l}</b> {c.v}</div>
            ))}
          </div>
        </div>
        {obs && <div className="obs">"{obs}"</div>}
        <div className="data">
          {data.map((d, i) => (
            <div key={i}>
              <span className="l">{d.l}</span>
              <span>{d.v}</span>
            </div>
          ))}
        </div>
        {outcome && <div className="outcome"><b>Outcome.</b> {outcome}</div>}
      </div>
    );
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        {/* Cover */}
        <div className={`${SCOPE}-cover`}>
          <div>
            <h1>Field Journal<em> — {persona.name}</em></h1>
            <div className="sub">
              <span><b>BOOK</b> V</span>
              <span><b>SEASON</b> 2025 / 26</span>
              <span><b>FACULTY</b> Harper Adams Univ.</span>
              <span><b>FIELD</b> {persona.specialization}</span>
              <span><b>HANDED IN BY</b> A. Lyle</span>
            </div>
          </div>
          <div className="pressed">
            Specimen<br/>
            <b>Lyle, A.</b>
            21 Feb 2002
          </div>
        </div>
        <div className={`${SCOPE}-topo`} />

        <div className={`${SCOPE}-grid`}>
          {/* MAIN COLUMN */}
          <div>
            {persona.fields.map((f, i) => (
              <Entry
                key={i}
                idx={i + 1}
                date={String(f.year).split(" — ").pop()}
                title={f.name}
                sub={`${f.crop} · ${f.ha} ha`}
                coord={[
                  { l: "loc", v: f.loc },
                  { l: "yr",  v: f.year },
                  { l: "wx",  v: "☼ / ⛅" },
                ]}
                obs={i === 0 ? "Heavy clay loam, ploughed Oct prior. Slug pressure modest after dry June." :
                     i === 1 ? "Mixed cover-crop stand 28 days post-drilling; tillering well." :
                     i === 2 ? "Drip layout commissioned; 12 ha under emitter — water draw down 31%." :
                     i === 3 ? "BSV quadrats walked east to west, hill flank → valley bottom." :
                     "Whole-farm fertility plan; FYM mass balance reconciled with herd records."}
                data={[
                  { l: "crop",   v: f.crop },
                  { l: "area",   v: `${f.ha} ha` },
                  { l: "methods",v: f.methods },
                  { l: "yr",     v: f.year },
                ]}
                outcome={f.outcome}
              />
            ))}

            {/* Research entry */}
            <div className={`${SCOPE}-entry`}>
              <div className="head">
                <div className="stamp">
                  Entry №<b>{String(persona.fields.length + 1).padStart(3, "0")}</b>
                  Research
                </div>
                <h2>Bench &amp; Desk Work<small>publications, audits and ongoing dissertation</small></h2>
                <div className="coord">
                  <div><b>file</b> RES-026</div>
                  <div><b>n</b> {persona.research.length}</div>
                </div>
              </div>
              {persona.research.map((r, i) => (
                <div className="obs" key={i} style={{ fontSize: 16, marginBottom: 6 }}>
                  <b style={{ fontFamily: "'Zilla Slab', serif", fontSize: 13, color: "var(--sage)", letterSpacing: "0.06em" }}>{r.year}. </b>
                  "{r.title}" — <em style={{ fontStyle: "italic", color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{r.venue}; {r.status}; {r.role}.</em>
                </div>
              ))}
            </div>

            {/* Experience entry */}
            <div className={`${SCOPE}-entry`}>
              <div className="head">
                <div className="stamp">
                  Entry №<b>{String(persona.fields.length + 2).padStart(3, "0")}</b>
                  Placements
                </div>
                <h2>Time Under Hire<small>placements, internships and family farm hours</small></h2>
                <div className="coord">
                  <div><b>file</b> EXP-026</div>
                  <div><b>n</b> {persona.experience.length}</div>
                </div>
              </div>
              <div className="data" style={{ gridTemplateColumns: "1fr" }}>
                {persona.experience.map((e, i) => (
                  <div key={i}>
                    <span className="l">{["A", "B", "C", "D"][i]}.</span>
                    <span style={{ fontSize: 12 }}>
                      <b style={{ fontFamily: "'Zilla Slab', serif", fontWeight: 600 }}>{e.role}</b>
                      <span style={{ color: "var(--muted)" }}> — {e.org}, {e.period}.</span>
                      <em style={{ display: "block", fontStyle: "italic", fontFamily: "'Kalam', cursive", fontSize: 14, color: "var(--ink)", marginTop: 2 }}>
                        {e.bullets[0]}
                      </em>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDE COLUMN */}
          <div className={`${SCOPE}-side`}>
            <div className={`${SCOPE}-tag`}>
              <div className="latin">Solum britannicum</div>
              <div className="common">British clay loam</div>
              <div className="meta">
                Coll. <b>A. Lyle</b><br/>
                Whitchurch, Shropshire<br/>
                52.969° N · 2.682° W
              </div>
            </div>

            <div>
              <h3>Kit <small>list</small></h3>
              <div className={`${SCOPE}-list`}>
                {persona.skills.tech.slice(0, 6).map((sk, i) => (
                  <div className="item" key={i}>
                    <div className="nm">{sk.name.split(" · ")[0]}<small>{sk.name.split(" · ")[1] || "—"}</small></div>
                    <div className="v">{"★".repeat(sk.level)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3>Field Skills</h3>
              <div className={`${SCOPE}-list`}>
                {persona.skills.practical.slice(0, 6).map((p, i) => (
                  <div className="item" key={i}><div className="nm">{p}</div></div>
                ))}
              </div>
            </div>

            <div>
              <h3>Studies <small>schooling</small></h3>
              <div className={`${SCOPE}-list`}>
                {persona.education.map((e, i) => (
                  <div className="item" key={i}>
                    <div className="nm">{e.degree}<small>{e.org.split(" · ")[0]} · {e.period}</small></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3>Public Work</h3>
              <div className={`${SCOPE}-list`}>
                {persona.publications.map((p, i) => (
                  <div className="item" key={i}>
                    <div className="nm">{p.title}<small>{p.venue}</small></div>
                    <div className="v">{p.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3>Languages</h3>
              <div className={`${SCOPE}-list`}>
                {persona.languages.map((l, i) => (
                  <div className="item" key={i}>
                    <div className="nm">{l.name}<small>{l.level}</small></div>
                    <div className="v">{l.cefr}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${SCOPE}-sign`}>
          <div className="body">
            Boots muddy, spreadsheets clean. Available <b style={{ color: "var(--brick)", fontFamily: "'Zilla Slab', serif", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>Aug 2026</b> — for soil-science roles in extension, research or farm operations.<br/>
            Write to <em style={{ color: "var(--sage)" }}>{persona.email}</em>, ring <em>{persona.phone}</em>, or read more at <em style={{ color: "var(--sage)" }}>{persona.url}</em>.<br/>
            <span className="sig">{persona.name}</span>
          </div>
          <div className="stamp">
            Verified
            <b>A. Lyle</b>
            14·V·MMXXVI
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-cover`} style={{ paddingBottom: 8 }}>
            <div>
              <h1 style={{ fontSize: 26 }}>Field Journal<em style={{ fontSize: 22 }}> — {persona.name}</em></h1>
              <div className="sub" style={{ fontSize: 10 }}>
                <span><b>BK</b> V</span>
                <span><b>2025/26</b></span>
                <span><b>{persona.specialization.split(" · ")[0]}</b></span>
              </div>
            </div>
          </div>
          <div className={`${SCOPE}-topo`} />

          {persona.fields.slice(0, 4).map((f, i) => (
            <Entry
              key={i}
              idx={i + 1}
              date={String(f.year).split(" — ").pop()}
              title={f.name}
              sub={`${f.crop} · ${f.ha} ha`}
              coord={[
                { l: "loc", v: f.loc.split(",")[0] },
                { l: "yr", v: f.year }
              ]}
              data={[
                { l: "crop", v: f.crop },
                { l: "area", v: `${f.ha} ha` }
              ]}
              outcome={f.outcome}
            />
          ))}

          <div className={`${SCOPE}-tag`} style={{ margin: "12px auto", width: 200 }}>
            <div className="latin" style={{ fontSize: 13 }}>Solum britannicum</div>
            <div className="common" style={{ fontSize: 16 }}>British clay loam</div>
            <div className="meta" style={{ fontSize: 9 }}>
              <b>A. Lyle</b> · Whitchurch
            </div>
          </div>

          <h3 style={{ fontFamily: "'Zilla Slab', serif", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", margin: "12px 0 6px", borderBottom: "1.5px solid var(--sage)", paddingBottom: 4 }}>Kit</h3>
          <div className={`${SCOPE}-list`}>
            {persona.skills.tech.slice(0, 6).map((sk, i) => (
              <div className="item" key={i}>
                <div className="nm" style={{ fontSize: 11 }}>{sk.name.split(" · ")[0]}</div>
                <div className="v" style={{ fontSize: 14 }}>{"★".repeat(sk.level)}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: "'Zilla Slab', serif", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", margin: "12px 0 6px", borderBottom: "1.5px solid var(--sage)", paddingBottom: 4 }}>Studies</h3>
          <div className={`${SCOPE}-list`}>
            {persona.education.map((e, i) => (
              <div className="item" key={i}>
                <div className="nm" style={{ fontSize: 11 }}>{e.degree}<small>{e.org.split(" · ")[0]} · {e.period}</small></div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-sign`} style={{ gridTemplateColumns: "1fr", borderTopWidth: 3, marginTop: 16 }}>
            <div className="body" style={{ fontSize: 13 }}>
              Boots muddy, spreadsheets clean.<br/>
              <em style={{ color: "var(--sage)" }}>{persona.email}</em><br/>
              <em>{persona.phone}</em><br/>
              <span className="sig" style={{ fontSize: 22 }}>{persona.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t47cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t47cd = Template_t47cd;
})();


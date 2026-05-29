// Template_t33cd — Official Gazette
// Government-newspaper layout. Heavy serif masthead, heraldic seal, an
// issue strip, multi-column gazette body with NOTICES as the body
// structure: appointments, register of writings, schedule of moots,
// roll of honours. Tail-piece register and reporter's mark at the
// bottom.
//
// Scoped under .t33 / .t33.dark (archive vellum / inverted).

(function () {
  const SCOPE = "t33cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #f3ecd9;
  --paper-2:   #e7ddc1;
  --ink:       #1a120a;
  --ink-2:     #3a2a1d;
  --muted:     #806a52;
  --rule:      rgba(26, 18, 10, 0.40);
  --rule-soft: rgba(26, 18, 10, 0.18);
  --burgundy:  #6e1f29;

  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    radial-gradient(800px 500px at 0% 0%, rgba(255, 245, 220, 0.4), transparent 50%),
    radial-gradient(800px 500px at 100% 100%, rgba(140, 100, 50, 0.10), transparent 60%),
    var(--paper);
  color: var(--ink);
  font-family: "Spectral", "Cormorant Garamond", "Times New Roman", serif;
  font-size: 12.5px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #11100c;
  --paper-2:   #1a1812;
  --ink:       #ece2cb;
  --ink-2:     #cfbf9c;
  --muted:     #8a7c5e;
  --rule:      rgba(236, 226, 203, 0.32);
  --rule-soft: rgba(236, 226, 203, 0.14);
  --burgundy:  #d97a83;
}

.${SCOPE}::before {
  content: ""; position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(40, 25, 10, 0.05) 0.6px, transparent 0.7px),
    radial-gradient(rgba(40, 25, 10, 0.03) 0.5px, transparent 0.6px);
  background-size: 3px 3px, 7px 7px;
  pointer-events: none;
  z-index: 1;
}
.${SCOPE}.dark::before {
  background-image:
    radial-gradient(rgba(236, 226, 203, 0.04) 0.5px, transparent 0.6px),
    radial-gradient(rgba(236, 226, 203, 0.02) 0.5px, transparent 0.6px);
}

.${SCOPE}-page { position: relative; z-index: 2; padding: 26px 44px 36px; }
.${SCOPE}-page-m { position: relative; z-index: 2; padding: 48px 18px 60px; }

/* MASTHEAD */
.${SCOPE}-mast {
  border-top: 6px solid var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding: 10px 0 8px;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  gap: 18px;
  align-items: center;
}
.${SCOPE}-mast .seal {
  width: 76px; height: 76px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  display: grid; place-items: center;
  text-align: center;
  background: var(--paper-2);
  position: relative;
}
.${SCOPE}-mast .seal::before, .${SCOPE}-mast .seal::after {
  content: ""; position: absolute; inset: 4px;
  border-radius: 50%;
  border: 1px solid var(--ink);
}
.${SCOPE}-mast .seal::after {
  inset: 9px;
  border-style: dashed;
  opacity: 0.6;
}
.${SCOPE}-mast .seal span {
  font-family: "EB Garamond", "Cormorant Garamond", serif;
  font-size: 14px;
  letter-spacing: 0.16em;
  font-variant-caps: small-caps;
  color: var(--ink);
  position: relative; z-index: 1;
}
.${SCOPE}-mast .seal span b {
  display: block;
  font-style: italic;
  font-variant-caps: normal;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 0;
  color: var(--ink-2);
  margin-top: 2px;
}

.${SCOPE}-mast .title {
  text-align: center;
}
.${SCOPE}-mast .title h1 {
  font-family: "Playfair Display", "DM Serif Display", "EB Garamond", serif;
  font-weight: 900;
  font-size: 50px;
  line-height: 1;
  margin: 0;
  letter-spacing: 0.01em;
  color: var(--ink);
  text-transform: uppercase;
}
.${SCOPE}-mast .title .roman {
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--ink-2);
  margin-top: 4px;
  letter-spacing: 0.02em;
}
.${SCOPE}-mast .title .roman em { color: var(--burgundy); font-style: italic; }
.${SCOPE}-mast .right {
  text-align: right;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 11.5px;
  color: var(--ink-2);
  line-height: 1.55;
}
.${SCOPE}-mast .right b {
  font-style: normal;
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--ink);
}

/* Issue strip */
.${SCOPE}-strip {
  border-top: 1px solid var(--ink);
  border-bottom: 4px solid var(--ink);
  padding: 6px 0;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 12.5px;
  color: var(--ink-2);
  text-align: center;
}
.${SCOPE}-strip > span { padding: 0 8px; border-right: 1px solid var(--rule); }
.${SCOPE}-strip > span:last-child { border-right: 0; }
.${SCOPE}-strip b {
  font-style: normal;
  font-variant-caps: small-caps;
  letter-spacing: 0.08em;
  color: var(--ink);
}

/* Body columns */
.${SCOPE}-body {
  column-count: 3;
  column-gap: 26px;
  column-rule: 1px solid var(--rule-soft);
}

.${SCOPE}-notice {
  break-inside: avoid;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--rule);
}
.${SCOPE}-notice:last-child { border-bottom: 0; }
.${SCOPE}-notice h3 {
  font-family: "Playfair Display", "EB Garamond", serif;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  letter-spacing: 0.06em;
  margin: 0 0 4px;
  text-transform: uppercase;
  color: var(--ink);
}
.${SCOPE}-notice .by {
  text-align: center;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-variant-caps: small-caps;
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--burgundy);
  margin-bottom: 8px;
}
.${SCOPE}-notice .lede {
  text-align: justify;
  font-size: 12.5px;
  line-height: 1.55;
  margin: 0 0 6px;
}
.${SCOPE}-notice .lede:first-letter {
  font-family: "Playfair Display", "EB Garamond", serif;
  font-weight: 900;
  font-size: 38px;
  float: left;
  line-height: 0.9;
  padding: 2px 6px 0 0;
  color: var(--burgundy);
}
.${SCOPE}-notice .lede b { font-variant-caps: small-caps; letter-spacing: 0.04em; }
.${SCOPE}-notice .lede em { font-style: italic; }
.${SCOPE}-notice .lede cite { color: var(--burgundy); font-style: italic; }

.${SCOPE}-roll {
  font-size: 11.5px;
  line-height: 1.5;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}
.${SCOPE}-roll li {
  padding: 3px 0;
  border-bottom: 1px dotted var(--rule-soft);
  display: grid;
  grid-template-columns: 16px 1fr auto;
  gap: 6px;
}
.${SCOPE}-roll li:last-child { border-bottom: 0; }
.${SCOPE}-roll li .n {
  font-variant-caps: small-caps;
  color: var(--burgundy);
  font-style: italic;
}
.${SCOPE}-roll li em {
  font-style: italic;
  color: var(--muted);
  font-size: 11px;
  margin-left: 4px;
}
.${SCOPE}-roll li .yr {
  font-variant-numeric: oldstyle-nums;
  color: var(--muted);
  font-style: italic;
}

/* Tail piece */
.${SCOPE}-tail {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 4px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 11.5px;
  color: var(--ink-2);
  line-height: 1.55;
}
.${SCOPE}-tail .center { text-align: center; }
.${SCOPE}-tail .right { text-align: right; }
.${SCOPE}-tail b {
  font-style: normal;
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--ink);
}
.${SCOPE}-tail .ornament {
  font-family: "EB Garamond", serif;
  font-size: 16px;
  color: var(--burgundy);
  letter-spacing: 0.32em;
}
`;
    document.head.appendChild(s);
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        {/* Masthead */}
        <div className={`${SCOPE}-mast`}>
          <div className="seal">
            <span>
              UCL
              <b>Faculty of Laws</b>
            </span>
          </div>
          <div className="title">
            <h1>The London Law Gazette</h1>
            <div className="roman"><em>Published by Authority of the Faculty of Laws, University College London.</em></div>
          </div>
          <div className="right">
            <b>Vol. XXXIII</b><br/>
            <em>No. 142</em><br/>
            Thursday<br/>
            <b>14 May, 2026</b><br/>
            <em>Price: one shilling.</em>
          </div>
        </div>

        <div className={`${SCOPE}-strip`}>
          <span>Containing <b>Notices</b> &amp; <b>Appointments</b></span>
          <span>The matter of <b>{persona.name.toUpperCase()}</b>, <em>candidate</em></span>
          <span>For the season of <b>{2026}</b> &mdash; <em>set forth in seven notices following</em></span>
        </div>

        {/* Three-column body */}
        <div className={`${SCOPE}-body`}>
          <div className={`${SCOPE}-notice`}>
            <h3>Notice I. — Of the Candidate</h3>
            <div className="by">By order of the Faculty</div>
            <p className="lede">
              It is hereby published, for general information, that <b>{persona.name.toUpperCase()}</b>,
              of <em>{persona.location}</em>, this day being in the
              <em> final year</em> of the Bachelor of Laws at <cite>{persona.institution}</cite>,
              has signified his intention to present himself for pupillage in the
              ensuing Michaelmas Term. His doctrinal interests are confined to
              <em> {persona.specialization}</em>.
            </p>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice II. — Appointment</h3>
            <div className="by">From the Editorial Office</div>
            <p className="lede">
              By minute of the Faculty Board, dated <em>16 October, 2025</em>, <b>Mr {persona.name.split(" ")[1].toUpperCase()}</b> was appointed
              <em> Editor-in-Chief</em> of the <cite>UCL Bentham Law Review</cite>
              for the academic year 2025/26, in succession to Miss A. M. Whitehead, who proceeded to the Bar.
            </p>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice III. — Schedule of Appearances</h3>
            <div className="by">Compiled by the Mooting Office</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.mooting.map((m, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii", "iv", "v", "vi"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)", fontStyle: "italic" }}>{m.name}</em>
                    <em> &mdash; {m.role}; {m.outcome}.</em>
                  </span>
                  <span className="yr">{m.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice IV. — Register of Writings</h3>
            <div className="by">Communicated to the Bibliographer</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.publications.map((p, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii", "iv", "v"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)" }}>"{p.title}"</em>
                    <em> &mdash; <cite>{p.venue}</cite>{p.pages && `; ${p.pages}`}.</em>
                  </span>
                  <span className="yr">{p.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice V. — Placements &amp; Internships</h3>
            <div className="by">Particulars given as below</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.experience.map((x, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii", "iv", "v"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)" }}>{x.role}</em>
                    <em> &mdash; <cite>{x.org.split(" · ")[0]}</cite>.</em>
                  </span>
                  <span className="yr">{x.period.split(" — ").pop()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice VI. — Educational Record</h3>
            <div className="by">From the Office of the Registrar</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.education.map((e, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)" }}>{e.degree}</em>
                    <em> &mdash; <cite>{e.org.split(" · ")[0]}</cite>; {e.notes.split(".")[0]}.</em>
                  </span>
                  <span className="yr">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice VII. — Of Languages</h3>
            <div className="by">Mode of Examination: viva voce</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.languages.map((l, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)" }}>{l.name}</em>
                    <em> &mdash; {l.level}.</em>
                  </span>
                  <span className="yr">{l.cefr}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice VIII. — Roll of Honours</h3>
            <div className="by">Resolved unanimously</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.awards.map((a, i) => (
                <li key={i}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span>
                    <em style={{ color: "var(--ink)" }}>{a.name}</em>
                    <em> &mdash; <cite>{a.org}</cite>.</em>
                  </span>
                  <span className="yr">{a.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice IX. — Sundry Activities</h3>
            <div className="by">Of the body civil &amp; collegial</div>
            <ul className={`${SCOPE}-roll`}>
              {persona.activities.map((a, i) => (
                <li key={i} style={{ gridTemplateColumns: "16px 1fr" }}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span><em>{a}</em></span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3>Notice X. — Correspondence</h3>
            <div className="by">Direct all matters to:</div>
            <p className="lede" style={{ textAlign: "left" }}>
              <b>{persona.name}</b>; <em>at</em> <em style={{ color: "var(--burgundy)" }}>{persona.email}</em>; <em>by telephone to</em> <b>{persona.phone}</b>; <em>and online at</em> <em style={{ color: "var(--burgundy)" }}>{persona.url}</em>.
            </p>
          </div>
        </div>

        {/* Tail piece */}
        <div className={`${SCOPE}-tail`}>
          <div>
            Printed at the Faculty Press,<br/>
            <b>{persona.institution}</b>,<br/>
            Bidborough Street, London WC1H 9EZ.
          </div>
          <div className="center">
            <div className="ornament">✦ ✦ ✦</div>
            <div style={{ marginTop: 4 }}><b>Sealed</b> by the Sub-Editor;<br/><em>verified — {persona.name} — 14 May MMXXVI.</em></div>
            <div style={{ marginTop: 6 }}><b>End of Gazette.</b></div>
          </div>
          <div className="right">
            <b>Form FG-26</b>. By Authority.<br/>
            Reference: <b>{persona.docketNumber}</b><br/>
            <em>Available in folio on application.</em>
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-mast`} style={{ gridTemplateColumns: "48px 1fr 48px", gap: 10, padding: "6px 0 4px" }}>
            <div className="seal" style={{ width: 44, height: 44 }}>
              <span style={{ fontSize: 9 }}>UCL<b style={{ fontSize: 7.5 }}>Laws</b></span>
            </div>
            <div className="title">
              <h1 style={{ fontSize: 22 }}>The Law Gazette</h1>
              <div className="roman" style={{ fontSize: 10 }}><em>By authority — UCL Faculty of Laws.</em></div>
            </div>
            <div className="right" style={{ fontSize: 9 }}>
              <b>Vol. XXXIII</b><br/>
              <em>14 May</em><br/>
              <b>2026</b>
            </div>
          </div>

          <div className={`${SCOPE}-strip`} style={{ gridTemplateColumns: "1fr", gap: 6, fontSize: 10.5, textAlign: "center", marginBottom: 12 }}>
            <span style={{ borderRight: 0 }}>In the matter of <b>{persona.name.toUpperCase()}</b>, <em>candidate</em></span>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice I. — Of the Candidate</h3>
            <div className="by" style={{ fontSize: 10 }}>By order of the Faculty</div>
            <p className="lede" style={{ fontSize: 11.5 }}>
              It is hereby published that <b>{persona.name.toUpperCase()}</b>, of <em>{persona.location}</em>, in the
              final year of the LLB at <cite>{persona.institution}</cite>, has signified his intention to present himself for pupillage.
              Doctrinal interest: <em>{persona.specialization}</em>.
            </p>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice II. — Moots</h3>
            <ul className={`${SCOPE}-roll`}>
              {persona.mooting.slice(0, 4).map((m, i) => (
                <li key={i} style={{ gridTemplateColumns: "14px 1fr 32px", fontSize: 10.5 }}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span><em style={{ color: "var(--ink)" }}>{m.name}</em><em> — {m.outcome}.</em></span>
                  <span className="yr">{m.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice III. — Writings</h3>
            <ul className={`${SCOPE}-roll`}>
              {persona.publications.slice(0, 4).map((p, i) => (
                <li key={i} style={{ gridTemplateColumns: "14px 1fr 28px", fontSize: 10.5 }}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span><em style={{ color: "var(--ink)" }}>"{p.title}"</em></span>
                  <span className="yr">{p.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice IV. — Placements</h3>
            <ul className={`${SCOPE}-roll`}>
              {persona.experience.slice(0, 4).map((x, i) => (
                <li key={i} style={{ gridTemplateColumns: "14px 1fr 48px", fontSize: 10.5 }}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span><em style={{ color: "var(--ink)" }}>{x.role}</em></span>
                  <span className="yr">{x.period.split(" — ").pop()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice V. — Languages</h3>
            <ul className={`${SCOPE}-roll`}>
              {persona.languages.map((l, i) => (
                <li key={i} style={{ gridTemplateColumns: "14px 1fr 28px", fontSize: 10.5 }}>
                  <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                  <span><em style={{ color: "var(--ink)" }}>{l.name}</em></span>
                  <span className="yr">{l.cefr}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${SCOPE}-notice`}>
            <h3 style={{ fontSize: 14 }}>Notice VI. — Correspondence</h3>
            <p className="lede" style={{ fontSize: 11 }}>
              <b>{persona.name}</b>; <em>at</em> <em style={{ color: "var(--burgundy)" }}>{persona.email}</em>; <b>{persona.phone}</b>; <em style={{ color: "var(--burgundy)" }}>{persona.url}</em>.
            </p>
          </div>

          <div className={`${SCOPE}-tail`} style={{ gridTemplateColumns: "1fr", textAlign: "center", fontSize: 10 }}>
            <div className="ornament" style={{ fontSize: 14 }}>✦ ✦ ✦</div>
            <div>End of Gazette · 14 May MMXXVI</div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t33cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t33cd = Template_t33cd;
})();


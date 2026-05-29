// Template_t32cd — Legal Brief
// A court-filing portfolio. Caption block, line numbers down the left
// margin, roman-numbered sections, numbered paragraphs, citation
// footnotes, counsel signature block. Body in a Times-feeling serif
// (Spectral), captions in small caps, accents in dark burgundy — the
// formality is the point.
//
// Scoped under .t32 / .t32.dark (oxblood-on-vellum night brief).

(function () {
  const SCOPE = "t32cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #faf6ee;
  --paper-2:   #f1ebde;
  --ink:       #181410;
  --ink-2:     #2f2723;
  --muted:     #6a5d54;
  --rule:      rgba(24, 20, 16, 0.30);
  --rule-soft: rgba(24, 20, 16, 0.12);
  --burgundy:  #6e1f29;
  --lineno:    #92857a;

  position: absolute; inset: 0;
  overflow-y: auto;
  background: var(--paper);
  color: var(--ink);
  font-family: "Spectral", "Cormorant Garamond", "Times New Roman", serif;
  font-size: 14px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #0e0b08;
  --paper-2:   #1a140d;
  --ink:       #f0e9da;
  --ink-2:     #d8cfbc;
  --muted:     #9d8e7a;
  --rule:      rgba(240, 233, 218, 0.32);
  --rule-soft: rgba(240, 233, 218, 0.12);
  --burgundy:  #d97a83;
  --lineno:    #6a5d4d;
}

/* Page outer */
.${SCOPE}-page {
  position: relative;
  padding: 36px 56px 44px 100px;        /* leave space for line numbers */
}
.${SCOPE}-page-m { position: relative; padding: 50px 22px 60px 60px; }

/* Two vertical rules separating line-number gutter from body */
.${SCOPE}-rules {
  position: absolute; top: 0; bottom: 0;
  left: 70px;            /* outer rule */
  width: 14px;
  border-left: 1.5px solid var(--ink);
  border-right: 0.5px solid var(--ink);
  z-index: 1;
}
.${SCOPE}-page-m .${SCOPE}-rules { left: 40px; }

/* Line numbers gutter */
.${SCOPE}-lines {
  position: absolute; top: 36px; bottom: 44px;
  left: 0; width: 70px;
  text-align: right;
  font-family: "Spectral", serif;
  font-variant-numeric: oldstyle-nums;
  font-size: 11px;
  color: var(--lineno);
  padding-right: 22px;
  line-height: 23.5px;
  user-select: none;
  z-index: 2;
}
.${SCOPE}-page-m .${SCOPE}-lines { left: 0; width: 38px; padding-right: 10px; top: 50px; bottom: 60px; font-size: 9px; line-height: 22px; }
.${SCOPE}-lines i {
  display: block;
  font-style: normal;
}
.${SCOPE}-lines i.skip { color: transparent; }

/* CAPTION BLOCK */
.${SCOPE}-caption {
  border: 1.5px solid var(--ink);
  padding: 14px 18px;
  margin-bottom: 24px;
  position: relative;
  z-index: 3;
}
.${SCOPE}-caption .court {
  text-align: center;
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.18em;
  line-height: 1.4;
}
.${SCOPE}-caption .court em {
  display: block;
  font-style: italic;
  font-variant-caps: normal;
  font-weight: 400;
  font-size: 12.5px;
  letter-spacing: 0;
  color: var(--muted);
  margin-top: 4px;
}
.${SCOPE}-caption .ornament {
  text-align: center;
  color: var(--burgundy);
  margin: 8px 0;
  letter-spacing: 0.4em;
  font-size: 14px;
}
.${SCOPE}-caption .parties {
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 24px;
  align-items: start;
}
.${SCOPE}-caption .parties .lhs {
  font-variant-caps: small-caps;
  font-size: 14px;
  letter-spacing: 0.04em;
}
.${SCOPE}-caption .parties .lhs em {
  font-style: italic;
  font-variant-caps: normal;
  color: var(--muted);
  font-size: 12.5px;
  letter-spacing: 0;
}
.${SCOPE}-caption .parties .lhs b {
  font-weight: 400;
  color: var(--burgundy);
  letter-spacing: 0.12em;
  font-size: 13px;
}
.${SCOPE}-caption .parties .rhs {
  border-left: 1px solid var(--ink);
  padding-left: 18px;
  font-size: 11.5px;
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--ink);
}
.${SCOPE}-caption .parties .rhs span {
  display: block;
  margin-bottom: 3px;
}
.${SCOPE}-caption .parties .rhs b { font-weight: 600; }

.${SCOPE}-title {
  text-align: center;
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.14em;
  margin: 24px 0 22px;
  position: relative;
  z-index: 3;
}
.${SCOPE}-title em {
  display: block;
  font-style: italic;
  font-variant-caps: normal;
  font-size: 13px;
  letter-spacing: 0;
  color: var(--muted);
  margin-top: 4px;
}

/* SECTIONS — roman headers, numbered paragraphs */
.${SCOPE}-section { margin-bottom: 18px; position: relative; z-index: 3; }
.${SCOPE}-section h2 {
  text-align: center;
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.18em;
  margin: 18px 0 12px;
  color: var(--ink);
}
.${SCOPE}-section h2 em {
  font-style: italic;
  font-variant-caps: normal;
  color: var(--burgundy);
  letter-spacing: 0;
  margin-right: 8px;
}
.${SCOPE}-para {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 6px;
  margin-bottom: 6px;
}
.${SCOPE}-para .n {
  font-variant-numeric: oldstyle-nums;
  color: var(--burgundy);
  text-align: right;
  font-weight: 600;
  padding-top: 1px;
}
.${SCOPE}-para p {
  margin: 0;
  text-indent: 0;
  text-align: justify;
}
.${SCOPE}-para p b { font-variant-caps: small-caps; letter-spacing: 0.04em; font-weight: 600; }
.${SCOPE}-para p em { font-style: italic; }
.${SCOPE}-para p cite {
  color: var(--burgundy);
  font-style: italic;
  font-size: 12.5px;
  letter-spacing: 0.01em;
}

/* Schedules / tables for moots, publications */
.${SCOPE}-sched {
  margin: 8px 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  font-size: 12.5px;
}
.${SCOPE}-sched .row {
  display: grid;
  grid-template-columns: 38px 1fr 80px;
  gap: 12px;
  padding: 5px 0;
  border-bottom: 1px dotted var(--rule);
  align-items: baseline;
}
.${SCOPE}-sched .row:last-child { border-bottom: 0; }
.${SCOPE}-sched .row .n {
  text-align: right;
  font-variant-caps: small-caps;
  color: var(--burgundy);
  letter-spacing: 0.06em;
}
.${SCOPE}-sched .row .ti {
  line-height: 1.35;
}
.${SCOPE}-sched .row .ti em {
  font-style: italic;
  color: var(--muted);
  font-size: 12px;
}
.${SCOPE}-sched .row .yr {
  font-variant-numeric: oldstyle-nums;
  color: var(--muted);
  text-align: right;
  font-style: italic;
}

/* Footnotes */
.${SCOPE}-foot {
  margin: 18px 0 0;
  border-top: 1px solid var(--ink);
  padding-top: 8px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}
.${SCOPE}-foot sup {
  color: var(--burgundy);
  font-weight: 600;
  margin-right: 3px;
}

/* Signature block */
.${SCOPE}-sigblock {
  margin-top: 30px;
  text-align: right;
  position: relative;
  z-index: 3;
}
.${SCOPE}-sigblock .resp {
  font-variant-caps: small-caps;
  font-size: 14px;
  letter-spacing: 0.12em;
  margin-bottom: 14px;
}
.${SCOPE}-sigblock .sig {
  display: inline-block;
  font-family: "Caveat", "Allura", cursive;
  font-size: 38px;
  color: var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding: 0 8px 2px;
  line-height: 1;
}
.${SCOPE}-sigblock .who {
  margin-top: 6px;
  font-variant-caps: small-caps;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-size: 14px;
}
.${SCOPE}-sigblock .who em {
  display: block;
  font-style: italic;
  font-variant-caps: normal;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0;
  margin-top: 4px;
  line-height: 1.5;
}
.${SCOPE}-sigblock .who em b { font-style: normal; font-weight: 400; color: var(--ink); }
`;
    document.head.appendChild(s);
  }

  function LineNumbers({ count }) {
    return (
      <div className={`${SCOPE}-lines`}>
        {Array.from({ length: count }).map((_, i) => (
          <i key={i}>{String(i + 1).padStart(2, "0")}</i>
        ))}
      </div>
    );
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        <LineNumbers count={36} />
        <div className={`${SCOPE}-rules`} />

        <div className={`${SCOPE}-caption`}>
          <div className="court">
            In the High Court of Justice
            <em>King's Bench Division · London · 2026</em>
          </div>
          <div className="ornament">✦ ✦ ✦</div>
          <div className="parties">
            <div className="lhs">
              <span>In the matter of</span><br/>
              <b>{persona.name.toUpperCase()}</b>,
              <em> candidate (LLB), of {persona.institution}</em>;
              <br/>and
              <br/>
              <span>In the matter of</span><br/>
              <b>HIS APPLICATION FOR PUPILLAGE</b>
              <em>(2026 / 27 intake)</em>
            </div>
            <div className="rhs">
              <span>Claim №</span>
              <span><b>{persona.docketNumber}</b></span>
              <span style={{ marginTop: 8 }}>Court Seat</span>
              <span><b>{persona.courtSeat}</b></span>
              <span style={{ marginTop: 8 }}>Filed</span>
              <span><b>14 May 2026</b></span>
            </div>
          </div>
        </div>

        <div className={`${SCOPE}-title`}>
          Skeleton Argument in support of the candidate
          <em>(submitted by the candidate in person, in lieu of curriculum vitæ)</em>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>I.</em> The Parties &amp; Jurisdiction</h2>
          <div className={`${SCOPE}-para`}>
            <span className="n">1.</span>
            <p>
              The Candidate, <b>{persona.name}</b>, is in his final year of the
              <em> Bachelor of Laws </em> at <b>{persona.institution}</b>,
              {persona.faculty.replace("UCL ", "")}. His doctrinal focus is
              <em> {persona.specialization}</em>, with particular interest in the
              relationship between Parliament and the Convention.<sup>1</sup>
            </p>
          </div>
          <div className={`${SCOPE}-para`}>
            <span className="n">2.</span>
            <p>
              For the period of this application he is also <b>Editor-in-Chief</b> of
              the <cite>UCL Bentham Law Review</cite>, and a Pro Bono Caseworker on
              the housing rota of the UCL Law Clinic. He proposes the Bar of England
              and Wales, having been admitted as a Hardwicke Entrance Scholar of
              <em> {persona.courtSeat}</em> in Michaelmas Term 2022.
            </p>
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>II.</em> Statement of Qualifications</h2>
          <div className={`${SCOPE}-sched`}>
            {persona.education.map((e, i) => (
              <div className="row" key={i}>
                <span className="n">{["i", "ii", "iii", "iv"][i]}.</span>
                <span className="ti">
                  <em>{e.degree}</em>, {e.org}.
                  <br/>
                  <em>{e.notes}</em>
                </span>
                <span className="yr">{e.period}</span>
              </div>
            ))}
          </div>
          <div className={`${SCOPE}-para`}>
            <span className="n">3.</span>
            <p>
              The Candidate is, on present indications, predicted a <b>First</b> in
              the LLB. He has been awarded the Faculty Prize in Constitutional Law
              (2024) and the Sir John Foster Bursary (2024); a fuller schedule of
              distinctions appears at <em>Section VI</em>, infra.
            </p>
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>III.</em> Appearances &amp; Mooting Record</h2>
          <div className={`${SCOPE}-sched`}>
            {persona.mooting.map((m, i) => (
              <div className="row" key={i}>
                <span className="n">{["i", "ii", "iii", "iv", "v", "vi"][i]}.</span>
                <span className="ti">
                  <em>{m.name}</em> — appearing as {m.role}.
                  <br/><em>{m.outcome}.</em>
                </span>
                <span className="yr">{m.year}</span>
              </div>
            ))}
          </div>
          <div className={`${SCOPE}-para`}>
            <span className="n">4.</span>
            <p>
              The Candidate respectfully submits that, taken together, the above
              eight competitive moots in three academic years &mdash; including a
              <em> Best Memorial</em> at <cite>Jessup (Regional)</cite> and a
              <em> Winner</em> at the <cite>OUP Constitutional Moot</cite> &mdash;
              evidence a developed capacity for written advocacy under time pressure.
            </p>
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>IV.</em> Practical Experience</h2>
          <div className={`${SCOPE}-sched`}>
            {persona.experience.map((x, i) => (
              <div className="row" key={i}>
                <span className="n">{["a", "b", "c", "d", "e"][i]}.</span>
                <span className="ti">
                  <b>{x.role}</b> — <cite>{x.org}</cite>.
                  <br/><em>{x.bullets[0]}</em>
                </span>
                <span className="yr">{x.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>V.</em> Publications &amp; Writing</h2>
          <div className={`${SCOPE}-sched`}>
            {persona.publications.map((p, i) => (
              <div className="row" key={i}>
                <span className="n">{["i", "ii", "iii", "iv", "v"][i]}.</span>
                <span className="ti">
                  <em>"{p.title}"</em>, <cite>{p.venue}</cite>{p.pages && `, ${p.pages}`}.
                  <br/><em>{p.role}.</em>
                </span>
                <span className="yr">{p.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>VI.</em> Languages, Awards &amp; Activities</h2>
          <div className={`${SCOPE}-para`}>
            <span className="n">5.</span>
            <p>
              <b>Languages.</b> {persona.languages.map((l) => `${l.name} (${l.cefr || l.level})`).join("; ")}.
              The French and German are deployed in cross-border research, including
              the Sciences Po exchange (Spring 2024) and a four-week placement at the
              Registry of the <cite>European Court of Human Rights</cite>.
            </p>
          </div>
          <div className={`${SCOPE}-para`}>
            <span className="n">6.</span>
            <p>
              <b>Awards.</b> {persona.awards.map((a) => `${a.name} (${a.org}, ${a.year})`).join("; ")}.
            </p>
          </div>
          <div className={`${SCOPE}-para`}>
            <span className="n">7.</span>
            <p>
              <b>Activities.</b> {persona.activities.join(" ")}
            </p>
          </div>
        </div>

        <div className={`${SCOPE}-section`}>
          <h2><em>VII.</em> Prayer for Relief</h2>
          <div className={`${SCOPE}-para`}>
            <span className="n">8.</span>
            <p>
              WHEREFORE the Candidate respectfully prays that this honourable
              Chambers will&nbsp;
              <em>(a)</em> grant an interview;&nbsp;
              <em>(b)</em> consider the writing samples annexed at <cite>Bundle B</cite>;
              and <em>(c)</em> make such further or other order as may be just.
              Correspondence may be directed to:&nbsp;
              <b>{persona.email}</b>;&nbsp;
              <b>{persona.phone}</b>;&nbsp;
              <b>{persona.url}</b>.
            </p>
          </div>
        </div>

        <div className={`${SCOPE}-foot`}>
          <p style={{ margin: 0 }}>
            <sup>1</sup> <em>R (Adams) v Secretary of State</em> [2024] UKSC 12;
            <em> Verein KlimaSeniorinnen v Switzerland</em>, App No 53600/20 (ECtHR, GC, 2024).
            See further the Candidate's case note at <cite>(2024) 32 UCL Bentham L Rev 144</cite>.
          </p>
        </div>

        <div className={`${SCOPE}-sigblock`}>
          <div className="resp">Respectfully submitted,</div>
          <div className="sig">{persona.name}</div>
          <div className="who">
            {persona.name.toUpperCase()}
            <em>
              Candidate, in person — <b>{persona.email}</b><br/>
              {persona.courtSeat}, London &middot; {persona.barNumber}<br/>
              Dated this 14<sup>th</sup> day of May, MMXXVI.
            </em>
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <LineNumbers count={42} />
          <div className={`${SCOPE}-rules`} style={{ left: 40 }} />

          <div className={`${SCOPE}-caption`}>
            <div className="court" style={{ fontSize: 11 }}>
              In the High Court of Justice
              <em style={{ fontSize: 10 }}>King's Bench Division · London · 2026</em>
            </div>
            <div className="ornament" style={{ margin: "6px 0", fontSize: 10 }}>✦ ✦ ✦</div>
            <div style={{ fontVariantCaps: "small-caps", fontSize: 11.5, letterSpacing: "0.04em", lineHeight: 1.5 }}>
              In the matter of <b>{persona.name.toUpperCase()}</b>,
              <em style={{ fontVariantCaps: "normal", fontStyle: "italic", color: "var(--muted)" }}> candidate (LLB)</em>;
              <br/>and his application for <b>pupillage</b>.
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
              <span>Claim № <b style={{ color: "var(--ink)" }}>{persona.docketNumber}</b></span>
              <span>14 May 2026</span>
            </div>
          </div>

          <div className={`${SCOPE}-title`} style={{ fontSize: 13, margin: "16px 0 14px" }}>
            Skeleton argument in support
            <em style={{ fontSize: 11 }}>in lieu of curriculum vitæ</em>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>I.</em> The Parties</h2>
            <div className={`${SCOPE}-para`}>
              <span className="n">1.</span>
              <p style={{ fontSize: 12.5 }}>
                The Candidate, <b>{persona.name}</b>, reads <em>Law</em> at <b>{persona.institution}</b>.
                Doctrinal focus: <em>{persona.specialization}</em>. Editor-in-Chief, <cite>UCL Bentham Law Review</cite>.
              </p>
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>II.</em> Education</h2>
            <div className={`${SCOPE}-sched`}>
              {persona.education.map((e, i) => (
                <div className="row" key={i} style={{ gridTemplateColumns: "20px 1fr 60px", fontSize: 11 }}>
                  <span className="n">{["i", "ii", "iii"][i]}.</span>
                  <span className="ti"><em>{e.degree}</em>, {e.org.split(" · ")[0]}.</span>
                  <span className="yr">{e.period.split(" — ")[1] || e.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>III.</em> Moots</h2>
            <div className={`${SCOPE}-sched`}>
              {persona.mooting.slice(0, 5).map((m, i) => (
                <div className="row" key={i} style={{ gridTemplateColumns: "20px 1fr 36px", fontSize: 11 }}>
                  <span className="n">{["i", "ii", "iii", "iv", "v"][i]}.</span>
                  <span className="ti"><em>{m.name}</em>. {m.outcome}.</span>
                  <span className="yr">{m.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>IV.</em> Experience</h2>
            <div className={`${SCOPE}-sched`}>
              {persona.experience.slice(0, 4).map((x, i) => (
                <div className="row" key={i} style={{ gridTemplateColumns: "20px 1fr 56px", fontSize: 11 }}>
                  <span className="n">{["a", "b", "c", "d"][i]}.</span>
                  <span className="ti"><b>{x.role}</b> — <cite>{x.org.split(" · ")[0]}</cite>.</span>
                  <span className="yr">{x.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>V.</em> Languages</h2>
            <div className={`${SCOPE}-para`}>
              <span className="n">5.</span>
              <p style={{ fontSize: 12 }}>
                {persona.languages.map((l) => `${l.name} (${l.cefr || l.level})`).join("; ")}.
              </p>
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2 style={{ fontSize: 12, margin: "14px 0 8px" }}><em>VI.</em> Prayer</h2>
            <div className={`${SCOPE}-para`}>
              <span className="n">8.</span>
              <p style={{ fontSize: 12 }}>
                Correspondence may be directed to <b>{persona.email}</b>, <b>{persona.phone}</b>.
              </p>
            </div>
          </div>

          <div className={`${SCOPE}-sigblock`} style={{ marginTop: 18 }}>
            <div className="resp" style={{ fontSize: 11, marginBottom: 10 }}>Respectfully submitted,</div>
            <div className="sig" style={{ fontSize: 26 }}>{persona.name}</div>
            <div className="who" style={{ fontSize: 11 }}>
              {persona.name.toUpperCase()}
              <em style={{ fontSize: 10 }}>
                Candidate, in person<br/>
                {persona.courtSeat} &middot; 14<sup>th</sup> May, MMXXVI.
              </em>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t32cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t32cd = Template_t32cd;
})();


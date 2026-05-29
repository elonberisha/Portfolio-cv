// Template_t37cd — Rx Prescription
// A prescription pad as a CV. Clinic letterhead at top, patient block,
// big Rx symbol, then numbered prescriptions where each "Rx" is a
// portfolio section (rotations, research, skills, certs, education,
// languages). Signature line and a red URGENT stamp at the bottom.
//
// Slightly worn pad paper, pale-blue lined, mixed type (printed clinic
// header + typewritten instructions + handwritten doses). Sells the
// metaphor; doesn't read as a generic resume card stack.
//
// Scoped under .t31 / .t31.dark (carbon-copy duplicate aesthetic).

(function () {
  const SCOPE = "t37cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --pad:        #f1ece1;
  --pad-2:      #e8e1cc;
  --line:       rgba(50, 110, 170, 0.20);
  --line-soft:  rgba(50, 110, 170, 0.10);
  --ink:        #1c3a5c;          /* navy fountain-pen */
  --ink-soft:   #3a557a;
  --muted:      #6e7a8a;
  --print:      #2a2620;          /* printed header */
  --red:        #a82221;          /* rubber stamp red */
  --rule:       rgba(28, 58, 92, 0.32);

  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    /* the pad has a perforated edge */
    radial-gradient(circle at 0% var(--y, 0%), transparent 5px, var(--pad) 5.5px),
    var(--pad);
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px);
  background-size: 100% 26px;
  background-position: 0 70px;
  color: var(--ink);
  font-family: "Special Elite", "Courier Prime", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --pad:        #0e1620;
  --pad-2:      #16202c;
  --line:       rgba(120, 180, 220, 0.20);
  --line-soft:  rgba(120, 180, 220, 0.10);
  --ink:        #b8d4f0;
  --ink-soft:   #a0c0e0;
  --muted:      #7a8da3;
  --print:      #e0e5ec;
  --red:        #ff8074;
  --rule:       rgba(184, 212, 240, 0.32);
}

.${SCOPE}-page { position: relative; padding: 28px 36px 38px; }
.${SCOPE}-page-m { position: relative; padding: 50px 18px 60px; }

/* Letterhead */
.${SCOPE}-letterhead {
  position: relative;
  border-bottom: 1.5px solid var(--ink);
  padding: 0 4px 14px;
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 18px;
  align-items: end;
  margin-bottom: 16px;
}
.${SCOPE}-letterhead .crest {
  width: 56px; height: 56px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  display: grid; place-items: center;
  font-family: "EB Garamond", serif;
  font-size: 24px;
  font-style: italic;
  color: var(--ink);
  background: var(--pad-2);
  position: relative;
}
.${SCOPE}-letterhead .crest::after {
  content: "M·D";
  position: absolute;
  bottom: -16px; left: 50%; transform: translateX(-50%);
  font-family: "EB Garamond", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  font-style: normal;
}
.${SCOPE}-letterhead .who h1 {
  font-family: "EB Garamond", serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 1;
  margin: 0;
  color: var(--print);
  letter-spacing: 0.02em;
}
.${SCOPE}-letterhead .who .qual {
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--ink-soft);
  margin-top: 4px;
}
.${SCOPE}-letterhead .who .addr {
  font-family: "Courier Prime", "Special Elite", monospace;
  font-size: 11px;
  color: var(--muted);
  margin-top: 8px;
  letter-spacing: 0.04em;
  line-height: 1.45;
}
.${SCOPE}-letterhead .right {
  text-align: right;
  font-family: "Courier Prime", monospace;
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.06em;
  line-height: 1.55;
}
.${SCOPE}-letterhead .right b { color: var(--ink); font-weight: 400; letter-spacing: 0.04em; }
.${SCOPE}-letterhead .right .pad-no {
  display: inline-block;
  border: 1.5px dashed var(--ink);
  padding: 3px 8px;
  margin-top: 6px;
  font-family: "Special Elite", monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--ink);
}

/* Patient block */
.${SCOPE}-patient {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
  padding: 12px 4px;
  border-bottom: 1.5px solid var(--ink);
  margin-bottom: 14px;
}
.${SCOPE}-patient .field {
  display: flex; flex-direction: column;
  padding-bottom: 6px;
}
.${SCOPE}-patient .field .l {
  font-family: "Special Elite", monospace;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 4px;
}
.${SCOPE}-patient .field .v {
  font-family: "Caveat", "Kalam", cursive;
  font-size: 22px;
  line-height: 1;
  color: var(--ink);
  border-bottom: 1.5px solid var(--rule);
  padding-bottom: 4px;
}

/* Big Rx symbol */
.${SCOPE}-rxhead {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 18px;
  align-items: center;
  margin: 6px 0 4px;
}
.${SCOPE}-rxhead .rx {
  font-family: "EB Garamond", "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 72px;
  line-height: 0.9;
  color: var(--ink);
  text-align: center;
  position: relative;
}
.${SCOPE}-rxhead .rx::after {
  content: "";
  position: absolute;
  left: 18%; top: 36%;
  width: 30%; height: 2px;
  background: var(--ink);
  transform: rotate(-26deg);
}
.${SCOPE}-rxhead .title {
  font-family: "Special Elite", monospace;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
}
.${SCOPE}-rxhead .title b {
  display: block;
  font-family: "Caveat", cursive;
  font-style: normal;
  font-size: 26px;
  line-height: 1;
  color: var(--ink);
  letter-spacing: 0;
  margin-top: 4px;
  text-transform: none;
}
.${SCOPE}-rxhead .stamp {
  border: 3px solid var(--red);
  color: var(--red);
  padding: 8px 14px;
  font-family: "Special Elite", monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transform: rotate(-4deg);
  text-align: center;
  background: rgba(255,255,255,.03);
}
.${SCOPE}-rxhead .stamp b {
  display: block;
  font-size: 18px;
  letter-spacing: 0.08em;
  margin-top: 2px;
}

/* Rx entry */
.${SCOPE}-rx {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1.5px dashed var(--rule);
  position: relative;
}
.${SCOPE}-rx:last-of-type { border-bottom: 0; }
.${SCOPE}-rx .n {
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 20px;
  color: var(--ink-soft);
  line-height: 1.1;
  text-align: right;
  padding-top: 1px;
}
.${SCOPE}-rx .body { }
.${SCOPE}-rx .drug {
  font-family: "Caveat", cursive;
  font-size: 24px;
  line-height: 1.05;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.${SCOPE}-rx .drug em {
  font-family: "Special Elite", monospace;
  font-style: normal;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.06em;
  margin-left: 8px;
}
.${SCOPE}-rx .sig {
  font-family: "Special Elite", monospace;
  font-size: 11.5px;
  color: var(--ink);
  letter-spacing: 0.04em;
  margin-top: 4px;
  line-height: 1.5;
}
.${SCOPE}-rx .sig b {
  font-weight: 400;
  color: var(--red);
  letter-spacing: 0.14em;
}
.${SCOPE}-rx .lines {
  margin-top: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 24px;
  font-family: "Caveat", cursive;
  font-size: 18px;
  color: var(--ink);
  line-height: 1.2;
}
.${SCOPE}-rx .lines > div {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  border-bottom: 1px dotted var(--rule);
  padding: 2px 0;
}
.${SCOPE}-rx .lines > div em {
  font-family: "Special Elite", monospace;
  font-style: normal;
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.04em;
  align-self: center;
}
.${SCOPE}-rx .lines.compact { grid-template-columns: 1fr 1fr 1fr; font-size: 16px; }

/* meta line under each prescription */
.${SCOPE}-rx .meta {
  margin-top: 6px;
  padding-top: 4px;
  border-top: 1px dotted var(--rule);
  display: flex;
  gap: 16px;
  font-family: "Special Elite", monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.${SCOPE}-rx .meta b { color: var(--ink); font-weight: 400; }

/* Signature block at the bottom */
.${SCOPE}-sign {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1.5px solid var(--ink);
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 30px;
  align-items: end;
}
.${SCOPE}-sign .sigline {
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 4px;
  font-family: "Caveat", cursive;
  font-size: 36px;
  color: var(--ink);
  line-height: 1;
  transform: rotate(-2deg);
  transform-origin: bottom left;
  display: inline-block;
}
.${SCOPE}-sign label {
  display: block;
  font-family: "Special Elite", monospace;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 6px;
}
.${SCOPE}-sign .dated {
  font-family: "Caveat", cursive;
  font-size: 22px;
  color: var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 4px;
  display: block;
}
.${SCOPE}-sign .gmc {
  font-family: "Special Elite", monospace;
  font-size: 11px;
  color: var(--ink);
  letter-spacing: 0.06em;
}

/* Mobile */
.${SCOPE}-m-letterhead { grid-template-columns: 44px 1fr; }
`;
    document.head.appendChild(s);
  }

  // Rx entry helper
  function Rx({ n, drug, dose, sig, refills, qty, children }) {
    return (
      <div className={`${SCOPE}-rx`}>
        <div className="n">{n}.</div>
        <div className="body">
          <div className="drug">
            {drug}
            {dose && <em>{dose}</em>}
          </div>
          <div className="sig"><b>Sig.</b> {sig}</div>
          {children}
          {(qty || refills) && (
            <div className="meta">
              {qty && <span>Disp. <b>{qty}</b></span>}
              {refills !== undefined && <span>Refills <b>{refills}</b></span>}
              <span style={{ marginLeft: "auto" }}>Sub. permitted</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        {/* Letterhead */}
        <div className={`${SCOPE}-letterhead`}>
          <div className="crest">℞</div>
          <div className="who">
            <h1>{persona.name}, BMedSci (Hons)</h1>
            <div className="qual">{persona.field} · {persona.year} · MBChB candidate, 2026</div>
            <div className="addr">
              {persona.faculty}, {persona.institution}<br/>
              47 Little France Crescent · Edinburgh · EH16 4SB<br/>
              Tel. {persona.phone}  ·  {persona.email}  ·  {persona.url}
            </div>
          </div>
          <div className="right">
            <div>FORM FP10HNC · ED-MED</div>
            <div>Pad No. <b>0026</b></div>
            <div>Date <b>14 / V / 2026</b></div>
            <div className="pad-no">CV · Repeat · Indefinite</div>
          </div>
        </div>

        {/* Patient block (actually the candidate's own ID) */}
        <div className={`${SCOPE}-patient`}>
          <div className="field">
            <span className="l">Patient Name</span>
            <span className="v">Future Employer / Programme Lead</span>
          </div>
          <div className="field">
            <span className="l">DOB</span>
            <span className="v">— · n/a</span>
          </div>
          <div className="field">
            <span className="l">Reason for prescription</span>
            <span className="v">Apply for residency / FY1 post</span>
          </div>
        </div>

        {/* Rx head */}
        <div className={`${SCOPE}-rxhead`}>
          <div className="rx">℞</div>
          <div className="title">
            Take as directed —
            <b>{persona.summary}</b>
          </div>
          <div className="stamp">
            verified
            <b>EH</b>
          </div>
        </div>

        {/* Rx entries */}
        <Rx
          n="i"
          drug="Clinical Rotations"
          dose={`${persona.rotations.length} services · ${persona.rotations.reduce((a, r) => a + r.weeks, 0)} weeks`}
          sig="As scheduled, all sites, no missed shifts."
          qty="42 weeks"
          refills="∞"
        >
          <div className="lines">
            {persona.rotations.map((r, i) => (
              <div key={i}>
                <span>{r.service} <em>· {r.site}, {r.period}</em></span>
                <em>{r.weeks} w</em>
              </div>
            ))}
          </div>
        </Rx>

        <Rx
          n="ii"
          drug="Research / Audit"
          dose={`${persona.research.length} works in progress`}
          sig="Continue indefinitely. May be combined with clinical duties."
          qty="4 papers"
          refills="ongoing"
        >
          <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
            {persona.research.map((r, i) => (
              <div key={i}>
                <span>{r.title} <em>— {r.venue}, {r.year}</em></span>
                <em>{r.status}</em>
              </div>
            ))}
          </div>
        </Rx>

        <Rx
          n="iii"
          drug="Clinical Skills"
          dose={`${persona.skills.clinical.length} procedures · independent / supervised mix`}
          sig="Maintain logbook. Audit annually."
        >
          <div className="lines compact">
            {persona.skills.clinical.map((sk, i) => (
              <div key={i}>
                <span>{sk.name}</span>
                <em>{sk.level.split(" ")[0]}</em>
              </div>
            ))}
          </div>
          <div className="meta">
            <span>Software adjunct: <b>{persona.skills.software.map(s => s.name.split(" ")[0]).slice(0, 5).join(" / ")}</b></span>
          </div>
        </Rx>

        <Rx
          n="iv"
          drug="Education"
          dose={`${persona.education.length} programmes · primary + prior`}
          sig="Awarded; certificates available on request."
        >
          <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
            {persona.education.map((e, i) => (
              <div key={i}>
                <span>{e.degree} <em>— {e.org}, {e.period}</em></span>
                <em>{e.notes.split(".")[0]}</em>
              </div>
            ))}
          </div>
        </Rx>

        <Rx
          n="v"
          drug="Awards · Languages"
          dose={`${persona.awards.length} distinctions · ${persona.languages.length} tongues`}
          sig="To be presented with each application as required."
        >
          <div className="lines">
            {persona.awards.slice(0, 4).map((a, i) => (
              <div key={i}>
                <span>{a.name}</span>
                <em>{a.year}</em>
              </div>
            ))}
            {persona.languages.map((l, i) => (
              <div key={"l" + i}>
                <span>{l.name} <em>— {l.level.toLowerCase()}</em></span>
                <em>{l.cefr}</em>
              </div>
            ))}
          </div>
        </Rx>

        <Rx
          n="vi"
          drug="Extra-curricular"
          dose={`${persona.extras.length} community roles`}
          sig="Continue as time permits. May relieve symptoms of burnout."
        >
          <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
            {persona.extras.map((e, i) => (
              <div key={i}>
                <span>{e}</span>
              </div>
            ))}
          </div>
        </Rx>

        {/* Signature */}
        <div className={`${SCOPE}-sign`}>
          <div>
            <div className="sigline">{persona.name}</div>
            <label>Signature of Prescriber</label>
          </div>
          <div>
            <span className="dated">14 / V / 2026</span>
            <label>Date</label>
          </div>
          <div>
            <div className="gmc">
              GMC / NMC<br/>
              <b style={{ fontSize: 13, letterSpacing: "0.06em" }}>{persona.mrn}</b><br/>
              <span style={{ color: "var(--muted)" }}>(provisional, ED-MED)</span>
            </div>
            <label>Registration</label>
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-letterhead ${SCOPE}-m-letterhead`} style={{ paddingBottom: 10 }}>
            <div className="crest" style={{ width: 40, height: 40, fontSize: 18 }}>℞</div>
            <div className="who">
              <h1 style={{ fontSize: 20 }}>{persona.name}</h1>
              <div className="qual" style={{ fontSize: 12 }}>{persona.field} · {persona.year}</div>
              <div className="addr" style={{ fontSize: 10 }}>
                {persona.institution}<br/>
                {persona.email}
              </div>
            </div>
          </div>

          <div className={`${SCOPE}-patient`} style={{ gridTemplateColumns: "1fr", gap: 8, padding: "8px 4px", marginBottom: 10 }}>
            <div className="field">
              <span className="l">Patient</span>
              <span className="v" style={{ fontSize: 18 }}>Future Employer / Programme Lead</span>
            </div>
            <div className="field">
              <span className="l">Reason</span>
              <span className="v" style={{ fontSize: 18 }}>FY1 application 2026</span>
            </div>
          </div>

          <div className={`${SCOPE}-rxhead`} style={{ gridTemplateColumns: "48px 1fr auto", gap: 10 }}>
            <div className="rx" style={{ fontSize: 44 }}>℞</div>
            <div className="title" style={{ fontSize: 10 }}>
              Take as directed —
              <b style={{ fontSize: 16 }}>{persona.tagline}</b>
            </div>
            <div className="stamp" style={{ fontSize: 9, padding: "5px 8px" }}>
              verified
              <b style={{ fontSize: 13 }}>EH</b>
            </div>
          </div>

          <Rx n="i" drug="Clinical Rotations" dose={`${persona.rotations.length}svc · ${persona.rotations.reduce((a, r) => a + r.weeks, 0)}w`} sig="As scheduled, all sites." qty="42w">
            <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
              {persona.rotations.slice(0, 5).map((r, i) => (
                <div key={i} style={{ fontSize: 14 }}>
                  <span>{r.service} <em>· {r.site}</em></span>
                  <em>{r.weeks}w</em>
                </div>
              ))}
            </div>
          </Rx>

          <Rx n="ii" drug="Research" dose={`${persona.research.length} works`} sig="Continue indefinitely.">
            <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
              {persona.research.slice(0, 3).map((r, i) => (
                <div key={i} style={{ fontSize: 13 }}>
                  <span>{r.title}</span>
                  <em>{r.year}</em>
                </div>
              ))}
            </div>
          </Rx>

          <Rx n="iii" drug="Clinical Skills" dose={`${persona.skills.clinical.length} procedures`} sig="Maintain logbook.">
            <div className="lines" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
              {persona.skills.clinical.slice(0, 6).map((sk, i) => (
                <div key={i}><span>{sk.name}</span><em>{sk.level.split(" ")[0]}</em></div>
              ))}
            </div>
          </Rx>

          <Rx n="iv" drug="Education" dose={`${persona.education.length} programmes`} sig="Certificates on request.">
            <div className="lines" style={{ gridTemplateColumns: "1fr" }}>
              {persona.education.map((e, i) => (
                <div key={i} style={{ fontSize: 13 }}>
                  <span>{e.degree.replace("(Hons) ", "")} <em>— {e.org.split(" · ")[0]}</em></span>
                  <em>{e.period.split(" — ")[1] || e.period}</em>
                </div>
              ))}
            </div>
          </Rx>

          <Rx n="v" drug="Languages · Awards" dose={`${persona.awards.length} dist. · ${persona.languages.length} lang.`} sig="On request.">
            <div className="lines" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
              {persona.languages.map((l, i) => (
                <div key={"l" + i}><span>{l.name}</span><em>{l.cefr}</em></div>
              ))}
            </div>
          </Rx>

          <div className={`${SCOPE}-sign`} style={{ gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div className="sigline" style={{ fontSize: 24 }}>{persona.name}</div>
              <label>Signature</label>
            </div>
            <div>
              <span className="dated" style={{ fontSize: 15 }}>14 / V / 2026</span>
              <label>Date</label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t37cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t37cd = Template_t37cd;
})();


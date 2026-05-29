// Template_t51 — REDACTED · Human Rights Case File
// Cream paper, typewriter font, red CONFIDENTIAL stamps.
// Mugshot-style portrait. Declassified document aesthetic.
// For public interest / human rights law.

(function () {
  const SCOPE = "t51";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:   #f2ede4;
  --paper2:  #e8e0d0;
  --ink:     #1a1410;
  --muted:   #5a5048;
  --red:     #b91c1c;
  --red2:    #dc2626;
  --stamp:   rgba(185,28,28,.12);
  --rule:    rgba(26,20,16,.15);
  --mono:    "Special Elite", "Courier New", monospace;
  position: absolute; inset: 0; overflow-y: auto;
  background: var(--paper);
  color: var(--ink);
  font-family: "Special Elite", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23f2ede4'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e0d0' opacity='.4'/%3E%3C/svg%3E");
}
.${SCOPE}.dark {
  --paper:  #1a1614;
  --paper2: #231f1c;
  --ink:    #e8e0d0;
  --muted:  #9a9080;
  --rule:   rgba(232,224,208,.15);
  --stamp:  rgba(220,38,38,.18);
}

/* ── Page ── */
.${SCOPE}-page {
  max-width: 860px; margin: 0 auto;
  padding: 40px 40px 60px;
}

/* ── Header ── */
.${SCOPE}-header {
  border: 2px solid var(--ink);
  padding: 0;
  margin-bottom: 32px;
  position: relative;
  background: var(--paper);
}
.${SCOPE}-header-top {
  background: var(--ink);
  color: var(--paper);
  padding: 10px 18px;
  display: flex; align-items: center; justify-content: space-between;
}
.${SCOPE}-header-top .agency {
  font-size: 10px; letter-spacing: .2em;
  text-transform: uppercase;
}
.${SCOPE}-header-top .ref {
  font-size: 10px; letter-spacing: .1em;
  opacity: .7;
}
.${SCOPE}-header-body {
  padding: 20px 18px;
  display: flex; gap: 24px; align-items: flex-start;
}
.${SCOPE}-mugshot {
  width: 110px; height: 130px;
  border: 2px solid var(--ink);
  flex-shrink: 0; overflow: hidden;
  position: relative;
}
.${SCOPE}-mugshot svg { width: 100%; height: 100%; }
.${SCOPE}-mugshot-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: var(--ink); color: var(--paper);
  font-size: 8px; padding: 3px 6px;
  letter-spacing: .1em; text-align: center;
}
.${SCOPE}-subject {
  flex: 1;
}
.${SCOPE}-subject .case-label {
  font-size: 9px; letter-spacing: .2em; color: var(--muted);
  text-transform: uppercase; margin-bottom: 6px;
}
.${SCOPE}-subject .name {
  font-size: 28px; line-height: 1; margin-bottom: 8px;
  letter-spacing: .02em;
}
.${SCOPE}-subject .field {
  font-size: 13px; color: var(--muted); margin-bottom: 12px;
}
.${SCOPE}-subject table {
  border-collapse: collapse; font-size: 12px;
}
.${SCOPE}-subject table td {
  padding: 2px 12px 2px 0; vertical-align: top;
}
.${SCOPE}-subject table td:first-child {
  color: var(--muted); white-space: nowrap; font-size: 10px;
  letter-spacing: .1em; text-transform: uppercase;
}

/* ── CONFIDENTIAL stamp ── */
.${SCOPE}-stamp {
  position: absolute; top: 50%; right: 24px;
  transform: translateY(-50%) rotate(-12deg);
  border: 3px solid var(--red);
  color: var(--red); padding: 6px 14px;
  font-family: "Special Elite", monospace;
  font-size: 18px; letter-spacing: .12em;
  text-transform: uppercase;
  opacity: .75; pointer-events: none;
}

/* ── Rule ── */
.${SCOPE}-hr {
  border: none;
  border-top: 1px dashed var(--rule);
  margin: 28px 0;
}
.${SCOPE}-section-label {
  font-size: 9px; letter-spacing: .22em;
  text-transform: uppercase; color: var(--muted);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 6px; margin-bottom: 20px;
  display: flex; justify-content: space-between;
}
.${SCOPE}-section-label .ref { color: var(--red); }

/* ── Exhibit (experience/moot) ── */
.${SCOPE}-exhibit {
  margin-bottom: 20px;
  border-left: 3px solid var(--ink);
  padding-left: 16px;
}
.${SCOPE}-exhibit .ex-tag {
  font-size: 9px; letter-spacing: .2em; color: var(--red);
  text-transform: uppercase; margin-bottom: 4px;
}
.${SCOPE}-exhibit .ex-title { font-size: 15px; margin-bottom: 3px; }
.${SCOPE}-exhibit .ex-meta { font-size: 11px; color: var(--muted); margin-bottom: 6px; }
.${SCOPE}-exhibit ul {
  margin: 0; padding-left: 16px;
  font-size: 13px; line-height: 1.7; color: var(--muted);
}

/* ── Redact bar ── */
.${SCOPE}-redact {
  display: inline-block;
  background: var(--ink); color: transparent;
  padding: 0 4px; margin: 0 2px;
  user-select: none;
  cursor: default;
}

/* ── Moot filing ── */
.${SCOPE}-filing {
  display: grid; grid-template-columns: auto 1fr auto;
  gap: 0 16px; align-items: start;
  padding: 10px 0; border-bottom: 1px solid var(--rule);
  font-size: 13px;
}
.${SCOPE}-filing:last-child { border-bottom: none; }
.${SCOPE}-filing .num {
  font-size: 11px; color: var(--red); white-space: nowrap;
  margin-top: 2px; letter-spacing: .06em;
}
.${SCOPE}-filing .title { line-height: 1.4; }
.${SCOPE}-filing .role { font-size: 11px; color: var(--muted); margin-top: 2px; }
.${SCOPE}-filing .yr { font-size: 11px; color: var(--muted); text-align: right; }
.${SCOPE}-filing .outcome { font-size: 11px; color: var(--ink); text-align: right; }

/* ── Publication ── */
.${SCOPE}-doc {
  padding: 12px 0;
  border-bottom: 1px solid var(--rule);
}
.${SCOPE}-doc:last-child { border-bottom: none; }
.${SCOPE}-doc .t { font-size: 14px; line-height: 1.5; margin-bottom: 3px; }
.${SCOPE}-doc .meta { font-size: 11px; color: var(--muted); }
.${SCOPE}-doc .role-badge {
  display: inline; font-size: 9px;
  border: 1px solid var(--red);
  color: var(--red); padding: 1px 6px;
  letter-spacing: .1em; text-transform: uppercase;
  margin-left: 6px; vertical-align: middle;
}

/* ── Education ── */
.${SCOPE}-edu {
  padding: 12px 0; border-bottom: 1px solid var(--rule);
  font-size: 13px;
}
.${SCOPE}-edu:last-child { border-bottom: none; }
.${SCOPE}-edu .deg { margin-bottom: 3px; font-size: 15px; }
.${SCOPE}-edu .inst { color: var(--muted); margin-bottom: 3px; }
.${SCOPE}-edu .notes { font-size: 12px; color: var(--muted); font-style: italic; }
.${SCOPE}-edu .period {
  font-size: 10px; color: var(--red);
  letter-spacing: .08em; margin-bottom: 4px;
}

/* ── Skills matrix ── */
.${SCOPE}-matrix {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
}
.${SCOPE}-skill {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px;
}
.${SCOPE}-skill .dots {
  display: flex; gap: 3px;
}
.${SCOPE}-skill .dot {
  width: 8px; height: 8px;
  background: var(--ink); opacity: .15;
}
.${SCOPE}-skill .dot.on { opacity: 1; }

/* ── Awards ── */
.${SCOPE}-honours {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.${SCOPE}-honour {
  border: 1px solid var(--ink);
  padding: 8px 14px; font-size: 12px;
}
.${SCOPE}-honour .n { color: var(--ink); margin-bottom: 2px; }
.${SCOPE}-honour .o { font-size: 10px; color: var(--red); letter-spacing: .06em; }

/* ── Footer ── */
.${SCOPE}-foot {
  margin-top: 40px; padding-top: 20px;
  border-top: 2px solid var(--ink);
  display: flex; justify-content: space-between; align-items: flex-end;
  font-size: 11px; color: var(--muted);
}
.${SCOPE}-foot .contact { line-height: 1.8; }
.${SCOPE}-foot .seal {
  text-align: right;
}
.${SCOPE}-foot .seal .big {
  font-size: 28px; color: var(--red);
  display: block; letter-spacing: .06em;
  font-family: "Special Elite", monospace;
  transform: rotate(2deg); opacity: .7;
}

/* ── MOBILE ── */
.${SCOPE}.mobile .${SCOPE}-page { padding: 24px 16px 48px; }
.${SCOPE}.mobile .${SCOPE}-header-body { flex-direction: column; gap: 16px; }
.${SCOPE}.mobile .${SCOPE}-mugshot { width: 90px; height: 106px; }
.${SCOPE}.mobile .${SCOPE}-stamp { font-size: 13px; right: 12px; }
.${SCOPE}.mobile .${SCOPE}-matrix { grid-template-columns: 1fr; }
.${SCOPE}.mobile .${SCOPE}-foot { flex-direction: column; gap: 12px; align-items: flex-start; }
    `;
    document.head.appendChild(s);
  }

  /* ── Mugshot portrait SVG ── */
  function Mugshot() {
    return (
      <svg viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg">
        {/* BG */}
        <rect width="110" height="130" fill="#d8d0c0" />
        {/* Height ruler line */}
        <line x1="0" y1="20" x2="8" y2="20" stroke="#555" strokeWidth="1" />
        <line x1="0" y1="40" x2="8" y2="40" stroke="#555" strokeWidth="1" />
        <line x1="0" y1="60" x2="8" y2="60" stroke="#555" strokeWidth="1" />
        <text x="9" y="23" fill="#555" fontSize="7" fontFamily="monospace">6'0</text>
        <text x="9" y="43" fill="#555" fontSize="7" fontFamily="monospace">5'10</text>
        {/* Body / suit */}
        <rect x="15" y="96" width="80" height="34" fill="#2a2420" />
        <path d="M 35 96 Q 55 104 75 96 L 78 130 L 32 130 Z" fill="#1a1410" />
        {/* Neck */}
        <rect x="45" y="88" width="20" height="16" rx="2" fill="#c4b08a" />
        {/* Collar / tie */}
        <path d="M 45 94 L 55 108 L 65 94 L 60 92 L 55 100 L 50 92 Z" fill="#1a1410" />
        {/* Head */}
        <ellipse cx="55" cy="62" rx="25" ry="28" fill="#c4b08a" />
        {/* Hair */}
        <ellipse cx="55" cy="38" rx="25" ry="16" fill="#6a4a28" />
        <path d="M 30 52 Q 28 38 55 34 Q 82 38 80 52" fill="#6a4a28" />
        {/* Ear left */}
        <ellipse cx="30" cy="63" rx="4" ry="6" fill="#c4b08a" />
        {/* Ear right */}
        <ellipse cx="80" cy="63" rx="4" ry="6" fill="#c4b08a" />
        {/* Eyes */}
        <ellipse cx="44" cy="60" rx="5" ry="4" fill="#2a1a0a" />
        <ellipse cx="66" cy="60" rx="5" ry="4" fill="#2a1a0a" />
        <ellipse cx="45" cy="59" rx="2" ry="2" fill="white" opacity="0.5" />
        <ellipse cx="67" cy="59" rx="2" ry="2" fill="white" opacity="0.5" />
        {/* Eyebrows */}
        <path d="M 38 54 Q 44 51 50 54" stroke="#6a4a28" strokeWidth="2" fill="none" />
        <path d="M 60 54 Q 66 51 72 54" stroke="#6a4a28" strokeWidth="2" fill="none" />
        {/* Nose */}
        <path d="M 55 64 L 52 72 Q 55 74 58 72 Z" fill="#b09070" opacity="0.6" />
        {/* Mouth */}
        <path d="M 48 78 Q 55 82 62 78" stroke="#8a6040" strokeWidth="1.5" fill="none" />
        {/* Chin shading */}
        <ellipse cx="55" cy="86" rx="16" ry="8" fill="#b09070" opacity="0.3" />
        {/* Suit lapels */}
        <path d="M 28 100 Q 40 98 50 110 L 42 130 L 20 130 Z" fill="#3a3028" />
        <path d="M 82 100 Q 70 98 60 110 L 68 130 L 90 130 Z" fill="#3a3028" />
        {/* White shirt */}
        <path d="M 45 98 L 55 108 L 65 98 L 62 96 L 55 104 L 48 96 Z" fill="#e8e0d0" />
        {/* Monochrome overlay for BG wall */}
        <rect width="110" height="130" fill="black" opacity="0.05" />
      </svg>
    );
  }

  function Template_t51({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    const isMobile = mode === "mobile";
    const p = persona;
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}${isMobile ? " mobile" : ""}`}>
        <div className={`${SCOPE}-page`}>

          {/* ── File header ── */}
          <div className={`${SCOPE}-header`}>
            <div className={`${SCOPE}-header-top`}>
              <span className="agency">Human Rights Practitioners Office · Case Registry</span>
              <span className="ref">FILE REF: {p.docketNumber}</span>
            </div>
            <div className={`${SCOPE}-header-body`}>
              <div style={{ position: "relative" }}>
                <div className={`${SCOPE}-mugshot`}>
                  <Mugshot />
                  <div className={`${SCOPE}-mugshot-label`}>{p.initials} · {today}</div>
                </div>
              </div>
              <div className={`${SCOPE}-subject`}>
                <div className="case-label">Subject / Practitioner Profile</div>
                <div className="name">{p.name}</div>
                <div className="field">{p.field} — {p.specialization}</div>
                <table>
                  <tbody>
                    <tr><td>INSTITUTION</td><td>{p.institution}</td></tr>
                    <tr><td>CURRENT ROLE</td><td>{p.currentRole}</td></tr>
                    <tr><td>LOCATION</td><td>{p.location}</td></tr>
                    <tr><td>BAR / INN</td><td>{p.courtSeat}</td></tr>
                    <tr><td>PRONOUNS</td><td>{p.pronouns}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`${SCOPE}-stamp`}>Verified</div>
          </div>

          {/* ── Summary ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 01 — Practitioner Statement</span>
            <span className="ref">EXHIBIT A</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 28, color: "var(--muted)" }}>
            {p.summary}
          </p>

          <hr className={`${SCOPE}-hr`} />

          {/* ── Moot record ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 02 — Mooting Docket</span>
            <span className="ref">EXHIBIT B</span>
          </div>
          {p.mooting.map((m, i) => (
            <div key={i} className={`${SCOPE}-filing`}>
              <div className="num">B-{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="title">{m.name}</div>
                <div className="role">{m.role}</div>
              </div>
              <div>
                <div className="yr">{m.year}</div>
                <div className="outcome">{m.outcome}</div>
              </div>
            </div>
          ))}

          <hr className={`${SCOPE}-hr`} />

          {/* ── Experience ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 03 — Field Operations</span>
            <span className="ref">EXHIBIT C</span>
          </div>
          {p.experience.map((e, i) => (
            <div key={i} className={`${SCOPE}-exhibit`}>
              <div className="ex-tag">C-{String(i + 1).padStart(2, "0")} · Verified</div>
              <div className="ex-title">{e.role} — {e.org}</div>
              <div className="ex-meta">{e.period}</div>
              <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}

          <hr className={`${SCOPE}-hr`} />

          {/* ── Publications ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 04 — Published Record</span>
            <span className="ref">EXHIBIT D</span>
          </div>
          {p.publications.map((pub, i) => (
            <div key={i} className={`${SCOPE}-doc`}>
              <div className="t">
                {pub.title}
                <span className="role-badge">{pub.role}</span>
              </div>
              <div className="meta">{pub.venue} · {pub.year} · {pub.pages}</div>
            </div>
          ))}

          <hr className={`${SCOPE}-hr`} />

          {/* ── Education ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 05 — Academic Record</span>
            <span className="ref">EXHIBIT E</span>
          </div>
          {p.education.map((e, i) => (
            <div key={i} className={`${SCOPE}-edu`}>
              <div className="period">{e.period}</div>
              <div className="deg">{e.degree}</div>
              <div className="inst">{e.org}</div>
              <div className="notes">{e.notes}</div>
            </div>
          ))}

          <hr className={`${SCOPE}-hr`} />

          {/* ── Awards ── */}
          <div className={`${SCOPE}-section-label`}>
            <span>§ 06 — Honours & Awards</span>
            <span className="ref">EXHIBIT F</span>
          </div>
          <div className={`${SCOPE}-honours`}>
            {p.awards.map((a, i) => (
              <div key={i} className={`${SCOPE}-honour`}>
                <div className="n">{a.name}</div>
                <div className="o">{a.org} · {a.year}</div>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className={`${SCOPE}-foot`}>
            <div className="contact">
              <div>✉ {p.email}</div>
              <div>✆ {p.phone}</div>
              <div>⊕ {p.url}</div>
              <div style={{ marginTop: 6, fontSize: 10, color: "var(--muted)", letterSpacing: ".08em" }}>
                {p.barNumber}
              </div>
            </div>
            <div className="seal">
              <span className="big">APPROVED</span>
              <div style={{ fontSize: 9, letterSpacing: ".12em", color: "var(--muted)", textTransform: "uppercase" }}>
                {today} · {p.location}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  window.Template_t51 = Template_t51;
})();

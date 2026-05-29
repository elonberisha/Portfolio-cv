// Template_t50 — SILK & IRON · Luxury Chambers Profile
// Dark navy + aged gold. EB Garamond for body, Syne for display.
// Circular portrait in gilded frame. Heraldic rule lines.
// Feels like a top London chambers brochure, not a CV.

(function () {
  const SCOPE = "t50";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --bg:      #0b0e14;
  --bg2:     #12171f;
  --bg3:     #1a2030;
  --gold:    #c9a84c;
  --gold2:   #e8c97a;
  --gold3:   rgba(201,168,76,.12);
  --ink:     #ede3d0;
  --muted:   #8a7c64;
  --rule:    rgba(201,168,76,.25);
  --accent:  #9b2335;
  position: absolute; inset: 0; overflow-y: auto;
  background: var(--bg);
  color: var(--ink);
  font-family: "EB Garamond", "Garamond", Georgia, serif;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --bg: #050709;
  --bg2: #0a0d12;
  --bg3: #10141a;
}

/* ── Gold rule system ── */
.${SCOPE}-rule {
  display: flex; align-items: center; gap: 14px;
  margin: 24px 0;
}
.${SCOPE}-rule::before,
.${SCOPE}-rule::after {
  content: ""; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.${SCOPE}-rule-diamond {
  width: 8px; height: 8px;
  background: var(--gold);
  transform: rotate(45deg);
  flex-shrink: 0;
}

/* ── Portrait ── */
.${SCOPE}-portrait-wrap {
  display: flex; justify-content: center; margin-bottom: 32px;
}
.${SCOPE}-portrait {
  width: 160px; height: 160px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  box-shadow: 0 0 0 6px var(--gold3), 0 0 0 8px var(--gold), 0 0 40px rgba(201,168,76,.15);
  overflow: hidden;
  position: relative; flex-shrink: 0;
}
.${SCOPE}-portrait svg { width: 100%; height: 100%; }

/* ── Wrapper / page ── */
.${SCOPE}-page {
  max-width: 900px; margin: 0 auto;
  padding: 48px 40px 64px;
}

/* ── Masthead ── */
.${SCOPE}-masthead {
  text-align: center; padding-bottom: 8px;
}
.${SCOPE}-chambers-tag {
  font-family: "Syne", sans-serif;
  font-size: 10px; letter-spacing: .22em;
  color: var(--gold); text-transform: uppercase;
  margin-bottom: 28px;
}
.${SCOPE}-name {
  font-family: "Syne", sans-serif;
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 800;
  color: var(--gold2);
  letter-spacing: -.01em;
  line-height: 1;
  margin-bottom: 10px;
}
.${SCOPE}-title {
  font-size: 18px; font-style: italic;
  color: var(--ink); letter-spacing: .04em;
  margin-bottom: 6px;
}
.${SCOPE}-institution {
  font-size: 13px; color: var(--muted);
  letter-spacing: .1em; text-transform: uppercase;
}

/* ── Seal ── */
.${SCOPE}-seal {
  display: inline-flex; align-items: center; gap: 10px;
  border: 1px solid var(--rule);
  padding: 6px 18px; margin-top: 18px;
  font-family: "EB Garamond", serif;
  font-size: 12px; color: var(--gold);
  letter-spacing: .12em; text-transform: uppercase;
}

/* ── Grid ── */
.${SCOPE}-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 2px; margin: 32px 0;
}
.${SCOPE}-stat {
  background: var(--bg2);
  padding: 20px 24px;
  border: 1px solid var(--rule);
}
.${SCOPE}-stat .n {
  font-family: "Syne", sans-serif;
  font-size: 36px; font-weight: 700;
  color: var(--gold2); line-height: 1;
}
.${SCOPE}-stat .l {
  font-size: 11px; color: var(--muted);
  letter-spacing: .12em; text-transform: uppercase;
  margin-top: 4px;
}

/* ── Section ── */
.${SCOPE}-section { margin-bottom: 44px; }
.${SCOPE}-section h2 {
  font-family: "Syne", sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 20px;
}

/* ── Moot table ── */
.${SCOPE}-moot {
  width: 100%; border-collapse: collapse;
}
.${SCOPE}-moot tr { border-bottom: 1px solid var(--rule); }
.${SCOPE}-moot tr:last-child { border-bottom: none; }
.${SCOPE}-moot td {
  padding: 12px 0; font-size: 15px; vertical-align: top;
}
.${SCOPE}-moot .name { color: var(--ink); max-width: 300px; }
.${SCOPE}-moot .role {
  font-size: 12px; color: var(--muted); margin-top: 2px;
}
.${SCOPE}-moot .yr {
  font-family: "EB Garamond", serif;
  font-size: 13px; color: var(--gold);
  text-align: right; white-space: nowrap;
}
.${SCOPE}-moot .out {
  font-size: 12px; color: var(--muted);
  text-align: right;
}

/* ── Publication ── */
.${SCOPE}-pub {
  padding: 16px 0;
  border-bottom: 1px solid var(--rule);
}
.${SCOPE}-pub:last-child { border-bottom: none; }
.${SCOPE}-pub .t {
  font-size: 16px; font-style: italic;
  color: var(--ink); line-height: 1.4; margin-bottom: 4px;
}
.${SCOPE}-pub .meta {
  font-size: 12px; color: var(--muted);
  letter-spacing: .04em;
}
.${SCOPE}-pub .role-tag {
  display: inline-block;
  border: 1px solid var(--rule);
  padding: 1px 8px; margin-left: 8px;
  font-size: 10px; color: var(--gold);
  letter-spacing: .1em; text-transform: uppercase;
  vertical-align: middle;
}

/* ── Experience ── */
.${SCOPE}-exp {
  padding: 16px 20px;
  border-left: 2px solid var(--gold);
  margin-bottom: 12px;
  background: var(--gold3);
}
.${SCOPE}-exp .role {
  font-family: "Syne", sans-serif;
  font-size: 14px; font-weight: 600; color: var(--gold2);
}
.${SCOPE}-exp .org {
  font-size: 13px; color: var(--muted); margin-top: 2px;
}
.${SCOPE}-exp ul {
  margin: 8px 0 0 0; padding: 0 0 0 16px;
  font-size: 14px; color: var(--ink); line-height: 1.65;
}

/* ── Education ── */
.${SCOPE}-edu {
  display: grid; grid-template-columns: auto 1fr;
  gap: 0 24px; align-items: start;
  padding: 14px 0; border-bottom: 1px solid var(--rule);
}
.${SCOPE}-edu:last-child { border-bottom: none; }
.${SCOPE}-edu .period {
  font-family: "EB Garamond", serif;
  font-size: 13px; color: var(--gold);
  white-space: nowrap; padding-top: 2px;
}
.${SCOPE}-edu .degree {
  font-size: 15px; color: var(--ink); margin-bottom: 3px;
}
.${SCOPE}-edu .org { font-size: 13px; color: var(--muted); }
.${SCOPE}-edu .notes { font-size: 13px; color: var(--muted); margin-top: 4px; font-style: italic; }

/* ── Awards ── */
.${SCOPE}-awards {
  display: flex; flex-wrap: wrap; gap: 10px;
}
.${SCOPE}-award {
  border: 1px solid var(--rule);
  padding: 10px 16px;
  background: var(--bg2);
  flex: 1; min-width: 180px;
}
.${SCOPE}-award .nm {
  font-size: 13px; color: var(--ink); margin-bottom: 3px;
}
.${SCOPE}-award .org-yr {
  font-size: 11px; color: var(--gold);
  letter-spacing: .06em;
}

/* ── Languages ── */
.${SCOPE}-langs {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.${SCOPE}-lang {
  display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--rule);
  padding: 8px 14px; background: var(--bg2);
}
.${SCOPE}-lang .name { font-size: 14px; color: var(--ink); }
.${SCOPE}-lang .cefr {
  font-family: "Syne", sans-serif;
  font-size: 10px; color: var(--gold);
  letter-spacing: .1em;
}

/* ── Pull quote ── */
.${SCOPE}-quote {
  border-left: 3px solid var(--gold);
  padding: 16px 24px; margin: 32px 0;
  background: var(--bg2);
  font-size: 19px; font-style: italic;
  line-height: 1.6; color: var(--ink);
}
.${SCOPE}-quote cite {
  display: block; margin-top: 8px;
  font-size: 12px; font-style: normal;
  color: var(--gold); letter-spacing: .08em;
}

/* ── Footer ── */
.${SCOPE}-foot {
  text-align: center; padding: 32px 0 0;
  border-top: 1px solid var(--rule);
}
.${SCOPE}-foot .contact {
  display: flex; justify-content: center;
  flex-wrap: wrap; gap: 24px;
  font-size: 13px; color: var(--muted);
  letter-spacing: .06em;
}
.${SCOPE}-foot .contact span { color: var(--gold); }
.${SCOPE}-foot .bar-ref {
  margin-top: 16px; font-size: 11px;
  color: var(--muted); letter-spacing: .1em;
  text-transform: uppercase;
}

/* ── MOBILE ── */
.${SCOPE}.mobile .${SCOPE}-page {
  padding: 28px 20px 48px;
}
.${SCOPE}.mobile .${SCOPE}-name {
  font-size: 36px;
}
.${SCOPE}.mobile .${SCOPE}-portrait {
  width: 120px; height: 120px;
}
.${SCOPE}.mobile .${SCOPE}-grid {
  grid-template-columns: 1fr 1fr;
}
.${SCOPE}.mobile .${SCOPE}-stat .n { font-size: 28px; }
.${SCOPE}.mobile .${SCOPE}-edu {
  grid-template-columns: 1fr;
}
.${SCOPE}.mobile .${SCOPE}-edu .period {
  font-size: 11px; margin-bottom: 2px;
}
    `;
    document.head.appendChild(s);
  }

  /* ── Portrait SVG ── */
  function Portrait({ size = 160 }) {
    return (
      <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`${SCOPE}-pg`} cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#2a3044" />
            <stop offset="100%" stopColor="#0b0e14" />
          </radialGradient>
          <radialGradient id={`${SCOPE}-face`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#e8c97a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Background */}
        <circle cx="80" cy="80" r="80" fill={`url(#${SCOPE}-pg)`} />
        {/* Subtle face glow */}
        <circle cx="80" cy="80" r="80" fill={`url(#${SCOPE}-face)`} />
        {/* Shoulders */}
        <ellipse cx="80" cy="148" rx="52" ry="30" fill="#1a2030" />
        <rect x="36" y="118" width="88" height="42" rx="2" fill="#1a2030" />
        {/* Robe / dark jacket */}
        <path d="M 28 160 Q 40 118 60 112 L 80 116 L 100 112 Q 120 118 132 160 Z" fill="#0f1520" />
        {/* Wig hint (barrister) */}
        <ellipse cx="80" cy="54" rx="30" ry="8" fill="#d4c9a8" opacity="0.6" />
        <rect x="52" y="52" width="56" height="4" rx="2" fill="#d4c9a8" opacity="0.5" />
        {/* Head */}
        <ellipse cx="80" cy="75" rx="26" ry="30" fill="#c4b08a" opacity="0.85" />
        {/* Hair */}
        <ellipse cx="80" cy="52" rx="26" ry="14" fill="#8a7250" opacity="0.9" />
        {/* Eyes */}
        <ellipse cx="71" cy="73" rx="4" ry="3" fill="#2a1a0a" />
        <ellipse cx="89" cy="73" rx="4" ry="3" fill="#2a1a0a" />
        <ellipse cx="72" cy="72" rx="1.5" ry="1.5" fill="white" opacity="0.6" />
        <ellipse cx="90" cy="72" rx="1.5" ry="1.5" fill="white" opacity="0.6" />
        {/* Nose */}
        <path d="M 80 77 Q 77 82 78 84 Q 82 85 82 84 Q 83 82 80 77" fill="#a08060" opacity="0.6" />
        {/* Mouth */}
        <path d="M 74 89 Q 80 93 86 89" stroke="#8a6040" strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Gold badge / pin */}
        <circle cx="80" cy="113" r="5" fill="#c9a84c" opacity="0.8" />
        <circle cx="80" cy="113" r="3" fill="#e8c97a" opacity="0.9" />
        {/* Decorative collar */}
        <path d="M 60 112 Q 80 120 100 112" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    );
  }

  /* ── Rule divider ── */
  function Rule() {
    return (
      <div className={`${SCOPE}-rule`}>
        <div className={`${SCOPE}-rule-diamond`} />
      </div>
    );
  }

  function Template_t50({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    const isMobile = mode === "mobile";
    const p = persona;

    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}${isMobile ? " mobile" : ""}`}>
        <div className={`${SCOPE}-page`}>

          {/* ── Masthead ── */}
          <div className={`${SCOPE}-masthead`}>
            <div className={`${SCOPE}-chambers-tag`}>
              {p.courtSeat} · {p.field} · {p.institution}
            </div>
            <div className={`${SCOPE}-portrait-wrap`}>
              <div className={`${SCOPE}-portrait`}><Portrait /></div>
            </div>
            <div className={`${SCOPE}-name`}>{p.name}</div>
            <div className={`${SCOPE}-title`}>{p.currentRole}</div>
            <div className={`${SCOPE}-institution`}>{p.faculty}</div>
            <div>
              <span className={`${SCOPE}-seal`}>
                ⚖ {p.specialization} · {p.year}
              </span>
            </div>
          </div>

          <Rule />

          {/* ── Stats grid ── */}
          <div className={`${SCOPE}-grid`}>
            <div className={`${SCOPE}-stat`}>
              <div className="n">{p.mooting.length}</div>
              <div className="l">Competitive Moots</div>
            </div>
            <div className={`${SCOPE}-stat`}>
              <div className="n">{p.publications.length}</div>
              <div className="l">Publications</div>
            </div>
            <div className={`${SCOPE}-stat`}>
              <div className="n">{p.awards.length}</div>
              <div className="l">Scholarships & Awards</div>
            </div>
            <div className={`${SCOPE}-stat`}>
              <div className="n">{p.experience.length}</div>
              <div className="l">Pupillage & Internships</div>
            </div>
          </div>

          {/* ── Pull quote ── */}
          <div className={`${SCOPE}-quote`}>
            "{p.tagline}"
            <cite>— {p.name}, {p.docketNumber}</cite>
          </div>

          {/* ── Mooting record ── */}
          <div className={`${SCOPE}-section`}>
            <h2>Competitive Mooting Record</h2>
            <table className={`${SCOPE}-moot`}>
              <tbody>
                {p.mooting.map((m, i) => (
                  <tr key={i}>
                    <td>
                      <div className="name">{m.name}</div>
                      <div className="role">{m.role}</div>
                    </td>
                    <td className="yr">{m.year}<br /><span className="out">{m.outcome}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Rule />

          {/* ── Publications ── */}
          <div className={`${SCOPE}-section`}>
            <h2>Publications & Legal Writing</h2>
            {p.publications.map((pub, i) => (
              <div key={i} className={`${SCOPE}-pub`}>
                <div className="t">
                  {pub.title}
                  <span className="role-tag">{pub.role}</span>
                </div>
                <div className="meta">{pub.venue} · {pub.year} · {pub.pages}</div>
              </div>
            ))}
          </div>

          <Rule />

          {/* ── Experience ── */}
          <div className={`${SCOPE}-section`}>
            <h2>Pupillage, Internships & Pro Bono</h2>
            {p.experience.map((e, i) => (
              <div key={i} className={`${SCOPE}-exp`}>
                <div className="role">{e.role}</div>
                <div className="org">{e.org} · {e.period}</div>
                <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              </div>
            ))}
          </div>

          {/* ── Education ── */}
          <div className={`${SCOPE}-section`}>
            <h2>Education</h2>
            {p.education.map((e, i) => (
              <div key={i} className={`${SCOPE}-edu`}>
                <div className="period">{e.period}</div>
                <div>
                  <div className="degree">{e.degree}</div>
                  <div className="org">{e.org}</div>
                  <div className="notes">{e.notes}</div>
                </div>
              </div>
            ))}
          </div>

          <Rule />

          {/* ── Awards & Languages ── */}
          <div className={`${SCOPE}-section`}>
            <h2>Scholarships & Honours</h2>
            <div className={`${SCOPE}-awards`}>
              {p.awards.map((a, i) => (
                <div key={i} className={`${SCOPE}-award`}>
                  <div className="nm">{a.name}</div>
                  <div className="org-yr">{a.org} · {a.year}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-section`}>
            <h2>Languages</h2>
            <div className={`${SCOPE}-langs`}>
              {p.languages.map((l, i) => (
                <div key={i} className={`${SCOPE}-lang`}>
                  <span className="name">{l.name}</span>
                  <span className="cefr">{l.cefr} · {l.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className={`${SCOPE}-foot`}>
            <div className="contact">
              <div><span>✉ </span>{p.email}</div>
              <div><span>✆ </span>{p.phone}</div>
              <div><span>⊕ </span>{p.url}</div>
            </div>
            <div className="bar-ref">
              {p.barNumber} · {p.docketNumber} · {p.location}
            </div>
          </div>

        </div>
      </div>
    );
  }

  window.Template_t50 = Template_t50;
})();

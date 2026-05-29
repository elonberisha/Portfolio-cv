// Template_t52 — LEX FUTURA · Legal-Tech Dashboard
// White + electric blue + lime. Unbounded font. Grid dashboard.
// Hexagonal headshot. Real-time status bar. Data-forward.
// Feels like a LegalTech SaaS product page.

(function () {
  const SCOPE = "t52";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --bg:    #f8faff;
  --bg2:   #eef2ff;
  --blue:  #1d4ed8;
  --blue2: #3b82f6;
  --blue3: rgba(29,78,216,.08);
  --lime:  #16a34a;
  --lime2: #22c55e;
  --ink:   #0f172a;
  --muted: #64748b;
  --rule:  rgba(15,23,42,.1);
  --mono:  "IBM Plex Mono", monospace;
  position: absolute; inset: 0; overflow-y: auto;
  background: var(--bg);
  color: var(--ink);
  font-family: "Unbounded", "Space Grotesk", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --bg:    #060b18;
  --bg2:   #0d1526;
  --blue:  #3b82f6;
  --blue2: #60a5fa;
  --blue3: rgba(59,130,246,.1);
  --lime:  #22c55e;
  --lime2: #4ade80;
  --ink:   #e2e8f0;
  --muted: #94a3b8;
  --rule:  rgba(226,232,240,.1);
}

/* ── Status bar ── */
.${SCOPE}-statusbar {
  position: sticky; top: 0; z-index: 10;
  background: var(--ink);
  color: var(--bg);
  padding: 8px 24px;
  display: flex; align-items: center; justify-content: space-between;
  font-family: var(--mono);
  font-size: 10px; letter-spacing: .06em;
}
.${SCOPE}-statusbar .left { display: flex; align-items: center; gap: 16px; }
.${SCOPE}-statusbar .dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--lime2); animation: ${SCOPE}-pulse 2s infinite;
  display: inline-block; margin-right: 6px;
}
.${SCOPE}-statusbar .tag {
  border: 1px solid rgba(255,255,255,.2);
  padding: 2px 8px; border-radius: 3px;
  font-size: 9px;
}
@keyframes ${SCOPE}-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
}

/* ── Page wrapper ── */
.${SCOPE}-page { padding: 28px 28px 60px; max-width: 1000px; margin: 0 auto; }

/* ── Hero row ── */
.${SCOPE}-hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px; align-items: center;
  margin-bottom: 28px;
}
.${SCOPE}-hex-wrap {
  position: relative; width: 100px; flex-shrink: 0;
}
.${SCOPE}-hex {
  width: 100px; height: 115px;
  clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  overflow: hidden; position: relative;
  background: var(--blue3);
  border: none;
}
.${SCOPE}-hex svg { width: 100%; height: 100%; }
.${SCOPE}-hex-ring {
  position: absolute; inset: -3px;
  background: linear-gradient(135deg, var(--blue), var(--lime2));
  clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  z-index: -1;
}
.${SCOPE}-hero-info .name {
  font-size: clamp(22px, 3.5vw, 40px);
  font-weight: 900; line-height: 1;
  color: var(--ink); margin-bottom: 6px;
  letter-spacing: -.03em;
}
.${SCOPE}-hero-info .role {
  font-size: 11px; color: var(--blue);
  letter-spacing: .12em; text-transform: uppercase;
  margin-bottom: 10px;
  font-family: var(--mono);
}
.${SCOPE}-hero-info .tags {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.${SCOPE}-tag {
  border: 1px solid var(--blue);
  padding: 3px 10px; border-radius: 3px;
  font-size: 9px; color: var(--blue);
  letter-spacing: .1em; text-transform: uppercase;
  font-family: var(--mono);
}
.${SCOPE}-tag.active {
  background: var(--blue); color: white;
}

/* ── KPI row ── */
.${SCOPE}-kpi {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 2px; margin-bottom: 28px;
}
.${SCOPE}-kpi-card {
  background: var(--bg2);
  border: 1px solid var(--rule);
  padding: 16px 18px;
}
.${SCOPE}-kpi-card .n {
  font-size: 30px; font-weight: 900;
  color: var(--blue2); line-height: 1;
  letter-spacing: -.03em;
}
.${SCOPE}-kpi-card .l {
  font-size: 9px; color: var(--muted);
  letter-spacing: .1em; text-transform: uppercase;
  font-family: var(--mono); margin-top: 5px;
}

/* ── Grid 2-col ── */
.${SCOPE}-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 24px; }

/* ── Panel ── */
.${SCOPE}-panel {
  background: var(--bg2); border: 1px solid var(--rule);
  padding: 20px;
}
.${SCOPE}-panel h3 {
  font-size: 9px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted); font-family: var(--mono);
  margin-bottom: 16px; padding-bottom: 8px;
  border-bottom: 1px solid var(--rule);
  display: flex; justify-content: space-between;
}
.${SCOPE}-panel h3 .count {
  color: var(--blue); font-weight: 400;
}

/* ── Skill bars ── */
.${SCOPE}-skill {
  margin-bottom: 10px;
}
.${SCOPE}-skill .nm {
  font-size: 11px; color: var(--ink); margin-bottom: 4px;
  display: flex; justify-content: space-between;
}
.${SCOPE}-skill .nm .lv { color: var(--blue2); font-family: var(--mono); font-size: 10px; }
.${SCOPE}-skill .bar {
  height: 4px; background: var(--rule); border-radius: 2px; overflow: hidden;
}
.${SCOPE}-skill .fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--blue), var(--blue2));
}

/* ── Moot row ── */
.${SCOPE}-moot {
  padding: 10px 0; border-bottom: 1px solid var(--rule);
  font-size: 12px;
}
.${SCOPE}-moot:last-child { border-bottom: none; }
.${SCOPE}-moot .title { color: var(--ink); margin-bottom: 3px; line-height: 1.3; }
.${SCOPE}-moot .meta { color: var(--muted); font-family: var(--mono); font-size: 10px; }
.${SCOPE}-moot .out {
  display: inline-block;
  background: var(--blue3); color: var(--blue);
  border: 1px solid var(--blue2);
  padding: 1px 7px; border-radius: 3px;
  font-size: 9px; font-family: var(--mono);
  letter-spacing: .06em; margin-top: 3px;
}

/* ── Publications table ── */
.${SCOPE}-pub-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.${SCOPE}-pub-table tr { border-bottom: 1px solid var(--rule); }
.${SCOPE}-pub-table tr:last-child { border-bottom: none; }
.${SCOPE}-pub-table td { padding: 10px 8px 10px 0; vertical-align: top; }
.${SCOPE}-pub-table .t { color: var(--ink); line-height: 1.4; }
.${SCOPE}-pub-table .v { color: var(--muted); font-size: 10px; font-family: var(--mono); margin-top: 2px; }
.${SCOPE}-pub-table .yr { color: var(--blue2); font-family: var(--mono); font-size: 11px; white-space: nowrap; text-align: right; }

/* ── Experience list ── */
.${SCOPE}-exp {
  padding: 12px 0; border-bottom: 1px solid var(--rule); font-size: 12px;
}
.${SCOPE}-exp:last-child { border-bottom: none; }
.${SCOPE}-exp .role { color: var(--ink); font-weight: 700; margin-bottom: 2px; }
.${SCOPE}-exp .org { color: var(--blue); font-family: var(--mono); font-size: 10px; margin-bottom: 6px; }
.${SCOPE}-exp ul { margin: 0; padding-left: 14px; color: var(--muted); line-height: 1.7; }

/* ── Education ── */
.${SCOPE}-edu {
  padding: 10px 0; border-bottom: 1px solid var(--rule); font-size: 12px;
}
.${SCOPE}-edu:last-child { border-bottom: none; }
.${SCOPE}-edu .deg { color: var(--ink); margin-bottom: 2px; }
.${SCOPE}-edu .org { color: var(--muted); font-family: var(--mono); font-size: 10px; margin-bottom: 2px; }
.${SCOPE}-edu .period {
  display: inline-block; background: var(--blue3);
  color: var(--blue); border: 1px solid var(--blue2);
  padding: 1px 7px; border-radius: 3px;
  font-size: 9px; font-family: var(--mono);
  letter-spacing: .06em; margin-bottom: 4px;
}

/* ── Awards chips ── */
.${SCOPE}-awards { display: flex; flex-wrap: wrap; gap: 8px; }
.${SCOPE}-award {
  border: 1px solid var(--rule); background: var(--bg);
  padding: 8px 14px; font-size: 11px;
}
.${SCOPE}-award .n { color: var(--ink); margin-bottom: 2px; }
.${SCOPE}-award .o { color: var(--lime); font-family: var(--mono); font-size: 9px; letter-spacing: .06em; }

/* ── Languages ── */
.${SCOPE}-langs { display: flex; flex-wrap: wrap; gap: 8px; }
.${SCOPE}-lang {
  border: 1px solid var(--blue);
  padding: 6px 14px; border-radius: 3px;
  font-size: 11px; color: var(--blue);
  font-family: var(--mono); letter-spacing: .06em;
}

/* ── Bio ── */
.${SCOPE}-bio {
  background: var(--blue3); border-left: 3px solid var(--blue);
  padding: 16px 20px; margin-bottom: 24px;
  font-size: 14px; line-height: 1.75; color: var(--muted);
  border-right: 1px solid var(--rule); border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
}

/* ── Full-width panel ── */
.${SCOPE}-full { grid-column: 1 / -1; }

/* ── Footer ── */
.${SCOPE}-foot {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 0; margin-top: 28px;
  border-top: 1px solid var(--rule);
  font-family: var(--mono); font-size: 10px; color: var(--muted);
}
.${SCOPE}-foot .contact { display: flex; gap: 20px; }
.${SCOPE}-foot .bar { color: var(--blue); letter-spacing: .06em; }

/* ── MOBILE ── */
.${SCOPE}.mobile .${SCOPE}-page { padding: 0 0 48px; }
.${SCOPE}.mobile .${SCOPE}-hero { grid-template-columns: auto 1fr; gap: 16px; padding: 16px; }
.${SCOPE}.mobile .${SCOPE}-hex { width: 72px; height: 83px; }
.${SCOPE}.mobile .${SCOPE}-hex-wrap { width: 72px; }
.${SCOPE}.mobile .${SCOPE}-hero-info .name { font-size: 20px; }
.${SCOPE}.mobile .${SCOPE}-kpi { grid-template-columns: 1fr 1fr; padding: 0 16px; }
.${SCOPE}.mobile .${SCOPE}-cols { grid-template-columns: 1fr; }
.${SCOPE}.mobile .${SCOPE}-panel { border-radius: 0; }
.${SCOPE}.mobile .${SCOPE}-statusbar { padding: 7px 16px; }
.${SCOPE}.mobile .${SCOPE}-foot { flex-direction: column; gap: 8px; align-items: flex-start; padding: 16px; }
.${SCOPE}.mobile .${SCOPE}-foot .contact { flex-direction: column; gap: 4px; }
    `;
    document.head.appendChild(s);
  }

  /* ── Hex portrait SVG ── */
  function HexPortrait() {
    return (
      <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${SCOPE}-hbg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* BG */}
        <rect width="100" height="115" fill={`url(#${SCOPE}-hbg)`} />
        {/* Grid lines */}
        {[20,40,60,80,100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1d4ed8" strokeWidth="0.5" opacity="0.15" />
        ))}
        {[20,40,60,80].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="115" stroke="#1d4ed8" strokeWidth="0.5" opacity="0.15" />
        ))}
        {/* Body */}
        <rect x="20" y="90" width="60" height="25" fill="#0f172a" />
        <path d="M 28 90 Q 50 100 72 90 L 78 115 L 22 115 Z" fill="#1e293b" />
        {/* Jacket */}
        <path d="M 20 95 Q 34 92 44 105 L 38 115 L 18 115 Z" fill="#1e3a5f" />
        <path d="M 80 95 Q 66 92 56 105 L 62 115 L 82 115 Z" fill="#1e3a5f" />
        {/* Shirt */}
        <path d="M 42 93 L 50 103 L 58 93 L 55 91 L 50 99 L 45 91 Z" fill="#f8faff" />
        {/* Neck */}
        <rect x="42" y="82" width="16" height="14" rx="2" fill="#d4b896" />
        {/* Head */}
        <ellipse cx="50" cy="60" rx="22" ry="25" fill="#d4b896" />
        {/* Hair */}
        <ellipse cx="50" cy="38" rx="22" ry="14" fill="#4a3020" />
        <path d="M 28 50 Q 26 36 50 32 Q 74 36 72 50" fill="#4a3020" />
        {/* Ears */}
        <ellipse cx="28" cy="61" rx="3.5" ry="5" fill="#d4b896" />
        <ellipse cx="72" cy="61" rx="3.5" ry="5" fill="#d4b896" />
        {/* Eyes */}
        <ellipse cx="41" cy="59" rx="4.5" ry="3.5" fill="#1a1410" />
        <ellipse cx="59" cy="59" rx="4.5" ry="3.5" fill="#1a1410" />
        <ellipse cx="42" cy="58" rx="1.5" ry="1.5" fill="white" opacity="0.5" />
        <ellipse cx="60" cy="58" rx="1.5" ry="1.5" fill="white" opacity="0.5" />
        {/* Eyebrows */}
        <path d="M 35 53 Q 41 50 47 53" stroke="#4a3020" strokeWidth="1.5" fill="none" />
        <path d="M 53 53 Q 59 50 65 53" stroke="#4a3020" strokeWidth="1.5" fill="none" />
        {/* Nose */}
        <path d="M 50 63 L 47 69 Q 50 71 53 69 Z" fill="#b09070" opacity="0.5" />
        {/* Mouth */}
        <path d="M 44 76 Q 50 79 56 76" stroke="#8a6040" strokeWidth="1.5" fill="none" />
        {/* Blue circuit overlay */}
        <line x1="0" y1="30" x2="20" y2="30" stroke="#3b82f6" strokeWidth="0.8" opacity="0.4" />
        <line x1="80" y1="50" x2="100" y2="50" stroke="#3b82f6" strokeWidth="0.8" opacity="0.4" />
        <circle cx="20" cy="30" r="2" fill="#3b82f6" opacity="0.4" />
        <circle cx="80" cy="50" r="2" fill="#3b82f6" opacity="0.4" />
        {/* Tie hint */}
        <path d="M 46 91 L 50 100 L 54 91 L 52 89 L 50 95 L 48 89 Z" fill="#1d4ed8" opacity="0.8" />
      </svg>
    );
  }

  function Template_t52({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    const isMobile = mode === "mobile";
    const p = persona;

    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}${isMobile ? " mobile" : ""}`}>

        {/* ── Status bar ── */}
        <div className={`${SCOPE}-statusbar`}>
          <div className="left">
            <span><span className="dot" />BAR STATUS: ACTIVE</span>
            <span className="tag">{p.barNumber}</span>
            {!isMobile && <span className="tag">{p.docketNumber}</span>}
          </div>
          <span>{p.location.toUpperCase()}</span>
        </div>

        <div className={`${SCOPE}-page`}>

          {/* ── Hero ── */}
          <div className={`${SCOPE}-hero`}>
            <div className={`${SCOPE}-hex-wrap`}>
              <div className={`${SCOPE}-hex-ring`} />
              <div className={`${SCOPE}-hex`}><HexPortrait /></div>
            </div>
            <div className={`${SCOPE}-hero-info`}>
              <div className="name">{p.name}</div>
              <div className="role">{p.currentRole}</div>
              <div className="tags">
                <span className={`${SCOPE}-tag active`}>{p.field}</span>
                <span className={`${SCOPE}-tag`}>{p.specialization}</span>
                <span className={`${SCOPE}-tag`}>{p.year}</span>
                {!isMobile && <span className={`${SCOPE}-tag`}>{p.courtSeat}</span>}
              </div>
            </div>
          </div>

          {/* ── KPI row ── */}
          <div className={`${SCOPE}-kpi`}>
            <div className={`${SCOPE}-kpi-card`}>
              <div className="n">{p.mooting.length}</div>
              <div className="l">Moots Filed</div>
            </div>
            <div className={`${SCOPE}-kpi-card`}>
              <div className="n">{p.publications.length}</div>
              <div className="l">Publications</div>
            </div>
            <div className={`${SCOPE}-kpi-card`}>
              <div className="n">{p.experience.length}</div>
              <div className="l">Placements</div>
            </div>
            <div className={`${SCOPE}-kpi-card`}>
              <div className="n">{p.awards.length}</div>
              <div className="l">Distinctions</div>
            </div>
          </div>

          {/* ── Bio ── */}
          <div className={`${SCOPE}-bio`}>{p.summary}</div>

          {/* ── Main grid ── */}
          <div className={`${SCOPE}-cols`}>

            {/* Skills */}
            <div className={`${SCOPE}-panel`}>
              <h3>Competency Matrix <span className="count">→ Languages & Mooting</span></h3>
              {/* Languages as skill bars */}
              {p.languages.map((l, i) => {
                const lvMap = { C2: 5, C1: 4, B2: 3, B1: 2, A2: 1, "—": 1 };
                const lv = lvMap[l.cefr] || 3;
                return (
                  <div key={i} className={`${SCOPE}-skill`}>
                    <div className="nm">
                      <span>{l.name} — {l.level}</span>
                      <span className="lv">{l.cefr}</span>
                    </div>
                    <div className="bar">
                      <div className="fill" style={{ width: `${lv * 20}%` }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 20 }}>
                {p.activities?.slice(0, 3).map((a, i) => (
                  <div key={i} style={{ fontSize: 12, color: "var(--muted)", padding: "5px 0", borderBottom: "1px solid var(--rule)" }}>
                    ↳ {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Mooting */}
            <div className={`${SCOPE}-panel`}>
              <h3>Moot Court Docket <span className="count">{p.mooting.length} cases</span></h3>
              {p.mooting.map((m, i) => (
                <div key={i} className={`${SCOPE}-moot`}>
                  <div className="title">{m.name}</div>
                  <div className="meta">{m.role} · {m.year}</div>
                  <span className="out">{m.outcome}</span>
                </div>
              ))}
            </div>

            {/* Publications full-width */}
            <div className={`${SCOPE}-panel ${SCOPE}-full`}>
              <h3>Published Record <span className="count">{p.publications.length} items</span></h3>
              <table className={`${SCOPE}-pub-table`}>
                <tbody>
                  {p.publications.map((pub, i) => (
                    <tr key={i}>
                      <td>
                        <div className="t">{pub.title}</div>
                        <div className="v">{pub.venue} · {pub.pages}</div>
                      </td>
                      <td className="yr">{pub.year}<br /><span style={{ fontSize: 9, color: "var(--blue)" }}>{pub.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Experience */}
            <div className={`${SCOPE}-panel`}>
              <h3>Work History <span className="count">{p.experience.length} placements</span></h3>
              {p.experience.map((e, i) => (
                <div key={i} className={`${SCOPE}-exp`}>
                  <div className="role">{e.role}</div>
                  <div className="org">{e.org} · {e.period}</div>
                  <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className={`${SCOPE}-panel`}>
              <h3>Education <span className="count">{p.education.length} institutions</span></h3>
              {p.education.map((e, i) => (
                <div key={i} className={`${SCOPE}-edu`}>
                  <span className="period">{e.period}</span>
                  <div className="deg">{e.degree}</div>
                  <div className="org">{e.org}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, fontFamily: "inherit" }}>{e.notes}</div>
                </div>
              ))}
            </div>

            {/* Awards full-width */}
            <div className={`${SCOPE}-panel ${SCOPE}-full`}>
              <h3>Distinctions & Awards</h3>
              <div className={`${SCOPE}-awards`}>
                {p.awards.map((a, i) => (
                  <div key={i} className={`${SCOPE}-award`}>
                    <div className="n">{a.name}</div>
                    <div className="o">{a.org} · {a.year}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className={`${SCOPE}-foot`}>
            <div className="contact">
              <span>{p.email}</span>
              <span>{p.phone}</span>
              <span>{p.url}</span>
            </div>
            <span className="bar">{p.barNumber}</span>
          </div>

        </div>
      </div>
    );
  }

  window.Template_t52 = Template_t52;
})();

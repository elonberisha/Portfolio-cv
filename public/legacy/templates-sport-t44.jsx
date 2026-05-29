// Template_t26 — Scoreboard
// LED stadium-display portfolio. Big numbers, dot-matrix headers, live
// clock, period grid, scrolling ticker. Push the metaphor: it should
// feel like a press-row monitor at half-time, not a CV with a sports
// pattern slapped on top.
//
// Scoped under .t26 / .t26.dark — no rule leaks outside that prefix.

(function () {
  const SCOPE = "t44";

  // One-time stylesheet injection. Keyed by SCOPE so re-mounts don't
  // duplicate it; light vs dark is a single class swap on the root.
  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --bg:        #f4f1ea;
  --surface:   #fbf9f3;
  --surface-2: #ece8de;
  --ink:       #14110d;
  --muted:     #5d564a;
  --rule:      rgba(20,17,13,.14);
  --amber:     #d97706;
  --amber-2:   #b45309;
  --green:     #0f7a4a;
  --red:       #b91c1c;
  --led-on:    #d97706;
  --led-off:   rgba(217,119,6,.10);
  --shadow-led: 0 0 0 transparent;

  position: absolute; inset: 0;
  overflow-y: auto;
  background: var(--bg);
  color: var(--ink);
  font-family: "Space Grotesk", -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --bg:        #0a0908;
  --surface:   #15120e;
  --surface-2: #1f1a13;
  --ink:       #f7e9c9;
  --muted:     #8a7d63;
  --rule:      rgba(217,119,6,.18);
  --amber:     #fbbf24;
  --amber-2:   #f59e0b;
  --green:     #34d399;
  --red:       #ef4444;
  --led-on:    #fbbf24;
  --led-off:   rgba(251,191,36,.07);
  --shadow-led: 0 0 8px rgba(251,191,36,.45);
}

/* Decorative LED pixel border (top + bottom of the page) */
.${SCOPE}-pixrow {
  display: flex; gap: 6px;
  padding: 14px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--rule);
}
.${SCOPE}-pixrow.bottom { border-bottom: 0; border-top: 1px solid var(--rule); }
.${SCOPE}-pix {
  flex: 1; height: 10px; border-radius: 50%;
  background: var(--led-off);
}
.${SCOPE}-pix.on {
  background: var(--led-on);
  box-shadow: var(--shadow-led);
}

/* Main page chrome */
.${SCOPE}-page { padding: 22px 32px 0; }
.${SCOPE}-page-m { padding: 16px 18px 80px; }

/* Top scoreboard header row */
.${SCOPE}-board {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 22px 28px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
}
.${SCOPE}-board .label {
  font-family: "VT323", monospace;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: var(--amber);
  text-shadow: var(--shadow-led);
}
.${SCOPE}-board .name {
  font-family: "VT323", monospace;
  font-size: 78px;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: var(--ink);
  text-shadow: var(--shadow-led);
  margin: 6px 0 12px;
  text-transform: uppercase;
}
.${SCOPE}-board .meta {
  font-family: "Space Grotesk", sans-serif;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex; gap: 16px; flex-wrap: wrap;
}
.${SCOPE}-board .meta .sep { color: var(--rule); }

/* Live indicator */
.${SCOPE}-live {
  text-align: right;
  font-family: "VT323", monospace;
}
.${SCOPE}-live .row {
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  font-size: 16px; letter-spacing: 0.18em; color: var(--red);
  text-transform: uppercase;
}
.${SCOPE}-live .dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 8px var(--red);
  animation: ${SCOPE}-blink 1.2s steps(2,end) infinite;
}
@keyframes ${SCOPE}-blink { 50% { opacity: 0.2; } }
.${SCOPE}-live .clock {
  font-family: "VT323", monospace;
  font-size: 56px;
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--amber);
  text-shadow: var(--shadow-led);
  font-variant-numeric: tabular-nums;
  margin-top: 6px;
}
.${SCOPE}-live .period {
  font-family: "VT323", monospace;
  font-size: 16px;
  letter-spacing: 0.16em;
  color: var(--muted);
  text-transform: uppercase;
  margin-top: 2px;
}

/* Stat tiles row */
.${SCOPE}-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 14px;
}
.${SCOPE}-stat {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 18px 18px 14px;
  position: relative;
  overflow: hidden;
}
.${SCOPE}-stat .lbl {
  font-family: "VT323", monospace;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
.${SCOPE}-stat .val {
  font-family: "VT323", monospace;
  font-size: 64px;
  line-height: 1;
  color: var(--amber);
  text-shadow: var(--shadow-led);
  font-variant-numeric: tabular-nums;
  margin-top: 8px;
}
.${SCOPE}-stat .corner {
  position: absolute; top: 10px; right: 12px;
  font-family: "VT323", monospace;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.18em;
}

/* Two-column row: rotations + roster */
.${SCOPE}-row {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 12px;
  margin-top: 12px;
}
.${SCOPE}-panel {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 16px 18px 18px;
}
.${SCOPE}-panel h3 {
  margin: 0 0 12px;
  font-family: "VT323", monospace;
  font-size: 18px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amber);
  display: flex; align-items: center; gap: 10px;
}
.${SCOPE}-panel h3::before {
  content: ""; width: 8px; height: 8px; border-radius: 50%;
  background: var(--amber); box-shadow: var(--shadow-led);
}
.${SCOPE}-panel h3 .count {
  margin-left: auto; color: var(--muted); font-size: 14px;
  letter-spacing: 0.18em;
}

/* Rotations table */
.${SCOPE}-rot { border-collapse: collapse; width: 100%; }
.${SCOPE}-rot th, .${SCOPE}-rot td {
  text-align: left;
  font-family: "Space Grotesk", sans-serif;
  font-size: 13px; line-height: 1.35;
  padding: 8px 6px;
  border-bottom: 1px dashed var(--rule);
  vertical-align: top;
}
.${SCOPE}-rot th {
  font-family: "VT323", monospace;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 400;
  padding-top: 0;
}
.${SCOPE}-rot td.q {
  font-family: "VT323", monospace;
  font-size: 22px;
  color: var(--amber);
  text-shadow: var(--shadow-led);
  width: 50px;
}
.${SCOPE}-rot td.t {
  font-weight: 600;
}
.${SCOPE}-rot td.o {
  color: var(--muted);
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  text-align: right;
  white-space: nowrap;
}
.${SCOPE}-rot td.o .pos { color: var(--green); }
.${SCOPE}-rot td.o .neg { color: var(--red); }

/* Skill bars */
.${SCOPE}-bar {
  display: grid;
  grid-template-columns: 1fr 110px 28px;
  gap: 10px;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px dashed var(--rule);
}
.${SCOPE}-bar:last-child { border-bottom: 0; }
.${SCOPE}-bar .nm { font-weight: 500; }
.${SCOPE}-bar .seg { display: flex; gap: 3px; }
.${SCOPE}-bar .seg i {
  flex: 1; height: 10px; border-radius: 1px;
  background: var(--led-off);
}
.${SCOPE}-bar .seg i.on {
  background: var(--led-on);
  box-shadow: var(--shadow-led);
}
.${SCOPE}-bar .num {
  font-family: "VT323", monospace;
  font-size: 18px;
  color: var(--amber);
  text-align: right;
}

/* Match notes / research block */
.${SCOPE}-notes {
  margin-top: 12px;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 16px 18px 18px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}
.${SCOPE}-notes h3 {
  margin: 0 0 10px;
  font-family: "VT323", monospace;
  font-size: 18px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amber);
}
.${SCOPE}-research-item {
  padding: 8px 0;
  border-bottom: 1px dashed var(--rule);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  font-size: 12.5px;
}
.${SCOPE}-research-item:last-child { border-bottom: 0; }
.${SCOPE}-research-item .t { font-weight: 600; line-height: 1.3; }
.${SCOPE}-research-item .v { color: var(--muted); font-size: 12px; margin-top: 2px; }
.${SCOPE}-research-item .st {
  font-family: "VT323", monospace;
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 2px 8px;
  border: 1px solid var(--rule);
  border-radius: 3px;
  align-self: start;
  color: var(--amber);
}
.${SCOPE}-research-item .st.pub { color: var(--green); border-color: var(--green); }
.${SCOPE}-research-item .st.rev { color: var(--amber); }
.${SCOPE}-research-item .st.wip { color: var(--red); border-color: var(--red); }

/* Certifications inline */
.${SCOPE}-cert-grid {
  display: grid; grid-template-columns: 1fr;
  gap: 0;
}
.${SCOPE}-cert {
  display: grid;
  grid-template-columns: 1fr 60px;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px dashed var(--rule);
  font-size: 12.5px;
  align-items: baseline;
}
.${SCOPE}-cert:last-child { border-bottom: 0; }
.${SCOPE}-cert .nm { font-weight: 600; }
.${SCOPE}-cert .bd { color: var(--muted); font-size: 11.5px; }
.${SCOPE}-cert .yr {
  font-family: "VT323", monospace;
  font-size: 16px;
  text-align: right;
  color: var(--amber);
}

/* Ticker */
.${SCOPE}-ticker {
  margin-top: 14px;
  background: var(--ink);
  color: var(--bg);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  height: 34px;
  display: flex; align-items: center;
}
.${SCOPE}.dark .${SCOPE}-ticker { background: var(--surface); color: var(--amber); border: 1px solid var(--amber); }
.${SCOPE}-ticker .strip {
  display: inline-flex;
  gap: 36px;
  white-space: nowrap;
  font-family: "VT323", monospace;
  font-size: 18px;
  letter-spacing: 0.16em;
  padding-left: 100%;
  animation: ${SCOPE}-ticker 36s linear infinite;
}
.${SCOPE}-ticker .strip i {
  display: inline-flex; align-items: center; gap: 10px;
  font-style: normal;
}
.${SCOPE}-ticker .strip i::before {
  content: "●"; color: var(--amber);
}
@keyframes ${SCOPE}-ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Footer contact strip */
.${SCOPE}-foot {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 28px;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
}
.${SCOPE}-foot .ct { display: flex; gap: 24px; font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--muted); flex-wrap: wrap; }
.${SCOPE}-foot .ct span { color: var(--ink); font-weight: 500; }
.${SCOPE}-foot .cta {
  font-family: "VT323", monospace;
  font-size: 18px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: var(--amber);
  color: #0a0908;
  border: 0;
  padding: 10px 18px;
  border-radius: 3px;
  cursor: pointer;
  text-shadow: none;
}

/* ────── Mobile ────── */
.${SCOPE}-m-board {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 18px 16px 16px;
  margin-top: 44px;
}
.${SCOPE}-m-board .label {
  font-family: "VT323", monospace;
  font-size: 14px;
  letter-spacing: 0.18em;
  color: var(--amber);
  display: flex; align-items: center; justify-content: space-between;
}
.${SCOPE}-m-board .label .live {
  color: var(--red); display: inline-flex; align-items: center; gap: 6px;
}
.${SCOPE}-m-board .label .live::before {
  content: ""; width: 6px; height: 6px; border-radius: 50%;
  background: var(--red); box-shadow: 0 0 6px var(--red);
  animation: ${SCOPE}-blink 1.2s steps(2,end) infinite;
}
.${SCOPE}-m-board .name {
  font-family: "VT323", monospace;
  font-size: 40px;
  line-height: 0.95;
  margin: 8px 0 8px;
  text-transform: uppercase;
  color: var(--ink);
  text-shadow: var(--shadow-led);
}
.${SCOPE}-m-board .meta {
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--muted);
}
.${SCOPE}-m-clock {
  font-family: "VT323", monospace;
  font-size: 36px;
  color: var(--amber);
  text-shadow: var(--shadow-led);
  margin-top: 6px;
  font-variant-numeric: tabular-nums;
}
.${SCOPE}-m-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px; margin-top: 10px;
}
.${SCOPE}-m-stats .${SCOPE}-stat .val { font-size: 38px; }
.${SCOPE}-m-stats .${SCOPE}-stat { padding: 12px 12px 10px; }
.${SCOPE}-m-panel {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 14px 14px 12px;
  margin-top: 10px;
}
.${SCOPE}-m-panel h3 {
  margin: 0 0 10px;
  font-family: "VT323", monospace;
  font-size: 15px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--amber);
}
.${SCOPE}-m-rot-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--rule);
  font-size: 12.5px;
}
.${SCOPE}-m-rot-item:last-child { border-bottom: 0; }
.${SCOPE}-m-rot-item .q {
  font-family: "VT323", monospace;
  font-size: 22px;
  color: var(--amber);
  text-shadow: var(--shadow-led);
}
.${SCOPE}-m-rot-item .t { font-weight: 600; line-height: 1.3; }
.${SCOPE}-m-rot-item .p { font-size: 11px; color: var(--muted); margin-top: 2px; }
`;
    document.head.appendChild(s);
  }

  // Live MM:SS clock that counts down from a random match minute so the
  // page feels alive on first view. Pure cosmetic — no real timekeeping.
  function useGameClock() {
    const [t, setT] = React.useState(14 * 60 + 32);
    React.useEffect(() => {
      const id = setInterval(() => setT((x) => (x <= 0 ? 14 * 60 + 32 : x - 1)), 1000);
      return () => clearInterval(id);
    }, []);
    const mm = String(Math.floor(t / 60)).padStart(2, "0");
    const ss = String(t % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  // LED border strip — N dots, half lit in a fixed pseudo-random pattern.
  function PixRow({ n = 64, position }) {
    // Deterministic pattern so SSR/CSR don't drift.
    const pattern = React.useMemo(() => {
      const out = [];
      for (let i = 0; i < n; i++) {
        const v = Math.sin(i * 12.9898 + (position === "bottom" ? 7.1 : 3.2)) * 43758.5453;
        out.push((v - Math.floor(v)) > 0.42);
      }
      return out;
    }, [n, position]);
    return (
      <div className={`${SCOPE}-pixrow${position === "bottom" ? " bottom" : ""}`}>
        {pattern.map((on, i) => (
          <div key={i} className={`${SCOPE}-pix${on ? " on" : ""}`} />
        ))}
      </div>
    );
  }

  function SkillBar({ name, level }) {
    return (
      <div className={`${SCOPE}-bar`}>
        <div className="nm">{name}</div>
        <div className="seg">
          {[1, 2, 3, 4, 5].map((i) => (
            <i key={i} className={i <= level ? "on" : ""} />
          ))}
        </div>
        <div className="num">{level}</div>
      </div>
    );
  }

  function ResearchItem({ r }) {
    const st = r.status.toLowerCase();
    const cls = st.includes("under") ? "rev" : st.includes("progress") ? "wip" : "pub";
    return (
      <div className={`${SCOPE}-research-item`}>
        <div>
          <div className="t">{r.title}</div>
          <div className="v">{r.venue} · {r.role} · {r.year}</div>
        </div>
        <div className={`st ${cls}`}>{r.status}</div>
      </div>
    );
  }

  function tickerItems(persona) {
    return [
      `${persona.season} SEASON`,
      ...persona.certs.map((c) => `${c.name.toUpperCase()} · ${c.status.toUpperCase()}`),
      ...persona.headlineStats.map((s) => `${s.value} ${s.label.toUpperCase()}`),
      `${persona.media[0].kind.toUpperCase()} ${persona.media[0].name.toUpperCase()}`,
      "AVAILABLE FROM JULY 2026",
    ];
  }

  // ────────── Desktop ──────────
  function Desktop({ persona }) {
    const clock = useGameClock();
    const items = tickerItems(persona);
    return (
      <React.Fragment>
        <PixRow n={64} position="top" />
        <div className={`${SCOPE}-page`}>
          <div className={`${SCOPE}-board`}>
            <div>
              <div className="label">▸ NOW PLAYING · {persona.season}</div>
              <div className="name">{persona.name}</div>
              <div className="meta">
                <span>{persona.field}</span><span className="sep">/</span>
                <span>{persona.year}</span><span className="sep">/</span>
                <span>{persona.institution}</span><span className="sep">/</span>
                <span>{persona.location}</span>
              </div>
            </div>
            <div className={`${SCOPE}-live`}>
              <div className="row"><span className="dot" /> Live · On Field</div>
              <div className="clock">{clock}</div>
              <div className="period">Q4 · {persona.currentRole.split(" · ")[1] || persona.currentRole}</div>
            </div>
          </div>

          <div className={`${SCOPE}-stats`}>
            {persona.headlineStats.map((s, i) => (
              <div key={i} className={`${SCOPE}-stat`}>
                <div className="corner">{String(i + 1).padStart(2, "0")}</div>
                <div className="lbl">{s.label}</div>
                <div className="val">{s.value}</div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-row`}>
            <div className={`${SCOPE}-panel`}>
              <h3>Rotations <span className="count">{persona.coached.length} squads</span></h3>
              <table className={`${SCOPE}-rot`}>
                <thead>
                  <tr><th>Q</th><th>Squad / Programme</th><th style={{ textAlign: "right" }}>Headline</th></tr>
                </thead>
                <tbody>
                  {persona.coached.map((c, i) => {
                    const o = c.outcomes[0];
                    const isNeg = /^(-|−)/.test(o.stat);
                    return (
                      <tr key={i}>
                        <td className="q">Q{persona.coached.length - i}</td>
                        <td className="t">
                          {c.squad}
                          <div style={{ color: "var(--muted)", fontSize: 11.5, fontFamily: "JetBrains Mono", marginTop: 2 }}>
                            {c.period} · n={c.n} · {c.role}
                          </div>
                        </td>
                        <td className="o">
                          <span className={isNeg ? "pos" : "pos"}>{o.stat}</span>
                          <div style={{ color: "var(--muted)", fontSize: 10.5, marginTop: 2 }}>{o.label}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={`${SCOPE}-panel`}>
              <h3>Starting Roster <span className="count">tech</span></h3>
              {persona.skills.tech.slice(0, 7).map((sk, i) => (
                <SkillBar key={i} name={sk.name} level={sk.level} />
              ))}
            </div>
          </div>

          <div className={`${SCOPE}-notes`}>
            <div>
              <h3>Match Notes · Research</h3>
              {persona.research.map((r, i) => <ResearchItem key={i} r={r} />)}
            </div>
            <div>
              <h3>Game Officials · Certifications</h3>
              <div className={`${SCOPE}-cert-grid`}>
                {persona.certs.map((c, i) => (
                  <div key={i} className={`${SCOPE}-cert`}>
                    <div>
                      <div className="nm">{c.name}</div>
                      <div className="bd">{c.body} · {c.status}</div>
                    </div>
                    <div className="yr">{c.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${SCOPE}-ticker`}>
            <div className="strip">
              {[...items, ...items].map((t, i) => <i key={i}>{t}</i>)}
            </div>
          </div>

          <div className={`${SCOPE}-foot`}>
            <div className="ct">
              <div>EMAIL · <span>{persona.email}</span></div>
              <div>TEL · <span>{persona.phone}</span></div>
              <div>SITE · <span>{persona.url}</span></div>
            </div>
            <button className="cta">▸ Download CV (PDF)</button>
          </div>
        </div>
        <div style={{ height: 18 }} />
        <PixRow n={64} position="bottom" />
      </React.Fragment>
    );
  }

  // ────────── Mobile ──────────
  function Mobile({ persona }) {
    const clock = useGameClock();
    const items = tickerItems(persona);
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-m-board`}>
            <div className="label">
              <span>▸ {persona.season}</span>
              <span className="live">LIVE</span>
            </div>
            <div className="name">{persona.name}</div>
            <div className="meta">{persona.field} · {persona.year}</div>
            <div className="meta" style={{ marginTop: 4 }}>{persona.institution}</div>
            <div className={`${SCOPE}-m-clock`}>{clock} · Q4</div>
          </div>

          <div className={`${SCOPE}-m-stats`}>
            {persona.headlineStats.map((s, i) => (
              <div key={i} className={`${SCOPE}-stat`}>
                <div className="lbl">{s.label}</div>
                <div className="val">{s.value}</div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-m-panel`}>
            <h3>Rotations</h3>
            {persona.coached.map((c, i) => (
              <div key={i} className={`${SCOPE}-m-rot-item`}>
                <div className="q">Q{persona.coached.length - i}</div>
                <div>
                  <div className="t">{c.squad}</div>
                  <div className="p">{c.period} · n={c.n} · <span style={{ color: "var(--amber)" }}>{c.outcomes[0].stat}</span> {c.outcomes[0].label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-m-panel`}>
            <h3>Starting Roster</h3>
            {persona.skills.tech.slice(0, 6).map((sk, i) => (
              <SkillBar key={i} name={sk.name} level={sk.level} />
            ))}
          </div>

          <div className={`${SCOPE}-m-panel`}>
            <h3>Match Notes · Research</h3>
            {persona.research.map((r, i) => <ResearchItem key={i} r={r} />)}
          </div>

          <div className={`${SCOPE}-m-panel`}>
            <h3>Game Officials · Certs</h3>
            {persona.certs.map((c, i) => (
              <div key={i} className={`${SCOPE}-cert`}>
                <div>
                  <div className="nm">{c.name}</div>
                  <div className="bd">{c.body} · {c.status}</div>
                </div>
                <div className="yr">{c.year}</div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-ticker`}>
            <div className="strip">
              {[...items, ...items].map((t, i) => <i key={i}>{t}</i>)}
            </div>
          </div>

          <div className={`${SCOPE}-foot`} style={{ flexDirection: "column", alignItems: "stretch" }}>
            <div className="ct" style={{ flexDirection: "column", gap: 4 }}>
              <div>EMAIL · <span>{persona.email}</span></div>
              <div>TEL · <span>{persona.phone}</span></div>
              <div>SITE · <span>{persona.url}</span></div>
            </div>
            <button className="cta" style={{ marginTop: 10 }}>▸ Download CV</button>
          </div>
        </div>
      </div>
    );
  }

  function Template_t26({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t26 = Template_t26;
})();

// Template_t27 — Athlete Card
// Trading-card front/back portfolio. Left: the FRONT — big portrait slot,
// jersey number, position chip, headline stats. Right: the BACK — dense
// stat block, career, scouting report, achievements. Below: a "parallel
// set" of supplementary insert cards.
//
// Foil treatment is a conic-gradient overlay; the corner card-number,
// holo stamp, and rarity badge sell the metaphor.
//
// Scoped under .t27 / .t27.dark.

(function () {
  const SCOPE = "t45";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --bg:       #2a2622;        /* card mat */
  --mat:      #1c1916;
  --card:     #f5efe1;        /* cream card stock */
  --card-2:   #ebe2cd;
  --ink:      #0f1d3a;        /* navy team ink */
  --ink-2:    #243a6b;
  --muted:    #5d6987;
  --rule:     rgba(15,29,58,.18);
  --accent:   #b91c1c;        /* team red */
  --gold:     #c7a652;
  --gold-2:   #8e7330;
  --photo:    linear-gradient(135deg, #1a2a4f 0%, #2d4878 50%, #5c7bb0 100%);
  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    radial-gradient(1100px 600px at 60% 30%, #3a3530 0%, var(--bg) 60%),
    var(--bg);
  color: var(--ink);
  font-family: "Space Grotesk", -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --bg:       #06080d;
  --mat:      #0a0d14;
  --card:     #0e1729;
  --card-2:   #142244;
  --ink:      #f0e6d2;
  --ink-2:    #c9b783;
  --muted:    #8c9bbf;
  --rule:     rgba(199,166,82,.22);
  --accent:   #ef4444;
  --gold:     #f1cf6a;
  --gold-2:   #c7a652;
  --photo:    linear-gradient(135deg, #1a1814 0%, #2d2925 50%, #5a4f3a 100%);
}

/* mat texture: soft tilted lines */
.${SCOPE}::before {
  content: "";
  position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(43deg, rgba(255,255,255,.025) 0 1px, transparent 1px 5px);
  pointer-events: none;
}

/* page padding */
.${SCOPE}-page { position: relative; padding: 28px 36px 32px; }
.${SCOPE}-page-m { padding: 50px 14px 60px; }

/* set strip header */
.${SCOPE}-strip {
  display: flex; align-items: center; justify-content: space-between;
  color: var(--gold);
  font-family: "Bebas Neue", "Oswald", sans-serif;
  letter-spacing: 0.22em;
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding: 0 6px;
}
.${SCOPE}-strip .l, .${SCOPE}-strip .r { display: flex; gap: 18px; align-items: center; }
.${SCOPE}-strip b { color: var(--gold); font-weight: 400; }
.${SCOPE}-strip .crest {
  width: 22px; height: 22px; border-radius: 4px;
  background: var(--gold);
  display: inline-grid; place-items: center;
  color: var(--mat); font-family: "Bebas Neue", sans-serif;
  font-size: 13px; letter-spacing: 0;
}

/* main 2-card row */
.${SCOPE}-pair {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 22px;
  align-items: start;
}

/* ───────── CARD (shared) ───────── */
.${SCOPE}-card {
  position: relative;
  background: var(--card);
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  box-shadow:
    0 18px 48px rgba(0,0,0,.45),
    0 2px 0 rgba(255,255,255,.04) inset,
    0 0 0 2px var(--gold-2) inset,
    0 0 0 6px var(--card-2) inset;
}
.${SCOPE}-card::after {
  /* foil shimmer */
  content: "";
  position: absolute; inset: 0;
  background: conic-gradient(from 210deg at 30% 20%,
    rgba(255,255,255,0) 0deg,
    rgba(255,200,150,.18) 60deg,
    rgba(150,200,255,.18) 130deg,
    rgba(255,255,255,0) 200deg,
    rgba(199,166,82,.22) 290deg,
    rgba(255,255,255,0) 360deg);
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 4;
}
.${SCOPE}-card .holo {
  position: absolute; top: 14px; right: 14px;
  width: 46px; height: 46px;
  border-radius: 50%;
  background: conic-gradient(from 0deg,
    #ff6b6b, #ffd93d, #6bcf7f, #4dabf7, #c084fc, #ff6b6b);
  filter: saturate(0.7) brightness(0.95);
  box-shadow: 0 0 0 2px var(--card), 0 2px 6px rgba(0,0,0,.3);
  display: grid; place-items: center;
  font-family: "Bebas Neue", sans-serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--mat);
  z-index: 5;
}

/* ───────── FRONT CARD ───────── */
.${SCOPE}-front { width: 460px; min-height: 680px; }
.${SCOPE}-front .cnum {
  position: absolute; top: 14px; left: 16px;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.12em;
  z-index: 5;
}
.${SCOPE}-front .photo {
  position: relative;
  margin: 38px 22px 0;
  height: 360px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--photo);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.18);
}
.${SCOPE}-front .photo::before {
  /* diagonal scanlines to feel printed */
  content: "";
  position: absolute; inset: 0;
  background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 2px, transparent 2px 7px);
}
.${SCOPE}-front .photo::after {
  content: "PORTRAIT · 4×5 · drop player image here";
  position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,.55);
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
}
.${SCOPE}-front .jersey {
  position: absolute; top: 60px; right: 38px;
  font-family: "Bebas Neue", sans-serif;
  font-size: 96px; line-height: 1;
  color: var(--card);
  -webkit-text-stroke: 2px var(--accent);
  text-shadow: 4px 4px 0 var(--ink);
  z-index: 3;
}
.${SCOPE}-front .nameplate {
  position: relative;
  margin: 18px 22px 0;
  padding: 12px 16px;
  background: linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%);
  color: var(--card);
  border-radius: 4px;
  border: 1px solid var(--gold-2);
  display: flex; align-items: flex-end; justify-content: space-between;
}
.${SCOPE}-front .nameplate .nm {
  font-family: "Bebas Neue", "Oswald", sans-serif;
  font-size: 38px;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.${SCOPE}-front .nameplate .pos {
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  background: var(--accent);
  color: var(--card);
  padding: 4px 10px;
  border-radius: 3px;
  letter-spacing: 0.1em;
}
.${SCOPE}-front .sub {
  margin: 8px 22px 0;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  display: flex; justify-content: space-between;
}
.${SCOPE}-front .footstats {
  margin: 18px 22px 22px;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  padding: 10px 0;
  background: var(--card-2);
  border-radius: 0;
}
.${SCOPE}-front .footstats > div {
  text-align: center;
  border-right: 1px solid var(--rule);
  padding: 4px 6px;
}
.${SCOPE}-front .footstats > div:last-child { border-right: 0; }
.${SCOPE}-front .footstats .v {
  font-family: "Bebas Neue", sans-serif;
  font-size: 26px; line-height: 1;
  color: var(--ink);
}
.${SCOPE}-front .footstats .l {
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 3px;
}

/* ───────── BACK CARD ───────── */
.${SCOPE}-back {
  position: relative;
  min-height: 680px;
  background: var(--card);
  border-radius: 14px;
  padding: 22px 28px 28px;
  box-shadow:
    0 18px 48px rgba(0,0,0,.45),
    0 0 0 2px var(--gold-2) inset,
    0 0 0 6px var(--card-2) inset;
  overflow: hidden;
}
.${SCOPE}-back::after {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 12% 0%, rgba(199,166,82,.10) 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(185,28,28,.06) 0%, transparent 40%);
  pointer-events: none;
}
.${SCOPE}-back .head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  padding-bottom: 12px;
  border-bottom: 3px double var(--ink);
}
.${SCOPE}-back .head .nm {
  font-family: "Bebas Neue", sans-serif;
  font-size: 36px;
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--ink);
}
.${SCOPE}-back .head .sub {
  font-family: "Newsreader", "Source Serif Pro", Georgia, serif;
  font-style: italic;
  font-size: 13px;
  color: var(--muted);
  margin-top: 4px;
}
.${SCOPE}-back .head .cnum {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-align: right;
}
.${SCOPE}-back .head .cnum b {
  display: block;
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  color: var(--accent);
  letter-spacing: 0.02em;
  font-weight: 400;
}

/* Vitals strip */
.${SCOPE}-vitals {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  margin-top: 12px;
  background: var(--card-2);
  border-radius: 3px;
  padding: 8px 0;
  border: 1px solid var(--rule);
}
.${SCOPE}-vitals > div {
  text-align: center;
  border-right: 1px solid var(--rule);
  padding: 2px 4px;
}
.${SCOPE}-vitals > div:last-child { border-right: 0; }
.${SCOPE}-vitals .l {
  font-family: "JetBrains Mono", monospace;
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--muted);
  text-transform: uppercase;
}
.${SCOPE}-vitals .v {
  font-family: "Bebas Neue", sans-serif;
  font-size: 18px;
  line-height: 1.1;
  color: var(--ink);
  margin-top: 2px;
}

/* Stat block — the bread-and-butter of a card back */
.${SCOPE}-statblock { margin-top: 14px; }
.${SCOPE}-statblock h4 {
  margin: 0 0 6px;
  font-family: "Bebas Neue", sans-serif;
  font-size: 14px;
  letter-spacing: 0.22em;
  color: var(--accent);
  text-transform: uppercase;
  display: flex; align-items: center; gap: 8px;
}
.${SCOPE}-statblock h4::before {
  content: "★"; color: var(--gold); font-size: 12px;
}
.${SCOPE}-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
}
.${SCOPE}-table th, .${SCOPE}-table td {
  text-align: left;
  padding: 4px 6px;
  border-bottom: 1px solid var(--rule);
  color: var(--ink);
  vertical-align: top;
}
.${SCOPE}-table th {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 5px;
}
.${SCOPE}-table td.n { font-family: "Bebas Neue", sans-serif; font-size: 16px; }
.${SCOPE}-table td.pos { color: var(--ink); font-weight: 600; }
.${SCOPE}-table tr:last-child td { border-bottom: 0; }
.${SCOPE}-table td.r { text-align: right; }

/* Two-column small section grids */
.${SCOPE}-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 12px;
}
.${SCOPE}-back-foot {
  position: relative;
  margin-top: 14px;
  border-top: 1px solid var(--rule);
  padding-top: 8px;
  display: flex; justify-content: space-between;
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--muted);
  letter-spacing: 0.06em;
}
.${SCOPE}-back-foot b { color: var(--ink); }

/* "Parallel set" inserts row below the main pair */
.${SCOPE}-inserts {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.${SCOPE}-insert {
  background: var(--card);
  border-radius: 10px;
  padding: 16px 18px 18px;
  position: relative;
  border: 1px solid var(--rule);
  box-shadow:
    0 6px 20px rgba(0,0,0,.30),
    0 0 0 2px var(--gold-2) inset;
  overflow: hidden;
  isolation: isolate;
}
.${SCOPE}-insert::after {
  content: "";
  position: absolute; inset: 0;
  background: conic-gradient(from 90deg at 70% 30%,
    rgba(255,255,255,0), rgba(199,166,82,.18), rgba(255,255,255,0));
  mix-blend-mode: overlay;
  pointer-events: none;
}
.${SCOPE}-insert .ribbon {
  position: absolute; top: 12px; right: -28px;
  background: var(--accent);
  color: var(--card);
  font-family: "Bebas Neue", sans-serif;
  font-size: 11px;
  letter-spacing: 0.16em;
  padding: 3px 32px;
  transform: rotate(35deg);
  z-index: 3;
}
.${SCOPE}-insert h5 {
  margin: 0 0 6px;
  font-family: "Bebas Neue", sans-serif;
  font-size: 18px;
  letter-spacing: 0.14em;
  color: var(--ink);
  text-transform: uppercase;
}
.${SCOPE}-insert .sub {
  font-family: "Newsreader", Georgia, serif;
  font-style: italic;
  font-size: 11.5px;
  color: var(--muted);
  margin-bottom: 8px;
}
.${SCOPE}-insert ul {
  margin: 0; padding: 0; list-style: none;
}
.${SCOPE}-insert li {
  font-size: 11.5px; line-height: 1.45;
  border-bottom: 1px dashed var(--rule);
  padding: 5px 0;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  color: var(--ink);
}
.${SCOPE}-insert li:last-child { border-bottom: 0; }
.${SCOPE}-insert li b { color: var(--accent); font-family: "Bebas Neue", sans-serif; font-size: 13px; font-weight: 400; }

/* Bottom contact */
.${SCOPE}-cta {
  margin-top: 22px;
  background: var(--card);
  border-radius: 10px;
  border: 1px solid var(--rule);
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0,0,0,.30);
}
.${SCOPE}-cta .info {
  font-family: "JetBrains Mono", monospace;
  font-size: 11.5px;
  color: var(--muted);
  display: flex; gap: 24px; flex-wrap: wrap;
}
.${SCOPE}-cta .info span { color: var(--ink); font-weight: 600; }
.${SCOPE}-cta button {
  font-family: "Bebas Neue", sans-serif;
  font-size: 16px;
  letter-spacing: 0.16em;
  background: var(--accent);
  color: var(--card);
  border: 0;
  padding: 10px 22px;
  border-radius: 4px;
  cursor: pointer;
}

/* ───────── Mobile ───────── */
.${SCOPE}-m-card { margin: 0 auto; }
.${SCOPE}-m-card.front { width: 100%; min-height: 540px; position: relative; background: var(--card); border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,.4), 0 0 0 2px var(--gold-2) inset, 0 0 0 5px var(--card-2) inset;
  overflow: hidden; isolation: isolate; }
.${SCOPE}-m-card.front::after, .${SCOPE}-m-card.back::after {
  content: ""; position: absolute; inset: 0;
  background: conic-gradient(from 200deg at 30% 20%,
    rgba(255,255,255,0), rgba(150,200,255,.18) 130deg, rgba(199,166,82,.20) 290deg, rgba(255,255,255,0));
  mix-blend-mode: overlay; pointer-events: none;
}
.${SCOPE}-m-card.back { margin-top: 14px; background: var(--card); border-radius: 12px;
  padding: 18px 18px 22px;
  box-shadow: 0 10px 24px rgba(0,0,0,.4), 0 0 0 2px var(--gold-2) inset, 0 0 0 5px var(--card-2) inset;
  position: relative; overflow: hidden; isolation: isolate; }
`;
    document.head.appendChild(s);
  }

  function FrontCard({ persona }) {
    const sport = "RB";
    return (
      <div className={`${SCOPE}-card ${SCOPE}-front`}>
        <div className="cnum">№ 026 · {persona.season} · ROOKIE EDITION</div>
        <div className="holo">HOLO</div>
        <div className="photo">
          <div className="jersey">02</div>
        </div>
        <div className="nameplate">
          <div className="nm">{persona.name}</div>
          <div className="pos">{sport}</div>
        </div>
        <div className="sub">
          <span>{persona.field.toUpperCase()}</span>
          <span>{persona.institution.toUpperCase()}</span>
        </div>
        <div className="footstats">
          {persona.headlineStats.map((s, i) => (
            <div key={i}>
              <div className="v">{s.value}</div>
              <div className="l">{s.label.split(" ").slice(0, 2).join(" ")}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BackCard({ persona }) {
    return (
      <div className={`${SCOPE}-card ${SCOPE}-back`}>
        <div className="head">
          <div>
            <div className="nm">{persona.name}</div>
            <div className="sub">{persona.field} · {persona.specialization} · {persona.year}</div>
          </div>
          <div className="cnum">
            CARD No.
            <b>026</b>
            {persona.season}
          </div>
        </div>

        <div className={`${SCOPE}-vitals`}>
          <div><div className="l">Born</div><div className="v">{persona.dob}</div></div>
          <div><div className="l">Height</div><div className="v">{persona.height}</div></div>
          <div><div className="l">Weight</div><div className="v">{persona.weight}</div></div>
          <div><div className="l">Bats</div><div className="v">R</div></div>
          <div><div className="l">Throws</div><div className="v">R</div></div>
          <div><div className="l">Hometown</div><div className="v" style={{ fontSize: 13 }}>{persona.location.split(",")[0]}</div></div>
        </div>

        <div className={`${SCOPE}-statblock`}>
          <h4>Career Coaching · Stat Block</h4>
          <table className={`${SCOPE}-table`}>
            <thead>
              <tr>
                <th>Season</th>
                <th className="pos">Club</th>
                <th>Role</th>
                <th className="r">N</th>
                <th className="r">Δ Inj.</th>
                <th className="r">Hdl</th>
              </tr>
            </thead>
            <tbody>
              {persona.coached.map((c, i) => {
                const inj = c.outcomes.find((o) => /injur|hamstring|soft/i.test(o.label));
                const hdl = c.outcomes[0];
                return (
                  <tr key={i}>
                    <td>{c.period.replace(" — ", "–")}</td>
                    <td className="pos">{c.squad}</td>
                    <td>{c.role}</td>
                    <td className="r n">{c.n}</td>
                    <td className="r" style={{ color: "var(--accent)" }}>{inj ? inj.stat : "—"}</td>
                    <td className="r n" style={{ color: "var(--ink-2)" }}>{hdl.stat}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={`${SCOPE}-2col`}>
          <div>
            <h4 style={{ margin: "0 0 6px", fontFamily: "Bebas Neue", fontSize: 14, letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--gold)" }}>★</span> Scout's Report · Research
            </h4>
            {persona.research.map((r, i) => (
              <div key={i} style={{ fontSize: 11, lineHeight: 1.4, padding: "5px 0", borderBottom: "1px dashed var(--rule)" }}>
                <div style={{ fontWeight: 600 }}>{r.title}</div>
                <div style={{ color: "var(--muted)", marginTop: 2, fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>
                  {r.venue} · {r.status} · {r.year}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ margin: "0 0 6px", fontFamily: "Bebas Neue", fontSize: 14, letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--gold)" }}>★</span> Achievements · Certs
            </h4>
            {persona.certs.slice(0, 5).map((c, i) => (
              <div key={i} style={{ fontSize: 11, lineHeight: 1.4, padding: "5px 0", borderBottom: "1px dashed var(--rule)", display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: "var(--muted)", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>{c.body}</div>
                </div>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 14, color: c.status === "Active" ? "var(--ink-2)" : "var(--accent)" }}>
                  {c.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${SCOPE}-back-foot`}>
          <div>© {persona.season} <b>{persona.name.toUpperCase()}</b> · Lic. The FA</div>
          <div>SET: <b>FIRST EDITION</b> · 026 / 100</div>
        </div>
      </div>
    );
  }

  function Inserts({ persona }) {
    return (
      <div className={`${SCOPE}-inserts`}>
        <div className={`${SCOPE}-insert`}>
          <div className="ribbon">EXPERIENCE</div>
          <h5>Career Timeline</h5>
          <div className="sub">Insert #027 · Foil parallel</div>
          <ul>
            {persona.experience.slice(0, 4).map((e, i) => (
              <li key={i}>
                <div>
                  <div style={{ fontWeight: 600 }}>{e.role}</div>
                  <div style={{ color: "var(--muted)", fontSize: 10.5, fontFamily: "JetBrains Mono" }}>{e.org}</div>
                </div>
                <b>{e.period.replace(" — ", "–")}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${SCOPE}-insert`}>
          <div className="ribbon">TECH</div>
          <h5>Equipment Bag</h5>
          <div className="sub">Insert #028 · Skills</div>
          <ul>
            {persona.skills.tech.slice(0, 6).map((sk, i) => (
              <li key={i}>
                <div>{sk.name}</div>
                <b>{"●".repeat(sk.level)}{"○".repeat(5 - sk.level)}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${SCOPE}-insert`}>
          <div className="ribbon">PUBLIC</div>
          <h5>Media · Languages</h5>
          <div className="sub">Insert #029 · Reverse</div>
          <ul>
            {persona.media.map((m, i) => (
              <li key={i}>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: 10.5, fontFamily: "JetBrains Mono" }}>{m.meta}</div>
                </div>
                <b>{m.kind}</b>
              </li>
            ))}
            {persona.languages.map((l, i) => (
              <li key={"l" + i}>
                <div>{l.name}</div>
                <b>{l.cefr}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function Desktop({ persona }) {
    return (
      <div className={`${SCOPE}-page`}>
        <div className={`${SCOPE}-strip`}>
          <div className="l">
            <span className="crest">{persona.initials}</span>
            <b>{persona.season} · ROOKIE EDITION</b>
            <span>·</span>
            <span>SPORTS SCIENCE / FIRST SERIES</span>
          </div>
          <div className="r">
            <span>CARD 026 / 100</span>
            <span>·</span>
            <b>HOLO REFRACTOR</b>
          </div>
        </div>

        <div className={`${SCOPE}-pair`}>
          <FrontCard persona={persona} />
          <BackCard persona={persona} />
        </div>

        <Inserts persona={persona} />

        <div className={`${SCOPE}-cta`}>
          <div className="info">
            <div>EMAIL · <span>{persona.email}</span></div>
            <div>TEL · <span>{persona.phone}</span></div>
            <div>SITE · <span>{persona.url}</span></div>
          </div>
          <button>Request Full Set ▸</button>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-strip`} style={{ fontSize: 10, gap: 6 }}>
            <span><b>{persona.season}</b> · ROOKIE</span>
            <span>026 / 100</span>
          </div>

          {/* Front */}
          <div className={`${SCOPE}-m-card front`}>
            <div style={{ position: "absolute", top: 12, left: 14, fontFamily: "JetBrains Mono", fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.12em" }}>№ 026 · ROOKIE</div>
            <div style={{ position: "absolute", top: 10, right: 12, width: 38, height: 38, borderRadius: "50%",
              background: "conic-gradient(from 0deg, #ff6b6b, #ffd93d, #6bcf7f, #4dabf7, #c084fc, #ff6b6b)",
              boxShadow: "0 0 0 2px var(--card)", display: "grid", placeItems: "center",
              fontFamily: "Bebas Neue", fontSize: 9, color: "var(--mat)", letterSpacing: "0.1em", zIndex: 4 }}>HOLO</div>
            <div style={{ position: "relative", margin: "34px 18px 0", height: 240, borderRadius: 4,
              background: "var(--photo)", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.2)" }}>
              <div style={{ position: "absolute", top: 30, right: 18, fontFamily: "Bebas Neue", fontSize: 74, lineHeight: 1,
                color: "var(--card)", WebkitTextStroke: "2px var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>02</div>
              <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                fontFamily: "JetBrains Mono", fontSize: 8.5, letterSpacing: "0.16em", color: "rgba(255,255,255,.5)",
                textTransform: "uppercase" }}>PORTRAIT · drop photo</div>
            </div>
            <div style={{ margin: "14px 18px 0", padding: "10px 14px",
              background: "linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%)",
              color: "var(--card)", borderRadius: 4, border: "1px solid var(--gold-2)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 28, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 0.95 }}>{persona.name}</div>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 16, background: "var(--accent)", color: "var(--card)", padding: "3px 8px", borderRadius: 3, letterSpacing: "0.1em" }}>RB</div>
            </div>
            <div style={{ margin: "6px 18px 0", fontFamily: "JetBrains Mono", fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.06em",
              display: "flex", justifyContent: "space-between" }}>
              <span>{persona.field.toUpperCase()}</span>
              <span>LOUGHBOROUGH</span>
            </div>
            <div style={{ margin: "14px 18px 18px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)",
              padding: "8px 0", background: "var(--card-2)" }}>
              {persona.headlineStats.map((s, i) => (
                <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? "1px solid var(--rule)" : 0, padding: "2px 4px" }}>
                  <div style={{ fontFamily: "Bebas Neue", fontSize: 20, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 7.5, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>
                    {s.label.split(" ").slice(0, 2).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back, simplified */}
          <div className={`${SCOPE}-m-card back`}>
            <div style={{ paddingBottom: 8, borderBottom: "3px double var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
              <div>
                <div style={{ fontFamily: "Bebas Neue", fontSize: 24, letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 0.95 }}>{persona.name}</div>
                <div style={{ fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                  {persona.specialization}
                </div>
              </div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, letterSpacing: "0.12em", color: "var(--muted)", textAlign: "right" }}>
                No. <b style={{ display: "block", fontFamily: "Bebas Neue", fontSize: 18, color: "var(--accent)" }}>026</b>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 10,
              background: "var(--card-2)", padding: "6px 0", border: "1px solid var(--rule)", borderRadius: 3 }}>
              {[
                ["Born", persona.dob],
                ["H/W", `${persona.height} / ${persona.weight}`],
                ["From", persona.location.split(",")[0]],
              ].map(([l, v], i) => (
                <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid var(--rule)" : 0 }}>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 8, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>{l}</div>
                  <div style={{ fontFamily: "Bebas Neue", fontSize: 14, color: "var(--ink)", marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>

            <h4 style={{ margin: "12px 0 4px", fontFamily: "Bebas Neue", fontSize: 12, letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase" }}>★ Career Stat Block</h4>
            <table className={`${SCOPE}-table`}>
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Club</th>
                  <th className="r">N</th>
                  <th className="r">Hdl</th>
                </tr>
              </thead>
              <tbody>
                {persona.coached.map((c, i) => (
                  <tr key={i}>
                    <td>{c.period.replace(" — ", "–")}</td>
                    <td className="pos">{c.squad.length > 18 ? c.squad.slice(0, 16) + "…" : c.squad}</td>
                    <td className="r n">{c.n}</td>
                    <td className="r n" style={{ color: "var(--ink-2)" }}>{c.outcomes[0].stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 style={{ margin: "10px 0 4px", fontFamily: "Bebas Neue", fontSize: 12, letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase" }}>★ Achievements</h4>
            {persona.certs.slice(0, 4).map((c, i) => (
              <div key={i} style={{ fontSize: 10.5, padding: "4px 0", borderBottom: "1px dashed var(--rule)", display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: "var(--muted)", fontFamily: "JetBrains Mono", fontSize: 9 }}>{c.body}</div>
                </div>
                <div style={{ fontFamily: "Bebas Neue", fontSize: 13, color: c.status === "Active" ? "var(--ink-2)" : "var(--accent)" }}>{c.year}</div>
              </div>
            ))}

            <div style={{ marginTop: 10, paddingTop: 6, borderTop: "1px solid var(--rule)",
              fontFamily: "JetBrains Mono", fontSize: 8.5, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
              <span>© {persona.season} <b style={{ color: "var(--ink)" }}>{persona.name.toUpperCase()}</b></span>
              <span>026 / 100</span>
            </div>
          </div>

          <button style={{ display: "block", width: "100%", marginTop: 14,
            fontFamily: "Bebas Neue", fontSize: 14, letterSpacing: "0.16em",
            background: "var(--accent)", color: "var(--card)", border: 0,
            padding: "12px 0", borderRadius: 4, cursor: "pointer" }}>
            Request Full Set ▸
          </button>

          <div style={{ marginTop: 12, fontFamily: "JetBrains Mono", fontSize: 10, color: "var(--ink)", textAlign: "center", lineHeight: 1.6 }}>
            {persona.email} · {persona.phone}
          </div>
        </div>
      </div>
    );
  }

  function Template_t27({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t27 = Template_t27;
})();

// Template_t46cd — Training Log
// Working gym-journal portfolio. Graph-paper page, fountain-pen ink,
// pencil margin notes, masking tape, mustard highlighter. The CV is
// laid out as the day's training entry — header stamp, vitals block,
// MAIN LIFT (experience), ACCESSORIES (skills/certs), CONDITIONING
// (research), COOLDOWN (education + contact), and pencilled notes
// in the left margin.
//
// Avoids the generic "rounded cards on cream" look — everything sits on
// a real graph grid with hand-drawn edges and printed form labels.
//
// Scoped under .t28 / .t28.dark (night-log blueprint).

(function () {
  const SCOPE = "t46cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #f1e7cc;
  --paper-2:   #ead9b0;
  --grid:      rgba(64, 110, 158, 0.22);
  --grid-2:    rgba(64, 110, 158, 0.10);
  --ink:       #1d2547;        /* fountain-pen navy */
  --ink-soft:  #3a4570;
  --pencil:    #524d44;
  --red:       #a8322a;        /* red biro */
  --yellow:    #f3cf3b;        /* highlighter */
  --tape:      rgba(216, 188, 122, 0.78);
  --tape-edge: rgba(170, 138, 70, 0.45);
  --stamp:     #6f2b1f;

  position: absolute; inset: 0;
  overflow-y: auto;
  background: var(--paper);
  background-image:
    linear-gradient(var(--grid-2) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-2) 1px, transparent 1px),
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 12px 12px, 12px 12px, 60px 60px, 60px 60px;
  background-position: 0 0;
  color: var(--ink);
  font-family: "Special Elite", "Courier Prime", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #0c1922;        /* night log / blueprint */
  --paper-2:   #122633;
  --grid:      rgba(120, 180, 210, 0.20);
  --grid-2:    rgba(120, 180, 210, 0.09);
  --ink:       #e6f0e8;
  --ink-soft:  #aeb9b0;
  --pencil:    #98a39d;
  --red:       #ff8b6f;
  --yellow:    #ffd95c;
  --tape:      rgba(100, 130, 145, 0.62);
  --tape-edge: rgba(160, 195, 210, 0.30);
  --stamp:     #ffb38a;
}

/* paper grain overlay */
.${SCOPE}::before {
  content: "";
  position: absolute; inset: 0;
  background-image:
    radial-gradient(rgba(60,30,15,0.06) 1px, transparent 1px),
    radial-gradient(rgba(60,30,15,0.04) 1px, transparent 1px);
  background-size: 3px 3px, 7px 7px;
  background-position: 0 0, 2px 2px;
  pointer-events: none;
  z-index: 1;
}
.${SCOPE}.dark::before {
  background-image:
    radial-gradient(rgba(200,230,240,0.05) 1px, transparent 1px),
    radial-gradient(rgba(200,230,240,0.03) 1px, transparent 1px);
}

/* page bleed: punched-edge ring binding on the left */
.${SCOPE}-binding {
  position: absolute; top: 0; bottom: 0; left: 16px; width: 22px;
  z-index: 2;
  display: flex; flex-direction: column; justify-content: space-around;
  align-items: center;
  padding: 30px 0;
}
.${SCOPE}-binding i {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--paper-2);
  box-shadow: inset 0 1px 0 rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.10);
}
.${SCOPE}.dark .${SCOPE}-binding i {
  background: #1c2e3a;
  box-shadow: inset 0 1px 0 rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.05);
}

/* page layout */
.${SCOPE}-page { position: relative; z-index: 2; padding: 26px 38px 36px 60px; }
.${SCOPE}-page-m { position: relative; z-index: 2; padding: 50px 18px 60px; }

/* HEADER STRIP */
.${SCOPE}-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 18px;
  position: relative;
}
.${SCOPE}-head .title {
  font-family: "Kalam", "Caveat", cursive;
  font-weight: 700;
  font-size: 56px;
  line-height: 0.95;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin: 0;
}
.${SCOPE}-head .sub {
  font-family: "Special Elite", monospace;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: 6px;
}
.${SCOPE}-head .stamp {
  border: 2px solid var(--stamp);
  color: var(--stamp);
  padding: 10px 14px 8px;
  transform: rotate(-4deg);
  font-family: "Special Elite", monospace;
  font-size: 11px;
  line-height: 1.35;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  background: rgba(255,255,255,.04);
  position: relative;
  white-space: nowrap;
}
.${SCOPE}-head .stamp b {
  display: block;
  font-size: 18px;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

/* MAIN GRID */
.${SCOPE}-grid {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 24px;
  align-items: start;
}

/* LEFT MARGIN — vitals, pencil notes */
.${SCOPE}-margin {
  position: relative;
  font-family: "Caveat", "Kalam", cursive;
  color: var(--pencil);
  font-size: 18px;
  line-height: 1.3;
}
.${SCOPE}-margin .scribble {
  font-family: "Caveat", cursive;
  color: var(--pencil);
  font-size: 17px;
  line-height: 1.4;
  margin-bottom: 18px;
  transform: rotate(-1.5deg);
  transform-origin: top left;
}
.${SCOPE}-margin .scribble.r {
  transform: rotate(1.2deg);
  color: var(--red);
  font-weight: 700;
  border: 2px solid var(--red);
  padding: 6px 10px;
  display: inline-block;
  margin-bottom: 18px;
}

/* PRINTED form table — used for vitals + sessions */
.${SCOPE}-form {
  background: var(--paper-2);
  border: 1.5px solid var(--ink);
  font-family: "Special Elite", monospace;
  font-size: 12px;
  margin-bottom: 16px;
  position: relative;
}
.${SCOPE}-form .h {
  background: var(--ink);
  color: var(--paper);
  padding: 5px 10px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  display: flex; justify-content: space-between;
}
.${SCOPE}-form .row {
  display: grid;
  grid-template-columns: 90px 1fr;
  border-top: 1px dashed var(--ink-soft);
  padding: 6px 10px 5px;
  align-items: baseline;
}
.${SCOPE}-form .row:first-of-type { border-top: 0; }
.${SCOPE}-form .row .l {
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.${SCOPE}-form .row .v {
  font-family: "Caveat", cursive;
  font-size: 18px;
  color: var(--ink);
  line-height: 1;
}

/* TAPE strip */
.${SCOPE}-tape {
  position: relative;
  display: inline-block;
  background: var(--tape);
  padding: 10px 14px;
  font-family: "Caveat", cursive;
  font-size: 19px;
  color: var(--ink);
  line-height: 1.2;
  margin: 0 0 18px;
  transform: rotate(-1.5deg);
  box-shadow: 0 1px 2px rgba(0,0,0,.10);
}
.${SCOPE}-tape::before, .${SCOPE}-tape::after {
  content: "";
  position: absolute; top: 0; bottom: 0; width: 8px;
  background:
    linear-gradient(90deg, transparent 0, var(--tape-edge) 30%, transparent 70%);
}
.${SCOPE}-tape::before { left: -4px; }
.${SCOPE}-tape::after  { right: -4px; }

/* RIGHT — workout blocks */
.${SCOPE}-block { margin-bottom: 22px; position: relative; }
.${SCOPE}-block h2 {
  font-family: "Kalam", cursive;
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  color: var(--ink);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
  display: flex; align-items: baseline; gap: 14px;
}
.${SCOPE}-block h2 .tag {
  font-family: "Special Elite", monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  border: 1px solid var(--ink-soft);
  padding: 2px 6px;
  font-weight: 400;
}
.${SCOPE}-block h2 .hl {
  background: linear-gradient(180deg, transparent 50%, var(--yellow) 50%);
  padding: 0 4px;
}
.${SCOPE}-block .lead {
  font-family: "Caveat", cursive;
  font-size: 19px;
  color: var(--pencil);
  margin: 0 0 12px;
  line-height: 1.25;
}

/* SESSION TABLE (the lift log) */
.${SCOPE}-sesh {
  width: 100%;
  border-collapse: collapse;
  font-family: "Special Elite", "Courier Prime", monospace;
  font-size: 11.5px;
  background: var(--paper-2);
  border: 1.5px solid var(--ink);
}
.${SCOPE}-sesh thead th {
  background: var(--ink);
  color: var(--paper);
  text-align: left;
  padding: 5px 8px;
  font-weight: 400;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.${SCOPE}-sesh thead th.r { text-align: right; }
.${SCOPE}-sesh tbody tr { border-top: 1px dashed var(--ink-soft); }
.${SCOPE}-sesh tbody td {
  padding: 8px 8px;
  vertical-align: top;
  line-height: 1.4;
}
.${SCOPE}-sesh tbody td.set {
  font-family: "Kalam", cursive;
  font-size: 18px;
  font-weight: 700;
  color: var(--red);
  width: 36px;
  line-height: 1;
}
.${SCOPE}-sesh tbody td.ex {
  font-family: "Caveat", cursive;
  font-size: 20px;
  line-height: 1.05;
  color: var(--ink);
}
.${SCOPE}-sesh tbody td.ex small {
  display: block;
  font-family: "Special Elite", monospace;
  font-size: 10.5px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  margin-top: 2px;
  line-height: 1.35;
}
.${SCOPE}-sesh tbody td.rep {
  font-family: "Caveat", cursive;
  font-size: 20px;
  color: var(--ink);
  text-align: right;
  white-space: nowrap;
  width: 110px;
}
.${SCOPE}-sesh tbody td.rpe {
  font-family: "Kalam", cursive;
  font-size: 18px;
  color: var(--ink);
  text-align: right;
  width: 80px;
}
.${SCOPE}-sesh tbody td.rpe.hi { color: var(--red); }

/* ACCESSORIES — 3-column compact list */
.${SCOPE}-acc {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 22px;
}
.${SCOPE}-acc-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px dashed var(--ink-soft);
  align-items: baseline;
}
.${SCOPE}-acc-item:last-child, .${SCOPE}-acc-item:nth-last-child(2) { border-bottom: 0; }
.${SCOPE}-acc-item .nm {
  font-family: "Caveat", cursive;
  font-size: 19px;
  color: var(--ink);
  line-height: 1.1;
}
.${SCOPE}-acc-item .nm small {
  display: block;
  font-family: "Special Elite", monospace;
  font-size: 10px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  margin-top: 1px;
}
.${SCOPE}-acc-item .lvl {
  font-family: "Kalam", cursive;
  font-size: 16px;
  color: var(--red);
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* CONDITIONING / research notes */
.${SCOPE}-cond {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.${SCOPE}-cond-item {
  padding: 8px 0;
  border-top: 1px solid var(--ink-soft);
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 14px;
  align-items: baseline;
}
.${SCOPE}-cond-item:first-child { border-top: 0; }
.${SCOPE}-cond-item .tm {
  font-family: "Kalam", cursive;
  font-size: 17px;
  color: var(--red);
  font-weight: 700;
}
.${SCOPE}-cond-item .nm {
  font-family: "Caveat", cursive;
  font-size: 19px;
  color: var(--ink);
  line-height: 1.15;
}
.${SCOPE}-cond-item .nm small {
  display: block;
  font-family: "Special Elite", monospace;
  font-size: 10.5px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  margin-top: 1px;
}
.${SCOPE}-cond-item .st {
  font-family: "Special Elite", monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
  border: 1px dashed var(--ink-soft);
  padding: 2px 6px;
  white-space: nowrap;
}
.${SCOPE}-cond-item .st.pub { color: var(--ink); border-color: var(--ink); }
.${SCOPE}-cond-item .st.rev { color: var(--red); border-color: var(--red); }

/* COOLDOWN — two-column education + languages */
.${SCOPE}-cool {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 22px;
}
.${SCOPE}-edu {
  padding: 8px 0;
  border-top: 1px solid var(--ink-soft);
}
.${SCOPE}-edu:first-child { border-top: 0; }
.${SCOPE}-edu .d {
  font-family: "Kalam", cursive;
  font-weight: 700;
  font-size: 19px;
  color: var(--ink);
  line-height: 1.1;
}
.${SCOPE}-edu .o {
  font-family: "Special Elite", monospace;
  font-size: 11px;
  color: var(--ink-soft);
  margin-top: 3px;
  letter-spacing: 0.04em;
}
.${SCOPE}-edu .y {
  font-family: "Special Elite", monospace;
  font-size: 11px;
  color: var(--red);
  letter-spacing: 0.12em;
  margin-top: 3px;
}
.${SCOPE}-edu .n {
  font-family: "Caveat", cursive;
  font-size: 16px;
  color: var(--pencil);
  margin-top: 3px;
}

.${SCOPE}-lang-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px dashed var(--ink-soft);
  font-family: "Caveat", cursive;
  font-size: 18px;
  align-items: baseline;
  color: var(--ink);
}
.${SCOPE}-lang-row:last-child { border-bottom: 0; }
.${SCOPE}-lang-row .c {
  font-family: "Kalam", cursive;
  font-weight: 700;
  color: var(--red);
  font-size: 15px;
  letter-spacing: 0.04em;
}
.${SCOPE}-lang-row .lv {
  font-family: "Special Elite", monospace;
  font-size: 10.5px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
}

/* SIGN-OFF / CONTACT footer */
.${SCOPE}-signoff {
  margin-top: 24px;
  padding-top: 14px;
  border-top: 2px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
}
.${SCOPE}-signoff .sig {
  font-family: "Caveat", cursive;
  font-size: 36px;
  color: var(--ink);
  line-height: 1;
  transform: rotate(-2deg);
  transform-origin: bottom left;
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 4px;
  display: inline-block;
}
.${SCOPE}-signoff .ctc {
  font-family: "Special Elite", monospace;
  font-size: 12px;
  color: var(--ink-soft);
  text-align: right;
  letter-spacing: 0.06em;
  line-height: 1.6;
}
.${SCOPE}-signoff .ctc b { color: var(--ink); font-weight: 400; }

/* small ink doodle */
.${SCOPE}-arrow {
  display: inline-block;
  font-family: "Caveat", cursive;
  color: var(--red);
  font-size: 22px;
  transform: rotate(-12deg);
}

/* ───── Mobile tweaks ───── */
.${SCOPE}-m-grid {
  display: block;
}
.${SCOPE}-m-vitals { margin-top: 10px; }
.${SCOPE}-m-cool { display: block; }
.${SCOPE}-m-acc { grid-template-columns: 1fr; }
`;
    document.head.appendChild(s);
  }

  // ─────────── Desktop ───────────
  function Desktop({ persona }) {
    const today = "13 May 2026 · Wed";
    return (
      <React.Fragment>
        <div className={`${SCOPE}-binding`}>
          {Array.from({ length: 10 }).map((_, i) => <i key={i} />)}
        </div>

        <div className={`${SCOPE}-page`}>
          <div className={`${SCOPE}-head`}>
            <div>
              <h1 className="title">Training Log<span style={{ color: "var(--red)" }}>.</span></h1>
              <div className="sub">{today} · Block IV · Session 0026</div>
              <div className={`${SCOPE}-tape`} style={{ marginTop: 14 }}>
                {persona.tagline}
              </div>
            </div>
            <div className={`${SCOPE}-head .stamp ${SCOPE}-head`}>
              <div className="stamp">
                S&C INTERN<b>{persona.currentRole.split(" · ")[1] || persona.currentRole}</b>
                {persona.season}
              </div>
            </div>
          </div>

          <div className={`${SCOPE}-grid`}>
            {/* LEFT MARGIN */}
            <div className={`${SCOPE}-margin`}>
              <div className={`${SCOPE}-form`}>
                <div className="h">
                  <span>ATHLETE</span><span>FORM A.1</span>
                </div>
                <div className="row"><div className="l">Name</div><div className="v">{persona.name}</div></div>
                <div className="row"><div className="l">DOB</div><div className="v">{persona.dob}</div></div>
                <div className="row"><div className="l">Ht</div><div className="v">{persona.height}</div></div>
                <div className="row"><div className="l">Wt</div><div className="v">{persona.weight}</div></div>
                <div className="row"><div className="l">Sport</div><div className="v" style={{ fontSize: 16 }}>{persona.sportPlayed}</div></div>
                <div className="row"><div className="l">Uni</div><div className="v" style={{ fontSize: 15 }}>Loughborough</div></div>
              </div>

              <div className="scribble r">
                Avail. JULY 2026 — full season ready
              </div>

              <div className="scribble">
                tagline:<br/>
                <em>"the boring stuff,<br/>done every day,<br/>for years."</em>
              </div>

              <div className="scribble" style={{ transform: "rotate(2deg)" }}>
                <span className={`${SCOPE}-arrow`}>↘</span> see ham. protocol<br/>
                in Block II
              </div>

              <div className={`${SCOPE}-form`} style={{ marginTop: 18 }}>
                <div className="h"><span>READINESS</span><span>0–10</span></div>
                <div className="row"><div className="l">Sleep</div><div className="v">8.2</div></div>
                <div className="row"><div className="l">Soreness</div><div className="v">2</div></div>
                <div className="row"><div className="l">Mood</div><div className="v">7</div></div>
                <div className="row"><div className="l">HRV</div><div className="v">71</div></div>
                <div className="row"><div className="l">CMJ</div><div className="v">38.4 cm</div></div>
              </div>
            </div>

            {/* MAIN */}
            <div>
              {/* WARM-UP */}
              <div className={`${SCOPE}-block`}>
                <h2><span className="hl">Warm-up</span> <span className="tag">12 min · A</span></h2>
                <p className="lead">
                  {persona.name}, {persona.year}, {persona.faculty} — {persona.specialization}.
                  Reads: GPS, force plates, R. Coaches: football, weekends 5-a-side.
                </p>
              </div>

              {/* MAIN LIFT = experience */}
              <div className={`${SCOPE}-block`}>
                <h2><span className="hl">Main Lift</span> <span className="tag">Experience · 45 min · B</span></h2>
                <table className={`${SCOPE}-sesh`}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Role / Club</th>
                      <th className="r">Period</th>
                      <th className="r">RPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {persona.experience.map((e, i) => (
                      <tr key={i}>
                        <td className="set">{i + 1}</td>
                        <td className="ex">
                          {e.role}
                          <small>{e.org} — {e.bullets[0]}</small>
                        </td>
                        <td className="rep">{e.period.replace(" — ", "–")}</td>
                        <td className={`rpe${i === 0 ? " hi" : ""}`}>{[9.5, 8.5, 7.5, 6.5][i] || 7}/10</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ACCESSORY = skills + certs */}
              <div className={`${SCOPE}-block`}>
                <h2><span className="hl">Accessories</span> <span className="tag">Tech · Certs · 25 min · C</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                  <div>
                    <p className="lead" style={{ marginBottom: 6 }}>Tools — drilled daily.</p>
                    <div className={`${SCOPE}-acc`} style={{ gridTemplateColumns: "1fr" }}>
                      {persona.skills.tech.slice(0, 7).map((sk, i) => (
                        <div key={i} className={`${SCOPE}-acc-item`}>
                          <div className="nm">{sk.name.split(" · ")[0]}<small>{sk.name.split(" · ")[1] || "—"}</small></div>
                          <div className="lvl">{sk.level === 5 ? "RX" : `${sk.level}×5`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="lead" style={{ marginBottom: 6 }}>Certifications — stamped &amp; current.</p>
                    <div className={`${SCOPE}-acc`} style={{ gridTemplateColumns: "1fr" }}>
                      {persona.certs.map((c, i) => (
                        <div key={i} className={`${SCOPE}-acc-item`}>
                          <div className="nm">{c.name}<small>{c.body} · {c.status}</small></div>
                          <div className="lvl">{c.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CONDITIONING = research + athletes coached headlines */}
              <div className={`${SCOPE}-block`}>
                <h2><span className="hl">Conditioning</span> <span className="tag">Research · Output · D</span></h2>
                <div className={`${SCOPE}-cond`}>
                  {persona.research.map((r, i) => {
                    const st = r.status.toLowerCase();
                    const cls = st.includes("progress") ? "rev" : st.includes("under") ? "rev" : "pub";
                    return (
                      <div key={i} className={`${SCOPE}-cond-item`}>
                        <div className="tm">{r.year}</div>
                        <div className="nm">
                          {r.title}
                          <small>{r.venue} · {r.role}</small>
                        </div>
                        <div className={`st ${cls}`}>{r.status}</div>
                      </div>
                    );
                  })}
                  <div style={{ borderTop: "1px solid var(--ink)", marginTop: 6, paddingTop: 8 }}>
                    <p className="lead" style={{ margin: "0 0 4px" }}>Squads coached this block:</p>
                    {persona.coached.map((c, i) => (
                      <div key={i} className={`${SCOPE}-cond-item`} style={{ borderTop: i === 0 ? 0 : "1px dashed var(--ink-soft)" }}>
                        <div className="tm">n={c.n}</div>
                        <div className="nm">
                          {c.squad}
                          <small>{c.role} · {c.period.replace(" — ", "–")}</small>
                        </div>
                        <div className="st pub" style={{ color: "var(--red)", borderColor: "var(--red)" }}>
                          {c.outcomes[0].stat}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COOLDOWN = education + languages + media */}
              <div className={`${SCOPE}-block`}>
                <h2><span className="hl">Cooldown</span> <span className="tag">Education · Languages · 10 min · E</span></h2>
                <div className={`${SCOPE}-cool`}>
                  <div>
                    {persona.education.map((e, i) => (
                      <div key={i} className={`${SCOPE}-edu`}>
                        <div className="d">{e.degree}</div>
                        <div className="o">{e.org}</div>
                        <div className="y">{e.period}</div>
                        <div className="n">{e.notes}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="lead" style={{ margin: "0 0 4px" }}>Languages.</p>
                    {persona.languages.map((l, i) => (
                      <div key={i} className={`${SCOPE}-lang-row`}>
                        <span>{l.name}</span>
                        <span className="lv">{l.level}</span>
                        <span className="c">{l.cefr}</span>
                      </div>
                    ))}
                    <p className="lead" style={{ margin: "12px 0 4px" }}>Public work.</p>
                    {persona.media.map((m, i) => (
                      <div key={i} style={{ padding: "6px 0", borderBottom: "1px dashed var(--ink-soft)", fontFamily: "Caveat, cursive", fontSize: 18, lineHeight: 1.2 }}>
                        {m.name}
                        <small style={{ display: "block", fontFamily: "Special Elite, monospace", fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.04em", marginTop: 2 }}>
                          {m.kind} · {m.meta}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* sign-off */}
              <div className={`${SCOPE}-signoff`}>
                <div>
                  <div style={{ fontFamily: "Special Elite, monospace", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>
                    Signed — coach on duty
                  </div>
                  <div className="sig">{persona.name}</div>
                </div>
                <div className="ctc">
                  <div><b>{persona.email}</b></div>
                  <div>{persona.phone}</div>
                  <div>{persona.url}</div>
                  <div style={{ marginTop: 8, color: "var(--red)" }}>▸ Full CV — PDF on request</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  // ─────────── Mobile ───────────
  function Mobile({ persona }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <div className={`${SCOPE}-head`}>
            <div>
              <h1 className="title" style={{ fontSize: 36 }}>Training<br/>Log<span style={{ color: "var(--red)" }}>.</span></h1>
              <div className="sub">13 May 2026 · Session 0026</div>
            </div>
            <div className="stamp" style={{ fontSize: 9 }}>
              S&C INTERN<b style={{ fontSize: 14 }}>U19</b>
              {persona.season}
            </div>
          </div>

          <div className={`${SCOPE}-tape`}>{persona.tagline}</div>

          <div className={`${SCOPE}-form`} style={{ marginTop: 14 }}>
            <div className="h"><span>ATHLETE</span><span>FORM A.1</span></div>
            <div className="row"><div className="l">Name</div><div className="v">{persona.name}</div></div>
            <div className="row"><div className="l">DOB</div><div className="v">{persona.dob}</div></div>
            <div className="row"><div className="l">Ht / Wt</div><div className="v">{persona.height} · {persona.weight}</div></div>
            <div className="row"><div className="l">Uni</div><div className="v" style={{ fontSize: 14 }}>Loughborough</div></div>
            <div className="row"><div className="l">Sport</div><div className="v" style={{ fontSize: 14 }}>{persona.sportPlayed}</div></div>
          </div>

          <div className={`${SCOPE}-block`}>
            <h2 style={{ fontSize: 22 }}><span className="hl">Warm-up</span> <span className="tag">A</span></h2>
            <p className="lead" style={{ fontSize: 17 }}>
              {persona.field} · {persona.specialization}. GPS, force plates, R.
            </p>
          </div>

          <div className={`${SCOPE}-block`}>
            <h2 style={{ fontSize: 22 }}><span className="hl">Main Lift</span> <span className="tag">Exp · B</span></h2>
            <table className={`${SCOPE}-sesh`}>
              <thead><tr><th></th><th>Role</th><th className="r">RPE</th></tr></thead>
              <tbody>
                {persona.experience.map((e, i) => (
                  <tr key={i}>
                    <td className="set">{i + 1}</td>
                    <td className="ex" style={{ fontSize: 17 }}>
                      {e.role}
                      <small style={{ fontSize: 9.5 }}>{e.org} · {e.period.replace(" — ", "–")}</small>
                    </td>
                    <td className={`rpe${i === 0 ? " hi" : ""}`} style={{ fontSize: 15 }}>{[9.5, 8.5, 7.5, 6.5][i] || 7}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`${SCOPE}-block`}>
            <h2 style={{ fontSize: 22 }}><span className="hl">Accessories</span> <span className="tag">C</span></h2>
            <div className={`${SCOPE}-acc ${SCOPE}-m-acc`} style={{ gridTemplateColumns: "1fr" }}>
              {persona.skills.tech.slice(0, 6).map((sk, i) => (
                <div key={i} className={`${SCOPE}-acc-item`}>
                  <div className="nm" style={{ fontSize: 17 }}>{sk.name.split(" · ")[0]}<small style={{ fontSize: 9.5 }}>{sk.name.split(" · ")[1] || "—"}</small></div>
                  <div className="lvl">{sk.level === 5 ? "RX" : `${sk.level}×5`}</div>
                </div>
              ))}
            </div>
            <p className="lead" style={{ marginTop: 8, fontSize: 16 }}>Certs (stamped):</p>
            {persona.certs.slice(0, 4).map((c, i) => (
              <div key={i} className={`${SCOPE}-acc-item`}>
                <div className="nm" style={{ fontSize: 17 }}>{c.name}<small style={{ fontSize: 9.5 }}>{c.body}</small></div>
                <div className="lvl">{c.year}</div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-block`}>
            <h2 style={{ fontSize: 22 }}><span className="hl">Conditioning</span> <span className="tag">D</span></h2>
            {persona.research.map((r, i) => (
              <div key={i} className={`${SCOPE}-cond-item`} style={{ gridTemplateColumns: "44px 1fr" }}>
                <div className="tm" style={{ fontSize: 15 }}>{r.year}</div>
                <div className="nm" style={{ fontSize: 17 }}>
                  {r.title}
                  <small style={{ fontSize: 9.5 }}>{r.venue} · {r.status}</small>
                </div>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-block`}>
            <h2 style={{ fontSize: 22 }}><span className="hl">Cooldown</span> <span className="tag">E</span></h2>
            {persona.education.map((e, i) => (
              <div key={i} className={`${SCOPE}-edu`}>
                <div className="d" style={{ fontSize: 17 }}>{e.degree}</div>
                <div className="o" style={{ fontSize: 10 }}>{e.org}</div>
                <div className="y" style={{ fontSize: 10 }}>{e.period}</div>
              </div>
            ))}
            <p className="lead" style={{ marginTop: 10, fontSize: 16 }}>Languages.</p>
            {persona.languages.map((l, i) => (
              <div key={i} className={`${SCOPE}-lang-row`}>
                <span>{l.name}</span>
                <span className="lv">{l.level}</span>
                <span className="c">{l.cefr}</span>
              </div>
            ))}
          </div>

          <div className={`${SCOPE}-signoff`}>
            <div>
              <div style={{ fontFamily: "Special Elite, monospace", fontSize: 9.5, color: "var(--ink-soft)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}>
                Signed
              </div>
              <div className="sig" style={{ fontSize: 28 }}>{persona.name}</div>
            </div>
            <div className="ctc" style={{ fontSize: 10 }}>
              <div><b>{persona.email}</b></div>
              <div>{persona.phone}</div>
              <div style={{ marginTop: 6, color: "var(--red)" }}>▸ CV PDF</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t46cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t46cd = Template_t46cd;
})();


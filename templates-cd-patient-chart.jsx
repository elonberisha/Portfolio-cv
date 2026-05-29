// Template_t35cd — Patient Chart
// Electronic Health Record style portfolio for a medical student.
// Identity bar + allergy band + tabbed body, with the CV laid out as
// EHR panels: Demographics, Active Problems, Rotations, Labs (skills),
// Notes (research), Medications (certifications). Includes a vitals
// sparkline strip. Slightly cramped, slightly dated chrome — on
// purpose, real EHRs do not look like landing pages.
//
// Scoped under .t29 / .t29.dark (night-shift theme).

(function () {
  const SCOPE = "t35cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --bg:        #eef1f5;
  --surface:   #fbfcfd;
  --surface-2: #e8ecf0;
  --chrome:    #1f3a68;
  --chrome-2:  #2a4a82;
  --ink:       #0b1426;
  --muted:     #5d6678;
  --rule:      #cdd3dc;
  --rule-soft: #e5e8ee;
  --green:     #1b7d3a;
  --red:       #b22020;
  --amber:     #b87100;
  --blue:      #1d4ed8;

  position: absolute; inset: 0;
  overflow-y: auto;
  background: var(--bg);
  color: var(--ink);
  font-family: "IBM Plex Sans", -apple-system, "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --bg:        #07101e;
  --surface:   #0f1a2c;
  --surface-2: #182740;
  --chrome:    #0a1830;
  --chrome-2:  #102246;
  --ink:       #d8e2f2;
  --muted:     #8a98b5;
  --rule:      #213759;
  --rule-soft: #182846;
  --green:     #3dd07a;
  --red:       #ff6363;
  --amber:     #ffb33d;
  --blue:      #7aa3ff;
}

/* Identity / chart header bar */
.${SCOPE}-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  background: var(--chrome);
  color: #f4f7fc;
  padding: 10px 18px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 11.5px;
  letter-spacing: 0.04em;
}
.${SCOPE}-bar .crest {
  width: 28px; height: 28px;
  background: #f4f7fc; color: var(--chrome);
  display: grid; place-items: center;
  font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 13px;
  letter-spacing: 0;
}
.${SCOPE}-bar .who { font-family: "IBM Plex Sans", sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0; }
.${SCOPE}-bar .who small { font-family: "IBM Plex Mono", monospace; font-size: 11px; font-weight: 400; opacity: 0.8; margin-left: 6px; letter-spacing: 0.06em; }
.${SCOPE}-bar .right {
  display: flex; gap: 18px; align-items: center;
  font-size: 11.5px; letter-spacing: 0.08em; opacity: 0.95;
}
.${SCOPE}-bar .right b { color: #f4f7fc; font-weight: 600; }

/* Tabs */
.${SCOPE}-tabs {
  display: flex; background: var(--chrome-2);
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 12px;
}
.${SCOPE}-tabs a {
  padding: 8px 14px;
  color: rgba(244,247,252,0.7);
  border-right: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  letter-spacing: 0.04em;
}
.${SCOPE}-tabs a.on { color: #fff; background: var(--surface); color: var(--ink); font-weight: 600; }

/* Allergy / alerts band */
.${SCOPE}-alerts {
  background: #fff2f2;
  border-bottom: 1px solid var(--rule);
  padding: 7px 18px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 11.5px;
  color: var(--red);
  display: flex; gap: 24px; align-items: center;
  letter-spacing: 0.04em;
}
.${SCOPE}.dark .${SCOPE}-alerts { background: rgba(255,99,99,0.10); }
.${SCOPE}-alerts .badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--red); color: #fff;
  padding: 2px 8px; font-weight: 700;
  letter-spacing: 0.12em; font-size: 10.5px;
}

/* Vitals strip */
.${SCOPE}-vitals {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--surface);
  border-bottom: 1px solid var(--rule);
  padding: 10px 18px;
}
.${SCOPE}-vitals > div {
  border-right: 1px solid var(--rule-soft);
  padding: 0 12px;
}
.${SCOPE}-vitals > div:last-child { border-right: 0; }
.${SCOPE}-vitals .l { font-family: "IBM Plex Mono", monospace; font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
.${SCOPE}-vitals .v { font-family: "IBM Plex Sans", sans-serif; font-weight: 600; font-size: 20px; line-height: 1.1; margin-top: 2px; }
.${SCOPE}-vitals .v small { font-weight: 400; font-size: 11px; color: var(--muted); margin-left: 2px; }
.${SCOPE}-vitals .spark { display: block; margin-top: 4px; opacity: 0.85; }

/* Main panel grid */
.${SCOPE}-body {
  display: grid;
  grid-template-columns: 270px 1fr 290px;
  gap: 12px;
  padding: 14px 18px 18px;
  align-items: start;
}

.${SCOPE}-panel {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 2px;
}
.${SCOPE}-panel .h {
  background: var(--surface-2);
  border-bottom: 1px solid var(--rule);
  padding: 7px 12px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  display: flex; justify-content: space-between;
}
.${SCOPE}-panel .h .opt { color: var(--muted); }
.${SCOPE}-panel .pad { padding: 10px 12px; }

/* Demographics rows */
.${SCOPE}-kv {
  display: grid; grid-template-columns: 85px 1fr;
  padding: 5px 0; border-bottom: 1px dotted var(--rule);
  font-size: 12px;
}
.${SCOPE}-kv:last-child { border-bottom: 0; }
.${SCOPE}-kv .l { font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); padding-top: 2px; }
.${SCOPE}-kv .v { font-weight: 500; }

/* Active problems list */
.${SCOPE}-prob {
  display: grid; grid-template-columns: 50px 1fr auto;
  gap: 8px; padding: 7px 0;
  border-bottom: 1px dotted var(--rule);
  font-size: 12px;
}
.${SCOPE}-prob:last-child { border-bottom: 0; }
.${SCOPE}-prob .code { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; color: var(--blue); }
.${SCOPE}-prob .nm { font-weight: 500; line-height: 1.3; }
.${SCOPE}-prob .nm small { display: block; color: var(--muted); font-weight: 400; font-size: 11px; margin-top: 2px; }
.${SCOPE}-prob .st {
  font-family: "IBM Plex Mono", monospace; font-size: 9.5px; letter-spacing: 0.14em;
  padding: 2px 6px; border-radius: 2px; white-space: nowrap;
  align-self: flex-start;
}
.${SCOPE}-prob .st.act { background: #e7f4ec; color: var(--green); border: 1px solid #b9dec7; }
.${SCOPE}-prob .st.pend { background: #fff5e2; color: var(--amber); border: 1px solid #f4d089; }
.${SCOPE}-prob .st.res { background: #eef1f5; color: var(--muted); border: 1px solid var(--rule); }
.${SCOPE}.dark .${SCOPE}-prob .st.act { background: rgba(61,208,122,.12); border-color: rgba(61,208,122,.35); }
.${SCOPE}.dark .${SCOPE}-prob .st.pend { background: rgba(255,179,61,.10); border-color: rgba(255,179,61,.35); }
.${SCOPE}.dark .${SCOPE}-prob .st.res { background: rgba(255,255,255,.04); border-color: var(--rule); }

/* Rotations table — looks like an admissions list */
.${SCOPE}-rot {
  width: 100%; border-collapse: collapse;
  font-size: 11.5px;
}
.${SCOPE}-rot th, .${SCOPE}-rot td {
  text-align: left; padding: 6px 8px;
  border-bottom: 1px dotted var(--rule);
  vertical-align: top;
}
.${SCOPE}-rot th {
  background: var(--surface-2);
  font-family: "IBM Plex Mono", monospace;
  font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted); font-weight: 500;
}
.${SCOPE}-rot td.svc { font-weight: 600; }
.${SCOPE}-rot td.dt { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; color: var(--muted); white-space: nowrap; }
.${SCOPE}-rot td.lead { color: var(--muted); }
.${SCOPE}-rot td.proc { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; color: var(--ink); }

/* Labs (skills) panel */
.${SCOPE}-lab {
  display: grid; grid-template-columns: 1fr auto auto;
  gap: 8px; padding: 5px 0;
  border-bottom: 1px dotted var(--rule);
  font-size: 11.5px;
  align-items: baseline;
}
.${SCOPE}-lab:last-child { border-bottom: 0; }
.${SCOPE}-lab .nm { font-weight: 500; line-height: 1.25; }
.${SCOPE}-lab .nm small { display: block; color: var(--muted); font-family: "IBM Plex Mono", monospace; font-size: 10px; }
.${SCOPE}-lab .val { font-family: "IBM Plex Mono", monospace; font-size: 12px; font-weight: 600; }
.${SCOPE}-lab .flag {
  font-family: "IBM Plex Mono", monospace; font-size: 10px;
  padding: 1px 5px; border-radius: 2px;
  letter-spacing: 0.12em;
}
.${SCOPE}-lab .flag.h { background: var(--green); color: #fff; }
.${SCOPE}-lab .flag.n { background: var(--surface-2); color: var(--muted); border: 1px solid var(--rule); }
.${SCOPE}-lab .flag.l { background: var(--amber); color: #fff; }

/* Notes — research/audit */
.${SCOPE}-note {
  padding: 8px 0;
  border-bottom: 1px dotted var(--rule);
  font-size: 12px;
}
.${SCOPE}-note:last-child { border-bottom: 0; }
.${SCOPE}-note .hd {
  display: flex; justify-content: space-between; gap: 8px;
  font-family: "IBM Plex Mono", monospace; font-size: 10.5px;
  color: var(--muted); letter-spacing: 0.06em;
  margin-bottom: 3px;
}
.${SCOPE}-note .hd b { color: var(--blue); font-weight: 600; }
.${SCOPE}-note .ti { font-weight: 600; line-height: 1.35; }
.${SCOPE}-note .meta { font-family: "PT Serif", Georgia, serif; font-style: italic; font-size: 12px; color: var(--muted); margin-top: 2px; line-height: 1.4; }

/* Medications (certs) */
.${SCOPE}-med {
  display: grid; grid-template-columns: 1fr auto;
  gap: 8px; padding: 6px 0;
  border-bottom: 1px dotted var(--rule);
  font-size: 11.5px;
}
.${SCOPE}-med:last-child { border-bottom: 0; }
.${SCOPE}-med .nm { font-weight: 600; }
.${SCOPE}-med .nm small { display: block; color: var(--muted); font-weight: 400; font-family: "IBM Plex Mono", monospace; font-size: 10px; margin-top: 1px; }
.${SCOPE}-med .yr { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: var(--blue); font-weight: 600; text-align: right; }

/* Foot bar */
.${SCOPE}-foot {
  background: var(--surface);
  border-top: 1px solid var(--rule);
  padding: 10px 18px;
  display: grid; grid-template-columns: 1fr auto;
  gap: 12px; align-items: center;
  font-family: "IBM Plex Mono", monospace;
  font-size: 11px;
  color: var(--muted);
}
.${SCOPE}-foot b { color: var(--ink); font-weight: 600; letter-spacing: 0.02em; }
.${SCOPE}-foot button {
  font-family: "IBM Plex Sans", sans-serif; font-size: 12px; font-weight: 600;
  background: var(--chrome); color: #f4f7fc;
  border: 0; padding: 8px 16px; border-radius: 2px;
  cursor: pointer; letter-spacing: 0.04em;
}

/* spark line */
.${SCOPE}-spark { height: 18px; width: 100%; }
.${SCOPE}-spark path { fill: none; stroke: var(--blue); stroke-width: 1.4; }
.${SCOPE}.dark .${SCOPE}-spark path { stroke: var(--blue); }

/* ───── Mobile ───── */
.${SCOPE}-m-bar {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px; align-items: center;
  background: var(--chrome); color: #f4f7fc;
  padding: 8px 12px;
  font-family: "IBM Plex Mono", monospace; font-size: 10.5px;
  letter-spacing: 0.04em;
}
.${SCOPE}-m-bar .crest { width: 26px; height: 26px; background: #f4f7fc; color: var(--chrome);
  display: grid; place-items: center; font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 12px; }
.${SCOPE}-m-bar .who { font-family: "IBM Plex Sans", sans-serif; font-weight: 600; font-size: 13px; }
.${SCOPE}-m-bar .who small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 400; font-size: 10px; opacity: .8; margin-top: 2px; letter-spacing: 0.04em; }
.${SCOPE}-m-vitals {
  display: grid; grid-template-columns: repeat(3, 1fr);
  background: var(--surface); border-bottom: 1px solid var(--rule);
  padding: 8px 12px;
}
.${SCOPE}-m-vitals > div { border-right: 1px solid var(--rule-soft); padding: 0 8px; }
.${SCOPE}-m-vitals > div:last-child { border-right: 0; }
.${SCOPE}-m-vitals .l { font-family: "IBM Plex Mono", monospace; font-size: 8.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.${SCOPE}-m-vitals .v { font-weight: 600; font-size: 17px; line-height: 1.1; margin-top: 2px; }
.${SCOPE}-m-section { padding: 10px 12px 0; }
.${SCOPE}-m-section h3 {
  margin: 0 0 6px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--muted); font-weight: 500;
  padding-bottom: 4px; border-bottom: 1px solid var(--rule);
}
`;
    document.head.appendChild(s);
  }

  // tiny sparkline path
  function sparkPath(values, w = 80, h = 18) {
    const min = Math.min(...values), max = Math.max(...values);
    const span = max - min || 1;
    return values.map((v, i) => {
      const x = (i / (values.length - 1)) * (w - 2) + 1;
      const y = h - 1 - ((v - min) / span) * (h - 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  function Spark({ data, w = 90 }) {
    return (
      <svg className={`${SCOPE}-spark`} viewBox={`0 0 ${w} 18`} width={w} height={18}>
        <path d={sparkPath(data, w, 18)} />
      </svg>
    );
  }

  function Desktop({ persona }) {
    const v = persona.vitals;
    return (
      <React.Fragment>
        <div className={`${SCOPE}-bar`}>
          <div className="crest">EH</div>
          <div className="who">
            {persona.name.toUpperCase()}, {persona.pronouns}
            <small>MRN {persona.mrn} · NHS {persona.nhsNumber} · DOB {persona.dob}</small>
          </div>
          <div className="right">
            <span>WARD: <b>RIE · STEM CELL</b></span>
            <span>STATUS: <b>FINAL YEAR</b></span>
            <span>ATTENDING: <b>PROF. C. INNES</b></span>
          </div>
        </div>
        <div className={`${SCOPE}-tabs`}>
          <a className="on">Chart</a>
          <a>Demographics</a>
          <a>Problem List</a>
          <a>Procedures</a>
          <a>Labs</a>
          <a>Notes</a>
          <a>Medications</a>
          <a>Imaging</a>
          <a>Allergies</a>
        </div>

        <div className={`${SCOPE}-alerts`}>
          <span className="badge">⚠ ALLERGY</span>
          <span>{persona.allergies[0]}</span>
          <span style={{ marginLeft: "auto", color: "var(--muted)" }}>updated 12 Mar 2026 · verified by EH</span>
        </div>

        <div className={`${SCOPE}-vitals`}>
          <div>
            <div className="l">BP</div>
            <div className="v">{v.bp} <small>mmHg</small></div>
            <Spark data={[120, 122, 119, 118, 121, 119, 118]} />
          </div>
          <div>
            <div className="l">HR</div>
            <div className="v">{v.hr} <small>bpm</small></div>
            <Spark data={[68, 70, 65, 64, 62, 63, 62]} />
          </div>
          <div>
            <div className="l">RR</div>
            <div className="v">{v.rr} <small>/min</small></div>
            <Spark data={[14, 14, 15, 14, 13, 14, 14]} />
          </div>
          <div>
            <div className="l">SpO₂</div>
            <div className="v">{v.spo2} <small>RA</small></div>
            <Spark data={[97, 98, 99, 98, 99, 99, 99]} />
          </div>
          <div>
            <div className="l">Temp</div>
            <div className="v">{v.temp}</div>
            <Spark data={[36.5, 36.6, 36.8, 36.7, 36.8, 36.8, 36.8]} />
          </div>
          <div>
            <div className="l">Wt · Ht</div>
            <div className="v">62 kg · 168 cm</div>
            <div className="l" style={{ marginTop: 4 }}>BMI 22.0</div>
          </div>
        </div>

        <div className={`${SCOPE}-body`}>
          {/* LEFT */}
          <div>
            <div className={`${SCOPE}-panel`}>
              <div className="h"><span>Demographics</span><span className="opt">[edit]</span></div>
              <div className="pad">
                <div className={`${SCOPE}-kv`}><div className="l">Name</div><div className="v">{persona.name}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Pronouns</div><div className="v">{persona.pronouns}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">DOB</div><div className="v">{persona.dob}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">School</div><div className="v">{persona.institution}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Faculty</div><div className="v">{persona.faculty}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Year</div><div className="v">{persona.year}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Track</div><div className="v">{persona.specialization}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Email</div><div className="v" style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>{persona.email}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Tel</div><div className="v" style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>{persona.phone}</div></div>
                <div className={`${SCOPE}-kv`}><div className="l">Site</div><div className="v" style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>{persona.url}</div></div>
              </div>
            </div>

            <div className={`${SCOPE}-panel`} style={{ marginTop: 10 }}>
              <div className="h"><span>Active Problems</span><span className="opt">6</span></div>
              <div className="pad">
                <div className={`${SCOPE}-prob`}>
                  <span className="code">F90.0</span>
                  <span className="nm">Final-year MBChB clinical
                    <small>RIE / Western General rotation block</small>
                  </span>
                  <span className="st act">ACTIVE</span>
                </div>
                <div className={`${SCOPE}-prob`}>
                  <span className="code">Z03.5</span>
                  <span className="nm">IMT applications · 2026 cycle
                    <small>F1 preference: Scotland · Lothian</small>
                  </span>
                  <span className="st pend">PENDING</span>
                </div>
                <div className={`${SCOPE}-prob`}>
                  <span className="code">Z71.1</span>
                  <span className="nm">DPST Neurology shortlist
                    <small>Application Sep 2026, 2 references secured.</small>
                  </span>
                  <span className="st pend">PENDING</span>
                </div>
                <div className={`${SCOPE}-prob`}>
                  <span className="code">Z53.0</span>
                  <span className="nm">BMedSci (Hons) Neuroscience
                    <small>Awarded First; honours year completed.</small>
                  </span>
                  <span className="st res">RESOLVED</span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE — rotations + notes */}
          <div>
            <div className={`${SCOPE}-panel`}>
              <div className="h"><span>Clinical Rotations · {persona.rotations.length} blocks</span><span className="opt">view all ›</span></div>
              <table className={`${SCOPE}-rot`}>
                <thead>
                  <tr><th>Service</th><th>Site</th><th>Period</th><th>Lead</th><th>Procedures</th></tr>
                </thead>
                <tbody>
                  {persona.rotations.map((r, i) => (
                    <tr key={i}>
                      <td className="svc">{r.service}</td>
                      <td className="lead">{r.site}</td>
                      <td className="dt">{r.period}</td>
                      <td className="lead">{r.lead}</td>
                      <td className="proc">{r.procedures}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${SCOPE}-panel`} style={{ marginTop: 10 }}>
              <div className="h"><span>Clinical Notes · Research &amp; Audit</span><span className="opt">authored: EH</span></div>
              <div className="pad">
                {persona.research.map((r, i) => (
                  <div key={i} className={`${SCOPE}-note`}>
                    <div className="hd">
                      <span>NOTE {String(i + 1).padStart(3, "0")} · {r.year} · <b>{r.status.toUpperCase()}</b></span>
                      <span>{r.role}</span>
                    </div>
                    <div className="ti">{r.title}</div>
                    <div className="meta">
                      {r.venue}{r.ds && r.ds !== "—" ? ` · ${r.ds}` : ""}.
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${SCOPE}-panel`} style={{ marginTop: 10 }}>
              <div className="h"><span>Imaging · Education History</span><span className="opt">3 reports</span></div>
              <div className="pad">
                {persona.education.map((e, i) => (
                  <div key={i} className={`${SCOPE}-note`}>
                    <div className="hd">
                      <span>EDU {String(i + 1).padStart(3, "0")} · <b>{e.period}</b></span>
                      <span>{e.degree.startsWith("MBChB") ? "primary" : "prior"}</span>
                    </div>
                    <div className="ti">{e.degree}</div>
                    <div className="meta">{e.org}. {e.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — labs (skills) + meds (certs) */}
          <div>
            <div className={`${SCOPE}-panel`}>
              <div className="h"><span>Labs · Clinical Skills</span><span className="opt">range: trainee</span></div>
              <div className="pad">
                {persona.skills.clinical.map((sk, i) => {
                  const lv = sk.level.toLowerCase();
                  const flag = lv.includes("indep") || lv.includes("confident") || lv.includes("cert") ? "h" : lv.includes("supervised") || lv.includes("trained") ? "n" : "l";
                  return (
                    <div key={i} className={`${SCOPE}-lab`}>
                      <span className="nm">{sk.name}<small>ref: independent / supervised / trained</small></span>
                      <span className="val">{sk.level}</span>
                      <span className={`flag ${flag}`}>{flag === "h" ? "H" : flag === "l" ? "L" : "N"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${SCOPE}-panel`} style={{ marginTop: 10 }}>
              <div className="h"><span>Software · Lab support</span><span className="opt">5y</span></div>
              <div className="pad">
                {persona.skills.software.map((sk, i) => (
                  <div key={i} className={`${SCOPE}-lab`}>
                    <span className="nm">{sk.name}</span>
                    <span className="val">{"●".repeat(sk.level)}{"○".repeat(5 - sk.level)}</span>
                    <span className={`flag ${sk.level >= 4 ? "h" : "n"}`}>{sk.level >= 4 ? "H" : "N"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${SCOPE}-panel`} style={{ marginTop: 10 }}>
              <div className="h"><span>Awards · Languages</span><span className="opt">—</span></div>
              <div className="pad">
                {persona.awards.map((a, i) => (
                  <div key={i} className={`${SCOPE}-med`}>
                    <span className="nm">{a.name}<small>{a.org}</small></span>
                    <span className="yr">{a.year}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid var(--rule)" }}>
                  {persona.languages.map((l, i) => (
                    <div key={i} className={`${SCOPE}-lab`}>
                      <span className="nm">{l.name}</span>
                      <span className="val">{l.level}</span>
                      <span className={`flag ${l.cefr.startsWith("C") ? "h" : l.cefr.startsWith("B") ? "n" : "l"}`}>{l.cefr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${SCOPE}-foot`}>
          <div>
            CHART AUTHORED BY <b>{persona.name}</b> · LAST UPDATED 14 May 2026 16:42 GMT ·
            <span> CONTACT </span><b>{persona.email}</b> · <b>{persona.phone}</b> · <b>{persona.url}</b>
          </div>
          <button>↓ DOWNLOAD CV (PDF)</button>
        </div>
      </React.Fragment>
    );
  }

  function Mobile({ persona }) {
    const v = persona.vitals;
    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-m-bar`} style={{ marginTop: 42 }}>
          <div className="crest">EH</div>
          <div className="who">
            {persona.name.toUpperCase()}
            <small>MRN {persona.mrn}</small>
          </div>
        </div>
        <div className={`${SCOPE}-alerts`} style={{ padding: "6px 12px", fontSize: 10 }}>
          <span className="badge">⚠ ALLERGY</span>
          <span style={{ fontSize: 10 }}>Penicillin</span>
        </div>
        <div className={`${SCOPE}-m-vitals`}>
          <div><div className="l">BP</div><div className="v">{v.bp}</div></div>
          <div><div className="l">HR</div><div className="v">{v.hr}</div></div>
          <div><div className="l">SpO₂</div><div className="v">{v.spo2}</div></div>
        </div>
        <div className={`${SCOPE}-m-section`}>
          <h3>Demographics</h3>
          <div className={`${SCOPE}-kv`}><div className="l">Year</div><div className="v">{persona.year}</div></div>
          <div className={`${SCOPE}-kv`}><div className="l">School</div><div className="v">{persona.institution}</div></div>
          <div className={`${SCOPE}-kv`}><div className="l">Track</div><div className="v">{persona.specialization}</div></div>
          <div className={`${SCOPE}-kv`}><div className="l">Email</div><div className="v" style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>{persona.email}</div></div>
        </div>
        <div className={`${SCOPE}-m-section`}>
          <h3>Active Problems</h3>
          <div className={`${SCOPE}-prob`}>
            <span className="code">F90.0</span>
            <span className="nm">Final-year MBChB <small>RIE rotation block</small></span>
            <span className="st act">ACTIVE</span>
          </div>
          <div className={`${SCOPE}-prob`}>
            <span className="code">Z03.5</span>
            <span className="nm">IMT 2026 <small>Lothian preferred</small></span>
            <span className="st pend">PEND</span>
          </div>
        </div>
        <div className={`${SCOPE}-m-section`}>
          <h3>Rotations · {persona.rotations.length}</h3>
          {persona.rotations.map((r, i) => (
            <div key={i} className={`${SCOPE}-prob`}>
              <span className="code" style={{ fontSize: 9.5 }}>R{String(i + 1).padStart(2, "0")}</span>
              <span className="nm" style={{ fontSize: 11.5 }}>{r.service} <small>{r.site} · {r.period}</small></span>
              <span className="st res">{r.weeks}w</span>
            </div>
          ))}
        </div>
        <div className={`${SCOPE}-m-section`}>
          <h3>Notes · Research</h3>
          {persona.research.map((r, i) => (
            <div key={i} className={`${SCOPE}-note`}>
              <div className="hd"><span>NOTE {i + 1} · {r.year} · <b>{r.status.toUpperCase()}</b></span></div>
              <div className="ti" style={{ fontSize: 11.5 }}>{r.title}</div>
              <div className="meta" style={{ fontSize: 11 }}>{r.venue} · {r.role}</div>
            </div>
          ))}
        </div>
        <div className={`${SCOPE}-m-section`}>
          <h3>Labs · Skills</h3>
          {persona.skills.clinical.slice(0, 6).map((sk, i) => (
            <div key={i} className={`${SCOPE}-lab`} style={{ fontSize: 11 }}>
              <span className="nm">{sk.name}</span>
              <span className="val" style={{ fontSize: 10.5 }}>{sk.level}</span>
              <span className={`flag ${sk.level.toLowerCase().includes("indep") || sk.level.toLowerCase().includes("cert") ? "h" : "n"}`}>{sk.level.toLowerCase().includes("indep") ? "H" : "N"}</span>
            </div>
          ))}
        </div>
        <div className={`${SCOPE}-foot`} style={{ flexDirection: "column", alignItems: "stretch", marginTop: 10 }}>
          <div style={{ fontSize: 10 }}>
            <b>{persona.email}</b><br/>
            <b>{persona.phone}</b><br/>
            <b>{persona.url}</b>
          </div>
          <button style={{ marginTop: 8 }}>↓ DOWNLOAD CV</button>
        </div>
      </div>
    );
  }

  function Template_t35cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t35cd = Template_t35cd;
})();


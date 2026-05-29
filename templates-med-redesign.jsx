/* global React, PERSONAS */

/* ══════════════════════════════════════════════════════════════════
   T35 — PATIENT CHART  ·  medical
   EHR-style layout — patient banner, vitals strip, problem list,
   clinical rotations, lab results, competencies, discharge.
   ══════════════════════════════════════════════════════════════════ */

const T35R_CSS = `
.t35{ font-family: "Inter", "IBM Plex Sans", sans-serif; background: #eef1f6; color: #1e2228; min-height: 100%; font-size: 13px; line-height: 1.5; }
.t35.dark{ background: #0d1117; color: #d0d5dd; }

/* Patient banner */
.t35 .ehr-banner{
  background: linear-gradient(135deg, #1b2a4a 0%, #243555 100%); color: #fff;
  padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.t35.dark .ehr-banner{ background: linear-gradient(135deg, #0a1628 0%, #0f1e38 100%); border-bottom: 1px solid #1e3054; }
.t35 .ehr-banner .pt-id{
  font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em;
  opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;
}
.t35 .ehr-banner .pt-name{ font-size: 22px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.15; }
.t35 .ehr-banner .pt-meta{ font-size: 12px; opacity: 0.75; margin-top: 3px; }
.t35 .ehr-banner .allergy-tag{
  background: #c0392b; padding: 5px 12px; border-radius: 3px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  animation: t35-pulse 2.2s ease-in-out infinite; white-space: nowrap;
}
@keyframes t35-pulse{ 0%,100%{opacity:1} 50%{opacity:.65} }
.t35 .ehr-banner .status-dot{
  width: 10px; height: 10px; border-radius: 50%; background: #27ae60;
  box-shadow: 0 0 6px #27ae60; display: inline-block; margin-right: 6px;
}

/* Vitals strip */
.t35 .vitals-strip{
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 1px;
  background: color-mix(in oklab, currentColor 12%, transparent);
}
.t35-mobile .vitals-strip{ grid-template-columns: repeat(3, 1fr); }
.t35 .vbox{
  background: #fff; padding: 12px 14px; text-align: center;
}
.t35.dark .vbox{ background: #161b22; }
.t35 .vbox .vlab{
  font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.16em;
  text-transform: uppercase; color: color-mix(in oklab, currentColor 55%, transparent); margin-bottom: 4px;
}
.t35 .vbox .vval{ font-size: 24px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
.t35 .vbox .vunit{ font-size: 10px; color: color-mix(in oklab, currentColor 55%, transparent); margin-top: 3px; }
.t35 .vbox.alert .vval{ color: #c0392b; }
.t35 .vbox.ok .vval{ color: #27ae60; }

/* Main layout */
.t35 .ehr-body{ display: grid; grid-template-columns: 180px 1fr; min-height: 600px; }
.t35-mobile .ehr-body{ grid-template-columns: 1fr; }

/* Sidebar nav */
.t35 .ehr-nav{
  background: #fff; border-right: 1px solid color-mix(in oklab, currentColor 12%, transparent);
  padding: 8px 0;
}
.t35.dark .ehr-nav{ background: #161b22; border-right-color: #21262d; }
.t35-mobile .ehr-nav{
  display: flex; overflow-x: auto; border-right: none; border-bottom: 1px solid color-mix(in oklab, currentColor 12%, transparent);
  padding: 0; scrollbar-width: none;
}
.t35-mobile .ehr-nav::-webkit-scrollbar{ display: none; }
.t35 .ehr-nav .nav-item{
  display: flex; align-items: center; gap: 8px;
  padding: 9px 16px; font-size: 12px; color: color-mix(in oklab, currentColor 65%, transparent);
  cursor: default; border-left: 3px solid transparent; transition: all .15s;
}
.t35-mobile .ehr-nav .nav-item{ border-left: none; border-bottom: 2px solid transparent; padding: 10px 14px; white-space: nowrap; }
.t35 .ehr-nav .nav-item.active{ color: #1b2a4a; border-left-color: #1b2a4a; font-weight: 600; background: color-mix(in oklab, #1b2a4a 5%, transparent); }
.t35.dark .ehr-nav .nav-item.active{ color: #7eb8ff; border-left-color: #7eb8ff; background: rgba(126,184,255,.06); }
.t35-mobile .ehr-nav .nav-item.active{ border-left-color: transparent; border-bottom-color: #1b2a4a; }
.t35 .ehr-nav .nav-item .nav-icon{ font-size: 14px; width: 20px; text-align: center; }
.t35 .ehr-nav .nav-item .badge{
  margin-left: auto; font-family: "JetBrains Mono", monospace; font-size: 9px;
  background: color-mix(in oklab, currentColor 8%, transparent); padding: 2px 6px; border-radius: 10px;
}

/* Content area */
.t35 .ehr-content{ background: #fff; padding: 22px 28px; overflow: auto; }
.t35.dark .ehr-content{ background: #161b22; }
.t35-mobile .ehr-content{ padding: 18px 16px; }
.t35 .ehr-section{ margin-bottom: 26px; }
.t35 .ehr-section:last-child{ margin-bottom: 0; }
.t35 .section-bar{
  display: flex; align-items: center; gap: 10px;
  padding-bottom: 8px; margin-bottom: 14px; border-bottom: 2px solid #1b2a4a;
}
.t35.dark .section-bar{ border-bottom-color: #7eb8ff; }
.t35 .section-bar h3{
  font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase; margin: 0;
}
.t35 .section-bar .sec-badge{
  font-family: "JetBrains Mono", monospace; font-size: 9px;
  background: color-mix(in oklab, currentColor 8%, transparent); padding: 3px 8px; border-radius: 3px;
  letter-spacing: 0.08em; margin-left: auto;
}

/* Problem list items */
.t35 .prob-item{
  display: grid; grid-template-columns: 50px 1fr 90px; gap: 12px; align-items: start;
  padding: 10px 0; border-bottom: 1px solid color-mix(in oklab, currentColor 8%, transparent);
}
.t35-mobile .prob-item{ grid-template-columns: 40px 1fr; }
.t35 .prob-item .prob-num{
  font-family: "JetBrains Mono", monospace; font-size: 10px;
  background: #1b2a4a; color: #fff; padding: 3px 0; text-align: center; border-radius: 2px;
  letter-spacing: 0.08em;
}
.t35.dark .prob-item .prob-num{ background: #243555; }
.t35 .prob-item .prob-title{ font-weight: 600; font-size: 13px; margin-bottom: 2px; }
.t35 .prob-item .prob-note{ font-size: 12px; color: color-mix(in oklab, currentColor 60%, transparent); line-height: 1.5; }
.t35 .prob-item .prob-status{
  font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 3px 8px; border-radius: 2px; text-align: center;
}
.t35 .prob-item .prob-status.active{ background: #e8f5e9; color: #2e7d32; }
.t35.dark .prob-item .prob-status.active{ background: rgba(46,125,50,.15); color: #66bb6a; }
.t35 .prob-item .prob-status.review{ background: #fff3e0; color: #e65100; }
.t35.dark .prob-item .prob-status.review{ background: rgba(230,81,0,.12); color: #ff9800; }

/* Rotation / progress notes */
.t35 .note-entry{
  padding: 12px 16px; margin-bottom: 8px; border-radius: 4px;
  border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
  background: color-mix(in oklab, currentColor 2%, transparent);
}
.t35 .note-entry .note-head{
  display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;
}
.t35 .note-entry .note-role{ font-weight: 600; font-size: 13px; }
.t35 .note-entry .note-time{
  font-family: "JetBrains Mono", monospace; font-size: 10px;
  color: color-mix(in oklab, currentColor 50%, transparent); letter-spacing: 0.06em;
}
.t35 .note-entry .note-org{ font-size: 12px; color: #1b2a4a; font-weight: 500; margin-bottom: 4px; }
.t35.dark .note-entry .note-org{ color: #7eb8ff; }
.t35 .note-entry .note-detail{ font-size: 12px; color: color-mix(in oklab, currentColor 60%, transparent); }

/* Lab results table */
.t35 .lab-table{ width: 100%; border-collapse: collapse; font-size: 12px; }
.t35 .lab-table th{
  font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.1em;
  text-transform: uppercase; text-align: left; padding: 8px 10px;
  border-bottom: 2px solid color-mix(in oklab, currentColor 15%, transparent);
  color: color-mix(in oklab, currentColor 55%, transparent); font-weight: 600;
}
.t35 .lab-table td{
  padding: 8px 10px; border-bottom: 1px solid color-mix(in oklab, currentColor 6%, transparent);
  vertical-align: top;
}
.t35 .lab-table .lab-title{ font-weight: 600; }
.t35 .lab-table .lab-venue{ font-size: 11px; color: color-mix(in oklab, currentColor 50%, transparent); }
.t35 .lab-table .lab-status{
  font-family: "JetBrains Mono", monospace; font-size: 10px;
  padding: 2px 7px; border-radius: 2px; display: inline-block;
}

/* Skills grid */
.t35 .skill-grid{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.t35-mobile .skill-grid{ grid-template-columns: repeat(2, 1fr); }
.t35 .skill-chip{
  padding: 10px 14px; border-radius: 4px; font-size: 12px; font-weight: 500;
  border: 1px solid color-mix(in oklab, currentColor 12%, transparent);
  background: color-mix(in oklab, currentColor 3%, transparent);
  display: flex; align-items: center; gap: 8px;
}
.t35 .skill-chip .sk-dot{ width: 6px; height: 6px; border-radius: 50%; background: #27ae60; flex-shrink: 0; }

/* Education timeline */
.t35 .edu-row{
  display: flex; gap: 16px; padding: 10px 0;
  border-bottom: 1px solid color-mix(in oklab, currentColor 6%, transparent);
}
.t35 .edu-row .edu-time{
  font-family: "JetBrains Mono", monospace; font-size: 11px; min-width: 90px;
  color: color-mix(in oklab, currentColor 55%, transparent); letter-spacing: 0.04em;
}
.t35 .edu-row .edu-deg{ font-weight: 600; font-size: 13px; }
.t35 .edu-row .edu-org{ font-size: 12px; color: color-mix(in oklab, currentColor 60%, transparent); }

/* Awards */
.t35 .award-item{
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 14px; margin-bottom: 6px; border-radius: 4px;
  background: linear-gradient(90deg, color-mix(in oklab, #d4af37 6%, transparent) 0%, transparent 100%);
  border-left: 3px solid #d4af37;
}
.t35.dark .award-item{ background: linear-gradient(90deg, rgba(212,175,55,.08) 0%, transparent 100%); }
.t35 .award-item .aw-name{ font-weight: 500; font-size: 13px; }
.t35 .award-item .aw-year{
  font-family: "JetBrains Mono", monospace; font-size: 11px;
  color: color-mix(in oklab, currentColor 50%, transparent);
}

/* Discharge / contact */
.t35 .discharge{
  border: 2px solid #1b2a4a; border-radius: 6px; padding: 20px 24px;
  background: color-mix(in oklab, #1b2a4a 3%, transparent);
}
.t35.dark .discharge{ border-color: #7eb8ff; background: rgba(126,184,255,.04); }
.t35 .discharge h4{
  font-family: "JetBrains Mono", monospace; font-size: 12px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 12px;
}
.t35 .discharge .dc-row{ display: flex; gap: 24px; flex-wrap: wrap; font-size: 12px; margin-bottom: 6px; }
.t35 .discharge .dc-row b{ font-weight: 600; margin-right: 6px; }
.t35 .discharge .dc-btn{
  display: inline-flex; align-items: center; gap: 8px; margin-top: 14px;
  padding: 10px 22px; background: #1b2a4a; color: #fff; border: none; border-radius: 4px;
  font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
}
.t35.dark .discharge .dc-btn{ background: #7eb8ff; color: #0d1117; }

/* Testimonial */
.t35 .consult-note{
  margin-top: 14px; padding: 14px 18px; border-radius: 4px;
  background: color-mix(in oklab, currentColor 3%, transparent);
  border-left: 3px solid color-mix(in oklab, currentColor 20%, transparent);
  font-style: italic; font-size: 12.5px; line-height: 1.6;
}
.t35 .consult-note .cn-author{
  font-style: normal; font-weight: 600; font-size: 11px; margin-top: 8px;
  color: color-mix(in oklab, currentColor 55%, transparent);
}

/* Footer */
.t35 .ehr-footer{
  font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.12em;
  text-transform: uppercase; text-align: center; padding: 14px;
  color: color-mix(in oklab, currentColor 40%, transparent);
  border-top: 1px solid color-mix(in oklab, currentColor 10%, transparent);
}
`;

function Tpl35PatientChart({ mode, dark }) {
  const p = PERSONAS.med;
  const mob = mode === "mobile";
  const navItems = [
    { icon: "◉", label: "Summary", active: true, badge: null },
    { icon: "⊞", label: "Problems", badge: String(p.projects.length) },
    { icon: "↻", label: "Rotations", badge: String(p.experience.length) },
    { icon: "⌬", label: "Labs", badge: String(p.writing.length) },
    { icon: "✚", label: "Competencies", badge: String(p.skills.length) },
    { icon: "⏱", label: "History", badge: null },
    { icon: "★", label: "Awards", badge: String(p.awards.length) },
    { icon: "↓", label: "Discharge", badge: null },
  ];

  return (<>
    <style>{T35R_CSS}</style>
    <div className={`t35 ${mob ? "t35-mobile" : ""} ${dark ? "dark" : ""}`}>
      <div className="ehr-banner">
        <div>
          <div className="pt-id">PT № EH-2026 · MRN 014-0901 · CV CHART</div>
          <div className="pt-name">{p.name}</div>
          <div className="pt-meta">
            <span className="status-dot" />{p.role} · {p.school} · {p.location}
          </div>
        </div>
        <div className="allergy-tag">⚠ NKDA</div>
      </div>

      <div className="vitals-strip">
        <div className="vbox ok"><div className="vlab">Year</div><div className="vval">5</div><div className="vunit">of 6 · MD</div></div>
        <div className="vbox"><div className="vlab">Rotations</div><div className="vval">{p.experience.length}</div><div className="vunit">blocks completed</div></div>
        <div className="vbox"><div className="vlab">Research</div><div className="vval">{p.writing.length}</div><div className="vunit">publications</div></div>
        <div className="vbox ok"><div className="vlab">Patients</div><div className="vval">320</div><div className="vunit">screened (ECG)</div></div>
        <div className="vbox"><div className="vlab">Languages</div><div className="vval">{p.languages.length}</div><div className="vunit">spoken</div></div>
        <div className="vbox"><div className="vlab">Awards</div><div className="vval">{p.awards.length}</div><div className="vunit">received</div></div>
      </div>

      <div className="ehr-body">
        <div className="ehr-nav">
          {navItems.map((n, i) => (
            <div key={i} className={`nav-item${n.active ? " active" : ""}`}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
              {n.badge && <span className="badge">{n.badge}</span>}
            </div>
          ))}
        </div>

        <div className="ehr-content">
          {/* Summary / tagline */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Clinical Summary</h3>
              <span className="sec-badge">ATTENDING: SELF</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 640, marginBottom: 12 }}>{p.tagline}</p>
            <div style={{ fontSize: 12, color: "color-mix(in oklab, currentColor 50%, transparent)" }}>
              {p.now.map((n, i) => <div key={i} style={{ padding: "3px 0" }}>▸ {n}</div>)}
            </div>
          </div>

          {/* Problem List → Projects */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Problem List · Projects</h3>
              <span className="sec-badge">{p.projects.length} active</span>
            </div>
            {p.projects.map((pr, i) => (
              <div key={i} className="prob-item">
                <div className="prob-num">#{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="prob-title">{pr.title}</div>
                  <div className="prob-note">{pr.note} · {pr.kind}, {pr.year}</div>
                </div>
                {!mob && (
                  <div className={`prob-status ${pr.year.includes("–") || pr.year.includes("2025") ? "active" : "review"}`}>
                    {pr.year.includes("–") ? "Active" : pr.year === "2025" ? "Active" : "Ongoing"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Clinical Rotations → Experience */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Clinical Rotations</h3>
              <span className="sec-badge">{p.experience.length} entries</span>
            </div>
            {p.experience.map((ex, i) => (
              <div key={i} className="note-entry">
                <div className="note-head">
                  <span className="note-role">{ex.role}</span>
                  <span className="note-time">{ex.time}</span>
                </div>
                <div className="note-org">{ex.org}</div>
                <div className="note-detail">{ex.note}</div>
              </div>
            ))}
          </div>

          {/* Lab Results → Research & Writing */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Lab Results · Research</h3>
              <span className="sec-badge">{p.writing.length} reports</span>
            </div>
            <table className="lab-table">
              <thead>
                <tr>
                  <th>Test / Title</th>
                  <th>Lab / Venue</th>
                  <th>Year</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {p.writing.map((w, i) => {
                  const isReview = w.where.includes("review");
                  return (
                    <tr key={i}>
                      <td className="lab-title">{w.title}</td>
                      <td className="lab-venue">{w.where}</td>
                      <td>{w.year}</td>
                      <td>
                        <span className="lab-status" style={{
                          background: isReview ? "rgba(230,81,0,.1)" : "rgba(46,125,50,.1)",
                          color: isReview ? "#e65100" : "#2e7d32"
                        }}>{isReview ? "Pending" : "Final"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Competencies → Skills */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Competencies</h3>
              <span className="sec-badge">{p.skills.length} verified</span>
            </div>
            <div className="skill-grid">
              {p.skills.map((sk, i) => (
                <div key={i} className="skill-chip">
                  <span className="sk-dot" />{sk}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="ehr-section">
            <div className="section-bar"><h3>Education History</h3></div>
            {p.education.map((ed, i) => (
              <div key={i} className="edu-row">
                <span className="edu-time">{ed.time}</span>
                <div>
                  <div className="edu-deg">{ed.degree}</div>
                  <div className="edu-org">{ed.org}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className="ehr-section">
            <div className="section-bar">
              <h3>Awards & Grants</h3>
              <span className="sec-badge">{p.awards.length} entries</span>
            </div>
            {p.awards.map((a, i) => (
              <div key={i} className="award-item">
                <span className="aw-name">★ {a.name}</span>
                <span className="aw-year">{a.year}</span>
              </div>
            ))}
          </div>

          {/* Consultant notes → testimonials */}
          {p.testimonials.map((t, i) => (
            <div key={i} className="consult-note">
              "{t.quote}"
              <div className="cn-author">— {t.author}</div>
            </div>
          ))}

          {/* Discharge → Contact */}
          <div className="ehr-section" style={{ marginTop: 22 }}>
            <div className="discharge">
              <h4>Discharge Summary · Contact</h4>
              <div className="dc-row"><b>Email</b> {p.email}</div>
              <div className="dc-row"><b>Location</b> {p.location}</div>
              <div className="dc-row"><b>Languages</b> {p.languages.join(" · ")}</div>
              <div className="dc-row"><b>Links</b> {p.socials.join(" · ")}</div>
              <button className="dc-btn">↓ Download CV · PDF</button>
            </div>
          </div>
        </div>
      </div>

      <div className="ehr-footer">
        folio.app · chart generated {new Date().toLocaleDateString("en-GB")} · confidential medical record · {p.name.toLowerCase().replace(/\s/g,"")}@folio
      </div>
    </div>
  </>);
}


/* ══════════════════════════════════════════════════════════════════
   T36 — ANATOMICAL PLATE  ·  medical
   Scientific illustration plate — SVG body figure with numbered
   leader lines, Latin captions, section tabulae, specimen labels.
   ══════════════════════════════════════════════════════════════════ */

const T36R_CSS = `
.t36{ font-family: "EB Garamond", "IBM Plex Serif", Georgia, serif; background: #f5f0e4; color: #1a1610; min-height: 100%; font-size: 14px; line-height: 1.65; }
.t36.dark{ background: #12100b; color: #e0d8c4; }

/* Plate header */
.t36 .plate-head{
  text-align: center; padding: 30px 28px 18px;
  border-bottom: 2px solid currentColor;
}
.t36 .plate-head .vol{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.22em;
  text-transform: uppercase; color: color-mix(in oklab, currentColor 50%, transparent);
  margin-bottom: 8px;
}
.t36 .plate-head h1{
  font-family: "EB Garamond", Georgia, serif; font-weight: 400; font-style: italic;
  font-size: clamp(30px, 4.5vw, 48px); margin: 0; letter-spacing: 0.02em; line-height: 1.1;
}
.t36 .plate-head .subtitle{
  font-size: 14px; color: color-mix(in oklab, currentColor 55%, transparent);
  font-style: italic; margin-top: 6px;
}
.t36 .plate-head .plate-no{
  font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: 0.18em;
  margin-top: 10px; color: color-mix(in oklab, currentColor 45%, transparent);
}

/* Figure area */
.t36 .figure-area{
  display: grid; grid-template-columns: 1fr 280px 1fr; gap: 0;
  padding: 24px 20px; min-height: 420px; position: relative;
}
.t36-mobile .figure-area{ grid-template-columns: 1fr; }

.t36 .annotations-left, .t36 .annotations-right{
  display: flex; flex-direction: column; justify-content: space-around; padding: 10px 0;
}
.t36-mobile .annotations-left, .t36-mobile .annotations-right{ padding: 0; }
.t36 .annot-item{
  padding: 8px 12px; font-size: 12px; position: relative;
}
.t36 .annot-item .annot-num{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;
  color: #8b0000; letter-spacing: 0.08em; display: block; margin-bottom: 2px;
}
.t36.dark .annot-item .annot-num{ color: #e67373; }
.t36 .annot-item .annot-latin{
  font-style: italic; font-size: 11px; color: color-mix(in oklab, currentColor 50%, transparent);
}
.t36 .annot-item .annot-title{ font-weight: 600; font-size: 13px; margin-bottom: 1px; }
.t36 .annot-item .annot-desc{ font-size: 11.5px; color: color-mix(in oklab, currentColor 55%, transparent); line-height: 1.5; }

.t36 .annotations-left .annot-item{ text-align: right; border-right: 1px solid color-mix(in oklab, currentColor 15%, transparent); }
.t36 .annotations-right .annot-item{ border-left: 1px solid color-mix(in oklab, currentColor 15%, transparent); }

/* SVG figure */
.t36 .figure-svg-wrap{
  display: flex; align-items: center; justify-content: center; position: relative;
}
.t36 .figure-svg-wrap svg{ width: 200px; height: 380px; }
.t36 .figure-svg-wrap .organ{ fill: none; stroke: currentColor; stroke-width: 1.2; }
.t36 .figure-svg-wrap .leader{ stroke: #8b0000; stroke-width: 0.7; stroke-dasharray: 3 2; }
.t36.dark .figure-svg-wrap .leader{ stroke: #e67373; }
.t36 .figure-svg-wrap .dot{ fill: #8b0000; }
.t36.dark .figure-svg-wrap .dot{ fill: #e67373; }
.t36 .figure-svg-wrap .fig-label{
  font-family: "IBM Plex Mono", monospace; font-size: 9px; fill: #8b0000;
  letter-spacing: 0.08em;
}
.t36.dark .figure-svg-wrap .fig-label{ fill: #e67373; }
.t36 .figure-svg-wrap .fig-caption{
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: 0.16em;
  text-transform: uppercase; color: color-mix(in oklab, currentColor 40%, transparent);
  white-space: nowrap;
}

/* Tabula sections */
.t36 .tabulae{
  padding: 0 28px 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.t36-mobile .tabulae{ grid-template-columns: 1fr; padding: 0 16px 24px; }
.t36 .tabula{
  border: 1px solid currentColor; padding: 16px 18px;
}
.t36 .tabula h3{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 12px;
  padding-bottom: 6px; border-bottom: 1px solid currentColor;
}
.t36 .tabula .tab-row{
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 5px 0; border-bottom: 1px dotted color-mix(in oklab, currentColor 15%, transparent);
  font-size: 12.5px;
}
.t36 .tabula .tab-row .tab-val{
  font-family: "IBM Plex Mono", monospace; font-size: 11px;
  color: color-mix(in oklab, currentColor 55%, transparent);
}
.t36 .tabula .tab-item{ padding: 6px 0; border-bottom: 1px dotted color-mix(in oklab, currentColor 12%, transparent); }
.t36 .tabula .tab-item .ti-title{ font-weight: 600; font-size: 12.5px; }
.t36 .tabula .tab-item .ti-sub{ font-size: 11px; color: color-mix(in oklab, currentColor 50%, transparent); font-style: italic; }

/* Footer */
.t36 .plate-foot{
  text-align: center; padding: 16px 28px 28px;
  border-top: 2px solid currentColor;
  font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: 0.16em;
  color: color-mix(in oklab, currentColor 40%, transparent); text-transform: uppercase;
}
.t36 .plate-foot .contact-36{
  margin-top: 10px; font-family: "EB Garamond", serif; font-size: 13px;
  letter-spacing: 0.04em; text-transform: none;
  color: color-mix(in oklab, currentColor 65%, transparent);
}
`;

function Tpl36Anatomy({ mode, dark }) {
  const p = PERSONAS.med;
  const mob = mode === "mobile";

  const regions = [
    { num: "I", latin: "Caput intellectus", title: p.projects[0]?.title || "Research", desc: p.projects[0]?.note || "" },
    { num: "II", latin: "Thorax clinicus", title: p.experience[0]?.role || "Rotation", desc: `${p.experience[0]?.org} · ${p.experience[0]?.time}` },
    { num: "III", latin: "Brachium sinistrum", title: p.projects[1]?.title || "Leadership", desc: p.projects[1]?.note || "" },
    { num: "IV", latin: "Brachium dextrum", title: p.projects[2]?.title || "Publication", desc: p.projects[2]?.note || "" },
    { num: "V", latin: "Venter laboris", title: p.experience[1]?.role || "Experience", desc: `${p.experience[1]?.org} · ${p.experience[1]?.note}` },
    { num: "VI", latin: "Pes fundamentum", title: p.projects[3]?.title || "Volunteer", desc: p.projects[3]?.note || "" },
  ];

  const leftAnnots = regions.slice(0, 3);
  const rightAnnots = regions.slice(3);

  return (<>
    <style>{T36R_CSS}</style>
    <div className={`t36 ${mob ? "t36-mobile" : ""} ${dark ? "dark" : ""}`}>
      <div className="plate-head">
        <div className="vol">Plate XIV · Vol. III · Spring 2026 · Folio Anatomia</div>
        <h1>{p.name}</h1>
        <div className="subtitle">{p.tagline}</div>
        <div className="plate-no">{p.role.toUpperCase()} · {p.school.toUpperCase()}</div>
      </div>

      <div className="figure-area">
        <div className="annotations-left">
          {leftAnnots.map((a, i) => (
            <div key={i} className="annot-item">
              <span className="annot-num">Fig. {a.num}.</span>
              <span className="annot-latin">{a.latin}</span>
              <div className="annot-title">{a.title}</div>
              <div className="annot-desc">{a.desc}</div>
            </div>
          ))}
        </div>

        {!mob && (
          <div className="figure-svg-wrap">
            <svg viewBox="0 0 240 480" preserveAspectRatio="xMidYMid meet">
              <path className="organ" d="M120 30 a 24 24 0 1 1 0.1 0 z" />
              <path className="organ" d="M84 80 q 36 -28 72 0 l 12 80 q -48 14 -96 0 z" />
              <path className="organ" d="M96 160 l -8 110 l 16 4 l 8 -100 z" />
              <path className="organ" d="M144 160 l 8 110 l -16 4 l -8 -100 z" />
              <path className="organ" d="M86 280 l -2 140 l 22 4 l 10 -140 z" />
              <path className="organ" d="M154 280 l 2 140 l -22 4 l -10 -140 z" />
              <path className="organ" d="M86 420 l -2 32 l 28 0 l 2 -26 z" />
              <path className="organ" d="M154 420 l 2 32 l -28 0 l -2 -26 z" />

              <line className="leader" x1="120" y1="42" x2="20" y2="42" />
              <circle className="dot" cx="120" cy="42" r="2.5" />
              <text className="fig-label" x="4" y="38">I.</text>

              <line className="leader" x1="120" y1="110" x2="20" y2="170" />
              <circle className="dot" cx="120" cy="110" r="2.5" />
              <text className="fig-label" x="4" y="168">II.</text>

              <line className="leader" x1="88" y1="200" x2="20" y2="300" />
              <circle className="dot" cx="88" cy="200" r="2.5" />
              <text className="fig-label" x="4" y="298">III.</text>

              <line className="leader" x1="152" y1="200" x2="220" y2="42" />
              <circle className="dot" cx="152" cy="200" r="2.5" />
              <text className="fig-label" x="222" y="38">IV.</text>

              <line className="leader" x1="120" y1="280" x2="220" y2="170" />
              <circle className="dot" cx="120" cy="280" r="2.5" />
              <text className="fig-label" x="222" y="168">V.</text>

              <line className="leader" x1="120" y1="380" x2="220" y2="300" />
              <circle className="dot" cx="120" cy="380" r="2.5" />
              <text className="fig-label" x="222" y="298">VI.</text>
            </svg>
            <div className="fig-caption">Fig. 1 — Studens vivax · ant. view · scale 1 : 1</div>
          </div>
        )}

        <div className="annotations-right">
          {rightAnnots.map((a, i) => (
            <div key={i} className="annot-item">
              <span className="annot-num">Fig. {a.num}.</span>
              <span className="annot-latin">{a.latin}</span>
              <div className="annot-title">{a.title}</div>
              <div className="annot-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="tabulae">
        {/* Tabula I — Skills & Competencies */}
        <div className="tabula">
          <h3>Tabula I — Competencies</h3>
          {p.skills.map((sk, i) => (
            <div key={i} className="tab-row">
              <span>{sk}</span>
              <span className="tab-val">verified</span>
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, letterSpacing: "0.14em", color: "color-mix(in oklab, currentColor 45%, transparent)", textTransform: "uppercase", marginBottom: 6 }}>Languages</div>
            {p.languages.map((l, i) => (
              <div key={i} className="tab-row"><span>{l}</span></div>
            ))}
          </div>
        </div>

        {/* Tabula II — Education & Awards */}
        <div className="tabula">
          <h3>Tabula II — Curriculum Vitae</h3>
          {p.education.map((ed, i) => (
            <div key={i} className="tab-item">
              <div className="ti-title">{ed.degree}</div>
              <div className="ti-sub">{ed.org} · {ed.time}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px solid currentColor" }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, letterSpacing: "0.14em", color: "color-mix(in oklab, currentColor 45%, transparent)", textTransform: "uppercase", marginBottom: 6 }}>Distinctions</div>
            {p.awards.map((a, i) => (
              <div key={i} className="tab-row">
                <span>{a.name}</span>
                <span className="tab-val">{a.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabula III — Research & Publications */}
        <div className="tabula">
          <h3>Tabula III — Publications</h3>
          {p.writing.map((w, i) => (
            <div key={i} className="tab-item">
              <div className="ti-title">{w.title}</div>
              <div className="ti-sub">{w.where} · {w.year}</div>
            </div>
          ))}
        </div>

        {/* Tabula IV — Testimonials */}
        <div className="tabula">
          <h3>Tabula IV — Observations</h3>
          {p.testimonials.map((t, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px dotted color-mix(in oklab, currentColor 12%, transparent)", fontStyle: "italic", fontSize: 12.5 }}>
              "{t.quote}"
              <div style={{ fontStyle: "normal", fontWeight: 600, fontSize: 11, marginTop: 6, color: "color-mix(in oklab, currentColor 50%, transparent)" }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="plate-foot">
        Printed for the candidate · {p.school} · {p.location} · 2026
        <div className="contact-36">{p.email} · {p.socials.join(" · ")}</div>
      </div>
    </div>
  </>);
}


/* ══════════════════════════════════════════════════════════════════
   T37 — Rx PRESCRIPTION  ·  medical
   Prescription pad — ℞ header, "medications" are projects/skills,
   dosage lines, signature block with Caveat font, refill/contact.
   ══════════════════════════════════════════════════════════════════ */

const T37R_CSS = `
.t37{ font-family: "IBM Plex Serif", Georgia, serif; background: #f8f6f0; color: #1a1610; min-height: 100%; font-size: 13.5px; line-height: 1.6; }
.t37.dark{ background: #110f0a; color: #e8e2d0; }

/* Pad wrapper */
.t37 .rx-pad{
  max-width: 720px; margin: 0 auto; padding: 0;
  background: #fff; min-height: 100%;
  box-shadow: inset 0 0 0 1px color-mix(in oklab, currentColor 10%, transparent);
  position: relative;
}
.t37.dark .rx-pad{ background: #1a1710; }

/* Security pattern border */
.t37 .rx-pad::before{
  content: ""; position: absolute; inset: 0; pointer-events: none;
  border: 8px solid transparent;
  border-image: repeating-linear-gradient(45deg, color-mix(in oklab, currentColor 6%, transparent) 0 4px, transparent 4px 8px) 8;
}

/* Header */
.t37 .rx-header{
  padding: 28px 36px 18px; border-bottom: 2px solid currentColor;
  display: grid; grid-template-columns: 1fr auto; gap: 16px;
}
.t37-mobile .rx-header{ padding: 22px 20px 14px; grid-template-columns: 1fr; }
.t37 .rx-header h1{
  font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: 18px;
  letter-spacing: 0.04em; margin: 0; line-height: 1.2;
}
.t37 .rx-header .rx-sub{
  font-size: 12px; color: color-mix(in oklab, currentColor 60%, transparent);
  margin-top: 4px; font-style: italic;
}
.t37 .rx-header .rx-lic{
  font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.7;
  text-align: right; color: color-mix(in oklab, currentColor 55%, transparent);
  letter-spacing: 0.04em;
}
.t37-mobile .rx-header .rx-lic{ text-align: left; }

/* Patient info */
.t37 .rx-patient{
  padding: 16px 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px;
  border-bottom: 1px solid color-mix(in oklab, currentColor 12%, transparent);
}
.t37-mobile .rx-patient{ padding: 14px 20px; grid-template-columns: 1fr; }
.t37 .rx-patient .f{
  display: flex; gap: 8px; font-size: 12.5px; padding: 4px 0;
  border-bottom: 1px dotted color-mix(in oklab, currentColor 15%, transparent);
}
.t37 .rx-patient .f b{
  font-weight: 700; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
  min-width: 80px; color: color-mix(in oklab, currentColor 55%, transparent);
  padding-top: 1px;
}

/* ℞ symbol */
.t37 .rx-block{
  padding: 20px 36px 10px; display: flex; gap: 16px; align-items: flex-start;
}
.t37-mobile .rx-block{ padding: 16px 20px 8px; }
.t37 .rx-sym{
  font-size: 56px; line-height: 1; font-weight: 700; color: #1b2a4a;
  font-family: "IBM Plex Serif", serif; flex-shrink: 0;
}
.t37.dark .rx-sym{ color: #7eb8ff; }
.t37 .rx-sig-text{
  font-style: italic; font-size: 14px; line-height: 1.7; max-width: 480px;
  padding-top: 6px;
}

/* Medication rows → projects / skills */
.t37 .rx-meds{ padding: 6px 36px 16px; }
.t37-mobile .rx-meds{ padding: 6px 20px 14px; }
.t37 .rx-meds .rx-meds-head{
  display: grid; grid-template-columns: 60px 1fr 80px 70px; gap: 8px;
  font-family: "IBM Plex Mono", monospace; font-size: 9.5px; letter-spacing: 0.14em;
  text-transform: uppercase; color: color-mix(in oklab, currentColor 45%, transparent);
  padding: 6px 0; border-bottom: 2px solid currentColor; font-weight: 600;
}
.t37-mobile .rx-meds .rx-meds-head{ grid-template-columns: 50px 1fr 60px; }
.t37 .rx-med-row{
  display: grid; grid-template-columns: 60px 1fr 80px 70px; gap: 8px;
  padding: 10px 0; border-bottom: 1px solid color-mix(in oklab, currentColor 8%, transparent);
  align-items: start;
}
.t37-mobile .rx-med-row{ grid-template-columns: 50px 1fr 60px; }
.t37 .rx-med-row .rx-num{
  font-family: "IBM Plex Mono", monospace; font-size: 10px;
  color: color-mix(in oklab, currentColor 45%, transparent); letter-spacing: 0.08em;
}
.t37 .rx-med-row .rx-name{ font-weight: 600; margin-bottom: 2px; }
.t37 .rx-med-row .rx-note{
  font-size: 11.5px; color: color-mix(in oklab, currentColor 55%, transparent);
  font-style: italic; line-height: 1.5;
}
.t37 .rx-med-row .rx-freq{
  font-family: "IBM Plex Mono", monospace; font-size: 10.5px;
  color: color-mix(in oklab, currentColor 60%, transparent);
}
.t37 .rx-med-row .rx-dose{
  font-family: "IBM Plex Mono", monospace; font-size: 11px; font-weight: 600;
  text-align: right;
}

/* Skills as additional meds */
.t37 .rx-skills{
  padding: 0 36px 16px;
}
.t37-mobile .rx-skills{ padding: 0 20px 14px; }
.t37 .rx-skills h4{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 8px;
  color: color-mix(in oklab, currentColor 50%, transparent);
  padding-top: 10px; border-top: 1px dashed color-mix(in oklab, currentColor 12%, transparent);
}
.t37 .rx-skill-grid{ display: flex; flex-wrap: wrap; gap: 6px; }
.t37 .rx-skill-tag{
  padding: 5px 12px; border: 1px solid color-mix(in oklab, currentColor 15%, transparent);
  border-radius: 3px; font-size: 12px; font-weight: 500;
  background: color-mix(in oklab, currentColor 2%, transparent);
}

/* Education & Awards */
.t37 .rx-sections{
  padding: 0 36px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}
.t37-mobile .rx-sections{ padding: 0 20px 14px; grid-template-columns: 1fr; }
.t37 .rx-sec h4{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 8px;
  color: color-mix(in oklab, currentColor 50%, transparent);
}
.t37 .rx-sec-item{
  padding: 5px 0; border-bottom: 1px dotted color-mix(in oklab, currentColor 10%, transparent);
  font-size: 12.5px;
}
.t37 .rx-sec-item b{ font-weight: 600; display: block; }
.t37 .rx-sec-item small{
  font-size: 11px; color: color-mix(in oklab, currentColor 50%, transparent);
}

/* Signature block */
.t37 .rx-sig-block{
  padding: 16px 36px 20px;
  border-top: 1px dashed color-mix(in oklab, currentColor 15%, transparent);
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.t37-mobile .rx-sig-block{ padding: 14px 20px; grid-template-columns: 1fr; }
.t37 .sig-line{
  border-bottom: 1.5px solid currentColor; height: 44px; position: relative; margin-bottom: 6px;
}
.t37 .sig-line .sig-written{
  position: absolute; bottom: 6px; left: 8px;
  font-family: "Caveat", "Patrick Hand", cursive; font-size: 28px;
  color: #1b2a4a; transform: rotate(-2deg);
}
.t37.dark .sig-line .sig-written{ color: #7eb8ff; }
.t37 .sig-meta{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.7;
  color: color-mix(in oklab, currentColor 55%, transparent);
}
.t37 .sig-meta b{
  font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: 12px;
  letter-spacing: 0.04em; text-transform: uppercase; display: block;
  color: currentColor;
}
.t37 .refill-box{
  border: 1.5px solid currentColor; padding: 14px 16px; border-radius: 4px;
}
.t37 .refill-box .ref-head{
  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px;
}
.t37 .refill-box .ref-row{
  font-size: 12px; padding: 3px 0; display: flex; gap: 8px;
}
.t37 .refill-box .ref-row b{
  font-weight: 600; min-width: 70px; font-size: 10px; text-transform: uppercase;
  letter-spacing: 0.04em; color: color-mix(in oklab, currentColor 55%, transparent);
}

/* Download button */
.t37 .rx-download{
  padding: 0 36px 24px; text-align: center;
}
.t37-mobile .rx-download{ padding: 0 20px 20px; }
.t37 .rx-download button{
  width: 100%; padding: 12px 24px; background: #1b2a4a; color: #fff;
  border: none; border-radius: 4px; cursor: pointer;
  font-family: "IBM Plex Mono", monospace; font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
}
.t37.dark .rx-download button{ background: #7eb8ff; color: #110f0a; }

/* Footer */
.t37 .rx-foot{
  text-align: center; padding: 14px 36px 24px;
  font-family: "IBM Plex Mono", monospace; font-size: 8.5px; letter-spacing: 0.14em;
  color: color-mix(in oklab, currentColor 35%, transparent); text-transform: uppercase;
  border-top: 1px solid color-mix(in oklab, currentColor 8%, transparent);
}
`;

function Tpl37Rx({ mode, dark }) {
  const p = PERSONAS.med;
  const mob = mode === "mobile";
  const freqs = ["Daily", "BID", "PRN", "QID", "Weekly", "Monthly"];

  return (<>
    <style>{T37R_CSS}</style>
    <div className={`t37 ${mob ? "t37-mobile" : ""} ${dark ? "dark" : ""}`}>
      <div className="rx-pad">

        <div className="rx-header">
          <div>
            <h1>folio · prescription pad</h1>
            <div className="rx-sub">Issued in good faith for {p.name} · Spring 2026</div>
          </div>
          <div className="rx-lic">
            DEA № EH-2026<br />
            NPI: candidate · self<br />
            Lic: {p.school}<br />
            Tel: {p.email}
          </div>
        </div>

        <div className="rx-patient">
          <div className="f"><b>Patient</b><span>{p.name}</span></div>
          <div className="f"><b>Year</b><span>5th yr · MD candidate</span></div>
          <div className="f"><b>Date</b><span>12 / V / 2026</span></div>
          <div className="f"><b>School</b><span>{p.school}</span></div>
          <div className="f"><b>Location</b><span>{p.location}</span></div>
          <div className="f"><b>Allergies</b><span>jargon · stale templates · pretentious tone</span></div>
        </div>

        <div className="rx-block">
          <div className="rx-sym">℞</div>
          <div className="rx-sig-text">
            <b>Sig:</b> Hire as junior medical / research candidate. {p.tagline} Take with morning coffee, repeat as needed until offer received.
          </div>
        </div>

        <div className="rx-meds">
          <div className="rx-meds-head">
            <span>Rx №</span>
            <span>Medication · Projects</span>
            <span>Frequency</span>
            {!mob && <span style={{ textAlign: "right" }}>Dose</span>}
          </div>
          {p.projects.map((pr, i) => (
            <div key={i} className="rx-med-row">
              <div className="rx-num">Rx-{String(i + 1).padStart(3, "0")}</div>
              <div>
                <div className="rx-name">{pr.title}</div>
                <div className="rx-note">{pr.note} · {pr.kind}, {pr.year}</div>
              </div>
              <div className="rx-freq">{freqs[i % freqs.length]}</div>
              {!mob && <div className="rx-dose">{["500mg", "250mg", "100mg", "PRN"][i % 4]}</div>}
            </div>
          ))}
        </div>

        <div className="rx-skills">
          <h4>Adjunct Therapies · Competencies</h4>
          <div className="rx-skill-grid">
            {p.skills.map((sk, i) => (
              <span key={i} className="rx-skill-tag">{sk}</span>
            ))}
          </div>
        </div>

        <div className="rx-sections">
          <div className="rx-sec">
            <h4>Medical History · Education</h4>
            {p.education.map((ed, i) => (
              <div key={i} className="rx-sec-item">
                <b>{ed.degree}</b>
                <small>{ed.org} · {ed.time}</small>
              </div>
            ))}
          </div>
          <div className="rx-sec">
            <h4>Prior Authorizations · Awards</h4>
            {p.awards.map((a, i) => (
              <div key={i} className="rx-sec-item">
                <b>{a.name}</b>
                <small>{a.year}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Research / Publications */}
        <div className="rx-meds" style={{ paddingTop: 0 }}>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "color-mix(in oklab, currentColor 50%, transparent)", paddingTop: 10, borderTop: "1px dashed color-mix(in oklab, currentColor 12%, transparent)", marginBottom: 8 }}>
            Supplemental · Research & Writing
          </div>
          {p.writing.map((w, i) => (
            <div key={i} className="rx-med-row">
              <div className="rx-num">Pub-{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="rx-name">{w.title}</div>
                <div className="rx-note">{w.where}</div>
              </div>
              <div className="rx-freq">{w.year}</div>
              {!mob && <div className="rx-dose">{w.where.includes("review") ? "Pending" : "✓"}</div>}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ padding: mob ? "0 20px 14px" : "0 36px 16px" }}>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "color-mix(in oklab, currentColor 50%, transparent)", paddingTop: 10, borderTop: "1px dashed color-mix(in oklab, currentColor 12%, transparent)", marginBottom: 8 }}>
            Consultant Notes
          </div>
          {p.testimonials.map((t, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px dotted color-mix(in oklab, currentColor 10%, transparent)", fontStyle: "italic", fontSize: 12.5 }}>
              "{t.quote}"
              <div style={{ fontStyle: "normal", fontWeight: 600, fontSize: 11, marginTop: 4, color: "color-mix(in oklab, currentColor 50%, transparent)" }}>— {t.author}</div>
            </div>
          ))}
        </div>

        <div className="rx-sig-block">
          <div>
            <div className="sig-line">
              <span className="sig-written">{p.name.split(" ").pop()}</span>
            </div>
            <div className="sig-meta">
              <b>{p.name}</b>
              {p.role} · {p.school}<br />
              {p.location} · {p.email}
            </div>
          </div>
          <div className="refill-box">
            <div className="ref-head">Refill · Contact Info</div>
            <div className="ref-row"><b>Email</b> {p.email}</div>
            <div className="ref-row"><b>Location</b> {p.location}</div>
            <div className="ref-row"><b>Languages</b> {p.languages.join(", ")}</div>
            <div className="ref-row"><b>Links</b> {p.socials.join(", ")}</div>
            <div className="ref-row"><b>Refills</b> unlimited — available immediately</div>
          </div>
        </div>

        <div className="rx-download">
          <button>↓ Download CV as PDF · 1 page</button>
        </div>

        <div className="rx-foot">
          folio.app · rx pad generated {new Date().toLocaleDateString("en-GB")} · this prescription is valid for 180 days · void where prohibited
        </div>

      </div>
    </div>
  </>);
}

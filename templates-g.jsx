/* global React, PERSONAS */

/* ─────────────────────────────────────────────────────────────────
   32 — LEGAL BRIEF  ·  law persona
   Signature: court filing — line-numbered margin, "IN THE MATTER OF",
              IRAC sections, citations, signature block.
   ───────────────────────────────────────────────────────────────── */
const T32_CSS = `
.t32{ font-family: "IBM Plex Serif", "Bookman Old Style", Georgia, serif; background: #f8f5ed; color: #1a1610; min-height: 100%; padding: 0; font-size: 14px; line-height: 1.7; }
.t32.dark{ background: #131009; color: #f0ebd8; }
.t32 .doc-32{ max-width: 760px; margin: 0 auto; padding: 36px 56px 60px; position: relative;
  background-image: linear-gradient(90deg, color-mix(in oklab, currentColor 22%, transparent) 0 1px, transparent 1px); background-size: 56px 100%; }
.t32-mobile .doc-32{ padding: 26px 44px 50px; background-size: 44px 100%; }
.t32 .doc-32::before{ content: ""; position: absolute; left: 50px; top: 0; bottom: 0; width: 1px; background: color-mix(in oklab, currentColor 22%, transparent); }
.t32-mobile .doc-32::before{ left: 38px; }
.t32 .line-margin{ position: absolute; left: 8px; width: 36px; top: 36px; bottom: 60px; font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 28px; text-align: right; color: color-mix(in oklab, currentColor 45%, transparent); padding-right: 10px; }
.t32-mobile .line-margin{ left: 4px; width: 30px; }
.t32 .doc-32 > *{ position: relative; }
.t32 h1{ font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: clamp(22px, 3vw, 30px); letter-spacing: 0.04em; text-align: center; text-transform: uppercase; margin: 0 0 8px; line-height: 1.2; }
.t32 .case{ text-align: center; font-family: "IBM Plex Serif", serif; font-size: 14px; line-height: 1.6; letter-spacing: 0.04em; margin-bottom: 28px; padding-bottom: 18px; border-bottom: 1.5px solid currentColor; }
.t32 .case .court{ font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .65; margin-bottom: 12px; }
.t32 .case .v{ font-style: italic; opacity: .8; }
.t32 .docket{ font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: 0.06em; text-align: center; display: flex; justify-content: space-between; padding: 0 0 18px; opacity: .75; flex-wrap: wrap; gap: 8px; }
.t32 h2{ font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: 14px; letter-spacing: 0.18em; text-transform: uppercase; margin: 28px 0 10px; }
.t32 h2 .n{ display: inline-block; min-width: 24px; opacity: .65; }
.t32 h3{ font-family: "IBM Plex Serif", serif; font-style: italic; font-weight: 700; font-size: 15px; margin: 14px 0 6px; }
.t32 p{ margin: 0 0 12px; max-width: 620px; }
.t32 p.indent{ text-indent: 32px; }
.t32 p .cite{ font-style: italic; }
.t32 .holding{ background: color-mix(in oklab, currentColor 4%, transparent); border-left: 3px solid currentColor; padding: 10px 16px; margin: 14px 0; font-style: italic; max-width: 620px; }
.t32 .holding b{ font-style: normal; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; font-size: 11px; display: block; margin-bottom: 4px; opacity: .65; }
.t32 .signature{ margin-top: 32px; padding-top: 18px; border-top: 1.5px solid currentColor; max-width: 360px; }
.t32 .signature .sig-line{ border-bottom: 1px solid currentColor; height: 36px; margin-bottom: 8px; position: relative; }
.t32 .signature .sig-line::after{ content: "/s/"; position: absolute; bottom: 10px; left: 4px; font-family: "Caveat", "IBM Plex Serif", serif; font-style: italic; font-size: 22px; opacity: .85; }
.t32 .signature .sig-meta{ font-family: "IBM Plex Mono", monospace; font-size: 11px; line-height: 1.7; }
.t32 .signature .sig-meta b{ font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; display: block; font-style: normal; }
.t32 .exhibit{ border: 1.5px solid currentColor; padding: 14px 16px; margin: 14px 0; max-width: 620px; }
.t32 .exhibit .lbl-ex{ font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-bottom: 6px; }
.t32 .exhibit b{ font-weight: 700; }
.t32 .stamp-32{ position: absolute; top: 90px; right: 50px; border: 2.5px solid #5a2a2a; color: #5a2a2a; padding: 6px 14px; transform: rotate(-8deg); font-family: "IBM Plex Mono", monospace; font-weight: 700; letter-spacing: 0.2em; font-size: 12px; text-transform: uppercase; }
.t32.dark .stamp-32{ color: #c64c4c; border-color: #c64c4c; }
.t32-mobile .stamp-32{ position: static; display: inline-block; transform: rotate(-6deg); margin: 8px 0; }
.t32 .footer-32{ font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; text-align: center; margin-top: 24px; padding-top: 14px; border-top: 1px solid currentColor; }
`;
function Tpl32LegalBrief({ mode, dark }) {
  const p = PERSONAS.law;
  // build line numbers based on rough content length
  return (<>
    <style>{T32_CSS}</style>
    <div className={`t32 ${mode === 'mobile' ? 't32-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="doc-32">
        <div className="line-margin">{Array.from({length: 80}, (_, i) => (<div key={i}>{i+1}</div>))}</div>

        <div className="case">
          <div className="court">In the Faculty of Law · {p.school}</div>
          <h1>Brief of {p.name}</h1>
          <div className="v">— Curriculum Vitae and Selected Filings —</div>
        </div>

        <div className="docket">
          <span>Docket № EK-2026 / 014</span><span>Submitted: 12 May 2026</span><span>Filed: in earnest</span>
        </div>

        <div className="stamp-32">FILED · 2026</div>

        <h2><span className="n">I.</span> Statement of the Candidate</h2>
        <p className="indent"><b>{p.name}</b> respectfully submits this brief in support of the proposition that {p.tagline.replace(/\.$/, "")}. {p.name.split(" ")[0]} is a {p.role.toLowerCase()} student at {p.school}, currently in {p.location}, and seeks summer associate or fellowship positions for 2026.</p>
        <p className="indent">The undersigned offers, in support, the following record of work, study, and service.</p>

        <h2><span className="n">II.</span> Statement of Facts</h2>
        <p className="indent">From 2023 to the present, the candidate has pursued the LL.B. at the Faculty of Law, {p.school}, while serving the legal aid clinic and competing in international moot court. Each filing below is described in chronological order, with brief disposition.</p>

        <h2><span className="n">III.</span> Selected Filings · Projects ({p.projects.length})</h2>
        {p.projects.map((pr, i) => (
          <div key={i} style={{ paddingLeft: 0 }}>
            <h3>{String.fromCharCode(65 + i)}. {pr.title}, {pr.year}.</h3>
            <p><span className="cite">{pr.kind}.</span> {pr.note}</p>
          </div>
        ))}

        <h2><span className="n">IV.</span> Record of Practice · Experience</h2>
        {p.experience.map((e, i) => (
          <div key={i}>
            <h3>{i+1}. {e.role}, {e.org} ({e.time}).</h3>
            <p>{e.note}</p>
          </div>
        ))}

        <h2><span className="n">V.</span> Education and Credentials</h2>
        {p.education.map((e, i) => (
          <p key={i} className="indent"><b>({i+1})</b> <span className="cite">{e.degree}</span>, {e.org}, {e.time}.</p>
        ))}

        <h2><span className="n">VI.</span> Distinctions Awarded</h2>
        {p.awards.map((a, i) => (
          <p key={i} className="indent"><b>({String.fromCharCode(97 + i)})</b> {a.name}, {a.year}.</p>
        ))}

        <h2><span className="n">VII.</span> Languages and Authorities</h2>
        <p className="indent"><b>Languages:</b> {p.languages.join("; ")}.</p>
        <p className="indent"><b>Subject-matter authorities:</b> {p.skills.join("; ")}.</p>

        <h2><span className="n">VIII.</span> Holding · Reference</h2>
        <div className="holding">
          <b>Per supervisor:</b>
          "{p.testimonials[0].quote}"
          <div style={{ fontStyle: 'normal', fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, opacity: .65, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>— {p.testimonials[0].author}</div>
        </div>

        <h2><span className="n">IX.</span> Currently Pending · On the Desk</h2>
        {p.now.map((n, i) => (
          <p key={i} className="indent"><b>({i+1})</b> {n}.</p>
        ))}

        <h2><span className="n">X.</span> Prayer for Relief</h2>
        <p className="indent">WHEREFORE the candidate respectfully prays that the reviewing party consider the foregoing record in support of the candidate's application, and that the parties may, in due course, schedule an interview at the earliest convenience.</p>
        <p style={{ textAlign: 'right', fontStyle: 'italic', maxWidth: '100%' }}>Respectfully submitted,</p>

        <div className="signature">
          <div className="sig-line"></div>
          <div className="sig-meta">
            <b>{p.name}</b>
            <span>Candidate · {p.role}</span><br/>
            <span>{p.school}</span><br/>
            <span>{p.email}</span><br/>
            <span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span>
          </div>
        </div>

        <div className="footer-32">End of brief · 12 May 2026 · {p.location}</div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   33 — OFFICIAL GAZETTE  ·  law / politics
   Signature: government printing-office publication style. Numbered articles,
              hairline rules, formal serif headers, masthead seal.
   ───────────────────────────────────────────────────────────────── */
const T33_CSS = `
.t33{ font-family: "EB Garamond", "IBM Plex Serif", Georgia, serif; background: #f0eddf; color: #1a1610; min-height: 100%; padding: 0; font-size: 14px; line-height: 1.6; }
.t33.dark{ background: #131009; color: #ece6cc; }
.t33 .masthead-33{ padding: 32px 28px 18px; text-align: center; border-bottom: 4px double currentColor; }
.t33-mobile .masthead-33{ padding: 22px 18px 14px; }
.t33 .masthead-33 .seal{ width: 60px; height: 60px; margin: 0 auto 14px; border: 2px solid currentColor; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 28px; position: relative; }
.t33 .masthead-33 .seal::before{ content: ""; position: absolute; inset: -8px; border: 1px dashed currentColor; border-radius: 999px; opacity: .55; }
.t33 .masthead-33 .seal::after{ content: ""; position: absolute; inset: 6px; border: 1px solid currentColor; border-radius: 999px; opacity: .65; }
.t33 .masthead-33 .country{ font-family: "EB Garamond", serif; font-weight: 700; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; opacity: .85; margin-bottom: 2px; }
.t33 .masthead-33 h1{ font-family: "EB Garamond", serif; font-weight: 700; font-size: clamp(32px, 5vw, 60px); line-height: 1; letter-spacing: 0.01em; margin: 4px 0 6px; font-style: italic; }
.t33 .masthead-33 h1 em{ font-style: normal; }
.t33 .masthead-33 .strap{ font-family: "EB Garamond", serif; font-style: italic; font-size: 14px; opacity: .8; }
.t33 .vol-row{ font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; display: flex; justify-content: space-between; padding: 10px 28px; border-bottom: 1.5px solid currentColor; opacity: .75; flex-wrap: wrap; gap: 8px; }
.t33 .body-33{ padding: 24px 28px; max-width: 780px; margin: 0 auto; }
.t33-mobile .body-33{ padding: 20px 18px; }
.t33 .preamble{ font-family: "EB Garamond", serif; font-style: italic; font-size: 18px; line-height: 1.5; max-width: 640px; margin: 0 auto 28px; text-align: center; padding-bottom: 18px; border-bottom: 1px solid currentColor; }
.t33 .preamble::before{ content: "“"; font-size: 32px; line-height: 0; vertical-align: -0.2em; margin-right: 4px; opacity: .65; }
.t33 .article{ margin-bottom: 26px; }
.t33 .article h2{ font-family: "EB Garamond", serif; font-weight: 700; font-size: 14px; letter-spacing: 0.18em; text-transform: uppercase; text-align: center; margin: 0 0 12px; padding-bottom: 6px; border-bottom: 1px solid currentColor; }
.t33 .article h2 small{ display: block; font-weight: 400; font-style: italic; font-size: 12px; letter-spacing: 0; text-transform: none; opacity: .65; margin-top: 4px; }
.t33 .clause{ display: grid; grid-template-columns: 70px 1fr; gap: 14px; padding: 8px 0; border-bottom: 1px dashed color-mix(in oklab, currentColor 25%, transparent); align-items: baseline; }
.t33 .clause:last-child{ border-bottom: 0; }
.t33 .clause .n-33{ font-family: "EB Garamond", serif; font-weight: 700; font-size: 14px; text-align: center; }
.t33 .clause .a-33{ font-size: 14px; }
.t33 .clause .a-33 b{ font-weight: 700; }
.t33 .clause .a-33 small{ display: block; opacity: .65; font-size: 12px; font-style: italic; margin-top: 2px; }
.t33 .seal-cite{ display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1.5px solid currentColor; margin: 18px 0; max-width: 640px; }
.t33 .seal-cite .mini-seal{ width: 44px; height: 44px; border: 1.5px solid currentColor; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 16px; flex-shrink: 0; }
.t33 .seal-cite p{ margin: 0; font-style: italic; font-size: 14px; line-height: 1.45; }
.t33 .seal-cite p cite{ display: block; font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; margin-top: 6px; }
.t33 .sig-foot{ display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 32px; padding-top: 20px; border-top: 4px double currentColor; }
.t33-mobile .sig-foot{ grid-template-columns: 1fr; gap: 18px; }
.t33 .sig-foot .col{ text-align: center; }
.t33 .sig-foot .sig-line-33{ border-bottom: 1px solid currentColor; height: 30px; margin-bottom: 8px; position: relative; }
.t33 .sig-foot .sig-line-33::after{ content: "/s/"; position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); font-family: "Caveat", "EB Garamond", serif; font-style: italic; font-size: 22px; opacity: .85; }
.t33 .sig-foot small{ font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: .65; display: block; margin-top: 4px; }
.t33 .sig-foot b{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 16px; }
.t33 .gazette-foot{ padding: 16px 28px; font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .65; border-top: 1px solid currentColor; }
`;
function Tpl33Gazette({ mode, dark }) {
  const p = PERSONAS.law;
  return (<>
    <style>{T33_CSS}</style>
    <div className={`t33 ${mode === 'mobile' ? 't33-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <header className="masthead-33">
        <div className="seal">{p.name.split(" ").map(n=>n[0]).join("")}</div>
        <div className="country">Republic of Curriculum</div>
        <h1>The Official <em>Gazette</em> of {p.name.split(" ")[0]}</h1>
        <div className="strap">Published in good faith from {p.location} · Volume III · No. IV</div>
      </header>
      <div className="vol-row"><span>Series II · 2026</span><span>By authority of the candidate</span><span>Filed: 12 May 2026</span></div>

      <div className="body-33">
        <p className="preamble">Be it known that {p.name}, a candidate at {p.school}, hereby publishes the following record of work, study, and service — for inspection by parties of interest."</p>

        <article className="article">
          <h2>Article I. Of the Candidate <small>identity · status · jurisdiction</small></h2>
          <div className="clause"><span className="n-33">§ 1</span><div className="a-33"><b>Name.</b> {p.name}<small>({p.pronouns})</small></div></div>
          <div className="clause"><span className="n-33">§ 2</span><div className="a-33"><b>Subject of study.</b> {p.role}, {p.faculty}, {p.school}.</div></div>
          <div className="clause"><span className="n-33">§ 3</span><div className="a-33"><b>Seat of practice.</b> {p.location}.</div></div>
          <div className="clause"><span className="n-33">§ 4</span><div className="a-33"><b>Statement.</b> <i>"{p.tagline}"</i></div></div>
        </article>

        <article className="article">
          <h2>Article II. Of Works Published <small>projects · {p.projects.length} entries</small></h2>
          {p.projects.map((pr, i) => (
            <div className="clause" key={i}>
              <span className="n-33">§ {i+1}</span>
              <div className="a-33"><b>{pr.title}.</b> {pr.kind}, {pr.year}.<small>{pr.note}</small></div>
            </div>
          ))}
        </article>

        <article className="article">
          <h2>Article III. Of Service Rendered <small>experience</small></h2>
          {p.experience.map((e, i) => (
            <div className="clause" key={i}>
              <span className="n-33">§ {i+1}</span>
              <div className="a-33"><b>{e.role}</b>, {e.org}, {e.time}.<small>{e.note}</small></div>
            </div>
          ))}
        </article>

        <article className="article">
          <h2>Article IV. Of Instruction Received <small>education</small></h2>
          {p.education.map((e, i) => (
            <div className="clause" key={i}>
              <span className="n-33">§ {i+1}</span>
              <div className="a-33"><b>{e.degree}</b>, {e.org}, {e.time}.</div>
            </div>
          ))}
        </article>

        <article className="article">
          <h2>Article V. Of Honours Conferred <small>awards · distinctions</small></h2>
          {p.awards.map((a, i) => (
            <div className="clause" key={i}>
              <span className="n-33">§ {i+1}</span>
              <div className="a-33"><b>{a.name}</b>, conferred in {a.year}.</div>
            </div>
          ))}
        </article>

        <div className="seal-cite">
          <div className="mini-seal">SI</div>
          <p>"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}, on the record</cite></p>
        </div>

        <article className="article">
          <h2>Article VI. Of Languages and Practice <small>capacities</small></h2>
          <div className="clause"><span className="n-33">§ 1</span><div className="a-33"><b>Languages spoken.</b> {p.languages.join("; ")}.</div></div>
          <div className="clause"><span className="n-33">§ 2</span><div className="a-33"><b>Authorities of practice.</b> {p.skills.join("; ")}.</div></div>
        </article>

        <article className="article">
          <h2>Article VII. Of Matters Currently Pending <small>desk · ongoing</small></h2>
          {p.now.map((n, i) => (
            <div className="clause" key={i}>
              <span className="n-33">§ {i+1}</span>
              <div className="a-33">{n}.</div>
            </div>
          ))}
        </article>

        <div className="sig-foot">
          <div className="col">
            <div className="sig-line-33"></div>
            <b>{p.name}</b>
            <small>Candidate</small>
          </div>
          <div className="col">
            <div className="sig-line-33"></div>
            <b>Witnessed</b>
            <small>By the office of folio</small>
          </div>
        </div>
      </div>

      <div className="gazette-foot"><span>Printed digitally · portfolio-cv.online</span><span>End of issue</span><span>{p.email}</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   34 — HEARING RECORD  ·  law / politics
   Signature: court transcript — Q/A format, line-numbered, exhibit markers.
   ───────────────────────────────────────────────────────────────── */
const T34_CSS = `
.t34{ font-family: "IBM Plex Mono", monospace; background: #fafaf6; color: #1a1610; min-height: 100%; padding: 0; font-size: 13px; line-height: 1.75; }
.t34.dark{ background: #0e0c08; color: #ece6cc; }
.t34 .head-34{ padding: 22px 28px 18px; border-bottom: 2px solid currentColor; }
.t34 .head-34 .doc-no{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; }
.t34 .head-34 h1{ font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: clamp(22px, 3vw, 32px); margin: 8px 0 6px; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.1; }
.t34 .head-34 .case-34{ font-size: 12px; opacity: .8; line-height: 1.6; }
.t34 .head-34 .case-34 b{ font-weight: 700; }
.t34 .head-34 .meta-34{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 14px; font-size: 11px; }
.t34-mobile .head-34 .meta-34{ grid-template-columns: repeat(2, 1fr); }
.t34 .head-34 .meta-34 b{ display: block; opacity: .55; letter-spacing: 0.1em; text-transform: uppercase; font-size: 9px; margin-bottom: 2px; }
.t34 .transcript{ padding: 18px 28px 30px; max-width: 820px; margin: 0 auto; position: relative; }
.t34-mobile .transcript{ padding: 14px 18px; }
.t34 .line-no{ position: absolute; left: 6px; top: 18px; bottom: 0; width: 30px; font-size: 10px; line-height: 22.75px; text-align: right; padding-right: 10px; color: color-mix(in oklab, currentColor 45%, transparent); border-right: 1px solid color-mix(in oklab, currentColor 22%, transparent); }
.t34-mobile .line-no{ display: none; }
.t34 .transcript-body{ margin-left: 36px; }
.t34-mobile .transcript-body{ margin-left: 0; }
.t34 .scene{ font-style: italic; opacity: .55; font-size: 11px; text-align: center; padding: 6px 0 18px; letter-spacing: 0.04em; }
.t34 .speaker{ display: grid; grid-template-columns: 100px 1fr; gap: 12px; padding: 4px 0; }
.t34-mobile .speaker{ grid-template-columns: 70px 1fr; gap: 6px; font-size: 12px; }
.t34 .speaker .sp{ font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; font-size: 11px; opacity: .85; padding-top: 4px; }
.t34 .speaker .sp.q{ color: currentColor; }
.t34 .speaker .sp.a{ color: #5a2a2a; }
.t34.dark .speaker .sp.a{ color: #ff8a6c; }
.t34 .speaker .sp.crt{ color: currentColor; font-style: italic; }
.t34 .speaker p{ margin: 0; }
.t34 .exhibit-34{ border: 2px solid currentColor; padding: 14px 16px; margin: 20px 0; background: color-mix(in oklab, currentColor 4%, transparent); }
.t34 .exhibit-34 .ex-lbl{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-bottom: 6px; }
.t34 .exhibit-34 h3{ font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 13px; margin: 0 0 6px; letter-spacing: -0.005em; text-transform: uppercase; }
.t34 .exhibit-34 .rows-ex{ font-size: 12px; line-height: 1.6; }
.t34 .exhibit-34 .rows-ex .r{ display: grid; grid-template-columns: 80px 1fr 80px; gap: 12px; padding: 4px 0; border-bottom: 1px dashed color-mix(in oklab, currentColor 22%, transparent); align-items: baseline; }
.t34-mobile .exhibit-34 .rows-ex .r{ grid-template-columns: 70px 1fr; }
.t34-mobile .exhibit-34 .rows-ex .r .yr-ex{ display: none; }
.t34 .exhibit-34 .rows-ex .r:last-child{ border-bottom: 0; }
.t34 .exhibit-34 .rows-ex .r b{ font-weight: 700; }
.t34 .exhibit-34 .rows-ex .r .y-ex{ opacity: .55; font-size: 10px; letter-spacing: 0.08em; }
.t34 .stamp-34{ display: inline-block; border: 2.5px solid #5a2a2a; color: #5a2a2a; padding: 4px 14px; transform: rotate(-4deg); font-weight: 700; letter-spacing: 0.18em; font-size: 11px; text-transform: uppercase; margin-top: 6px; }
.t34.dark .stamp-34{ color: #ff8a6c; border-color: #ff8a6c; }
.t34 .cert-34{ margin-top: 32px; padding: 18px 22px; border: 2px solid currentColor; font-size: 12px; line-height: 1.6; }
.t34 .cert-34 b{ font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; opacity: .7; }
.t34 .cert-34 .sig-row{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 12px; }
.t34-mobile .cert-34 .sig-row{ grid-template-columns: 1fr; }
.t34 .cert-34 .sig-row .sl{ border-bottom: 1px solid currentColor; height: 24px; margin-bottom: 4px; position: relative; }
.t34 .cert-34 .sig-row .sl::after{ content: "/s/"; position: absolute; bottom: 4px; left: 4px; font-family: "Caveat", "IBM Plex Serif", serif; font-style: italic; font-size: 18px; opacity: .85; }
`;
function Tpl34Transcript({ mode, dark }) {
  const p = PERSONAS.law;
  return (<>
    <style>{T34_CSS}</style>
    <div className={`t34 ${mode === 'mobile' ? 't34-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="head-34">
        <div className="doc-no">DOC № EK-2026 · TRANSCRIPT OF RECORD</div>
        <h1>Hearing on the Curriculum Vitae of {p.name}</h1>
        <div className="case-34"><b>In the matter of:</b> Application for summer fellowship · 2026<br/><b>Before:</b> the reviewing committee · {p.school} · Faculty of Law</div>
        <div className="meta-34">
          <div><b>Date</b>12 May 2026</div>
          <div><b>Venue</b>{p.location}</div>
          <div><b>Recorder</b>{p.name.split(" ").map(n=>n[0]).join(".")}.</div>
          <div><b>Pages</b>1 of 1</div>
        </div>
      </div>

      <div className="transcript">
        <div className="line-no">{Array.from({length: 70}, (_, i) => (<div key={i}>{String(i+1).padStart(2, "0")}</div>))}</div>

        <div className="transcript-body">
          <div className="scene">— THE PROCEEDINGS HAVING COMMENCED, AT 14:22 —</div>

          <div className="speaker"><span className="sp crt">THE CHAIR:</span><p>The committee will please come to order. The matter before us is the application of the candidate, present here. We will proceed with the formal record.</p></div>
          <div className="speaker"><span className="sp q">Q.</span><p>Please state your full name and current programme for the record.</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>{p.name}. I am a {p.role.toLowerCase()} candidate at {p.school}, presently based in {p.location}.</p></div>

          <div className="speaker"><span className="sp q">Q.</span><p>And in plain language — what brings you here today?</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>{p.tagline} I am applying for a summer fellowship and wish to put on the record the work, the practice, and the references that support this application.</p></div>

          <div className="exhibit-34">
            <div className="ex-lbl">Exhibit A · Selected Filings</div>
            <h3>Projects on the record</h3>
            <div className="rows-ex">
              {p.projects.map((pr, i) => (
                <div className="r" key={i}><span>EX-A-{String(i+1).padStart(2,"0")}</span><span><b>{pr.title}</b> — {pr.note}</span><span className="y-ex yr-ex">{pr.year}</span></div>
              ))}
            </div>
          </div>

          <div className="speaker"><span className="sp q">Q.</span><p>Have you held positions, either in practice or in service, that the committee should consider?</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>Yes. Exhibit B sets out the record in chronological order. The most recent is the internship at Boga & Associates, in the commercial litigation team.</p></div>

          <div className="exhibit-34">
            <div className="ex-lbl">Exhibit B · Record of Practice</div>
            <h3>Experience</h3>
            <div className="rows-ex">
              {p.experience.map((e, i) => (
                <div className="r" key={i}><span>EX-B-{String(i+1).padStart(2,"0")}</span><span><b>{e.role}</b>, {e.org} — {e.note}</span><span className="y-ex yr-ex">{e.time}</span></div>
              ))}
            </div>
          </div>

          <div className="speaker"><span className="sp q">Q.</span><p>And on the question of education — and any distinctions awarded?</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>Exhibit C, the academic record. Exhibit D, distinctions and prizes received in the course of the LL.B.</p></div>

          <div className="exhibit-34">
            <div className="ex-lbl">Exhibit C / D · Education & Honours</div>
            <h3>Combined record</h3>
            <div className="rows-ex">
              {[...p.education.map(e=>({lbl: 'EDU', a: `${e.degree}, ${e.org}`, y: e.time})), ...p.awards.map(a=>({lbl: 'AWD', a: a.name, y: a.year}))].map((it, i) => (
                <div className="r" key={i}><span>{it.lbl}-{String(i+1).padStart(2,"0")}</span><span><b>{it.a}</b></span><span className="y-ex yr-ex">{it.y}</span></div>
              ))}
            </div>
          </div>

          <div className="speaker"><span className="sp q">Q.</span><p>Reference. Will the committee hear from your supervisor?</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>Yes. The undersigned references the following statement of record, by Professor A. Krasniqi.</p></div>
          <div className="speaker"><span className="sp crt">REFERENCE:</span><p style={{ fontStyle: 'italic' }}>"{p.testimonials[0].quote}" — {p.testimonials[0].author}.</p></div>

          <div className="speaker"><span className="sp q">Q.</span><p>Anything currently pending on your desk that the committee should know of?</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>{p.now.map((n, i) => `(${i+1}) ${n.toLowerCase()}`).join(", ")}.</p></div>

          <div className="speaker"><span className="sp q">Q.</span><p>Languages — for the record.</p></div>
          <div className="speaker"><span className="sp a">A.</span><p>{p.languages.join("; ")}.</p></div>

          <div className="speaker"><span className="sp crt">THE CHAIR:</span><p>The record so reflects. The committee will deliberate. The candidate is excused, with thanks.</p></div>

          <div className="scene">— PROCEEDINGS CONCLUDED, AT 14:48 —</div>

          <div className="stamp-34">★ ENTERED ON THE RECORD ★</div>

          <div className="cert-34">
            <b>Certificate of Recorder</b>
            <p style={{ margin: '8px 0 0' }}>I, the undersigned, certify that the foregoing transcript is a true and faithful record of the proceedings of the date and venue above, to the best of my ability, taken from the candidate's filings.</p>
            <div className="sig-row">
              <div><div className="sl"></div><b style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, textTransform: 'uppercase' }}>{p.name}</b><br/><span style={{ opacity: .65, fontSize: 11 }}>{p.email}</span></div>
              <div><div className="sl"></div><b style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, textTransform: 'uppercase' }}>portfolio-cv.online</b><br/><span style={{ opacity: .65, fontSize: 11 }}>filed in earnest</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   35 — PATIENT CHART  ·  medical persona
   Signature: hospital chart — vitals row, allergies banner, problem list,
              medication table, plan section, signature block.
   ───────────────────────────────────────────────────────────────── */
const T35_CSS = `
.t35{ font-family: "Inter", "IBM Plex Sans", sans-serif; background: #f0f4f8; color: #14181f; min-height: 100%; padding: 0; font-size: 13px; line-height: 1.5; }
.t35.dark{ background: #0d1117; color: #e6e9ef; }
.t35 .chart{ background: #fff; max-width: 920px; margin: 0 auto; box-shadow: 0 8px 32px rgba(0,0,0,.08); }
.t35.dark .chart{ background: #161b22; }
.t35 .chart-head{ padding: 14px 20px; background: #2d5e8a; color: #fff; display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: center; }
.t35.dark .chart-head{ background: #1c3b5a; }
.t35-mobile .chart-head{ grid-template-columns: 1fr; }
.t35 .chart-head .pid{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .8; }
.t35 .chart-head h1{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 22px; letter-spacing: -0.015em; margin: 4px 0 2px; line-height: 1.1; }
.t35 .chart-head .meta-h{ font-size: 11px; opacity: .85; }
.t35 .chart-head .actions-h{ display: flex; gap: 6px; }
.t35 .chart-head .actions-h .btn-h{ background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18); color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 11px; }
.t35 .allergies{ background: #ffeaea; color: #8a1c1c; padding: 8px 20px; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.06em; border-bottom: 1px solid #d8b8b8; display: flex; gap: 10px; align-items: center; }
.t35.dark .allergies{ background: #2a1010; color: #ffa8a8; border-color: #5a2a2a; }
.t35 .allergies::before{ content: "⚠"; font-size: 16px; }
.t35 .vitals{ display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; border-bottom: 1px solid #d8dde3; }
.t35-mobile .vitals{ grid-template-columns: repeat(3, 1fr); }
.t35.dark .vitals{ border-color: #30363d; }
.t35 .vitals > div{ padding: 10px 14px; border-right: 1px solid #d8dde3; }
.t35 .vitals > div:nth-child(6n){ border-right: 0; }
.t35.dark .vitals > div{ border-color: #30363d; }
.t35-mobile .vitals > div:nth-child(3n){ border-right: 0; }
.t35 .vitals .lbl-v{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: #6b7280; margin-bottom: 4px; }
.t35.dark .vitals .lbl-v{ color: #8a93a3; }
.t35 .vitals .v-v{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 18px; letter-spacing: -0.02em; line-height: 1; }
.t35 .vitals .v-v small{ font-weight: 400; font-size: 10px; color: #6b7280; margin-left: 2px; }
.t35 .vitals .v-v.hi{ color: #c44a1f; }
.t35 .vitals .v-v.lo{ color: #2d5e8a; }
.t35 .vitals .v-v.ok{ color: #2d8a4f; }
.t35 .body-35{ display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #d8dde3; }
.t35.dark .body-35{ border-color: #30363d; }
.t35-mobile .body-35{ grid-template-columns: 1fr; }
.t35 .panel{ padding: 16px 20px; border-right: 1px solid #d8dde3; min-height: 200px; }
.t35.dark .panel{ border-color: #30363d; }
.t35 .panel:last-child{ border-right: 0; }
.t35-mobile .panel{ border-right: 0; border-bottom: 1px solid #d8dde3; }
.t35 .panel h2{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #2d5e8a; margin: 0 0 12px; padding-bottom: 4px; border-bottom: 2px solid #2d5e8a; display: flex; justify-content: space-between; align-items: baseline; }
.t35.dark .panel h2{ color: #6da8d8; border-color: #6da8d8; }
.t35 .panel h2 small{ font-weight: 400; opacity: .7; letter-spacing: 0.04em; text-transform: none; color: #6b7280; font-family: "JetBrains Mono", monospace; }
.t35 .pr-list{ font-size: 13px; line-height: 1.55; }
.t35 .pr-list .pr-row{ display: grid; grid-template-columns: 22px 1fr auto; gap: 8px; padding: 5px 0; border-bottom: 1px dashed #d8dde3; align-items: baseline; }
.t35.dark .pr-list .pr-row{ border-color: #30363d; }
.t35 .pr-list .pr-row:last-child{ border-bottom: 0; }
.t35 .pr-list .pr-row .n-pr{ font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b7280; }
.t35 .pr-list .pr-row b{ font-weight: 600; }
.t35 .pr-list .pr-row small{ display: block; color: #6b7280; font-size: 12px; }
.t35 .pr-list .pr-row .yr-pr{ font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b7280; }
.t35 .pr-list .pr-row .status{ display: inline-block; font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.08em; padding: 1px 6px; border-radius: 3px; text-transform: uppercase; }
.t35 .pr-list .pr-row .status.active{ background: #e8f4ed; color: #2d8a4f; }
.t35.dark .pr-list .pr-row .status.active{ background: rgba(45,138,79,.18); color: #6df5a4; }
.t35 .pr-list .pr-row .status.resolved{ background: #f0f0f0; color: #6b7280; }
.t35.dark .pr-list .pr-row .status.resolved{ background: rgba(255,255,255,.06); color: #8a93a3; }
.t35 .med-table{ width: 100%; border-collapse: collapse; font-size: 12px; }
.t35 .med-table th{ text-align: left; font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; padding: 4px 8px; border-bottom: 1px solid #d8dde3; font-weight: 500; }
.t35.dark .med-table th{ border-color: #30363d; }
.t35 .med-table td{ padding: 6px 8px; border-bottom: 1px solid #f0f0f0; }
.t35.dark .med-table td{ border-color: #21262d; }
.t35 .med-table td b{ font-weight: 600; }
.t35 .plan-35{ padding: 14px 20px; font-size: 13px; line-height: 1.6; border-bottom: 1px solid #d8dde3; }
.t35.dark .plan-35{ border-color: #30363d; }
.t35 .plan-35 h2{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #2d5e8a; margin: 0 0 8px; }
.t35.dark .plan-35 h2{ color: #6da8d8; }
.t35 .plan-35 ol{ padding-left: 20px; margin: 0; }
.t35 .plan-35 ol li{ padding: 4px 0; }
.t35 .quote-35{ padding: 16px 20px; background: #f0f4f8; border-bottom: 1px solid #d8dde3; }
.t35.dark .quote-35{ background: #1c2128; border-color: #30363d; }
.t35 .quote-35 .lbl-q{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: #6b7280; margin-bottom: 4px; }
.t35 .quote-35 .q-q{ font-family: "Inter", sans-serif; font-style: italic; font-size: 14px; line-height: 1.45; }
.t35 .quote-35 small{ font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b7280; margin-top: 6px; display: block; }
.t35 .sig-35{ padding: 14px 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 11px; }
.t35-mobile .sig-35{ grid-template-columns: 1fr; gap: 14px; }
.t35 .sig-35 .col{ }
.t35 .sig-35 .sig-l{ border-bottom: 1px solid currentColor; height: 30px; margin-bottom: 6px; position: relative; }
.t35 .sig-35 .sig-l::after{ content: "Era H."; position: absolute; bottom: 6px; left: 4px; font-family: "Caveat", "Inter", serif; font-style: italic; font-size: 20px; opacity: .85; }
.t35 .sig-35 b{ font-weight: 600; }
.t35 .sig-35 small{ display: block; color: #6b7280; font-family: "JetBrains Mono", monospace; font-size: 10px; }
.t35 .foot-35{ padding: 10px 20px; background: #f0f4f8; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; display: flex; justify-content: space-between; }
.t35.dark .foot-35{ background: #1c2128; }
`;
function Tpl35PatientChart({ mode, dark }) {
  const p = PERSONAS.med;
  return (<>
    <style>{T35_CSS}</style>
    <div className={`t35 ${mode === 'mobile' ? 't35-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="chart">
        <div className="chart-head">
          <div>
            <div className="pid">PT № EH-2026 · MRN 014 · CV CHART · ROOM 412 · ATT: SELF</div>
            <h1>{p.name} <span style={{ opacity: .75, fontWeight: 400, fontSize: 14 }}>· {p.role}</span></h1>
            <div className="meta-h">{p.school} · {p.location} · Admitted: 12 May 2026 · DOB: confidential</div>
          </div>
          <div className="actions-h"><span className="btn-h">Print CV</span><span className="btn-h">Discharge</span></div>
        </div>

        <div className="allergies">ALLERGIES: dishonest CVs · jargon · stale templates · pretentious tone</div>

        <div className="vitals">
          <div><div className="lbl-v">BP / Pace</div><div className="v-v ok">steady</div></div>
          <div><div className="lbl-v">Year</div><div className="v-v">5<small>/6</small></div></div>
          <div><div className="lbl-v">GPA</div><div className="v-v ok">9.2<small>/10</small></div></div>
          <div><div className="lbl-v">Rotations</div><div className="v-v">{p.experience.length}<small> blocks</small></div></div>
          <div><div className="lbl-v">Projects</div><div className="v-v">{p.projects.length}</div></div>
          <div><div className="lbl-v">Languages</div><div className="v-v">{p.languages.length}</div></div>
        </div>

        <div className="body-35">
          <div className="panel">
            <h2><span>Problem list · Projects</span><small>{p.projects.length} active</small></h2>
            <div className="pr-list">
              {p.projects.map((pr, i) => (
                <div className="pr-row" key={i}>
                  <span className="n-pr">{String(i+1).padStart(2,"0")}</span>
                  <div><b>{pr.title}</b><small>{pr.kind} · {pr.note}</small></div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`status ${i < p.projects.length - 1 ? 'active' : 'resolved'}`}>{i < p.projects.length - 1 ? 'active' : 'ongoing'}</span><br/>
                    <span className="yr-pr">{pr.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2><span>Medications · Skills</span><small>active</small></h2>
            <table className="med-table">
              <thead><tr><th>Skill (drug)</th><th>Dose</th><th>Freq</th><th>Since</th></tr></thead>
              <tbody>
                {p.skills.map((s, i) => (
                  <tr key={s}><td><b>{s}</b></td><td>{['200mg','500mg','daily','daily','prn','5mg'][i % 6]}</td><td>{['BID','daily','QID','daily','prn','BID'][i % 6]}</td><td>{2020 + (i % 5)}</td></tr>
                ))}
              </tbody>
            </table>
            <h2 style={{ marginTop: 18 }}><span>Languages</span><small>fluent</small></h2>
            <div style={{ fontSize: 12, lineHeight: 1.7 }}>{p.languages.join(" · ")}</div>
          </div>
        </div>

        <div className="body-35">
          <div className="panel">
            <h2><span>Procedures performed · Experience</span><small>{p.experience.length} entries</small></h2>
            <div className="pr-list">
              {p.experience.map((e, i) => (
                <div className="pr-row" key={i}>
                  <span className="n-pr">PR{String(i+1).padStart(2,"0")}</span>
                  <div><b>{e.role}</b><small>{e.org} · {e.note}</small></div>
                  <span className="yr-pr">{e.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h2><span>Past medical · Education</span><small>{p.education.length} blocks</small></h2>
            <div className="pr-list">
              {p.education.map((e, i) => (
                <div className="pr-row" key={i}>
                  <span className="n-pr">PMH{String(i+1).padStart(2,"0")}</span>
                  <div><b>{e.degree}</b><small>{e.org}</small></div>
                  <span className="yr-pr">{e.time}</span>
                </div>
              ))}
              {p.awards.map((a, i) => (
                <div className="pr-row" key={'a'+i}>
                  <span className="n-pr">AW{String(i+1).padStart(2,"0")}</span>
                  <div><b>{a.name}</b><small>award · distinction</small></div>
                  <span className="yr-pr">{a.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="plan-35">
          <h2>Plan · Assessment & next steps</h2>
          <p style={{ margin: 0 }}>{p.tagline}</p>
          <ol style={{ marginTop: 8 }}>
            {p.now.map((n, i) => (<li key={i}>{n}.</li>))}
          </ol>
        </div>

        <div className="quote-35">
          <div className="lbl-q">Reference · attending letter</div>
          <div className="q-q">"{p.testimonials[0].quote}"</div>
          <small>— {p.testimonials[0].author}</small>
        </div>

        <div className="sig-35">
          <div className="col"><div className="sig-l"></div><b>{p.name}, candidate.</b><small>{p.email}</small></div>
          <div className="col"><div className="sig-l" style={{ }}><span style={{ position: 'absolute', bottom: 6, left: 4, fontFamily: '"Caveat","Inter",serif', fontStyle: 'italic', fontSize: 20, opacity: .85 }}>— witnessed —</span></div><b>portfolio-cv.online</b><small>verified</small></div>
        </div>

        <div className="foot-35"><span>END OF CHART · Page 1 of 1</span><span>● Live · {p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   36 — ANATOMICAL PLATE  ·  medical (Gray's Anatomy style)
   Signature: cream paper, Latin labels, numbered annotations on a body
              figure that maps to projects/sections, learned plate vibe.
   ───────────────────────────────────────────────────────────────── */
const T36_CSS = `
.t36{ font-family: "EB Garamond", serif; background: #f1ebd6; color: #1a1610; min-height: 100%; padding: 0; font-size: 14px; line-height: 1.55; }
.t36.dark{ background: #14110a; color: #ece3c5; }
.t36 .plate{ padding: 32px 28px 50px; max-width: 920px; margin: 0 auto; }
.t36 .head-36{ text-align: center; padding-bottom: 16px; border-bottom: 3px double currentColor; margin-bottom: 24px; }
.t36 .head-36 .vol{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.22em; opacity: .65; text-transform: uppercase; }
.t36 .head-36 h1{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: clamp(34px, 5vw, 56px); line-height: 1; letter-spacing: -0.005em; margin: 6px 0; }
.t36 .head-36 .strap-36{ font-style: italic; font-size: 14px; opacity: .8; }
.t36 .body-36{ display: grid; grid-template-columns: 1fr 280px; gap: 30px; }
.t36-mobile .body-36{ grid-template-columns: 1fr; gap: 18px; }
.t36 .figure{ background: #f8f3e3; border: 1px solid currentColor; padding: 22px 18px; position: relative; min-height: 460px; }
.t36.dark .figure{ background: #1c180e; }
.t36 .figure .fig-num{ position: absolute; top: 10px; left: 12px; font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .65; }
.t36 .figure .fig-num.tr{ left: auto; right: 12px; }
.t36 .figure .body-svg{ display: flex; justify-content: center; align-items: stretch; padding: 14px 0; height: 100%; }
.t36 .figure svg{ max-width: 100%; height: auto; }
.t36 .figure svg .organ{ fill: color-mix(in oklab, currentColor 10%, transparent); stroke: currentColor; stroke-width: 1; }
.t36 .figure svg .annot{ font-family: "Major Mono Display", monospace; font-size: 9px; fill: currentColor; }
.t36 .figure svg .leader{ stroke: currentColor; stroke-width: 0.6; fill: none; }
.t36 .figure svg .dot{ fill: currentColor; }
.t36 .key-36{ }
.t36 .key-36 h2{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 22px; margin: 0 0 12px; padding-bottom: 6px; border-bottom: 1.5px solid currentColor; }
.t36 .key-36 h2 small{ display: block; font-family: "Major Mono Display", monospace; font-style: normal; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-top: 4px; }
.t36 .key-36 .lst{ font-family: "EB Garamond", serif; font-size: 13px; line-height: 1.55; }
.t36 .key-36 .lst .it{ display: grid; grid-template-columns: 22px 1fr; gap: 8px; padding: 5px 0; border-bottom: 1px dashed currentColor; align-items: baseline; }
.t36 .key-36 .lst .it:last-child{ border-bottom: 0; }
.t36 .key-36 .lst .it .n-k{ font-family: "Major Mono Display", monospace; font-size: 10px; opacity: .65; }
.t36 .key-36 .lst .it b{ font-weight: 700; font-style: italic; }
.t36 .key-36 .lst .it small{ display: block; opacity: .65; font-size: 12px; }
.t36 .sect-36{ margin-top: 30px; }
.t36 .sect-36 h2{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 28px; margin: 0 0 16px; letter-spacing: -0.005em; padding-bottom: 8px; border-bottom: 1.5px solid currentColor; display: flex; justify-content: space-between; align-items: baseline; }
.t36 .sect-36 h2 small{ font-family: "Major Mono Display", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; opacity: .65; text-transform: uppercase; }
.t36 .grid-36{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t36-mobile .grid-36{ grid-template-columns: 1fr; }
.t36 .ent{ padding: 6px 0; border-bottom: 1px dashed currentColor; display: grid; grid-template-columns: 100px 1fr; gap: 12px; font-size: 13px; line-height: 1.55; }
.t36 .ent .yr-36{ font-family: "Major Mono Display", monospace; font-size: 10px; opacity: .65; }
.t36 .ent b{ font-weight: 700; font-style: italic; }
.t36 .pull-36{ font-family: "EB Garamond", serif; font-style: italic; font-size: 20px; line-height: 1.4; padding: 16px 22px; border-left: 3px solid currentColor; margin: 24px 0; max-width: 640px; }
.t36 .pull-36 cite{ display: block; font-family: "Major Mono Display", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-top: 8px; }
.t36 .colophon-36{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; display: flex; justify-content: space-between; padding-top: 18px; border-top: 3px double currentColor; margin-top: 30px; }
`;
function Tpl36Anatomy({ mode, dark }) {
  const p = PERSONAS.med;
  // 6 anatomical regions mapped to first 6 projects
  return (<>
    <style>{T36_CSS}</style>
    <div className={`t36 ${mode === 'mobile' ? 't36-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="plate">
        <header className="head-36">
          <div className="vol">Plate XIV · Vol. III · Spring 2026 · folio anatomia</div>
          <h1>{p.name}</h1>
          <div className="strap-36">A working anatomy of a candidate — figures, tabulae, and references for inspection.</div>
        </header>

        <div className="body-36">
          <div className="figure">
            <div className="fig-num">Fig. 1 — Studens vivax · ant. view</div>
            <div className="fig-num tr">scale 1 : 1</div>
            <div className="body-svg">
              <svg viewBox="0 0 240 480" preserveAspectRatio="xMidYMid meet">
                {/* simple body silhouette */}
                <path className="organ" d="M120 30 a 24 24 0 1 1 0.1 0 z" />
                <path className="organ" d="M84 80 q 36 -28 72 0 l 12 80 q -48 14 -96 0 z" />
                <path className="organ" d="M96 160 l -8 110 l 16 4 l 8 -100 z" />
                <path className="organ" d="M144 160 l 8 110 l -16 4 l -8 -100 z" />
                <path className="organ" d="M86 290 l -2 130 l 22 4 l 10 -130 z" />
                <path className="organ" d="M154 290 l 2 130 l -22 4 l -10 -130 z" />
                <path className="organ" d="M86 420 l -2 28 l 24 0 l 2 -22 z" />
                <path className="organ" d="M154 420 l 2 28 l -24 0 l -2 -22 z" />

                {/* leader lines + numbers */}
                <line className="leader" x1="120" y1="42" x2="200" y2="40" />
                <circle className="dot" cx="120" cy="42" r="2" />
                <text className="annot" x="204" y="44">1.</text>

                <line className="leader" x1="120" y1="100" x2="200" y2="115" />
                <circle className="dot" cx="120" cy="100" r="2" />
                <text className="annot" x="204" y="118">2.</text>

                <line className="leader" x1="100" y1="180" x2="40" y2="190" />
                <circle className="dot" cx="100" cy="180" r="2" />
                <text className="annot" x="20" y="193">3.</text>

                <line className="leader" x1="140" y1="180" x2="200" y2="190" />
                <circle className="dot" cx="140" cy="180" r="2" />
                <text className="annot" x="204" y="193">4.</text>

                <line className="leader" x1="100" y1="320" x2="40" y2="340" />
                <circle className="dot" cx="100" cy="320" r="2" />
                <text className="annot" x="20" y="344">5.</text>

                <line className="leader" x1="140" y1="320" x2="200" y2="340" />
                <circle className="dot" cx="140" cy="320" r="2" />
                <text className="annot" x="204" y="343">6.</text>
              </svg>
            </div>
          </div>

          <div className="key-36">
            <h2>Key to figure 1<small>partes corporis · projects mapped</small></h2>
            <div className="lst">
              {p.projects.slice(0, 6).map((pr, i) => (
                <div className="it" key={i}>
                  <span className="n-k">{i+1}.</span>
                  <div><b>{pr.title}</b><small>{pr.kind} · {pr.year}</small></div>
                </div>
              ))}
            </div>
            <div className="lst" style={{ marginTop: 14, paddingTop: 10, borderTop: '1.5px solid currentColor' }}>
              <div className="it"><span className="n-k">Lat.</span><div><b>Studens vivax</b><small>fam. {p.role.split(" — ")[0]}aceae</small></div></div>
              <div className="it"><span className="n-k">Hab.</span><div><b>{p.location}</b><small>{p.school}</small></div></div>
              <div className="it"><span className="n-k">Det.</span><div><b>12 May 2026</b></div></div>
              <div className="it"><span className="n-k">Cont.</span><div>{p.email}</div></div>
            </div>
          </div>
        </div>

        <div className="sect-36">
          <h2>De Operis<small>of works · {p.projects.length} entries</small></h2>
          {p.projects.map((pr, i) => (
            <div className="ent" key={i}>
              <span className="yr-36">№ {String(i+1).padStart(2,"0")} · {pr.year}</span>
              <div><b>{pr.title}</b> — {pr.note} <span style={{ fontStyle: 'italic', opacity: .65 }}>({pr.kind})</span></div>
            </div>
          ))}
        </div>

        <div className="sect-36">
          <h2>De Praxis<small>of practice · experience</small></h2>
          <div className="grid-36">
            <div>
              <h3 style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .65, margin: '0 0 6px', fontWeight: 400 }}>Stations</h3>
              {p.experience.map((e, i) => (
                <div className="ent" key={i}><span className="yr-36">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity: .7, fontSize: 12 }}>{e.note}</span></div></div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .65, margin: '0 0 6px', fontWeight: 400 }}>Of education</h3>
              {p.education.map((e, i) => (
                <div className="ent" key={i}><span className="yr-36">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity: .7, fontSize: 12 }}>{e.org}</span></div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="pull-36">
          "{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}, on the record</cite>
        </div>

        <div className="sect-36">
          <h2>De Honoribus<small>of honours · skills · languages</small></h2>
          <div className="grid-36">
            <div>
              <h3 style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .65, margin: '0 0 6px', fontWeight: 400 }}>Distinctions</h3>
              {p.awards.map((a, i) => (<div className="ent" key={i}><span className="yr-36">{a.year}</span><div><b>{a.name}</b></div></div>))}
            </div>
            <div>
              <h3 style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .65, margin: '0 0 6px', fontWeight: 400 }}>Practica & lingua</h3>
              <div style={{ fontStyle: 'italic', fontSize: 14, lineHeight: 1.7 }}>{p.skills.join(" · ")}</div>
              <div style={{ marginTop: 8, fontStyle: 'italic', fontSize: 14, opacity: .85 }}>{p.languages.join(" · ")}</div>
            </div>
          </div>
        </div>

        <div className="colophon-36"><span>★ folio anatomia · plate XIV</span><span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span><span>printed in earnest</span></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   37 — Rx PRESCRIPTION CARD  ·  medical / pharmacy
   Signature: prescription pad — Rx symbol, dose lines, signature, refills.
   ───────────────────────────────────────────────────────────────── */
const T37_CSS = `
.t37{ font-family: "Inter", sans-serif; background: #ece4d4; color: #1a1610; min-height: 100%; padding: 28px 22px 60px; font-size: 13px; line-height: 1.55; }
.t37.dark{ background: #14110a; color: #ece4d4; }
.t37 .pad{ background: #fbf6e9; max-width: 760px; margin: 0 auto; padding: 0; box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 30px 60px -30px rgba(0,0,0,.25); color: #1a1610; position: relative; }
.t37.dark .pad{ background: #1f1c12; color: #ece4d4; }
.t37 .pad::before{ content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: repeating-linear-gradient(90deg, #b03227 0 8px, transparent 8px 16px); opacity: .55; }
.t37 .pad-head{ padding: 22px 28px 16px; border-bottom: 1.5px dashed currentColor; display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: center; }
.t37-mobile .pad-head{ grid-template-columns: 1fr; }
.t37 .pad-head h1{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: clamp(24px, 4vw, 36px); margin: 0; line-height: 1; letter-spacing: -0.015em; }
.t37 .pad-head .sub-37{ font-size: 12px; opacity: .75; margin-top: 6px; }
.t37 .pad-head .lic{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.06em; text-align: right; line-height: 1.6; opacity: .75; }
.t37-mobile .pad-head .lic{ text-align: left; }
.t37 .pt-37{ padding: 12px 28px; border-bottom: 1.5px dashed currentColor; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; font-size: 12px; }
.t37-mobile .pt-37{ grid-template-columns: 1fr 1fr; }
.t37 .pt-37 .f{ display: flex; flex-direction: column; gap: 2px; }
.t37 .pt-37 .f b{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; font-weight: 500; }
.t37 .pt-37 .f span{ font-weight: 500; font-size: 13px; padding-bottom: 2px; border-bottom: 1px solid currentColor; }
.t37 .rx-symbol{ display: flex; align-items: flex-start; padding: 22px 28px 12px; gap: 16px; }
.t37 .rx-symbol .sym{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 64px; line-height: 0.85; color: #b03227; flex-shrink: 0; }
.t37.dark .rx-symbol .sym{ color: #ff7a6c; }
.t37 .rx-symbol .for{ flex: 1; font-size: 16px; line-height: 1.5; padding-top: 12px; max-width: 540px; }
.t37 .rx-symbol .for b{ font-weight: 700; font-style: italic; font-family: "Fraunces", serif; font-size: 18px; }
.t37 .doses{ padding: 0 28px 12px; }
.t37 .dose-row{ display: grid; grid-template-columns: 60px 1fr 100px 70px; gap: 12px; padding: 8px 0; border-bottom: 1.5px dashed currentColor; align-items: baseline; font-size: 13px; }
.t37-mobile .dose-row{ grid-template-columns: 50px 1fr 70px; }
.t37-mobile .dose-row .freq{ display: none; }
.t37 .dose-row .num-r{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; }
.t37 .dose-row .name-r b{ font-weight: 700; font-style: italic; font-family: "Fraunces", serif; font-size: 15px; }
.t37 .dose-row .name-r small{ display: block; opacity: .65; font-size: 11px; margin-top: 2px; }
.t37 .dose-row .freq{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .65; }
.t37 .dose-row .dose-r{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .75; text-align: right; }
.t37 .sig-37{ padding: 22px 28px 14px; border-top: 1.5px solid currentColor; }
.t37 .sig-37 .label-sig{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; margin-bottom: 6px; }
.t37 .sig-37 p{ font-size: 14px; line-height: 1.65; margin: 0 0 10px; max-width: 580px; }
.t37 .quote-37{ padding: 16px 22px; background: color-mix(in oklab, currentColor 4%, transparent); border-left: 3px solid #b03227; margin: 12px 0; font-style: italic; font-size: 14px; line-height: 1.45; max-width: 580px; }
.t37 .quote-37 cite{ display: block; font-style: normal; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-top: 8px; }
.t37 .refills{ padding: 14px 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; border-top: 1.5px dashed currentColor; border-bottom: 1.5px dashed currentColor; font-size: 11px; }
.t37-mobile .refills{ grid-template-columns: repeat(2, 1fr); }
.t37 .refills .f{ }
.t37 .refills .f b{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; display: block; margin-bottom: 4px; font-weight: 500; }
.t37 .refills .f .val-37{ font-family: "Fraunces", serif; font-style: italic; font-weight: 700; font-size: 16px; }
.t37 .sign-block{ padding: 22px 28px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t37-mobile .sign-block{ grid-template-columns: 1fr; }
.t37 .sign-block .col{ }
.t37 .sign-block .sig-line{ border-bottom: 1.5px solid currentColor; height: 38px; position: relative; margin-bottom: 6px; }
.t37 .sign-block .sig-line::after{ content: "Era H., MD-cand"; position: absolute; bottom: 8px; left: 4px; font-family: "Caveat", cursive; font-size: 22px; font-style: italic; opacity: .85; }
.t37 .sign-block .sig-line.r::after{ content: ""; }
.t37 .sign-block .lbl-sb{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; }
.t37 .sign-block b{ font-weight: 700; font-style: italic; font-family: "Fraunces", serif; font-size: 16px; display: block; }
.t37 .foot-37{ padding: 10px 28px; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; display: flex; justify-content: space-between; border-top: 1.5px solid currentColor; }
.t37 .perf{ height: 12px; background: repeating-linear-gradient(90deg, transparent 0 4px, currentColor 4px 6px); opacity: .25; }
`;
function Tpl37Rx({ mode, dark }) {
  const p = PERSONAS.med;
  return (<>
    <style>{T37_CSS}</style>
    <div className={`t37 ${mode === 'mobile' ? 't37-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="pad">
        <div className="pad-head">
          <div>
            <h1>folio · prescription pad</h1>
            <div className="sub-37">Issued in good faith for {p.name} · 2026 Spring</div>
          </div>
          <div className="lic">DEA № EH-2026<br/>NPI: candidate · self<br/>Tel: {p.email}</div>
        </div>

        <div className="pt-37">
          <div className="f"><b>Patient (candidate)</b><span>{p.name}</span></div>
          <div className="f"><b>DOB / Year</b><span>5th yr · MD-cand</span></div>
          <div className="f"><b>Date</b><span>12 / V / 2026</span></div>
          <div className="f"><b>School</b><span>{p.school}</span></div>
          <div className="f"><b>Location</b><span>{p.location}</span></div>
          <div className="f"><b>Allergies</b><span>jargon · stale templates</span></div>
        </div>

        <div className="rx-symbol">
          <div className="sym">℞</div>
          <div className="for"><b>Sig:</b> Hire as junior medical / research candidate. {p.tagline} Take with morning coffee, repeat as needed until offer received.</div>
        </div>

        <div className="doses">
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .55, padding: '4px 0', borderBottom: '1.5px solid currentColor' }}>
            <span style={{ display: 'inline-block', width: 60 }}>№</span>
            <span style={{ display: 'inline-block', width: 'calc(100% - 250px)' }}>Medication · Projects</span>
            {mode !== 'mobile' && <span style={{ display: 'inline-block', width: 100 }}>Frequency</span>}
            <span style={{ display: 'inline-block', width: 70, textAlign: 'right' }}>Dose</span>
          </div>
          {p.projects.map((pr, i) => (
            <div className="dose-row" key={i}>
              <span className="num-r">Rx-{String(i+1).padStart(3,"0")}</span>
              <div className="name-r"><b>{pr.title}</b><small>{pr.note} · {pr.kind}, {pr.year}</small></div>
              <span className="freq">{['Daily', 'BID', 'PRN', 'QID', 'Weekly', 'Monthly'][i % 6]}</span>
              <span className="dose-r">{['200mg', '500mg', '10mL', '50mg', '1tab', '2tabs'][i % 6]}</span>
            </div>
          ))}
        </div>

        <div className="sig-37">
          <div className="label-sig">Clinical notes · experience</div>
          <p>The candidate has rotated through {p.experience.length} services. Most recent: {p.experience[0].role.toLowerCase()} at {p.experience[0].org}. Tolerated long shifts; observed careful documentation throughout.</p>
          {p.experience.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 12, fontSize: 12, lineHeight: 1.55, padding: '4px 0', borderBottom: '1px dashed currentColor' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, opacity: .65 }}>{e.time}</span>
              <span><b style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 700 }}>{e.role}</b>, {e.org}<br/><span style={{ opacity: .65 }}>{e.note}</span></span>
            </div>
          ))}

          <div className="label-sig" style={{ marginTop: 14 }}>Past medical / education</div>
          {p.education.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 12, fontSize: 12, lineHeight: 1.55, padding: '4px 0', borderBottom: '1px dashed currentColor' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, opacity: .65 }}>{e.time}</span>
              <span><b style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 700 }}>{e.degree}</b>, {e.org}</span>
            </div>
          ))}
        </div>

        <div className="quote-37">
          "{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}, attending</cite>
        </div>

        <div className="refills">
          <div className="f"><b>Refills</b><span className="val-37">unlimited</span></div>
          <div className="f"><b>Substitute</b><span className="val-37">do not</span></div>
          <div className="f"><b>Awards</b><span className="val-37">{p.awards.length} · {p.awards[0].year}</span></div>
          <div className="f"><b>Languages</b><span className="val-37">{p.languages.length}</span></div>
        </div>

        <div className="sign-block">
          <div className="col">
            <div className="sig-line"></div>
            <div className="lbl-sb">Prescriber · candidate</div>
            <b>{p.name}</b>
            <span style={{ fontSize: 11, opacity: .65, fontFamily: '"JetBrains Mono", monospace' }}>{p.email}</span>
          </div>
          <div className="col">
            <div className="sig-line r"></div>
            <div className="lbl-sb">Witnessed</div>
            <b>portfolio-cv.online</b>
            <span style={{ fontSize: 11, opacity: .65, fontFamily: '"JetBrains Mono", monospace' }}>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span>
          </div>
        </div>

        <div className="foot-37"><span>★ folio Rx-pad · 2026</span><span>do not exceed daily limit · contact recruiter if symptoms persist</span></div>
        <div className="perf"></div>
      </div>
    </div>
  </>);
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    Tpl32LegalBrief, Tpl33Gazette, Tpl34Transcript,
    Tpl35PatientChart, Tpl36Anatomy, Tpl37Rx,
  });
}

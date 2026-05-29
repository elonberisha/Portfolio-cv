/* global React, PERSONAS */

/* ─────────────────────────────────────────────────────────────────
   21 — TWO-COLUMN RESUME  ·  business persona
   Signature: classic CV with designed sidebar. Print-ready, recruiter-clean.
   ───────────────────────────────────────────────────────────────── */
const T21_CSS = `
.t21{ font-family: "Inter", system-ui, sans-serif; background: #eceae5; color: #1c1d22; min-height: 100%; padding: 24px; font-size: 13px; line-height: 1.55; }
.t21.dark{ background: #161616; color: #e8e6e0; }
.t21 .doc{ background: #fff; color: #1c1d22; max-width: 900px; margin: 0 auto; box-shadow: 0 1px 0 rgba(0,0,0,.04), 0 30px 60px -30px rgba(0,0,0,.25); display: grid; grid-template-columns: 280px 1fr; min-height: 1100px; }
.t21.dark .doc{ background: #1f1f22; color: #e8e6e0; }
.t21-mobile .doc{ grid-template-columns: 1fr; }
.t21 .aside{ background: #1c1d22; color: #f3efe7; padding: 28px 24px; }
.t21.dark .aside{ background: #0e0e10; }
.t21-mobile .aside{ padding: 22px 20px; }
.t21 .aside .pic{ width: 110px; aspect-ratio: 1; border-radius: 999px; background: #f3efe7; color: #1c1d22; display: flex; align-items: center; justify-content: center; font-family: "Inter", sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 18px; }
.t21 .aside h1{ font-family: "Fraunces", serif; font-size: 32px; line-height: 1.05; letter-spacing: -0.015em; margin: 0 0 4px; font-weight: 700; }
.t21 .aside .role{ font-size: 12px; opacity: .75; margin-bottom: 18px; }
.t21 .aside h3{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; margin: 22px 0 8px; font-weight: 600; }
.t21 .aside .row-ctc{ font-size: 12px; padding: 4px 0; display: flex; gap: 8px; line-height: 1.45; }
.t21 .aside .row-ctc span{ width: 16px; opacity: .55; font-family: "JetBrains Mono", monospace; font-size: 10px; padding-top: 1px; }
.t21 .aside .pill{ display: inline-block; border: 1px solid currentColor; padding: 2px 8px; margin: 0 4px 4px 0; border-radius: 4px; font-size: 11px; opacity: .85; }
.t21 .aside .bar-row{ font-size: 11px; margin-bottom: 10px; }
.t21 .aside .bar-row .lbl{ display: flex; justify-content: space-between; margin-bottom: 4px; opacity: .85; }
.t21 .aside .bar-row .bar{ height: 3px; background: rgba(243,239,231,.18); border-radius: 999px; overflow: hidden; }
.t21 .aside .bar-row .bar i{ display: block; height: 100%; background: #f3efe7; }
.t21 .main{ padding: 32px 30px; }
.t21-mobile .main{ padding: 24px 20px; }
.t21 .main .lede{ font-family: "Fraunces", serif; font-size: 19px; line-height: 1.45; margin: 0 0 22px; letter-spacing: -0.005em; max-width: 540px; }
.t21 .main h2{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #1c1d22; opacity: .55; font-weight: 600; margin: 0 0 12px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,.1); display: flex; justify-content: space-between; align-items: baseline; }
.t21.dark .main h2{ color: #e8e6e0; border-color: rgba(255,255,255,.1); }
.t21 .main h2:not(:first-of-type){ margin-top: 26px; }
.t21 .main .entry{ display: grid; grid-template-columns: 96px 1fr; gap: 18px; padding: 12px 0; }
.t21-mobile .main .entry{ grid-template-columns: 1fr; gap: 4px; }
.t21 .main .entry .when{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; padding-top: 4px; }
.t21 .main .entry h4{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 15px; margin: 0; letter-spacing: -0.005em; }
.t21 .main .entry .where{ font-size: 12px; opacity: .65; margin-bottom: 6px; }
.t21 .main .entry p{ font-size: 13px; line-height: 1.55; margin: 0; }
.t21 .main .proj-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.t21-mobile .main .proj-grid{ grid-template-columns: 1fr; }
.t21 .main .pcard{ border: 1px solid rgba(0,0,0,.1); padding: 14px; border-radius: 6px; transition: border-color .12s; }
.t21.dark .main .pcard{ border-color: rgba(255,255,255,.12); }
.t21 .main .pcard:hover{ border-color: #1c1d22; }
.t21.dark .main .pcard:hover{ border-color: #e8e6e0; }
.t21 .main .pcard .kind{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px; }
.t21 .main .pcard h5{ font-family: "Fraunces", serif; font-size: 18px; margin: 0 0 4px; line-height: 1.1; font-weight: 700; }
.t21 .main .pcard p{ margin: 0; font-size: 12px; line-height: 1.45; opacity: .8; }
.t21 .foot{ padding: 18px 30px; background: rgba(0,0,0,.025); font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .7; display: flex; justify-content: space-between; grid-column: 1 / -1; }
.t21.dark .foot{ background: rgba(255,255,255,.03); }
`;
function Tpl21Resume({ mode, dark }) {
  const p = PERSONAS.business;
  const initials = p.name.split(" ").map(s => s[0]).join("");
  return (<>
    <style>{T21_CSS}</style>
    <div className={`t21 ${mode === 'mobile' ? 't21-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="doc">
        <aside className="aside">
          <div className="pic">{initials}</div>
          <h1>{p.name}</h1>
          <div className="role">{p.role}<br/>{p.school}</div>

          <h3>Contact</h3>
          <div className="row-ctc"><span>@</span>{p.email}</div>
          <div className="row-ctc"><span>↗</span>{p.socials[0]}</div>
          <div className="row-ctc"><span>↗</span>{p.socials[1]}</div>
          <div className="row-ctc"><span>◎</span>{p.location}</div>

          <h3>Languages</h3>
          {p.languages.map(l => (<div key={l} style={{ fontSize: 12, padding: '2px 0' }}>{l}</div>))}

          <h3>Skills</h3>
          {p.skills.slice(0, 6).map((s, i) => (
            <div key={s} className="bar-row">
              <div className="lbl"><span>{s}</span><span style={{ opacity: .55 }}>{["★★★★★","★★★★☆","★★★★★","★★★☆☆","★★★★☆","★★★☆☆"][i] || "★★★★☆"}</span></div>
              <div className="bar"><i style={{ width: `${[95, 80, 95, 65, 80, 65][i] || 80}%` }}></i></div>
            </div>
          ))}

          <h3>Awards</h3>
          {p.awards.map((a, i) => (<div key={i} style={{ fontSize: 12, padding: '4px 0' }}><b style={{ fontWeight: 500 }}>{a.name}</b><br/><span style={{ opacity: .55, fontFamily: '"JetBrains Mono", monospace', fontSize: 10 }}>{a.year}</span></div>))}
        </aside>

        <main className="main">
          <p className="lede">{p.tagline} Currently writing on emerging-market marketplaces from Paris while finishing the MSc at HEC.</p>

          <h2>Professional Experience<span style={{ fontFamily: '"JetBrains Mono", monospace', opacity: .55, fontSize: 10 }}>{p.experience.length} positions</span></h2>
          {p.experience.map((e, i) => (
            <div className="entry" key={i}>
              <div className="when">{e.time}</div>
              <div>
                <h4>{e.role}</h4>
                <div className="where">{e.org}</div>
                <p>{e.note}</p>
              </div>
            </div>
          ))}

          <h2>Selected Projects<span style={{ fontFamily: '"JetBrains Mono", monospace', opacity: .55, fontSize: 10 }}>{p.projects.length} works</span></h2>
          <div className="proj-grid">
            {p.projects.map((pr, i) => (
              <div key={i} className="pcard">
                <div className="kind">{pr.kind} · {pr.year}</div>
                <h5>{pr.title}</h5>
                <p>{pr.note}</p>
              </div>
            ))}
          </div>

          <h2>Education<span style={{ fontFamily: '"JetBrains Mono", monospace', opacity: .55, fontSize: 10 }}>{p.education.length}</span></h2>
          {p.education.map((e, i) => (
            <div className="entry" key={i}>
              <div className="when">{e.time}</div>
              <div><h4>{e.degree}</h4><div className="where">{e.org}</div></div>
            </div>
          ))}

          <h2>Reference</h2>
          <div style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 15, lineHeight: 1.45, padding: '4px 0' }}>"{p.testimonials[0].quote}"<div style={{ fontStyle: 'normal', fontFamily: '"Inter", sans-serif', fontSize: 11, opacity: .65, marginTop: 6 }}>— {p.testimonials[0].author}</div></div>
        </main>

        <div className="foot"><span>{p.name} · CV · Spring 2026</span><span>Page 1 of 1 · {p.email}</span></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   22 — BENTO GRID  ·  designer persona
   Signature: modular dashboard tiles, varied tile sizes, read.cv vibe.
   ───────────────────────────────────────────────────────────────── */
const T22_CSS = `
.t22{ font-family: "Inter", system-ui, sans-serif; background: #f4f1ec; color: #18181b; min-height: 100%; padding: 22px; }
.t22.dark{ background: #0e0e10; color: #ededee; }
.t22 .top{ display: flex; justify-content: space-between; align-items: center; padding-bottom: 18px; }
.t22 .top .brand{ font-family: "Fraunces", serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; }
.t22 .top .nav{ display: flex; gap: 16px; font-size: 12px; }
.t22 .top .nav a{ color: inherit; text-decoration: none; opacity: .65; }
.t22 .top .nav a:hover{ opacity: 1; }
.t22 .top .status{ display: inline-flex; align-items: center; gap: 6px; font-size: 11px; padding: 4px 10px; background: rgba(34, 197, 94, 0.12); color: #15803d; border-radius: 999px; font-family: "JetBrains Mono", monospace; }
.t22.dark .top .status{ background: rgba(34, 197, 94, 0.18); color: #4ade80; }
.t22 .top .status i{ width: 6px; height: 6px; background: currentColor; border-radius: 999px; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2); }
.t22 .grid{ display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 90px; gap: 12px; }
.t22-mobile .grid{ grid-template-columns: repeat(2, 1fr); grid-auto-rows: 88px; }
.t22 .tile{ background: #fff; border-radius: 22px; padding: 18px 20px; position: relative; overflow: hidden; transition: transform .15s ease, box-shadow .15s ease; cursor: pointer; }
.t22.dark .tile{ background: #18181b; }
.t22 .tile:hover{ transform: translateY(-2px); box-shadow: 0 16px 30px -16px rgba(0,0,0,.2); }
.t22 .tile h4{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .5; font-weight: 500; margin: 0 0 10px; display: flex; justify-content: space-between; align-items: center; }
.t22 .tile h4 .arr{ opacity: .35; }
.t22 .tile h2{ font-family: "Fraunces", serif; font-size: 28px; line-height: 1.05; margin: 0; letter-spacing: -0.015em; font-weight: 700; }
.t22 .tile p{ font-size: 13px; line-height: 1.5; margin: 4px 0 0; opacity: .85; }
.t22 .tile.dark-t{ background: #18181b; color: #fafafa; }
.t22 .tile.accent{ background: #ffefe0; color: #18181b; }
.t22.dark .tile.accent{ background: #2a1d12; color: #ffd9b3; }
.t22 .tile.lemon{ background: #f6f4cf; color: #18181b; }
.t22.dark .tile.lemon{ background: #2a280f; color: #f3f08c; }
/* Spans */
.t22 .s-hero{ grid-column: span 7; grid-row: span 3; }
.t22 .s-stats{ grid-column: span 5; grid-row: span 1; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; padding: 0; }
.t22 .s-stats > div{ padding: 14px 18px; border-right: 1px solid rgba(0,0,0,.06); }
.t22.dark .s-stats > div{ border-color: rgba(255,255,255,.08); }
.t22 .s-stats > div:last-child{ border-right: 0; }
.t22 .s-stats b{ font-family: "Fraunces", serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; display: block; }
.t22 .s-stats small{ font-size: 10px; opacity: .55; letter-spacing: 0.06em; text-transform: uppercase; }
.t22 .s-status{ grid-column: span 5; grid-row: span 1; }
.t22 .s-now{ grid-column: span 5; grid-row: span 1; }
.t22 .s-proj-big{ grid-column: span 5; grid-row: span 3; }
.t22 .s-proj{ grid-column: span 4; grid-row: span 2; }
.t22 .s-proj-2{ grid-column: span 3; grid-row: span 2; }
.t22 .s-proj-w{ grid-column: span 7; grid-row: span 2; display: grid; grid-template-columns: 1fr 140px; gap: 16px; align-items: end; }
.t22 .s-proj-w .imgph{ aspect-ratio: 1; border-radius: 14px; }
.t22 .s-exp{ grid-column: span 6; grid-row: span 3; }
.t22 .s-skills{ grid-column: span 6; grid-row: span 3; }
.t22 .s-edu{ grid-column: span 6; grid-row: span 2; }
.t22 .s-test{ grid-column: span 6; grid-row: span 2; }
.t22 .s-cta{ grid-column: span 12; grid-row: span 1; background: #18181b; color: #fafafa; display: flex; align-items: center; justify-content: space-between; }
.t22.dark .s-cta{ background: #ededee; color: #18181b; }
.t22-mobile .grid > div{ grid-column: span 2; grid-row: span 2; }
.t22-mobile .grid .s-hero{ grid-row: span 3; }
.t22-mobile .grid .s-stats{ grid-template-columns: 1fr 1fr 1fr; }
.t22 .pic-tile .imgph{ position: absolute; inset: 0; border-radius: 22px; border: 0; background-color: #ffd9b3; }
.t22 .pic-tile h2{ position: relative; z-index: 1; }
.t22 .skill-pill{ display: inline-block; padding: 4px 10px; background: rgba(0,0,0,.05); border-radius: 999px; font-size: 11px; margin: 0 4px 4px 0; }
.t22.dark .skill-pill{ background: rgba(255,255,255,.06); }
.t22 .row-li{ font-size: 12px; padding: 7px 0; border-top: 1px solid rgba(0,0,0,.06); }
.t22.dark .row-li{ border-color: rgba(255,255,255,.08); }
.t22 .row-li:first-child{ border-top: 0; padding-top: 0; }
.t22 .row-li b{ font-weight: 500; }
.t22 .row-li small{ opacity: .55; font-family: "JetBrains Mono", monospace; font-size: 10px; }
.t22 .stat-dot{ display: inline-block; width: 6px; height: 6px; border-radius: 999px; background: currentColor; opacity: .5; margin-right: 6px; }
`;
function Tpl22Bento({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T22_CSS}</style>
    <div className={`t22 ${mode === 'mobile' ? 't22-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="top">
        <div className="brand">{p.name.split(" ")[0].toLowerCase()}.studio</div>
        {mode !== 'mobile' && <nav className="nav"><a>work</a><a>about</a><a>writing</a><a>contact</a></nav>}
        <div className="status"><i></i> Open for work · 2026</div>
      </div>

      <div className="grid">
        <div className="tile s-hero">
          <h4>About <span className="arr">↗</span></h4>
          <h2 style={{ fontSize: 44, lineHeight: 1, marginBottom: 14 }}>{p.name},<br/><span style={{ opacity: .55 }}>{p.role.split(" — ")[0].toLowerCase()} in {p.location.split(",")[0]}.</span></h2>
          <p style={{ maxWidth: 480, fontSize: 14, lineHeight: 1.55 }}>{p.tagline}</p>
        </div>

        <div className="tile s-stats">
          <div><b>{p.projects.length}</b><small>projects</small></div>
          <div><b>{p.experience.length}</b><small>positions</small></div>
          <div><b>{p.awards.length}</b><small>awards</small></div>
        </div>

        <div className="tile s-now accent">
          <h4>Now <span className="arr">↗</span></h4>
          <p style={{ fontSize: 14 }}>{p.now[0]}</p>
        </div>

        <div className="tile s-status lemon">
          <h4>Currently reading</h4>
          <p style={{ fontSize: 13, fontStyle: 'italic' }}>{p.now[1]}</p>
        </div>

        <div className="tile s-proj-big pic-tile" style={{ color: '#1c1813' }}>
          <div className="imgph" style={{ borderRadius: 22 }}>{p.projects[0].kind}</div>
          <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, color: '#1c1813' }}>
            <h4 style={{ color: '#5e4a32' }}>Featured · {p.projects[0].year}</h4>
            <h2>{p.projects[0].title}</h2>
            <p style={{ opacity: .8, fontSize: 13 }}>{p.projects[0].note}</p>
          </div>
        </div>

        <div className="tile s-proj">
          <h4>{p.projects[1].kind} <span className="arr">↗</span></h4>
          <h2>{p.projects[1].title}</h2>
          <p>{p.projects[1].note}</p>
        </div>

        <div className="tile s-proj-2 dark-t">
          <h4 style={{ color: 'rgba(255,255,255,.55)' }}>{p.projects[2].kind}</h4>
          <h2 style={{ fontSize: 22 }}>{p.projects[2].title}</h2>
        </div>

        <div className="tile s-proj-w">
          <div>
            <h4>{p.projects[3].kind}<span className="arr">↗</span></h4>
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>{p.projects[3].title}</h2>
            <p style={{ fontSize: 12 }}>{p.projects[3].note}</p>
          </div>
          <div className="imgph" style={{ background: '#cbe3dc' }}>{p.projects[3].kind}</div>
        </div>

        <div className="tile s-exp">
          <h4>Experience<span className="arr">↗</span></h4>
          {p.experience.map((e, i) => (
            <div key={i} className="row-li">
              <b>{e.role}</b> · {e.org} <small style={{ float: 'right' }}>{e.time}</small>
              <div style={{ opacity: .65, marginTop: 2 }}>{e.note}</div>
            </div>
          ))}
        </div>

        <div className="tile s-skills">
          <h4>Skills <span className="arr">↗</span></h4>
          <div style={{ marginTop: 6 }}>
            {p.skills.map(s => (<span key={s} className="skill-pill">{s}</span>))}
          </div>
          <h4 style={{ marginTop: 16 }}>Languages</h4>
          <div style={{ marginTop: 4 }}>
            {p.languages.map(l => (<span key={l} className="skill-pill">{l}</span>))}
          </div>
        </div>

        <div className="tile s-edu">
          <h4>Education</h4>
          {p.education.map((e, i) => (
            <div key={i} className="row-li">
              <b>{e.degree}</b><br/>
              <span style={{ opacity: .65, fontSize: 11 }}>{e.org} · {e.time}</span>
            </div>
          ))}
        </div>

        <div className="tile s-test accent">
          <h4>Words from a mentor</h4>
          <p style={{ fontFamily: '"Fraunces", serif', fontSize: 17, fontStyle: 'italic', lineHeight: 1.35, marginTop: 4 }}>"{p.testimonials[0].quote}"</p>
          <small style={{ opacity: .65, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.12em' }}>— {p.testimonials[0].author}</small>
        </div>

        <div className="tile s-cta">
          <div><b style={{ fontFamily: '"Fraunces", serif', fontSize: 22, fontWeight: 700 }}>Let's make something →</b> <span style={{ opacity: .7, marginLeft: 10, fontSize: 13 }}>{p.email}</span></div>
          <div style={{ fontSize: 12, opacity: .7, fontFamily: '"JetBrains Mono", monospace' }}>{p.location} · {p.socials[0]}</div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   23 — NOTION DOC  ·  business persona
   Signature: block-based document, properties bar, callouts, dividers.
   ───────────────────────────────────────────────────────────────── */
const T23_CSS = `
.t23{ font-family: -apple-system, "Inter", sans-serif; background: #fff; color: #37352f; min-height: 100%; padding: 0; font-size: 15px; line-height: 1.5; }
.t23.dark{ background: #191919; color: #d4d4d4; }
.t23 .crumbs{ padding: 10px 24px; font-size: 12px; opacity: .55; border-bottom: 1px solid rgba(55,53,47,.09); display: flex; gap: 6px; align-items: center; }
.t23.dark .crumbs{ border-color: rgba(255,255,255,.094); }
.t23 .crumbs span{ opacity: .7; }
.t23 .crumbs .ic{ display: inline-block; width: 14px; height: 14px; background: currentColor; opacity: .5; border-radius: 3px; }
.t23 .doc23{ max-width: 760px; margin: 0 auto; padding: 56px 56px 80px; }
.t23-mobile .doc23{ padding: 22px 20px 60px; }
.t23 .cover{ height: 160px; margin: -56px -56px 0; background: linear-gradient(135deg, #f1eee6, #e6d9c5); border-radius: 0; position: relative; }
.t23-mobile .cover{ margin: -22px -20px 0; height: 110px; }
.t23.dark .cover{ background: linear-gradient(135deg, #1e1e1e, #2a2620); }
.t23 .emoji{ width: 72px; height: 72px; border-radius: 12px; background: #fff; display: flex; align-items: center; justify-content: center; font-family: "Fraunces", serif; font-size: 40px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,.08); margin-top: -36px; margin-left: 8px; position: relative; z-index: 1; }
.t23.dark .emoji{ background: #2a2a2a; color: #f0f0f0; }
.t23 h1{ font-family: -apple-system, "Inter", sans-serif; font-size: 40px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin: 18px 0 4px; }
.t23-mobile h1{ font-size: 30px; }
.t23 .props{ padding: 12px 0 18px; font-size: 13px; border-bottom: 1px solid rgba(55,53,47,.09); margin-bottom: 18px; }
.t23.dark .props{ border-color: rgba(255,255,255,.094); }
.t23 .props .row{ display: grid; grid-template-columns: 160px 1fr; gap: 6px; padding: 4px 0; align-items: baseline; }
.t23-mobile .props .row{ grid-template-columns: 110px 1fr; }
.t23 .props .k{ opacity: .55; display: flex; align-items: center; gap: 6px; font-size: 13px; }
.t23 .props .k span{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; }
.t23 .props .v .tag{ display: inline-block; padding: 1px 8px; border-radius: 4px; font-size: 12px; margin-right: 4px; background: rgba(55,53,47,.08); }
.t23.dark .props .v .tag{ background: rgba(255,255,255,.08); }
.t23 .props .v .tag.acc{ background: #faebdd; color: #5a4225; }
.t23.dark .props .v .tag.acc{ background: #3b2d1c; color: #f0c47b; }
.t23 .props .v .tag.live{ background: #ddedea; color: #1f5e51; }
.t23.dark .props .v .tag.live{ background: #1f2e2a; color: #6dd3b8; }
.t23 .callout{ padding: 14px 16px; background: #f7f6f3; border-radius: 4px; margin: 18px 0; display: flex; gap: 12px; align-items: flex-start; font-size: 14px; line-height: 1.55; }
.t23.dark .callout{ background: #2a2a2a; }
.t23 .callout .em{ font-size: 22px; line-height: 1; flex-shrink: 0; }
.t23 h2{ font-size: 24px; font-weight: 700; margin: 32px 0 10px; letter-spacing: -0.01em; padding-top: 4px; }
.t23 h3{ font-size: 18px; font-weight: 600; margin: 20px 0 6px; }
.t23 hr{ border: 0; border-top: 1px solid rgba(55,53,47,.16); margin: 22px 0; }
.t23.dark hr{ border-color: rgba(255,255,255,.16); }
.t23 .toggle{ padding: 8px 0; border-radius: 4px; }
.t23 .toggle summary{ display: flex; align-items: baseline; gap: 8px; cursor: pointer; list-style: none; font-weight: 500; padding: 4px 8px; border-radius: 4px; }
.t23 .toggle summary::-webkit-details-marker{ display: none; }
.t23 .toggle summary::before{ content: "▸"; transition: transform .15s; font-size: 11px; opacity: .55; }
.t23 .toggle[open] summary::before{ transform: rotate(90deg); }
.t23 .toggle summary:hover{ background: rgba(55,53,47,.05); }
.t23.dark .toggle summary:hover{ background: rgba(255,255,255,.05); }
.t23 .toggle .toggle-body{ padding: 6px 0 6px 28px; opacity: .85; font-size: 14px; line-height: 1.6; }
.t23 .check{ padding: 4px 0; display: flex; gap: 10px; align-items: baseline; font-size: 14px; }
.t23 .check input{ margin: 0; }
.t23 .check .done{ opacity: .55; text-decoration: line-through; }
.t23 table{ width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
.t23 table th{ text-align: left; font-weight: 500; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; opacity: .55; padding: 6px 8px; border-bottom: 1px solid rgba(55,53,47,.16); }
.t23.dark table th{ border-color: rgba(255,255,255,.16); }
.t23 table td{ padding: 8px; border-bottom: 1px solid rgba(55,53,47,.08); vertical-align: top; }
.t23.dark table td{ border-color: rgba(255,255,255,.08); }
.t23 table .pill{ display: inline-block; padding: 1px 8px; border-radius: 4px; background: rgba(55,53,47,.08); font-size: 12px; }
.t23.dark table .pill{ background: rgba(255,255,255,.08); }
.t23 .bullets{ padding-left: 0; list-style: none; }
.t23 .bullets li{ padding: 3px 0; padding-left: 24px; position: relative; }
.t23 .bullets li::before{ content: "•"; position: absolute; left: 8px; opacity: .55; }
.t23 .cite{ border-left: 3px solid rgba(55,53,47,.4); padding: 4px 0 4px 14px; font-style: italic; font-size: 15px; opacity: .85; margin: 14px 0; }
.t23.dark .cite{ border-color: rgba(255,255,255,.4); }
`;
function Tpl23Notion({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T23_CSS}</style>
    <div className={`t23 ${mode === 'mobile' ? 't23-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="crumbs">
        <span className="ic"></span>
        <span>Workspace</span><span style={{ opacity: .35 }}>/</span>
        <span>Personal</span><span style={{ opacity: .35 }}>/</span>
        <span>{p.name.split(" ")[0]} — Portfolio</span>
      </div>
      <div className="doc23">
        <div className="cover"></div>
        <div className="emoji">A</div>
        <h1>{p.name} — portfolio & CV</h1>

        <div className="props">
          <div className="row"><span className="k"><span>◎</span> Role</span><span className="v">{p.role}</span></div>
          <div className="row"><span className="k"><span>★</span> Status</span><span className="v"><span className="tag live">● Open to opportunities</span><span className="tag">Sept 2026</span></span></div>
          <div className="row"><span className="k"><span>◐</span> Tags</span><span className="v"><span className="tag acc">strategy</span><span className="tag acc">marketplaces</span><span className="tag acc">writing</span></span></div>
          <div className="row"><span className="k"><span>◍</span> Location</span><span className="v">{p.location}</span></div>
          <div className="row"><span className="k"><span>✉</span> Email</span><span className="v">{p.email}</span></div>
          <div className="row"><span className="k"><span>↗</span> Links</span><span className="v">{p.socials.map(s => (<span key={s} className="tag">{s}</span>))}</span></div>
          <div className="row"><span className="k"><span>⌗</span> Languages</span><span className="v">{p.languages.map(l => (<span key={l} className="tag">{l}</span>))}</span></div>
        </div>

        <div className="callout"><span className="em">💡</span><div>{p.tagline} This page is the live version of my CV — toggle the sections below to expand.</div></div>

        <h2>About me</h2>
        <p>I came to strategy from operations. Two years at a Lagos logistics startup taught me that what gets called "execution" in a deck is usually a person making 40 decisions a day. I write about that gap.</p>

        <h3>Now</h3>
        <ul className="bullets">{p.now.map((n, i) => (<li key={i}>{n}</li>))}</ul>

        <hr/>
        <h2>Selected work</h2>
        <table>
          <thead><tr><th>Project</th><th>Kind</th><th>Year</th><th>Notes</th></tr></thead>
          <tbody>
            {p.projects.map((pr, i) => (
              <tr key={i}><td><b>{pr.title}</b></td><td><span className="pill">{pr.kind}</span></td><td><span style={{ opacity: .65, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{pr.year}</span></td><td style={{ opacity: .85 }}>{pr.note}</td></tr>
            ))}
          </tbody>
        </table>

        <h2>Experience</h2>
        {p.experience.map((e, i) => (
          <details className="toggle" key={i} open={i === 0}>
            <summary><b>{e.role}</b> · {e.org} <span style={{ marginLeft: 8, opacity: .55, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>{e.time}</span></summary>
            <div className="toggle-body">{e.note}</div>
          </details>
        ))}

        <h2>Education</h2>
        {p.education.map((e, i) => (
          <div className="check" key={i}><input type="checkbox" defaultChecked={i < p.education.length - 1} /><span className={i < p.education.length - 1 ? 'done' : ''}><b>{e.degree}</b> — {e.org} <span style={{ opacity: .55, fontSize: 12 }}>· {e.time}</span></span></div>
        ))}

        <h2>Skills & toolkit</h2>
        <table>
          <thead><tr><th>Skill</th><th>Level</th></tr></thead>
          <tbody>
            {p.skills.map((s, i) => (
              <tr key={s}><td>{s}</td><td><span className="pill">{["Advanced", "Strong", "Working", "Strong", "Strong", "Working"][i] || "Working"}</span></td></tr>
            ))}
          </tbody>
        </table>

        <h2>Awards</h2>
        <ul className="bullets">{p.awards.map((a, i) => (<li key={i}><b>{a.name}</b> <span style={{ opacity: .55, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>· {a.year}</span></li>))}</ul>

        <h2>References</h2>
        <div className="cite">"{p.testimonials[0].quote}"<br/><span style={{ fontStyle: 'normal', fontSize: 13, opacity: .65 }}>— {p.testimonials[0].author}</span></div>

        <div className="callout" style={{ marginTop: 30 }}><span className="em">📬</span><div><b>Get in touch</b> · {p.email} · or pick a time from my calendar in the link tray above.</div></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   24 — SPARE TYPE-DRIVEN  ·  designer persona
   Signature: huge whitespace, single accent, type-led, no images.
   ───────────────────────────────────────────────────────────────── */
const T24_CSS = `
.t24{ font-family: "Inter", system-ui, sans-serif; background: #fbfaf7; color: #1c1815; min-height: 100%; padding: 0; }
.t24.dark{ background: #100e0c; color: #f0ede5; }
.t24 .container24{ max-width: 760px; margin: 0 auto; padding: 80px 32px 60px; }
.t24-mobile .container24{ padding: 28px 20px 50px; }
.t24 .top{ display: flex; justify-content: space-between; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; padding-bottom: 80px; }
.t24-mobile .top{ padding-bottom: 30px; }
.t24 .top a{ color: inherit; text-decoration: none; opacity: .55; transition: opacity .15s; }
.t24 .top a:hover{ opacity: 1; }
.t24 .nav{ display: flex; gap: 22px; }
.t24 h1{ font-family: "Fraunces", serif; font-weight: 400; font-size: clamp(48px, 7vw, 88px); line-height: 1.02; letter-spacing: -0.025em; margin: 0 0 32px; max-width: 660px; }
.t24-mobile h1{ font-size: 42px; }
.t24 h1 em{ font-style: italic; color: #b3441f; font-weight: 400; }
.t24.dark h1 em{ color: #ff8d63; }
.t24 .meta-line{ display: grid; grid-template-columns: 100px 1fr; gap: 24px; padding: 14px 0; border-top: 1px solid rgba(28,24,21,.12); font-size: 14px; align-items: baseline; }
.t24.dark .meta-line{ border-color: rgba(240,237,229,.12); }
.t24 .meta-line:last-of-type{ border-bottom: 1px solid rgba(28,24,21,.12); }
.t24.dark .meta-line:last-of-type{ border-bottom-color: rgba(240,237,229,.12); }
.t24 .meta-line .k{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.06em; opacity: .55; text-transform: uppercase; }
.t24 h2{ font-family: "Inter", sans-serif; font-weight: 500; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; margin: 80px 0 28px; opacity: .55; display: flex; justify-content: space-between; align-items: baseline; }
.t24-mobile h2{ margin: 50px 0 22px; }
.t24 h2 small{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; opacity: .65; }
.t24 .entry{ padding: 22px 0; border-top: 1px solid rgba(28,24,21,.12); display: grid; grid-template-columns: 100px 1fr 60px; gap: 24px; align-items: baseline; transition: padding .15s; cursor: pointer; }
.t24.dark .entry{ border-color: rgba(240,237,229,.12); }
.t24-mobile .entry{ grid-template-columns: 80px 1fr; gap: 14px; }
.t24-mobile .entry .yr2{ display: none; }
.t24 .entry:hover{ padding-left: 12px; }
.t24 .entry .yr{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; }
.t24 .entry h3{ font-family: "Fraunces", serif; font-size: 26px; line-height: 1.15; margin: 0; letter-spacing: -0.015em; font-weight: 400; }
.t24 .entry h3 em{ font-style: italic; }
.t24 .entry .where{ font-size: 13px; opacity: .65; margin-top: 4px; max-width: 480px; line-height: 1.5; }
.t24 .entry .yr2{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; text-align: right; }
.t24 .lede24{ font-family: "Fraunces", serif; font-size: 22px; line-height: 1.45; max-width: 580px; font-style: italic; font-weight: 400; opacity: .85; padding: 22px 0; border-top: 1px solid rgba(28,24,21,.12); }
.t24.dark .lede24{ border-color: rgba(240,237,229,.12); }
.t24 .tags{ display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; opacity: .8; padding-top: 8px; }
.t24 .tags span{ display: inline-flex; align-items: center; gap: 6px; }
.t24 .tags span::before{ content: ""; width: 4px; height: 4px; background: currentColor; border-radius: 999px; opacity: .5; }
.t24 .pull24{ font-family: "Fraunces", serif; font-style: italic; font-size: 32px; line-height: 1.2; margin: 50px 0; max-width: 640px; letter-spacing: -0.01em; }
.t24-mobile .pull24{ font-size: 22px; margin: 30px 0; }
.t24 .pull24 cite{ display: block; font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 18px; opacity: .55; }
.t24 .foot-line{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; padding-top: 24px; border-top: 1px solid rgba(28,24,21,.12); margin-top: 60px; display: flex; justify-content: space-between; opacity: .65; }
.t24.dark .foot-line{ border-color: rgba(240,237,229,.12); }
`;
function Tpl24Spare({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T24_CSS}</style>
    <div className={`t24 ${mode === 'mobile' ? 't24-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="container24">
        <div className="top">
          <span>{p.name.split(" ")[0].toLowerCase()}.studio · index</span>
          {mode !== 'mobile' && <nav className="nav"><a>work</a><a>about</a><a>writing</a><a>{p.email}</a></nav>}
        </div>

        <h1>I'm {p.name}, a designer working in <em>books, type & print</em>, currently in {p.location}.</h1>

        <div className="meta-line"><span className="k">Status</span><span>Available for freelance · September 2026</span></div>
        <div className="meta-line"><span className="k">Focus</span><span>{p.role.split(" — ")[0]} · long-form print, identity, type design</span></div>
        <div className="meta-line"><span className="k">Studying</span><span>{p.school}</span></div>
        <div className="meta-line"><span className="k">Languages</span><span>{p.languages.join(" · ")}</span></div>

        <p className="lede24">"A practice is just showing up a lot of times. I draw, I print, I bind, I re-cover. Then I do it again the next Tuesday."</p>

        <h2>Selected work<small>{p.projects.length} pieces · 2023—25</small></h2>
        {p.projects.map((pr, i) => (
          <div className="entry" key={i}>
            <span className="yr">{pr.year}</span>
            <div>
              <h3>{pr.title}</h3>
              <div className="where">{pr.kind} · {pr.note}</div>
            </div>
            <span className="yr2">№ {String(i+1).padStart(2,"0")}</span>
          </div>
        ))}

        <h2>Practice<small>cv · in brief</small></h2>
        {p.experience.map((e, i) => (
          <div className="entry" key={i}>
            <span className="yr">{e.time}</span>
            <div><h3><em>{e.role}</em>, {e.org}</h3><div className="where">{e.note}</div></div>
            <span className="yr2">↗</span>
          </div>
        ))}

        <h2>Education</h2>
        {p.education.map((e, i) => (
          <div className="entry" key={i}>
            <span className="yr">{e.time}</span>
            <div><h3><em>{e.degree}</em></h3><div className="where">{e.org}</div></div>
            <span className="yr2">{String(i+1).padStart(2,"0")}</span>
          </div>
        ))}

        <h2>Distinctions</h2>
        {p.awards.map((a, i) => (
          <div className="entry" key={i}>
            <span className="yr">{a.year}</span>
            <div><h3>{a.name}</h3></div>
            <span className="yr2">★</span>
          </div>
        ))}

        <div className="pull24">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}</cite></div>

        <h2>Tools of the trade</h2>
        <div className="tags">{p.skills.map(s => (<span key={s}>{s}</span>))}</div>

        <div className="foot-line">
          <span>{p.email}</span>
          <span>{p.socials.join(" · ")}</span>
          <span>Last updated · May 12, 2026</span>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   25 — PERSONAL BLOG  ·  developer persona
   Signature: writer-developer blog. Featured post + archive index, RSS, tags.
   ───────────────────────────────────────────────────────────────── */
const T25_CSS = `
.t25{ font-family: "Inter", system-ui, sans-serif; background: #f7f5f0; color: #1a1714; min-height: 100%; padding: 0; }
.t25.dark{ background: #131210; color: #e8e3d8; }
.t25 .nav25{ display: flex; justify-content: space-between; align-items: baseline; padding: 22px 28px; border-bottom: 1px solid rgba(26,23,20,.1); }
.t25.dark .nav25{ border-color: rgba(232,227,216,.1); }
.t25 .nav25 .brand{ font-family: "Fraunces", serif; font-weight: 700; font-size: 18px; letter-spacing: -0.015em; }
.t25 .nav25 nav{ display: flex; gap: 22px; font-size: 13px; }
.t25 .nav25 nav a{ color: inherit; text-decoration: none; opacity: .65; }
.t25 .nav25 nav a:hover, .t25 .nav25 nav a.on{ opacity: 1; }
.t25 .nav25 .rss{ display: inline-flex; align-items: center; gap: 6px; font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .65; }
.t25 .nav25 .rss::before{ content: ""; display: inline-block; width: 10px; height: 10px; border: 2px solid currentColor; border-radius: 0 100% 0 0; opacity: .55; }
.t25 .layout{ max-width: 980px; margin: 0 auto; padding: 36px 28px 60px; display: grid; grid-template-columns: 1fr 260px; gap: 48px; }
.t25-mobile .layout{ grid-template-columns: 1fr; padding: 22px 18px 50px; gap: 32px; }
.t25 .hero25{ padding-bottom: 32px; border-bottom: 1px solid rgba(26,23,20,.1); margin-bottom: 32px; }
.t25.dark .hero25{ border-color: rgba(232,227,216,.1); }
.t25 .hero25 .kicker{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.14em; opacity: .55; text-transform: uppercase; margin-bottom: 14px; }
.t25 .hero25 h1{ font-family: "Fraunces", serif; font-weight: 700; font-size: clamp(38px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 14px; max-width: 540px; }
.t25 .hero25 .deck{ font-size: 17px; line-height: 1.5; opacity: .85; max-width: 540px; }
.t25 .hero25 .meta{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .65; margin-top: 18px; display: flex; gap: 18px; flex-wrap: wrap; }
.t25 .post-list h2{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; margin: 0 0 16px; font-weight: 600; }
.t25 .post{ padding: 18px 0; border-top: 1px solid rgba(26,23,20,.1); display: grid; grid-template-columns: 90px 1fr; gap: 18px; cursor: pointer; transition: padding .15s; }
.t25.dark .post{ border-color: rgba(232,227,216,.1); }
.t25 .post:hover{ padding-left: 8px; }
.t25-mobile .post{ grid-template-columns: 70px 1fr; gap: 12px; }
.t25 .post .date{ font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .55; padding-top: 6px; }
.t25 .post h3{ font-family: "Fraunces", serif; font-size: 22px; margin: 0 0 4px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.2; }
.t25 .post p{ margin: 0 0 8px; font-size: 14px; line-height: 1.5; opacity: .8; }
.t25 .post .tags{ display: flex; gap: 6px; font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; letter-spacing: 0.06em; }
.t25 .post .tags span::before{ content: "#"; }
.t25 .side{ font-size: 13px; line-height: 1.5; }
.t25 .side .card{ padding: 18px; background: #ede9dc; border-radius: 8px; margin-bottom: 16px; }
.t25.dark .side .card{ background: #1f1c17; }
.t25 .side h4{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; margin: 0 0 10px; font-weight: 600; }
.t25 .side .who{ display: flex; gap: 12px; align-items: center; margin-bottom: 10px; }
.t25 .side .who .pic{ width: 44px; height: 44px; border-radius: 999px; background: #1a1714; color: #f7f5f0; display: flex; align-items: center; justify-content: center; font-family: "Fraunces", serif; font-weight: 700; font-size: 18px; }
.t25.dark .side .who .pic{ background: #f7f5f0; color: #1a1714; }
.t25 .side .who b{ font-family: "Fraunces", serif; font-size: 17px; font-weight: 700; letter-spacing: -0.01em; }
.t25 .side .who small{ display: block; opacity: .65; font-size: 12px; }
.t25 .side .row{ padding: 6px 0; border-top: 1px solid rgba(0,0,0,.08); font-size: 12px; }
.t25.dark .side .row{ border-color: rgba(255,255,255,.08); }
.t25 .side .row:first-of-type{ border-top: 0; padding-top: 0; }
.t25 .side .row b{ font-weight: 500; }
.t25 .side .row .when{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; }
.t25 .side .tag-cloud span{ display: inline-block; font-family: "JetBrains Mono", monospace; font-size: 11px; padding: 2px 7px; background: rgba(0,0,0,.06); border-radius: 4px; margin: 0 4px 4px 0; opacity: .85; }
.t25.dark .side .tag-cloud span{ background: rgba(255,255,255,.07); }
.t25 .side .subscribe{ padding: 16px; background: #1a1714; color: #f7f5f0; border-radius: 8px; }
.t25.dark .side .subscribe{ background: #f7f5f0; color: #1a1714; }
.t25 .side .subscribe h4{ color: inherit; opacity: .65; }
.t25 .side .subscribe .inp{ display: flex; margin-top: 8px; }
.t25 .side .subscribe input{ flex: 1; background: rgba(255,255,255,.1); border: 0; border-radius: 6px 0 0 6px; padding: 8px 10px; font-family: inherit; color: inherit; font-size: 12px; outline: none; }
.t25.dark .side .subscribe input{ background: rgba(0,0,0,.08); }
.t25 .side .subscribe button{ background: #ff7a45; color: #1a1714; border: 0; padding: 8px 12px; border-radius: 0 6px 6px 0; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
.t25 .foot25{ padding: 24px 28px; font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .65; letter-spacing: 0.06em; display: flex; justify-content: space-between; border-top: 1px solid rgba(26,23,20,.1); }
.t25.dark .foot25{ border-color: rgba(232,227,216,.1); }
`;
function Tpl25Blog({ mode, dark }) {
  const p = PERSONAS.developer;
  const initials = p.name.split(" ").map(s => s[0]).join("");
  const posts = [
    { date: "May 8 · 26", title: p.writing[0].title, snip: "What I learned from rewriting a Kubernetes-shaped object in 1,400 lines.", tags: ["distributed", "go"] },
    { date: "Apr 12 · 26", title: p.writing[1].title, snip: "A storage engine you can read in one sitting. Goals, decisions, regrets.", tags: ["rust", "databases"] },
    { date: "Mar 03 · 26", title: p.writing[2].title, snip: "Spent two weekends rewriting my dotfiles. Was it worth it? Probably no, but here's what I changed.", tags: ["tooling", "linux"] },
    { date: "Feb 18 · 26", title: "Notes from my first month at Stripe", snip: "I joined the payments orchestration team. Here are the things that surprised me.", tags: ["internship"] },
    { date: "Jan 06 · 26", title: "Why I'm staying in school for one more year", snip: "On the urge to leave early vs the value of a graduate exchange.", tags: ["school"] },
  ];
  return (<>
    <style>{T25_CSS}</style>
    <div className={`t25 ${mode === 'mobile' ? 't25-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <header className="nav25">
        <div className="brand">{p.name.split(" ")[0].toLowerCase()}.dev</div>
        {mode !== 'mobile' && (<nav><a className="on">writing</a><a>projects</a><a>cv</a><a>now</a><a>contact</a></nav>)}
        <div className="rss">RSS · {p.socials[0]}</div>
      </header>

      <div className="layout">
        <main>
          <section className="hero25">
            <div className="kicker">Featured · May 8, 2026</div>
            <h1>{posts[0].title}</h1>
            <p className="deck">A 1,400-line container orchestrator is not a Kubernetes replacement. It's a teaching tool. Here is what I cut, what I kept, and what teaching with it has taught me.</p>
            <div className="meta"><span>6 min read</span><span>·</span><span>#distributed-systems</span><span>·</span><span>34 comments</span></div>
          </section>

          <div className="post-list">
            <h2>Archive · 2026</h2>
            {posts.slice(1).map((post, i) => (
              <article className="post" key={i}>
                <div className="date">{post.date}</div>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.snip}</p>
                  <div className="tags">{post.tags.map(t => (<span key={t}>{t}</span>))}</div>
                </div>
              </article>
            ))}

            <h2 style={{ marginTop: 40 }}>Selected projects</h2>
            {p.projects.map((pr, i) => (
              <article className="post" key={i}>
                <div className="date">'{pr.year.slice(-2)}</div>
                <div>
                  <h3>{pr.title}</h3>
                  <p>{pr.note}</p>
                  <div className="tags"><span>{pr.kind.toLowerCase().replace(/\s+/g, "-")}</span></div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {mode !== 'mobile' && (
          <aside className="side">
            <div className="card">
              <div className="who">
                <div className="pic">{initials}</div>
                <div><b>{p.name}</b><small>{p.role}</small></div>
              </div>
              <p style={{ margin: '0 0 10px', opacity: .85 }}>{p.tagline}</p>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: .65 }}>↗ {p.location} · ◐ {p.school}</div>
            </div>

            <div className="card">
              <h4>Currently</h4>
              {p.now.map((n, i) => (<div key={i} style={{ padding: '4px 0', fontSize: 13 }}>· {n}</div>))}
            </div>

            <div className="card">
              <h4>Experience</h4>
              {p.experience.map((e, i) => (
                <div key={i} className="row">
                  <b>{e.role}</b> · {e.org}<br/>
                  <span className="when">{e.time}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <h4>Tags</h4>
              <div className="tag-cloud">{[...p.skills, "internship", "distributed", "open-source", "writing"].map(t => (<span key={t}>{t}</span>))}</div>
            </div>

            <div className="card">
              <h4>Awards</h4>
              {p.awards.map((a, i) => (<div key={i} className="row"><b>{a.name}</b> · <span className="when">{a.year}</span></div>))}
            </div>

            <div className="subscribe">
              <h4>Get new posts in your inbox</h4>
              <div className="inp"><input placeholder="you@email.com" defaultValue="" /><button>Subscribe</button></div>
              <div style={{ marginTop: 8, fontSize: 11, opacity: .65 }}>~1 post a month. No spam.</div>
            </div>
          </aside>
        )}
      </div>

      <footer className="foot25">
        <span>© {p.name} · 2026</span>
        <span>built with folio.app · {p.socials.join(" · ")}</span>
      </footer>
    </div>
  </>);
}

window.Tpl21Resume = Tpl21Resume;
window.Tpl22Bento = Tpl22Bento;
window.Tpl23Notion = Tpl23Notion;
window.Tpl24Spare = Tpl24Spare;
window.Tpl25Blog = Tpl25Blog;

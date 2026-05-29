/* global React, BrowserFrame, PhoneFrame, PERSONAS */
const { useState, useEffect, useRef } = React;

/* ─────────────────────────────────────────────────────────────────
   01 — TERMINAL  ·  developer persona
   Signature: type-on hero, blinking cursor, command-line nav.
   ───────────────────────────────────────────────────────────────── */
const T1_CSS = `
.t1{ font-family: "JetBrains Mono", ui-monospace, monospace; color: #e6e6e6; background: #0a0d10; min-height: 100%; padding: 24px 28px 80px; }
.t1.light{ background: #f5f3ee; color: #1a1816; }
.t1-mobile{ padding: 18px 16px 60px; font-size: 12px; }
.t1 .top{ display:flex; justify-content:space-between; font-size: 11px; opacity:.62; letter-spacing:.06em; text-transform:uppercase; border-bottom: 1px dashed currentColor; padding-bottom: 8px; margin-bottom: 22px;}
.t1 .top span{ display:flex; gap: 10px; }
.t1 .top em{ color: #6df5a4; font-style: normal; }
.t1.light .top em{ color: #1f7a3f; }
.t1 .prompt{ color:#6df5a4; }
.t1.light .prompt{ color: #1f7a3f; }
.t1 h1{ font-size: clamp(28px, 4.2vw, 56px); font-weight: 700; margin: 6px 0 12px; line-height: 1.05; letter-spacing: -0.01em; }
.t1-mobile h1{ font-size: 28px; }
.t1 h1 .cursor{ display:inline-block; width:0.55ch; background: currentColor; height: 0.95em; transform: translateY(0.12em); animation: t1blink 1s steps(1) infinite; margin-left: 2px; }
@keyframes t1blink{ 50%{ opacity: 0 } }
.t1 .ascii{ white-space: pre; font-size: 10px; line-height: 1.1; opacity:.55; margin: 4px 0 18px; overflow:hidden; }
.t1-mobile .ascii{ font-size: 7px; }
.t1 .row{ margin-bottom: 8px; display:flex; gap: 14px; align-items: baseline; }
.t1 .key{ color:#7aa9ff; min-width: 110px; }
.t1.light .key{ color: #2a4f9c; }
.t1-mobile .key{ min-width: 78px; font-size: 11px; }
.t1 hr{ border: 0; border-top: 1px dashed currentColor; opacity:.25; margin: 28px 0; }
.t1 h2{ font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.55; font-weight: 500; margin: 0 0 14px; }
.t1 h2::before{ content: "// "; opacity:.55; }
.t1 .proj{ border: 1px dashed currentColor; padding: 14px 16px; margin: 0 0 10px; transition: background .15s; cursor: pointer; }
.t1 .proj:hover{ background: rgba(109, 245, 164, 0.06); }
.t1.light .proj:hover{ background: rgba(31,122,63,.05); }
.t1 .proj .head{ display:flex; justify-content:space-between; gap: 16px; align-items: baseline; flex-wrap: wrap; }
.t1 .proj .name{ color: #6df5a4; font-weight: 500; }
.t1.light .proj .name{ color: #1f7a3f; }
.t1 .proj .meta{ font-size: 11px; opacity: .55; }
.t1 .proj p{ margin: 6px 0 0; font-size: 12px; opacity: .8; }
.t1 .nav{ display:flex; gap: 18px; font-size: 11px; flex-wrap: wrap; margin-bottom: 12px; }
.t1 .nav a{ color: inherit; text-decoration: none; opacity: .7; border-bottom: 1px solid transparent; padding-bottom: 2px; }
.t1 .nav a::before{ content: "› "; opacity:.5; }
.t1 .nav a:hover{ opacity:1; border-bottom-color: currentColor; }
.t1 .stat-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size:11px; margin: 14px 0 24px; }
.t1-mobile .stat-grid{ grid-template-columns: repeat(2, 1fr); }
.t1 .stat-grid div{ border: 1px dashed currentColor; padding: 8px 10px; }
.t1 .stat-grid b{ font-size: 18px; display:block; color:#6df5a4; font-weight: 500; }
.t1.light .stat-grid b{ color: #1f7a3f; }
.t1 .skills{ display:flex; flex-wrap:wrap; gap: 6px; font-size: 11px; }
.t1 .skills span{ border: 1px solid currentColor; padding: 2px 8px; opacity:.85; }
.t1 .deploy{ margin-top: 26px; border: 1px solid currentColor; padding: 14px; }
.t1 .deploy b{ color:#6df5a4; }
.t1.light .deploy b{ color: #1f7a3f; }
`;
function Tpl01Terminal({ mode, dark }) {
  const p = PERSONAS.developer;
  const [typed, setTyped] = useState("");
  const target = `${p.name.split(" ")[0].toLowerCase()}@dev:~$ whoami`;
  useEffect(() => {
    let i = 0; const id = setInterval(() => {
      i++; setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [mode]);
  return (<>
    <style>{T1_CSS}</style>
    <div className={`t1 ${mode === 'mobile' ? 't1-mobile' : ''} ${dark ? '' : 'light'}`}>
      <div className="top">
        <span><em>●</em> online</span>
        <span>v1.2 · last build 3m ago</span>
      </div>
      <div className="nav">
        <a href="#">about</a><a href="#">work</a><a href="#">cv</a><a href="#">contact</a>
      </div>
      <div className="prompt">{typed}<span style={{ background: "currentColor", display:"inline-block", width:"0.55ch", height:"0.9em", marginLeft: 2, animation: "t1blink 1s steps(1) infinite", transform:"translateY(0.12em)" }} /></div>
      <h1>{p.name}.<br/>builds<br/>tiny tools.</h1>
      <pre className="ascii">{`  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐\n  │░│ │▒│ │▓│ │█│ │ │   ${p.school}\n  └─┘ └─┘ └─┘ └─┘ └─┘`}</pre>

      <div className="row"><span className="key">role</span><span>{p.role}</span></div>
      <div className="row"><span className="key">based</span><span>{p.location}</span></div>
      <div className="row"><span className="key">stack</span><span>{p.skills.slice(0, 4).join(" · ")}</span></div>
      <div className="row"><span className="key">email</span><span>{p.email}</span></div>

      <div className="stat-grid">
        <div><b>14</b>repos</div><div><b>2.1k</b>commits this yr</div><div><b>4</b>internships</div><div><b>3.92</b>GPA</div>
      </div>

      <hr/>
      <h2>cat about.md</h2>
      <p style={{ fontSize: 13, opacity: .85, lineHeight: 1.7, maxWidth: 620 }}>{p.tagline} I like systems that fit in your head — small enough to read, sharp enough to ship. Right now I'm exploring storage engines and writing more Rust than is strictly necessary.</p>

      <hr/>
      <h2>ls -la projects/</h2>
      {p.projects.map((pr, i) => (
        <div className="proj" key={i}>
          <div className="head"><span className="name">./{pr.title.toLowerCase().replace(/\s+/g, "-")}</span><span className="meta">{pr.kind} · {pr.year}</span></div>
          <p>{pr.note}</p>
        </div>
      ))}

      <hr/>
      <h2>git log --experience</h2>
      {p.experience.map((e, i) => (
        <div className="row" key={i} style={{ flexDirection: "column", alignItems: "flex-start", gap: 4, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <span className="key" style={{ minWidth: 0 }}>{e.time}</span>
            <span style={{ fontWeight: 500 }}>{e.role} · {e.org}</span>
          </div>
          <span style={{ opacity: .7, fontSize: 12, paddingLeft: mode === 'mobile' ? 0 : 122 }}>{e.note}</span>
        </div>
      ))}

      <hr/>
      <h2>./skills --list</h2>
      <div className="skills">{p.skills.map(s => <span key={s}>{s}</span>)}</div>

      <hr/>
      <h2>education</h2>
      {p.education.map((e, i) => (
        <div className="row" key={i}><span className="key">{e.time}</span><span>{e.degree} · <em style={{ opacity:.6, fontStyle:"normal" }}>{e.org}</em></span></div>
      ))}

      <hr/>
      <h2>cat now.md</h2>
      <div style={{ fontSize: 12, opacity: .85, lineHeight: 1.8 }}>
        {p.now.map((n, i) => (<div key={i}>· {n}</div>))}
      </div>

      <hr/>
      <h2>./awards --list</h2>
      {p.awards.map((a, i) => (
        <div className="row" key={i}><span className="key">{a.year}</span><span>{a.name}</span></div>
      ))}

      <hr/>
      <h2>writing/</h2>
      {p.writing.map((w, i) => (
        <div className="proj" key={i}>
          <div className="head"><span className="name">{w.title}</span><span className="meta">{w.where} · {w.year}</span></div>
        </div>
      ))}

      <hr/>
      <h2># refs</h2>
      {p.testimonials.map((t, i) => (
        <div key={i} style={{ borderLeft: "3px solid #6df5a4", paddingLeft: 14, marginBottom: 14, fontSize: 12, lineHeight: 1.55 }}>
          <span style={{ opacity: .85 }}>&gt; {t.quote}</span>
          <div style={{ opacity: .55, marginTop: 4, fontSize: 11 }}>— {t.author}</div>
        </div>
      ))}

      <div className="deploy"><b>$ deploy --subdomain jordan</b><br/><span style={{ opacity:.6, fontSize: 11 }}>→ jordan.folio.app · live in 12 seconds</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   02 — EDITORIAL  ·  designer persona
   Signature: huge serif headline, drop cap, multi-column body.
   ───────────────────────────────────────────────────────────────── */
const T2_CSS = `
.t2{ font-family: "IBM Plex Serif", Georgia, serif; background: #f6f1e7; color: #1a1814; padding: 0; min-height: 100%; }
.t2.dark{ background: #14110d; color: #e8e3d5; }
.t2 .head{ padding: 22px 28px 16px; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid currentColor;}
.t2 .head .ms{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 13px; }
.t2 .head .nav{ font-family: "IBM Plex Sans", sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; display: flex; gap: 18px; }
.t2 .head .nav a{ color: inherit; text-decoration: none; }
.t2 .head .nav a:hover{ font-style: italic; }
.t2 .issue{ font-family: "IBM Plex Sans", sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 28px; display: flex; justify-content: space-between; border-bottom: 1px solid currentColor; }
.t2 .hero{ padding: 36px 28px 28px; text-align: center; border-bottom: 1px solid currentColor; }
.t2 .hero .kicker{ font-family: "IBM Plex Sans", sans-serif; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; }
.t2 .hero h1{ font-family: "Fraunces", serif; font-weight: 900; font-size: clamp(48px, 9vw, 132px); line-height: 0.92; margin: 18px 0; letter-spacing: -0.025em; font-style: italic; }
.t2-mobile .hero h1{ font-size: 56px; }
.t2 .hero h1 em{ font-style: normal; }
.t2 .hero .sub{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 15px; max-width: 540px; margin: 0 auto; opacity: .75;}
.t2 .body{ padding: 30px 28px; column-count: 2; column-gap: 28px; column-rule: 1px solid currentColor; font-size: 14px; line-height: 1.7; border-bottom: 1px solid currentColor; }
.t2-mobile .body{ column-count: 1; }
.t2 .body p:first-of-type::first-letter{ font-family: "Fraunces", serif; font-weight: 900; font-size: 5em; float: left; line-height: 0.85; padding: 4px 8px 0 0; }
.t2 .pull{ font-family: "Fraunces", serif; font-style: italic; font-size: 22px; line-height: 1.3; padding: 28px; text-align:center; border-bottom: 1px solid currentColor; }
.t2 .pull span{ display:block; font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 12px; opacity: .55; }
.t2 .section{ padding: 32px 28px; border-bottom: 1px solid currentColor; }
.t2 .section h2{ font-family: "IBM Plex Sans", sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; margin: 0 0 22px; }
.t2 .works{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px 32px; }
.t2-mobile .works{ grid-template-columns: 1fr; }
.t2 .work{ display: grid; grid-template-columns: 90px 1fr; gap: 16px; align-items: start; cursor: pointer; }
.t2 .work .ph{ aspect-ratio: 3/4; }
.t2 .work .ph.imgph{ font-style: normal; }
.t2 .work h3{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 24px; margin: 0 0 4px; line-height: 1.05; transition: transform .2s; }
.t2 .work:hover h3{ transform: translateX(4px); }
.t2 .work .meta{ font-family: "IBM Plex Sans", sans-serif; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; margin-bottom: 6px; }
.t2 .work p{ font-size: 12px; margin: 0; opacity: .8; line-height: 1.45; }
.t2 .cv-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 26px; font-family: "IBM Plex Sans", sans-serif; font-size: 12px; }
.t2-mobile .cv-grid{ grid-template-columns: 1fr; }
.t2 .cv-grid h3{ font-family: "Fraunces", serif; font-style: italic; font-size: 18px; margin: 0 0 12px; font-weight: 700; }
.t2 .cv-item{ padding: 8px 0; border-top: 1px solid currentColor; display: grid; grid-template-columns: 80px 1fr; gap: 12px; }
.t2 .cv-item .yr{ opacity: .55; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding-top: 2px; }
.t2 .colophon{ padding: 24px 28px; font-family: "IBM Plex Sans", sans-serif; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; display: flex; justify-content: space-between; }
`;
function Tpl02Editorial({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T2_CSS}</style>
    <div className={`t2 ${mode === 'mobile' ? 't2-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="head">
        <div className="ms">№ 07 · Spring</div>
        <nav className="nav"><a href="#">Works</a><a href="#">Words</a><a href="#">CV</a><a href="#">Contact</a></nav>
      </div>
      <div className="issue"><span>{p.school}</span><span>est. 2002 · Milan</span></div>

      <section className="hero">
        <div className="kicker">Folio · 2025</div>
        <h1>The Quiet<br/><em>Hours</em></h1>
        <div className="sub">A working journal of books, posters, type, and the small decisions in between, by {p.name}.</div>
      </section>

      <div className="body">
        <p>I came to design through books — flipping through my grandmother's recipe binder and noticing how she'd typed in different ribbons, how a margin could feel like a held breath. That noticing has not left me. {p.tagline}</p>
        <p>This year I've been thinking about how slowness is a craft, and how the page is the place I keep returning to. I work in print, in screens, and increasingly in three dimensions when a brief calls for it.</p>
      </div>

      <div className="pull">"A margin is a held breath. A line break is the exhale."<span>— from the studio notebook, March</span></div>

      <section className="section">
        <h2>Currently · A Working List</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr 1fr', gap: 18, fontSize: 13, lineHeight: 1.5 }}>
          {p.now.map((n, i) => (
            <div key={i} style={{ paddingTop: 10, borderTop: '1px solid currentColor' }}>
              <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>№ {String(i+1).padStart(2,"0")}</div>
              <div style={{ fontStyle: 'italic' }}>{n}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Selected Works · 2023 — 2025</h2>
        <div className="works">
          {p.projects.map((pr, i) => (
            <div className="work" key={i}>
              <div className="imgph ph">{pr.kind}</div>
              <div>
                <div className="meta">{pr.kind} · {pr.year}</div>
                <h3>{pr.title}</h3>
                <p>{pr.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Curriculum Vitae</h2>
        <div className="cv-grid">
          <div>
            <h3>Experience</h3>
            {p.experience.map((e, i) => (
              <div className="cv-item" key={i}><span className="yr">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity:.6 }}>{e.note}</span></div></div>
            ))}
            <h3 style={{ marginTop: 22 }}>Skills</h3>
            <div style={{ fontSize: 12, lineHeight: 1.9 }}>{p.skills.join(" · ")}</div>
          </div>
          <div>
            <h3>Education</h3>
            {p.education.map((e, i) => (
              <div className="cv-item" key={i}><span className="yr">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity:.6 }}>{e.org}</span></div></div>
            ))}
            <h3 style={{ marginTop: 22 }}>Index</h3>
            <div style={{ fontSize: 12, lineHeight: 1.9 }}>{p.socials.map((s,i)=><div key={i}>↗ {s}</div>)}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Awards & Distinctions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 24 }}>
          <div>
            {p.awards.map((a, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12, padding: '10px 0', borderTop: '1px solid currentColor', fontSize: 13 }}>
                <span style={{ fontFamily: '"IBM Plex Serif", serif', fontStyle: 'italic', opacity: 0.6 }}>{a.year}</span>
                <span>{a.name}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 18, margin: '0 0 8px', fontWeight: 700 }}>Selected Writing</h3>
            {p.writing.map((w, i) => (
              <div key={i} style={{ padding: '8px 0', borderTop: '1px solid currentColor', fontSize: 13 }}>
                <b style={{ fontWeight: 500 }}>{w.title}</b><br/>
                <span style={{ fontStyle: 'italic', opacity: 0.65, fontSize: 12 }}>{w.where} · {w.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pull" style={{ borderTop: '1px solid currentColor' }}>
        "{p.testimonials[0].quote}"
        <span>— {p.testimonials[0].author}</span>
      </div>

      <div className="colophon">
        <span>{p.email}</span>
        <span>Set in Fraunces & Plex · printed digitally</span>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   03 — BRUTALIST  ·  developer persona
   Signature: exposed grid, marquee, raw type, no soft edges.
   ───────────────────────────────────────────────────────────────── */
const T3_CSS = `
.t3{ font-family: "Space Grotesk", system-ui, sans-serif; background: #efeae2; color: #0c0c0c; min-height: 100%; padding: 0; --line: 1px solid #0c0c0c; }
.t3.dark{ background: #0c0c0c; color: #efeae2; --line: 1px solid #efeae2; }
.t3 .grid-bg{ position: relative; }
.t3 .header{ border-bottom: var(--line); padding: 16px 24px; display:flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
.t3 .marquee{ overflow: hidden; border-bottom: var(--line); padding: 10px 0; font-family: "Archivo Black", sans-serif; font-size: 26px; letter-spacing: -0.01em; }
.t3 .marquee div{ display: inline-block; white-space: nowrap; animation: t3marq 22s linear infinite; }
@keyframes t3marq{ 0%{ transform: translateX(0) } 100%{ transform: translateX(-50%) } }
.t3 .marquee span{ display: inline-block; padding: 0 24px; }
.t3 .marquee span:nth-child(even){ font-style: italic; font-family: "Space Grotesk", sans-serif; font-weight: 500; font-size: 22px; }
.t3 .hero{ padding: 28px 24px 24px; border-bottom: var(--line); display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
.t3-mobile .hero{ grid-template-columns: 1fr; }
.t3 .hero h1{ font-family: "Archivo Black", sans-serif; font-size: clamp(48px, 9vw, 140px); line-height: 0.86; margin: 0; letter-spacing: -0.04em; text-transform: uppercase; }
.t3-mobile .hero h1{ font-size: 56px; }
.t3 .hero .meta{ font-size: 12px; line-height: 1.55; }
.t3 .hero .meta b{ display:block; font-weight: 700; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 12px; opacity: .55; }
.t3 .hero .meta b:first-child{ margin-top: 0; }
.t3 section{ padding: 24px; border-bottom: var(--line); }
.t3 section > h2{ font-family: "Archivo Black", sans-serif; font-size: 28px; margin: 0 0 18px; letter-spacing: -0.01em; text-transform: uppercase; display:flex; justify-content: space-between; align-items: baseline; }
.t3 section > h2 small{ font-family: "Space Grotesk", sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; font-weight: 500; }
.t3 .projects{ display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: var(--line); }
.t3-mobile .projects{ grid-template-columns: 1fr; }
.t3 .proj{ padding: 18px; border-right: var(--line); border-bottom: var(--line); transition: background .12s; cursor:pointer; }
.t3 .proj:nth-child(2n){ border-right: 0; }
.t3 .proj:nth-last-child(-n+2){ border-bottom: 0; }
.t3-mobile .proj{ border-right: 0; }
.t3-mobile .proj:nth-last-child(1){ border-bottom: 0; }
.t3 .proj:hover{ background: currentColor; color: #efeae2; }
.t3.dark .proj:hover{ color: #0c0c0c; }
.t3 .proj .num{ font-family: "Space Grotesk", sans-serif; font-size: 10px; letter-spacing: 0.16em; opacity: .55; }
.t3 .proj h3{ font-family: "Archivo Black", sans-serif; font-size: 32px; margin: 4px 0 10px; line-height: 0.95; text-transform: uppercase; }
.t3 .proj p{ font-size: 13px; line-height: 1.5; margin: 0; }
.t3 .cv{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; border: var(--line); }
.t3-mobile .cv{ grid-template-columns: 1fr; }
.t3 .cv > div{ padding: 16px; border-right: var(--line); }
.t3 .cv > div:last-child{ border-right: 0; }
.t3-mobile .cv > div{ border-right: 0; border-bottom: var(--line); }
.t3 .cv h3{ font-family: "Archivo Black", sans-serif; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0 10px; }
.t3 .cv li{ list-style: none; padding: 8px 0; border-top: var(--line); font-size: 12px; line-height: 1.4; }
.t3 .cv li:first-child{ border-top: 0; }
.t3 .cv .yr{ font-family: "Space Grotesk", sans-serif; font-size: 10px; letter-spacing: 0.12em; opacity: .55; }
.t3 .footer{ padding: 26px 24px 36px; font-family: "Archivo Black", sans-serif; font-size: 56px; line-height: 0.9; text-transform: uppercase; letter-spacing: -0.03em; }
.t3-mobile .footer{ font-size: 32px; }
`;
function Tpl03Brutalist({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T3_CSS}</style>
    <div className={`t3 ${mode === 'mobile' ? 't3-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="header"><span>{p.name} / index</span><span>{p.location} · {p.role}</span></div>
      <div className="marquee">
        <div>
          <span>{p.name} —</span><span>{p.role}</span><span>·</span><span>looking for: new grad SWE</span><span>·</span><span>available: Sept 2026</span><span>·</span>
          <span>{p.name} —</span><span>{p.role}</span><span>·</span><span>looking for: new grad SWE</span><span>·</span><span>available: Sept 2026</span><span>·</span>
        </div>
      </div>
      <section className="hero">
        <h1>BUILDS<br/>TINY<br/>TOOLS.</h1>
        <div className="meta">
          <b>Bio</b>{p.tagline}
          <b>Based</b>{p.location} · willing to relocate
          <b>Looking for</b>New grad software roles · Sept 2026
          <b>Contact</b>{p.email}<br/>{p.socials[0]}
        </div>
      </section>
      <section>
        <h2>SELECTED WORK <small>04 PROJECTS · 2023–2025</small></h2>
        <div className="projects">
          {p.projects.map((pr, i) => (
            <div className="proj" key={i}>
              <div className="num">№ {String(i+1).padStart(2, "0")} · {pr.kind} · {pr.year}</div>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>CV <small>three column</small></h2>
        <div className="cv">
          <div>
            <h3>Experience</h3>
            <ul style={{ padding: 0, margin: 0 }}>
              {p.experience.map((e,i)=>(<li key={i}><span className="yr">{e.time}</span><br/><b>{e.role}</b> · {e.org}<br/><span style={{ opacity:.7 }}>{e.note}</span></li>))}
            </ul>
          </div>
          <div>
            <h3>Education</h3>
            <ul style={{ padding: 0, margin: 0 }}>
              {p.education.map((e,i)=>(<li key={i}><span className="yr">{e.time}</span><br/><b>{e.degree}</b><br/><span style={{ opacity:.7 }}>{e.org}</span></li>))}
            </ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul style={{ padding: 0, margin: 0 }}>{p.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      </section>
      <section>
        <h2>CURRENTLY <small>this week</small></h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 0, border: 'var(--line)' }}>
          {p.now.map((n, i) => (
            <div key={i} style={{ padding: 16, borderRight: mode === 'mobile' ? 0 : 'var(--line)', borderBottom: mode === 'mobile' && i < p.now.length - 1 ? 'var(--line)' : 0, fontSize: 13, lineHeight: 1.4 }}>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 6 }}>NOW {String(i+1).padStart(2,"0")}</div>
              {n}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <div style={{ padding: 28, borderBottom: 'var(--line)', fontFamily: '"Archivo Black", sans-serif', fontSize: mode === 'mobile' ? 22 : 38, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          "{p.testimonials[0].quote}"
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, marginTop: 14, fontWeight: 500 }}>— {p.testimonials[0].author}</div>
        </div>
      </section>

      <section>
        <h2>AWARDS <small>{p.awards.length} total</small></h2>
        <div>
          {p.awards.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px', gap: 14, padding: '12px 0', borderTop: 'var(--line)', alignItems: 'baseline', fontSize: 14 }}>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, letterSpacing: '0.16em', opacity: 0.55 }}>{String(i+1).padStart(2,"0")}</span>
              <span style={{ fontWeight: 500 }}>{a.name}</span>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, letterSpacing: '0.16em', opacity: 0.55, textAlign: 'right' }}>{a.year}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>WRITING <small>journal · talks</small></h2>
        {p.writing.map((w, i) => (
          <div key={i} style={{ padding: '14px 0', borderTop: 'var(--line)', display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 200px 80px', gap: 14, alignItems: 'baseline' }}>
            <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 20, textTransform: 'uppercase' }}>{w.title}</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>{w.where}</span>
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 11, letterSpacing: '0.16em', opacity: 0.55, textAlign: mode === 'mobile' ? 'left' : 'right' }}>{w.year}</span>
          </div>
        ))}
      </section>

      <div className="footer">END /<br/>{p.email}</div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   04 — Y2K  ·  designer persona
   Signature: chrome buttons, table-of-contents box, pixel cursor, marquee.
   ───────────────────────────────────────────────────────────────── */
const T4_CSS = `
.t4{ font-family: "VT323", "Courier New", monospace; background: #d3d6e0; color: #0a0a40; min-height: 100%; padding: 12px; font-size: 18px; cursor: crosshair; }
.t4.dark{ background: #14143a; color: #c5c8f0; }
.t4 .win{ background: #e6e9f0; border: 1px solid #888; box-shadow: 1px 1px 0 #fff inset, -1px -1px 0 #6d6d8a inset, 3px 3px 0 rgba(0,0,0,.2); margin-bottom: 10px; }
.t4.dark .win{ background: #1f1f4a; box-shadow: 1px 1px 0 rgba(255,255,255,.1) inset, -1px -1px 0 #000 inset, 3px 3px 0 rgba(0,0,0,.4); }
.t4 .titlebar{ background: linear-gradient(180deg, #4a5cc7 0%, #2a3b9c 100%); color: #fff; font-family: "VT323", monospace; padding: 4px 8px; display:flex; justify-content: space-between; align-items: center; font-size: 16px; }
.t4 .titlebar .x{ background: #d3d6e0; color: #000; width: 16px; height: 14px; display: inline-flex; align-items:center; justify-content:center; border: 1px solid #000; box-shadow: 1px 1px 0 #fff inset; font-size: 11px; font-family: sans-serif; }
.t4 .winbody{ padding: 14px; }
.t4 h1{ font-family: "VT323", monospace; font-size: 56px; line-height: 1; margin: 6px 0; text-shadow: 3px 3px 0 #ff5cc4; color: #2a3b9c; }
.t4.dark h1{ color: #ff5cc4; text-shadow: 3px 3px 0 #00e0ff; }
.t4-mobile h1{ font-size: 36px; }
.t4 .blink{ animation: t4blink 0.9s steps(1) infinite; }
@keyframes t4blink{ 50%{ opacity: 0 } }
.t4 .marq{ background: #000; color: #00ff80; padding: 4px 0; overflow: hidden; font-size: 16px; border: 2px inset #888; margin: 6px 0; }
.t4 .marq div{ display: inline-block; white-space: nowrap; animation: t4marq 18s linear infinite; padding-left: 100%; }
@keyframes t4marq{ 0%{ transform: translateX(0) } 100%{ transform: translateX(-100%) } }
.t4 .toc{ border: 2px ridge #8888aa; padding: 6px 10px; background: #fffbe6; color: #0a0a40; font-size: 16px; }
.t4.dark .toc{ background: #2a2a5a; color: #ffd; }
.t4 .toc b{ display:block; margin-bottom: 4px; }
.t4 .toc a{ color: #1c30a0; text-decoration: underline; display: block; padding: 1px 0; }
.t4.dark .toc a{ color: #6ff; }
.t4 .toc a:hover{ background: #2a3b9c; color: #fff; }
.t4 .nav{ display: flex; gap: 4px; flex-wrap: wrap; margin: 10px 0; }
.t4 .btn{ background: linear-gradient(180deg,#fff,#c0c0d0); color: #0a0a40; border: 1px solid #000; box-shadow: 1px 1px 0 #fff inset, -1px -1px 0 #888 inset; padding: 2px 10px; font-family: "VT323", monospace; font-size: 16px; cursor: pointer;}
.t4 .btn:hover{ background: linear-gradient(180deg,#dfe0ff,#a0a0c0); }
.t4 .btn:active{ box-shadow: 1px 1px 0 #888 inset, -1px -1px 0 #fff inset; }
.t4 .row2{ display: grid; grid-template-columns: 1fr 220px; gap: 10px; }
.t4-mobile .row2{ grid-template-columns: 1fr; }
.t4 .sect h2{ font-size: 24px; margin: 0 0 6px; color: #1c30a0; text-decoration: underline; }
.t4.dark .sect h2{ color: #ff5cc4; }
.t4 .proj{ border-bottom: 1px dotted currentColor; padding: 6px 0; }
.t4 .proj b{ color: #1c30a0; }
.t4.dark .proj b{ color: #00e0ff; }
.t4 .badge{ display:inline-block; padding: 0 6px; border: 1px solid currentColor; margin-right: 4px; font-size: 14px; }
.t4 .visitors{ font-size: 14px; opacity: .7; text-align: center; padding-top: 6px; border-top: 1px dashed currentColor; }
.t4 .avatar{ width: 64px; aspect-ratio: 1; border: 2px inset #888; }
.t4 .header{ display: grid; grid-template-columns: 64px 1fr; gap: 10px; align-items: center; }
`;
function Tpl04Y2K({ mode, dark }) {
  const p = PERSONAS.designer;
  const [hits, setHits] = useState(2147);
  useEffect(() => { const id = setInterval(() => setHits(h => h + 1), 7000); return () => clearInterval(id); }, []);
  return (<>
    <style>{T4_CSS}</style>
    <div className={`t4 ${mode === 'mobile' ? 't4-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="win">
        <div className="titlebar"><span>★ {p.name.toLowerCase().replace(" ", "_")}.html — Netscape</span><span className="x">×</span></div>
        <div className="winbody">
          <div className="header">
            <div className="imgph avatar" style={{ color: "#0a0a40" }}>PIC</div>
            <div>
              <h1>{p.name.split(" ")[0]}<span className="blink">_</span></h1>
              <div style={{ fontSize: 18 }}>welcome to my homepage!! ♡ — last updated: 12/may/26</div>
            </div>
          </div>
          <div className="marq"><div>★彡 NOW OPEN FOR FREELANCE ★彡  GRAPHIC DESIGN · TYPE · BOOKS  ★彡  email me below ★彡  </div></div>
          <div className="nav">
            <button className="btn">[ home ]</button><button className="btn">[ works ]</button><button className="btn">[ cv.txt ]</button><button className="btn">[ guestbook ]</button><button className="btn">[ rings ]</button>
          </div>
        </div>
      </div>

      <div className="row2">
        <div className="win sect">
          <div className="titlebar"><span>about_me.txt</span><span className="x">×</span></div>
          <div className="winbody">
            <h2>★ about</h2>
            <div style={{ fontSize: 17, lineHeight: 1.45 }}>i'm {p.name}, a {p.role.toLowerCase()} based in {p.location}. {p.tagline}</div>

            <h2 style={{ marginTop: 14 }}>★ selected works</h2>
            {p.projects.map((pr,i)=>(
              <div className="proj" key={i}>
                <b>{`>> ${pr.title}`}</b> <span className="badge">{pr.kind}</span><span className="badge">{pr.year}</span>
                <div style={{ fontSize: 16, opacity:.85 }}>{pr.note}</div>
              </div>
            ))}

            <h2 style={{ marginTop: 14 }}>★ cv</h2>
            <div style={{ fontSize: 16 }}>
              <b style={{ color: "inherit" }}>experience</b>
              {p.experience.map((e,i)=>(<div key={i}>· <b>{e.role}</b> @ {e.org} ({e.time})</div>))}
              <b style={{ display:"block", marginTop: 6 }}>education</b>
              {p.education.map((e,i)=>(<div key={i}>· {e.degree} — {e.org} ({e.time})</div>))}
              <b style={{ display:"block", marginTop: 6 }}>skills</b>
              <div>{p.skills.map(s=>(<span key={s} className="badge">{s}</span>))}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="win">
            <div className="titlebar"><span>navigate</span><span className="x">×</span></div>
            <div className="winbody">
              <div className="toc">
                <b>※ contents</b>
                <a href="#">› about me</a><a href="#">› the works</a><a href="#">› my cv</a><a href="#">› contact</a><a href="#">› sign guestbook</a>
              </div>
              <div className="visitors">visitors: {hits.toLocaleString()}<br/>♥ thx for stopping by ♥</div>
            </div>
          </div>
          <div className="win">
            <div className="titlebar"><span>contact.exe</span><span className="x">×</span></div>
            <div className="winbody" style={{ fontSize: 16, lineHeight: 1.5 }}>
              <div>✉ {p.email}</div>
              {p.socials.map((s,i)=>(<div key={i}>→ {s}</div>))}
              <button className="btn" style={{ marginTop: 8, width: "100%" }}>[ DEPLOY MY SITE !! ]</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="win sect">
          <div className="titlebar"><span>guestbook.html</span><span className="x">×</span></div>
          <div className="winbody">
            <h2>★ what people say</h2>
            {p.testimonials.map((tt, i) => (
              <div key={i} style={{ background: '#fffbe6', color: '#0a0a40', border: '2px inset #8888aa', padding: '6px 10px', marginBottom: 8, fontSize: 17, lineHeight: 1.4 }}>
                <span style={{ color: '#1c30a0' }}>★ {tt.author} wrote:</span><br/>
                "{tt.quote}"
              </div>
            ))}
            <h2 style={{ marginTop: 14 }}>★ awards/trophies</h2>
            <ul style={{ paddingLeft: 22, margin: 0 }}>
              {p.awards.map((a, i) => (<li key={i} style={{ fontSize: 17 }}>♕ <b style={{ color: 'inherit' }}>{a.name}</b> ({a.year})</li>))}
            </ul>
          </div>
        </div>

        <div>
          <div className="win">
            <div className="titlebar"><span>now_playing.txt</span><span className="x">×</span></div>
            <div className="winbody" style={{ fontSize: 17, lineHeight: 1.45 }}>
              <div className="scribble" style={{ display: 'block' }}><b>※ currently:</b></div>
              {p.now.map((n, i) => (<div key={i}>♪ {n}</div>))}
              <div style={{ marginTop: 8, fontSize: 14, opacity: .7 }}>※ mood: ☀ sunny</div>
            </div>
          </div>
          <div className="win">
            <div className="titlebar"><span>blog.txt</span><span className="x">×</span></div>
            <div className="winbody" style={{ fontSize: 16, lineHeight: 1.5 }}>
              <b style={{ color: 'inherit' }}>※ writing:</b>
              {p.writing.map((w, i) => (<div key={i}>→ <u>{w.title}</u> ({w.year})</div>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   05 — SWISS GRID  ·  business persona
   Signature: strict 12-col, helvetica, hairlines, scroll-snap, numbers as nav.
   ───────────────────────────────────────────────────────────────── */
const T5_CSS = `
.t5{ font-family: "Inter", "Helvetica Neue", Helvetica, sans-serif; background: #fafaf8; color: #0d0d0d; min-height: 100%; --hl: rgba(0,0,0,.12); padding: 0; font-size: 12px; line-height: 1.5; }
.t5.dark{ background: #0d0d0d; color: #fafaf8; --hl: rgba(255,255,255,.16); }
.t5 .grid{ display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; padding: 18px 24px; }
.t5-mobile .grid{ grid-template-columns: repeat(6, 1fr); padding: 14px 16px; gap: 10px; }
.t5 .topbar{ border-bottom: 1px solid var(--hl); padding: 14px 24px; display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.06em; }
.t5 .topbar nav{ display: flex; gap: 22px; }
.t5 .topbar nav a{ color: inherit; text-decoration: none; opacity: .55; transition: opacity .15s; }
.t5 .topbar nav a:hover, .t5 .topbar nav a.on{ opacity: 1; }
.t5 .hero{ padding: 80px 24px 60px; border-bottom: 1px solid var(--hl); }
.t5-mobile .hero{ padding: 36px 16px; }
.t5 .hero .grid{ padding: 0; }
.t5 .hero .num{ grid-column: span 1; font-size: 11px; opacity: .55; }
.t5 .hero h1{ grid-column: span 8; font-family: "Inter", sans-serif; font-weight: 500; font-size: clamp(34px, 5vw, 64px); line-height: 1.02; letter-spacing: -0.02em; margin: 0; }
.t5-mobile .hero h1{ grid-column: span 6; font-size: 32px; }
.t5 .hero .sub{ grid-column: 4 / span 6; margin-top: 24px; font-size: 14px; line-height: 1.55; max-width: 540px; }
.t5-mobile .hero .sub{ grid-column: span 6; }
.t5 .row{ padding: 28px 24px; border-bottom: 1px solid var(--hl); }
.t5 .row .grid{ padding: 0; }
.t5 .row .label{ grid-column: span 2; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .55; }
.t5-mobile .row .label{ grid-column: span 6; margin-bottom: 6px; }
.t5 .row .body{ grid-column: 3 / span 10; }
.t5-mobile .row .body{ grid-column: span 6; }
.t5 .work-row{ display: grid; grid-template-columns: 60px 1fr 200px 80px; gap: 16px; padding: 18px 0; border-top: 1px solid var(--hl); align-items: baseline; cursor: pointer; transition: padding .12s; }
.t5-mobile .work-row{ grid-template-columns: 40px 1fr 80px; }
.t5-mobile .work-row .meta{ display: none; }
.t5 .work-row:hover{ padding-left: 8px; }
.t5 .work-row .n{ font-size: 11px; opacity: .55; }
.t5 .work-row h3{ font-weight: 500; font-size: 18px; margin: 0; letter-spacing: -0.01em; }
.t5 .work-row .meta{ font-size: 11px; opacity: .65; }
.t5 .work-row .yr{ font-size: 11px; opacity: .55; text-align: right; }
.t5 .cv-row{ display: grid; grid-template-columns: 80px 1fr 1fr 80px; gap: 16px; padding: 12px 0; border-top: 1px solid var(--hl); font-size: 12px; }
.t5-mobile .cv-row{ grid-template-columns: 80px 1fr; }
.t5-mobile .cv-row .org, .t5-mobile .cv-row .yr{ display: none; }
.t5 .cv-row .yr{ font-size: 10px; opacity: .55; text-align: right; }
.t5 .stat{ font-family: "Inter", sans-serif; font-weight: 300; font-size: 56px; letter-spacing: -0.04em; line-height: 1; }
.t5-mobile .stat{ font-size: 32px; }
.t5 .stat-grid{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.t5-mobile .stat-grid{ grid-template-columns: repeat(2, 1fr); }
.t5 .stat-grid > div small{ display:block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .55; margin-top: 6px; }
.t5 .footer{ padding: 32px 24px; display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.t5-mobile .footer{ grid-template-columns: repeat(6, 1fr); padding: 24px 16px; }
.t5 .footer > div{ grid-column: span 3; }
.t5-mobile .footer > div{ grid-column: span 6; }
.t5 .footer small{ display:block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; opacity: .55; margin-bottom: 4px; }
`;
function Tpl05Swiss({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T5_CSS}</style>
    <div className={`t5 ${mode === 'mobile' ? 't5-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="topbar">
        <span>{p.name} — {p.role}</span>
        <nav><a className="on" href="#">01 Index</a><a href="#">02 Work</a><a href="#">03 CV</a><a href="#">04 Contact</a></nav>
      </div>
      <section className="hero">
        <div className="grid">
          <div className="num">01.0</div>
          <h1>Operator turned strategist. Marketplaces, growth, ops at scale.</h1>
          <div className="sub">{p.name} is a graduate student at {p.school}, currently focused on consumer marketplaces in emerging markets. Previously: ops at Lori Systems, strategy at Bain & Co.</div>
        </div>
      </section>

      <div className="row">
        <div className="grid">
          <div className="label">02.0 Index</div>
          <div className="body stat-grid">
            <div><div className="stat">04</div><small>Projects</small></div>
            <div><div className="stat">02</div><small>Internships</small></div>
            <div><div className="stat">4.2k</div><small>Newsletter subs</small></div>
            <div><div className="stat">3</div><small>Languages</small></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">03.0 Work</div>
          <div className="body">
            {p.projects.map((pr, i) => (
              <div className="work-row" key={i}>
                <span className="n">{String(i+1).padStart(2, "0")}</span>
                <h3>{pr.title}</h3>
                <span className="meta">{pr.note}</span>
                <span className="yr">{pr.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">04.0 CV</div>
          <div className="body">
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 4 }}>Experience</div>
            {p.experience.map((e, i) => (
              <div className="cv-row" key={i}><span>{e.time}</span><b style={{ fontWeight: 500 }}>{e.role}</b><span className="org">{e.org} · {e.note}</span><span className="yr">{e.time.split(" ").pop()}</span></div>
            ))}
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, margin: '18px 0 4px' }}>Education</div>
            {p.education.map((e, i) => (
              <div className="cv-row" key={i}><span>{e.time}</span><b style={{ fontWeight: 500 }}>{e.degree}</b><span className="org">{e.org}</span><span className="yr">—</span></div>
            ))}
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, margin: '18px 0 4px' }}>Skills</div>
            <div style={{ fontSize: 12, lineHeight: 1.7 }}>{p.skills.join(" · ")}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">05.0 Currently</div>
          <div className="body">
            {p.now.map((n, i) => (
              <div key={i} style={{ padding: '12px 0', borderTop: '1px solid var(--hl)', display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16, fontSize: 13 }}>
                <span style={{ fontSize: 11, opacity: 0.55 }}>{String(i+1).padStart(2,"0")}</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">06.0 Awards</div>
          <div className="body">
            {p.awards.map((a, i) => (
              <div key={i} className="cv-row"><span style={{ fontSize: 11, opacity: 0.55 }}>{String(i+1).padStart(2,"0")}</span><b style={{ fontWeight: 500 }}>{a.name}</b><span className="org"></span><span className="yr">{a.year}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">07.0 Writing</div>
          <div className="body">
            {p.writing.map((w, i) => (
              <div key={i} className="work-row">
                <span className="n">{String(i+1).padStart(2,"0")}</span>
                <h3>{w.title}</h3>
                <span className="meta">{w.where}</span>
                <span className="yr">{w.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">08.0 Reference</div>
          <div className="body" style={{ fontSize: 14, lineHeight: 1.55, fontStyle: 'italic', maxWidth: 720 }}>
            "{p.testimonials[0].quote}"
            <div style={{ fontStyle: 'normal', fontSize: 11, opacity: 0.55, marginTop: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>— {p.testimonials[0].author}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="grid">
          <div className="label">09.0 Languages</div>
          <div className="body" style={{ fontSize: 13, lineHeight: 1.7 }}>{p.languages.join(" · ")}</div>
        </div>
      </div>

      <div className="footer">
        <div><small>Email</small>{p.email}</div>
        <div><small>Located</small>{p.location}</div>
        <div><small>Online</small>{p.socials.map((s,i)=><div key={i}>{s}</div>)}</div>
        <div><small>Set</small>Inter · 12 / 14 / 18 / 64</div>
      </div>
    </div>
  </>);
}

window.Tpl01Terminal = Tpl01Terminal;
window.Tpl02Editorial = Tpl02Editorial;
window.Tpl03Brutalist = Tpl03Brutalist;
window.Tpl04Y2K = Tpl04Y2K;
window.Tpl05Swiss = Tpl05Swiss;

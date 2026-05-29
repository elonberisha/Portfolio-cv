/* global React, PERSONAS */
const { useState: _u6, useEffect: _e6, useRef: _r6 } = React;

/* ─────────────────────────────────────────────────────────────────
   06 — PLAYFUL  ·  designer persona
   Signature: bouncy shapes, sticker labels, big rounded type.
   ───────────────────────────────────────────────────────────────── */
const T6_CSS = `
.t6{ font-family: "DM Sans", system-ui, sans-serif; background: #fff5d6; color: #2d1810; min-height: 100%; padding: 0; position: relative; overflow: hidden; }
.t6.dark{ background: #1a1410; color: #fff5d6; }
.t6 .blob{ position: absolute; border-radius: 50%; filter: blur(2px); opacity: .9; pointer-events: none; }
.t6 .b1{ width: 220px; height: 220px; background: #ff7a45; top: -40px; right: -60px; animation: t6float1 9s ease-in-out infinite; }
.t6 .b2{ width: 160px; height: 160px; background: #2ec4b6; top: 320px; left: -50px; animation: t6float2 11s ease-in-out infinite; }
.t6 .b3{ width: 280px; height: 280px; background: #ffd166; top: 800px; right: -100px; animation: t6float1 13s ease-in-out infinite reverse; }
@keyframes t6float1{ 0%,100%{ transform: translate(0,0) scale(1) } 50%{ transform: translate(-20px, 25px) scale(1.06) } }
@keyframes t6float2{ 0%,100%{ transform: translate(0,0) rotate(0) } 50%{ transform: translate(15px, -20px) rotate(8deg) } }
.t6 .inner{ position: relative; z-index: 1; padding: 22px 26px 60px; }
.t6-mobile .inner{ padding: 18px 16px 50px; }
.t6 .topnav{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.t6 .topnav .logo{ font-family: "Syne", sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -0.02em; }
.t6 .topnav nav{ display: flex; gap: 6px; }
.t6-mobile .topnav nav{ gap: 4px; }
.t6 .pill{ padding: 6px 14px; background: #2d1810; color: #fff5d6; border-radius: 999px; font-size: 12px; font-weight: 500; border: 0; cursor: pointer; transition: transform .15s; }
.t6.dark .pill{ background: #fff5d6; color: #2d1810; }
.t6 .pill:hover{ transform: translateY(-2px) rotate(-2deg); }
.t6 .pill.alt{ background: #ff7a45; color: #2d1810; }
.t6 h1{ font-family: "Syne", sans-serif; font-weight: 800; font-size: clamp(48px, 9vw, 120px); line-height: 0.92; letter-spacing: -0.04em; margin: 12px 0 18px; }
.t6-mobile h1{ font-size: 48px; }
.t6 h1 .underline{ background: #ffd166; padding: 0 10px; border-radius: 18px; display: inline-block; transform: rotate(-2deg); }
.t6 h1 .circ{ display: inline-block; background: #2ec4b6; color: #fff; padding: 0 18px; border-radius: 999px; transform: rotate(2deg); }
.t6 .lede{ font-size: 16px; max-width: 480px; margin: 0 0 32px; line-height: 1.55; }
.t6 .sticker{ position: absolute; right: 28px; top: 90px; background: #ff7a45; color: #fff; padding: 18px 14px; border-radius: 50%; width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; line-height: 1.15; transform: rotate(12deg); animation: t6spin 14s linear infinite; }
@keyframes t6spin{ to{ transform: rotate(372deg) } }
.t6-mobile .sticker{ width: 78px; height: 78px; font-size: 9px; right: 12px; top: 12px; }
.t6 h2{ font-family: "Syne", sans-serif; font-size: 28px; font-weight: 700; margin: 40px 0 16px; letter-spacing: -0.02em; }
.t6 .projects{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.t6-mobile .projects{ grid-template-columns: 1fr; }
.t6 .card{ background: #fff; padding: 16px; border-radius: 20px; box-shadow: 4px 4px 0 #2d1810; transition: transform .2s, box-shadow .2s; cursor: pointer; color: #2d1810; }
.t6.dark .card{ background: #ffd166; box-shadow: 4px 4px 0 #fff5d6; }
.t6 .card:hover{ transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #2d1810; }
.t6.dark .card:hover{ box-shadow: 6px 6px 0 #fff5d6; }
.t6 .card .imgph{ aspect-ratio: 4/3; border-radius: 14px; margin-bottom: 10px; border: 0; background-color: #ffd166; }
.t6 .card:nth-child(2n) .imgph{ background-color: #2ec4b6; }
.t6 .card:nth-child(3n) .imgph{ background-color: #ff7a45; }
.t6 .card h3{ font-family: "Syne", sans-serif; font-size: 20px; margin: 0 0 4px; }
.t6 .card .tag{ display: inline-block; background: #2d1810; color: #fff5d6; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 500; margin-bottom: 6px; }
.t6 .card p{ margin: 6px 0 0; font-size: 13px; line-height: 1.4; }
.t6 .cv{ background: #2d1810; color: #fff5d6; padding: 24px; border-radius: 24px; margin-top: 40px; box-shadow: 6px 6px 0 #ff7a45; }
.t6.dark .cv{ background: #fff5d6; color: #2d1810; box-shadow: 6px 6px 0 #2ec4b6; }
.t6 .cv h2{ margin-top: 0; }
.t6 .cv-cols{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; font-size: 13px; }
.t6-mobile .cv-cols{ grid-template-columns: 1fr; }
.t6 .cv-cols b{ display: block; font-family: "Syne", sans-serif; font-size: 15px; margin-bottom: 6px; }
.t6 .cv-cols div + b{ margin-top: 14px; }
.t6 .cv-cols ul{ list-style: none; padding: 0; margin: 0; }
.t6 .cv-cols li{ padding: 6px 0; border-top: 1px dashed currentColor; line-height: 1.45; }
.t6 .cv-cols li small{ display: block; opacity: .55; font-size: 11px; }
.t6 .deploy{ margin-top: 30px; padding: 22px; border-radius: 22px; background: #2ec4b6; color: #2d1810; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.t6-mobile .deploy{ flex-direction: column; align-items: flex-start; }
.t6 .deploy b{ font-family: "Syne", sans-serif; font-size: 22px; }
`;
function Tpl06Playful({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T6_CSS}</style>
    <div className={`t6 ${mode === 'mobile' ? 't6-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="blob b1"></div><div className="blob b2"></div><div className="blob b3"></div>
      <div className="inner">
        <div className="topnav">
          <div className="logo">{p.name.split(" ")[0].toLowerCase()}.studio*</div>
          <nav><button className="pill">work</button><button className="pill">about</button><button className="pill alt">say hi</button></nav>
        </div>
        <div className="sticker">★ open for<br/>freelance<br/>2026 ★</div>
        <h1>Hi, I'm<br/><span className="underline">{p.name.split(" ")[0]}</span> — I<br/>make <span className="circ">soft</span><br/>things.</h1>
        <p className="lede">{p.tagline} Based in {p.location}. Studying at {p.school}.</p>

        <h2>Recent things I've made</h2>
        <div className="projects">
          {p.projects.map((pr, i) => (
            <div className="card" key={i}>
              <div className="imgph">{pr.title}</div>
              <span className="tag">{pr.kind}</span>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>

        <h2>What I'm up to right now</h2>
        <div className="projects" style={{ gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)' }}>
          {p.now.map((n, i) => (
            <div className="card" key={i} style={{ background: ['#ffd166', '#2ec4b6', '#ff7a45'][i % 3], color: '#2d1810' }}>
              <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, opacity: 0.65 }}>now · {String(i+1).padStart(2,"0")}</div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, lineHeight: 1.45 }}>{n}</div>
            </div>
          ))}
        </div>

        <h2>Little wins</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {p.awards.map((a, i) => (
            <div key={i} style={{ background: '#fff', color: '#2d1810', padding: '10px 14px', borderRadius: 18, boxShadow: '3px 3px 0 #2d1810', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}>
              <span style={{ width: 28, height: 28, background: '#ffd166', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: '"Syne", sans-serif' }}>★</span>
              <div><b style={{ fontFamily: '"Syne", sans-serif' }}>{a.name}</b><div style={{ fontSize: 11, opacity: 0.6 }}>{a.year}</div></div>
            </div>
          ))}
        </div>

        <h2>Words from kind people</h2>
        <div className="projects" style={{ gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr' }}>
          {p.testimonials.map((tt, i) => (
            <div className="card" key={i} style={{ background: i % 2 ? '#2ec4b6' : '#ff7a45', color: i % 2 ? '#2d1810' : '#fff' }}>
              <div style={{ fontFamily: '"Syne", sans-serif', fontSize: 26, lineHeight: 1.05, marginBottom: 12 }}>"{tt.quote}"</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>— {tt.author}</div>
            </div>
          ))}
        </div>

        <h2>Where I write</h2>
        <div style={{ background: '#fff', color: '#2d1810', padding: 16, borderRadius: 20, boxShadow: '4px 4px 0 #2d1810' }}>
          {p.writing.map((w, i) => (
            <div key={i} style={{ padding: '10px 0', borderTop: i ? '1px dashed currentColor' : 0, display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
              <span><b style={{ fontFamily: '"Syne", sans-serif' }}>{w.title}</b> — {w.where}</span>
              <span style={{ opacity: 0.55 }}>{w.year}</span>
            </div>
          ))}
        </div>

        <div className="cv">
          <h2>The longer story (a.k.a. CV)</h2>
          <div className="cv-cols">
            <div>
              <b>Where I've worked</b>
              <ul>{p.experience.map((e,i)=>(<li key={i}>{e.role} — {e.org}<small>{e.time} · {e.note}</small></li>))}</ul>
              <b>What I'm good at</b>
              <div>{p.skills.map(s=>(<span key={s} style={{ display: 'inline-block', padding:'2px 8px', borderRadius:999, border:'1px solid currentColor', marginRight: 4, marginTop:4, fontSize:12 }}>{s}</span>))}</div>
            </div>
            <div>
              <b>Where I learned</b>
              <ul>{p.education.map((e,i)=>(<li key={i}>{e.degree}<small>{e.org} · {e.time}</small></li>))}</ul>
              <b>Find me</b>
              <ul>{p.socials.map((s,i)=>(<li key={i}>↗ {s}</li>))}<li>✉ {p.email}</li></ul>
            </div>
          </div>
        </div>

        <div className="deploy">
          <div><b>Want your own?</b><div>Free, deploys in 12 seconds, even works on grandma's WiFi.</div></div>
          <button className="pill alt" style={{ fontSize: 14, padding: '10px 18px' }}>Deploy yours →</button>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   07 — 3D / EXPERIMENTAL  ·  developer persona
   Signature: perspective stacked cards, ticker, gradient mesh, hover-tilt.
   ───────────────────────────────────────────────────────────────── */
const T7_CSS = `
.t7{ font-family: "Manrope", system-ui, sans-serif; background: #06070a; color: #e9ecf3; min-height: 100%; padding: 24px 26px 60px; position: relative; overflow: hidden; }
.t7.light{ background: #f0eee9; color: #06070a; }
.t7 .mesh{ position: absolute; inset: -50px; background:
  radial-gradient(60% 50% at 30% 20%, rgba(122, 90, 248, 0.28), transparent 60%),
  radial-gradient(50% 50% at 80% 60%, rgba(248, 96, 130, 0.22), transparent 60%),
  radial-gradient(40% 40% at 50% 100%, rgba(96, 196, 248, 0.22), transparent 60%);
  pointer-events: none; z-index: 0; animation: t7mesh 18s ease-in-out infinite; }
@keyframes t7mesh{ 50%{ transform: scale(1.04) rotate(2deg) } }
.t7 .inner{ position: relative; z-index: 1; }
.t7 .top{ display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .6; margin-bottom: 24px; }
.t7 .top nav{ display: flex; gap: 18px; }
.t7 .top nav a{ color: inherit; text-decoration: none; }
.t7 .top nav a:hover{ opacity: 1; color: #f86082; }
.t7 .hero{ perspective: 1200px; padding: 50px 0 80px; }
.t7-mobile .hero{ padding: 24px 0 50px; }
.t7 h1{ font-family: "Syne", sans-serif; font-size: clamp(48px, 8.5vw, 132px); line-height: 0.9; margin: 0 0 18px; letter-spacing: -0.04em; font-weight: 800; background: linear-gradient(180deg, currentColor 0%, currentColor 50%, transparent 100%); -webkit-background-clip: text; background-clip: text; transform: rotateX(8deg); transform-origin: 50% 100%; }
.t7-mobile h1{ font-size: 52px; transform: none; }
.t7 .lede{ font-size: 15px; opacity: .75; max-width: 480px; line-height: 1.55; margin-bottom: 16px; }
.t7 .row{ font-family: "JetBrains Mono", monospace; font-size: 11px; display: flex; gap: 18px; flex-wrap: wrap; opacity: .8; margin-bottom: 30px; }
.t7 .row span::before{ content: "● "; color: #6df5a4; }
.t7 h2{ font-family: "Manrope", sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; opacity: .55; margin: 40px 0 18px; display: flex; justify-content: space-between; }
.t7 .stack{ perspective: 1600px; }
.t7 .pcard{ background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); padding: 22px 24px; border-radius: 18px; margin-bottom: 12px; transform-style: preserve-3d; transition: transform .25s; cursor: pointer; backdrop-filter: blur(20px); }
.t7.light .pcard{ background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.1); }
.t7 .pcard:hover{ transform: rotateX(-4deg) rotateY(2deg) translateZ(8px); border-color: #f86082; }
.t7 .pcard .pmeta{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
.t7 .pcard h3{ font-family: "Syne", sans-serif; font-size: 30px; margin: 0 0 6px; letter-spacing: -0.02em; font-weight: 700; }
.t7-mobile .pcard h3{ font-size: 22px; }
.t7 .pcard p{ margin: 0; opacity: .75; font-size: 13px; line-height: 1.5; max-width: 540px; }
.t7 .ticker{ overflow: hidden; padding: 14px 0; margin: 16px 0; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; border-top: 1px solid rgba(255,255,255,.12); border-bottom: 1px solid rgba(255,255,255,.12); opacity: .8; }
.t7.light .ticker{ border-color: rgba(0,0,0,.12); }
.t7 .ticker div{ display: inline-block; white-space: nowrap; animation: t7tick 28s linear infinite; }
@keyframes t7tick{ 0%{ transform: translateX(0) } 100%{ transform: translateX(-50%) } }
.t7 .ticker span{ padding: 0 18px; }
.t7 .cv-grid{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.t7-mobile .cv-grid{ grid-template-columns: 1fr; }
.t7 .ccard{ padding: 16px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); }
.t7.light .ccard{ background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.08); }
.t7 .ccard h4{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; margin: 0 0 12px; font-weight: 500; }
.t7 .ccard ul{ list-style: none; padding: 0; margin: 0; font-size: 12px; line-height: 1.5; }
.t7 .ccard li{ padding: 8px 0; border-top: 1px solid rgba(255,255,255,.08); }
.t7.light .ccard li{ border-color: rgba(0,0,0,.08); }
.t7 .ccard li:first-child{ border-top: 0; padding-top: 0; }
.t7 .ccard li small{ opacity: .55; display: block; font-size: 10px; }
.t7 .deploy{ margin-top: 30px; padding: 22px; border-radius: 18px; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(122,90,248,.25), rgba(248,96,130,.18)); border: 1px solid rgba(255,255,255,.1); }
.t7-mobile .deploy{ flex-direction: column; align-items: flex-start; gap: 10px; }
.t7 .deploy b{ font-family: "Syne", sans-serif; font-size: 22px; font-weight: 700; }
.t7 .deploy button{ background: #f86082; color: #06070a; border: 0; padding: 10px 18px; border-radius: 999px; font-family: inherit; font-weight: 600; cursor: pointer; }
`;
function Tpl073D({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T7_CSS}</style>
    <div className={`t7 ${mode === 'mobile' ? 't7-mobile' : ''} ${dark ? '' : 'light'}`}>
      <div className="mesh"></div>
      <div className="inner">
        <div className="top">
          <span>{p.name} · {p.role}</span>
          <nav><a href="#">work</a><a href="#">about</a><a href="#">cv</a><a href="#">contact</a></nav>
        </div>
        <section className="hero">
          <h1>I make<br/>computers do<br/>small <i>strange</i><br/>things.</h1>
          <p className="lede">{p.tagline} I'm {p.name.split(" ")[0]}, a final-year CS student at {p.school}, currently in {p.location}.</p>
          <div className="row">
            <span>Available Sept 2026</span><span>Open to relocation</span><span>Visa: TN/H1-B</span>
          </div>
        </section>

        <div className="ticker"><div>
          <span>{p.name}</span><span>—</span><span>tinyk8s</span><span>—</span><span>lex.fish</span><span>—</span><span>ferro-db</span><span>—</span><span>campusbus</span><span>—</span>
          <span>{p.name}</span><span>—</span><span>tinyk8s</span><span>—</span><span>lex.fish</span><span>—</span><span>ferro-db</span><span>—</span><span>campusbus</span><span>—</span>
        </div></div>

        <h2>Selected projects <span>04</span></h2>
        <div className="stack">
          {p.projects.map((pr, i) => (
            <div className="pcard" key={i}>
              <div className="pmeta">№ {String(i+1).padStart(2,"0")} · {pr.kind} · {pr.year}</div>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>

        <h2>Curriculum <span>cv</span></h2>
        <div className="cv-grid">
          <div className="ccard"><h4>Experience</h4><ul>{p.experience.map((e,i)=>(<li key={i}><b>{e.role}</b><small>{e.org} · {e.time}</small></li>))}</ul></div>
          <div className="ccard"><h4>Education</h4><ul>{p.education.map((e,i)=>(<li key={i}><b>{e.degree}</b><small>{e.org} · {e.time}</small></li>))}</ul></div>
          <div className="ccard"><h4>Stack</h4><ul style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{p.skills.map(s=>(<li key={s} style={{ border: '1px solid rgba(255,255,255,.15)', padding: '2px 8px', borderRadius: 6, fontSize: 11 }}>{s}</li>))}</ul></div>
        </div>

        <h2>Now <span>live</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {p.now.map((n, i) => (
            <div key={i} className="ccard" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 12, right: 12, width: 6, height: 6, borderRadius: 999, background: '#6df5a4', boxShadow: '0 0 0 3px rgba(109,245,164,.25)' }}></div>
              <h4>NOW {String(i+1).padStart(2,"0")}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0 }}>{n}</p>
            </div>
          ))}
        </div>

        <h2>Awards <span>{p.awards.length}</span></h2>
        <div className="stack">
          {p.awards.map((a, i) => (
            <div key={i} className="pcard" style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '60px 1fr 80px', gap: 14, alignItems: 'baseline' }}>
              <div className="pmeta">№ {String(i+1).padStart(2,"0")}</div>
              <h3 style={{ fontSize: 22, margin: 0 }}>{a.name}</h3>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.55, textAlign: mode === 'mobile' ? 'left' : 'right' }}>{a.year}</div>
            </div>
          ))}
        </div>

        <h2>Words <span>refs</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 14 }}>
          {p.testimonials.map((tt, i) => (
            <div key={i} className="ccard">
              <div style={{ fontFamily: '"Syne", sans-serif', fontSize: 20, lineHeight: 1.2, marginBottom: 10, fontWeight: 700, letterSpacing: '-0.01em' }}>"{tt.quote}"</div>
              <h4 style={{ margin: 0 }}>— {tt.author}</h4>
            </div>
          ))}
        </div>

        <h2>Writing <span>posts</span></h2>
        <div className="ccard">
          {p.writing.map((w, i) => (
            <div key={i} style={{ padding: '12px 0', borderTop: i ? '1px solid rgba(255,255,255,.08)' : 0, display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 160px 80px', gap: 14, alignItems: 'baseline', fontSize: 13 }}>
              <span style={{ fontFamily: '"Syne", sans-serif', fontSize: 18, fontWeight: 700 }}>{w.title}</span>
              <span style={{ opacity: 0.6 }}>{w.where}</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.55, textAlign: mode === 'mobile' ? 'left' : 'right' }}>{w.year}</span>
            </div>
          ))}
        </div>

        <div className="deploy">
          <div><b>Deploy your folio →</b><div style={{ opacity: .8, fontSize: 13 }}>{p.name.split(" ")[0].toLowerCase()}.folio.app · free, instant</div></div>
          <button>ship it</button>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   08 — NOTEBOOK  ·  business persona
   Signature: graph paper, tape, polaroid, handwriting fonts.
   ───────────────────────────────────────────────────────────────── */
const T8_CSS = `
.t8{ font-family: "Patrick Hand", "Caveat", cursive; background: #faf6e7; color: #2a2417; min-height: 100%; padding: 24px 26px 60px;
  background-image:
    linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px);
  background-size: 22px 22px; background-position: 0 0;
  font-size: 17px; line-height: 1.45;
}
.t8.dark{ background-color: #1f1c12; color: #f0ebd6;
  background-image:
    linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
}
.t8 .scribble{ font-family: "Caveat", cursive; font-size: 24px; transform: rotate(-2deg); display: inline-block; }
.t8 .head{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.t8 .head .date{ background: #ffd166; padding: 4px 10px; transform: rotate(2deg); font-family: "Patrick Hand", cursive; font-size: 14px; color: #2a2417; }
.t8 h1{ font-family: "Caveat", cursive; font-weight: 700; font-size: clamp(54px, 9vw, 108px); line-height: 0.95; margin: 12px 0 6px; letter-spacing: -0.01em; }
.t8-mobile h1{ font-size: 56px; }
.t8 h1 u{ text-decoration: underline wavy currentColor; text-decoration-thickness: 2px; text-underline-offset: 6px; }
.t8 .arrow{ display: inline-block; font-family: "Caveat", cursive; font-size: 22px; transform: rotate(-12deg); margin: 0 8px; }
.t8 .row{ display: grid; grid-template-columns: 1fr 220px; gap: 24px; align-items: start; margin-bottom: 30px; }
.t8-mobile .row{ grid-template-columns: 1fr; }
.t8 .polaroid{ background: #fffaea; padding: 10px 10px 36px; box-shadow: 4px 4px 0 rgba(0,0,0,.1), 0 2px 18px rgba(0,0,0,.12); transform: rotate(3deg); position: relative; color: #2a2417; }
.t8 .polaroid::before{ content: ""; position: absolute; top: -10px; left: 50%; width: 80px; height: 22px; background: rgba(255, 209, 102, .85); transform: translateX(-50%) rotate(-3deg); }
.t8 .polaroid .imgph{ aspect-ratio: 1; }
.t8 .polaroid .cap{ font-family: "Caveat", cursive; font-size: 22px; text-align: center; margin-top: 8px; }
.t8 h2{ font-family: "Caveat", cursive; font-weight: 700; font-size: 38px; margin: 24px 0 10px; }
.t8 h2::before{ content: "✱ "; color: #ff7a45; }
.t8 .stripe{ position: relative; padding-left: 12px; border-left: 3px solid #ff7a45; margin-bottom: 10px; }
.t8 .stripe b{ font-family: "Caveat", cursive; font-size: 22px; }
.t8 .lede{ font-size: 19px; max-width: 520px; }
.t8 .pin{ position: absolute; width: 12px; height: 12px; background: #ff7a45; border-radius: 999px; box-shadow: 0 2px 4px rgba(0,0,0,.3); }
.t8 .note{ background: #fffaea; padding: 14px 18px; box-shadow: 3px 3px 0 rgba(0,0,0,.12); margin-bottom: 10px; position: relative; color: #2a2417; }
.t8 .note.tilt-l{ transform: rotate(-1deg); }
.t8 .note.tilt-r{ transform: rotate(1.2deg); }
.t8 .note .tape{ position: absolute; top: -10px; left: 30px; width: 70px; height: 18px; background: rgba(46, 196, 182, 0.55); transform: rotate(-3deg); }
.t8 .note .meta{ font-family: "Patrick Hand", cursive; font-size: 14px; opacity: .6; }
.t8 .note h3{ font-family: "Caveat", cursive; font-size: 28px; margin: 6px 0; font-weight: 700; }
.t8 .cv-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.t8-mobile .cv-grid{ grid-template-columns: 1fr; }
.t8 ul{ padding: 0; list-style: none; }
.t8 li{ padding: 4px 0; padding-left: 26px; position: relative; }
.t8 li::before{ content: "→"; position: absolute; left: 0; color: #ff7a45; font-family: "Caveat", cursive; transform: rotate(-8deg); }
.t8 .skills span{ display: inline-block; background: #ffd166; padding: 2px 10px; margin: 3px 4px 3px 0; transform: rotate(-1deg); color: #2a2417; font-family: "Patrick Hand", cursive; font-size: 15px; }
.t8 .skills span:nth-child(2n){ background: #2ec4b6; transform: rotate(1deg); }
.t8 .skills span:nth-child(3n){ background: #ff7a45; color: #fff; }
.t8 .deploy{ margin-top: 22px; border: 2px dashed currentColor; padding: 16px; text-align: center; transform: rotate(-0.5deg); }
.t8 .deploy h3{ font-family: "Caveat", cursive; font-size: 32px; margin: 0; }
`;
function Tpl08Notebook({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T8_CSS}</style>
    <div className={`t8 ${mode === 'mobile' ? 't8-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="head">
        <span className="scribble">my page!</span>
        <span className="date">12 / may / 26</span>
      </div>
      <div className="row">
        <div>
          <h1>Hi! I'm<br/><u>{p.name.split(" ")[0]}</u><span className="arrow">↘</span></h1>
          <p className="lede">{p.tagline} Right now: studying at {p.school}, based in {p.location}.</p>
          <h2>about</h2>
          <div className="stripe"><b>where</b> · {p.location} · willing to move</div>
          <div className="stripe"><b>when</b> · graduating June 2026</div>
          <div className="stripe"><b>looking for</b> · associate strategy / product roles</div>
        </div>
        <div>
          <div className="polaroid">
            <div className="imgph">photo of me</div>
            <div className="cap">— hi! it's me :)</div>
          </div>
          <div className="note tilt-l" style={{ marginTop: 22 }}>
            <div className="tape"></div>
            <div className="meta">contact</div>
            <div>{p.email}</div>
            {p.socials.map((s,i)=>(<div key={i} style={{ fontSize: 15 }}>{s}</div>))}
          </div>
        </div>
      </div>

      <h2>things I made</h2>
      {p.projects.map((pr, i) => (
        <div className={`note ${i % 2 ? 'tilt-r' : 'tilt-l'}`} key={i}>
          <div className="tape"></div>
          <span className="pin" style={{ top: 12, right: 14 }}></span>
          <div className="meta">{pr.kind} — {pr.year}</div>
          <h3>{pr.title}</h3>
          <div>{pr.note}</div>
        </div>
      ))}

      <h2>cv stuff</h2>
      <div className="cv-grid">
        <div>
          <div className="scribble" style={{ fontSize: 22 }}>experience —</div>
          <ul>{p.experience.map((e,i)=>(<li key={i}><b>{e.role}</b> · {e.org}<br/><span style={{ opacity:.65, fontSize: 14 }}>{e.time} — {e.note}</span></li>))}</ul>
          <div className="scribble" style={{ fontSize: 22, marginTop: 10 }}>education —</div>
          <ul>{p.education.map((e,i)=>(<li key={i}><b>{e.degree}</b><br/><span style={{ opacity:.65, fontSize: 14 }}>{e.org} · {e.time}</span></li>))}</ul>
        </div>
        <div>
          <div className="scribble" style={{ fontSize: 22 }}>skills —</div>
          <div className="skills">{p.skills.map(s=>(<span key={s}>{s}</span>))}</div>
          <div className="scribble" style={{ fontSize: 22, marginTop: 14 }}>writing —</div>
          <ul>
            <li>Mercado Brief — 4.2k subs</li>
            <li>Notes on operating in Lagos</li>
            <li>Why marketplaces fail in West Africa</li>
          </ul>
        </div>
      </div>

      <h2>this week i'm…</h2>
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
        {p.now.map((n, i) => (
          <div key={i} style={{ background: ['#ffe69a', '#a8e9cf', '#ffb89a'][i % 3], padding: '14px 14px 18px', boxShadow: '3px 3px 0 rgba(0,0,0,.15)', transform: `rotate(${(i % 2 ? 1.2 : -1.4)}deg)`, color: '#2a2417', fontFamily: '"Patrick Hand", cursive', fontSize: 16, lineHeight: 1.4, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -10, left: 14, width: 50, height: 16, background: 'rgba(255,255,255,.65)', transform: 'rotate(-4deg)' }}></div>
            <div className="scribble" style={{ fontSize: 18, marginBottom: 4 }}>now ↓</div>
            {n}
          </div>
        ))}
      </div>

      <h2>little prizes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {p.awards.map((a, i) => (
          <div key={i} style={{ background: '#fffaea', color: '#2a2417', padding: '8px 12px 8px 32px', boxShadow: '2px 2px 0 rgba(0,0,0,.15)', transform: `rotate(${(i % 2 ? 1 : -1)}deg)`, position: 'relative', fontFamily: '"Patrick Hand", cursive', fontSize: 15 }}>
            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%) rotate(-12deg)', fontFamily: '"Caveat", cursive', color: '#ff7a45', fontSize: 22 }}>★</span>
            <b style={{ fontFamily: '"Caveat", cursive', fontSize: 18 }}>{a.name}</b> <span style={{ opacity: 0.55 }}>· {a.year}</span>
          </div>
        ))}
      </div>

      <h2>kind words</h2>
      <div className="row">
        {p.testimonials.map((tt, i) => (
          <div key={i} className="polaroid" style={{ transform: `rotate(${(i % 2 ? -2 : 3)}deg)`, marginBottom: 16 }}>
            <div style={{ padding: 10, fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.15, color: '#2a2417' }}>"{tt.quote}"</div>
            <div className="cap">— {tt.author}</div>
          </div>
        ))}
      </div>

      <h2>writing</h2>
      <ul>
        {p.writing.map((w, i) => (<li key={i}><b>{w.title}</b> <span style={{ opacity: 0.6, fontSize: 15 }}>· {w.where} · {w.year}</span></li>))}
      </ul>

      <h2>languages</h2>
      <div className="skills">{p.languages.map(l => (<span key={l}>{l}</span>))}</div>

      <div className="deploy">
        <h3>★ deploy my page ★</h3>
        <div style={{ fontSize: 16 }}>amara.folio.app — one click, then it's live!</div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   09 — NEWSPAPER  ·  business persona
   Signature: broadsheet columns, masthead, hairline rules, drop initials.
   ───────────────────────────────────────────────────────────────── */
const T9_CSS = `
.t9{ font-family: "IBM Plex Serif", Georgia, serif; background: #f0e9d5; color: #1a1610; min-height: 100%; padding: 18px 24px 60px; }
.t9.dark{ background: #161310; color: #f0e9d5; }
.t9 .masthead{ text-align: center; padding-bottom: 12px; border-bottom: 4px double currentColor; }
.t9 .masthead .top-rule{ display: flex; justify-content: space-between; font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 12px; padding-bottom: 6px; opacity: .75; }
.t9 .masthead h1{ font-family: "Playfair Display", serif; font-weight: 900; font-size: clamp(48px, 8vw, 96px); line-height: 1; margin: 6px 0; letter-spacing: -0.01em; }
.t9-mobile .masthead h1{ font-size: 44px; }
.t9 .masthead .sub{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 13px; letter-spacing: 0.04em; }
.t9 .strap{ display: flex; justify-content: space-between; font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 12px; padding: 6px 0; border-bottom: 1px solid currentColor; margin-bottom: 14px; }
.t9 .lead{ display: grid; grid-template-columns: 2fr 1fr; gap: 24px; padding: 18px 0; border-bottom: 1px solid currentColor; }
.t9-mobile .lead{ grid-template-columns: 1fr; }
.t9 .lead h2{ font-family: "Playfair Display", serif; font-weight: 900; font-size: clamp(28px, 4vw, 52px); line-height: 1.05; margin: 0 0 6px; letter-spacing: -0.01em; }
.t9 .lead .deck{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 16px; opacity: .75; margin-bottom: 14px; }
.t9 .lead .cols{ column-count: 2; column-gap: 18px; column-rule: 1px solid currentColor; font-size: 13px; line-height: 1.55; }
.t9-mobile .lead .cols{ column-count: 1; }
.t9 .lead .cols p:first-child::first-letter{ font-family: "Playfair Display", serif; font-weight: 900; font-size: 4.5em; float: left; line-height: 0.85; padding: 4px 8px 0 0; }
.t9 .lead .side{ font-size: 13px; }
.t9 .lead .side .byline{ font-family: "IBM Plex Serif", serif; font-style: italic; padding-bottom: 8px; border-bottom: 1px solid currentColor; margin-bottom: 8px; }
.t9 .lead .side .fact{ padding: 6px 0; border-bottom: 1px solid currentColor; display: flex; justify-content: space-between; font-size: 12px; }
.t9 .lead .side .fact b{ font-family: "IBM Plex Serif", serif; font-style: italic; opacity: .65; }
.t9 .section-rule{ display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid currentColor; padding: 18px 0 8px; margin-bottom: 14px; }
.t9 .section-rule h3{ font-family: "Playfair Display", serif; font-weight: 900; font-size: 22px; margin: 0; text-transform: uppercase; letter-spacing: 0.06em; }
.t9 .section-rule small{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 12px; }
.t9 .works{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; }
.t9-mobile .works{ grid-template-columns: 1fr; }
.t9 .work{ padding-right: 12px; border-right: 1px solid currentColor; font-size: 13px; line-height: 1.5; }
.t9 .work:last-child{ border-right: 0; }
.t9-mobile .work{ border-right: 0; border-bottom: 1px solid currentColor; padding-bottom: 10px; padding-right: 0; }
.t9 .work .kicker{ font-family: "IBM Plex Sans", sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .6; }
.t9 .work h4{ font-family: "Playfair Display", serif; font-size: 22px; margin: 4px 0; line-height: 1.05; font-weight: 700; }
.t9 .work .ph{ aspect-ratio: 16/9; margin-bottom: 8px; }
.t9 .cv{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; font-size: 13px; line-height: 1.5; }
.t9-mobile .cv{ grid-template-columns: 1fr; }
.t9 .cv h5{ font-family: "Playfair Display", serif; font-size: 16px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.06em; }
.t9 .cv .item{ padding: 6px 0; border-top: 1px solid currentColor; display: grid; grid-template-columns: 80px 1fr; gap: 10px; }
.t9 .cv .item .yr{ font-family: "IBM Plex Serif", serif; font-style: italic; opacity: .65; font-size: 12px; }
`;
function Tpl09Newspaper({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T9_CSS}</style>
    <div className={`t9 ${mode === 'mobile' ? 't9-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <header className="masthead">
        <div className="top-rule"><span>Vol. III · No. 04</span><span>—</span><span>Single copy, free</span></div>
        <h1>The {p.name.split(" ")[0]} Times</h1>
        <div className="sub">A portfolio, a curriculum, a paper of record — published from {p.location}</div>
      </header>
      <div className="strap"><span>"All the work that's fit to print."</span><span>Tuesday, May 12, 2026</span></div>

      <article className="lead">
        <div>
          <span style={{ fontFamily: '"IBM Plex Sans"', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65 }}>Front page · profile</span>
          <h2>The student behind Mercado Brief is also studying marketplaces in Paris.</h2>
          <div className="deck">A graduate of Lagos and a current MSc at HEC, {p.name} writes about what most reports miss: the operator's seat.</div>
          <div className="cols">
            <p>{p.tagline} For {p.name}, the shift from operations to strategy began in 2023, when a stint at Lori Systems made the gaps between Excel models and warehouse floors impossible to ignore.</p>
            <p>Since arriving at HEC Paris in 2024, she has been advising founders, writing a weekly column, and convening community events — work that, she says, keeps her writing honest.</p>
          </div>
        </div>
        <aside className="side">
          <div className="byline">By the desk · {p.email}</div>
          <div className="fact"><b>Program</b><span>{p.role}</span></div>
          <div className="fact"><b>School</b><span>{p.school}</span></div>
          <div className="fact"><b>Based</b><span>{p.location}</span></div>
          <div className="fact"><b>Open to</b><span>Strategy · Product</span></div>
          <div className="fact"><b>Subs</b><span>4,200 (weekly)</span></div>
        </aside>
      </article>

      <div className="section-rule"><h3>Selected Works</h3><small>continued from page one · folio</small></div>
      <div className="works">
        {p.projects.map((pr,i)=>(
          <div className="work" key={i}>
            <div className="imgph ph">{pr.kind}</div>
            <div className="kicker">{pr.kind} · {pr.year}</div>
            <h4>{pr.title}</h4>
            <p>{pr.note}</p>
          </div>
        ))}
      </div>

      <div className="section-rule"><h3>Curriculum Vitae</h3><small>full record · page 4</small></div>
      <div className="cv">
        <div>
          <h5>Experience</h5>
          {p.experience.map((e,i)=>(<div className="item" key={i}><span className="yr">{e.time}</span><div><b>{e.role}</b> · {e.org}<br/><span style={{ opacity:.7 }}>{e.note}</span></div></div>))}
        </div>
        <div>
          <h5>Education</h5>
          {p.education.map((e,i)=>(<div className="item" key={i}><span className="yr">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity:.7 }}>{e.org}</span></div></div>))}
          <h5 style={{ marginTop: 16 }}>Skills</h5>
          <div style={{ fontFamily: '"IBM Plex Serif"', fontStyle: 'italic', fontSize: 12 }}>{p.skills.join(" · ")}</div>
        </div>
      </div>

      <div className="section-rule"><h3>On the Desk This Week</h3><small>currently · column inches</small></div>
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
        {p.now.map((n, i) => (
          <div key={i} style={{ paddingRight: 12, borderRight: mode === 'mobile' ? 0 : '1px solid currentColor', fontSize: 13, lineHeight: 1.55 }}>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Dispatch № {String(i+1).padStart(2,"0")}</div>
            <p style={{ margin: 0, fontStyle: i === 0 ? 'italic' : 'normal' }}>{n}</p>
          </div>
        ))}
      </div>

      <div className="section-rule"><h3>Honours & Distinctions</h3><small>by the year</small></div>
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 22 }}>
        <div>
          {p.awards.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12, padding: '8px 0', borderTop: '1px solid currentColor', fontSize: 13 }}>
              <span style={{ fontFamily: '"IBM Plex Serif", serif', fontStyle: 'italic', opacity: 0.65 }}>{a.year}</span>
              <span><b>{a.name}</b></span>
            </div>
          ))}
        </div>
        <div style={{ borderLeft: mode === 'mobile' ? 0 : '4px double currentColor', paddingLeft: mode === 'mobile' ? 0 : 18 }}>
          <h5 style={{ fontFamily: '"Playfair Display", serif', fontSize: 16, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>From the Editorial</h5>
          <p style={{ fontFamily: '"IBM Plex Serif", serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, margin: 0 }}>"{p.testimonials[0].quote}"</p>
          <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6, marginTop: 10 }}>— {p.testimonials[0].author}</div>
        </div>
      </div>

      <div className="section-rule"><h3>Filed Writing</h3><small>recent columns</small></div>
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
        {p.writing.map((w, i) => (
          <div key={i} style={{ paddingRight: 12, borderRight: mode === 'mobile' ? 0 : '1px solid currentColor', fontSize: 13, lineHeight: 1.5 }}>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6 }}>Column · {w.year}</div>
            <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, margin: '4px 0 4px', lineHeight: 1.05, fontWeight: 700 }}>{w.title}</h4>
            <span style={{ fontStyle: 'italic', opacity: 0.65 }}>filed to {w.where}</span>
          </div>
        ))}
      </div>

      <div className="section-rule"><h3>Languages</h3><small>polyglot box</small></div>
      <div style={{ fontFamily: '"IBM Plex Serif", serif', fontStyle: 'italic', fontSize: 14 }}>{p.languages.join(" · ")}</div>

      <div style={{ marginTop: 22, borderTop: '4px double currentColor', paddingTop: 10, fontSize: 12, fontStyle: 'italic', display: 'flex', justifyContent: 'space-between' }}>
        <span>Printed digitally · 100% recycled bits</span><span>amara.folio.app</span>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   10 — CORPORATE CLEAN  ·  developer persona, recruiter-ready
   Signature: photo + credentials, restrained accent, scroll-revealed numbers.
   ───────────────────────────────────────────────────────────────── */
const T10_CSS = `
.t10{ font-family: "Inter", system-ui, sans-serif; background: #ffffff; color: #14181f; min-height: 100%; padding: 0; --accent: #1f4ed8; --hl: #e5e7ec; --mute: #6b7280; }
.t10.dark{ background: #0a0c12; color: #e6e9ef; --hl: #1f2330; --mute: #8a93a3; }
.t10 .nav{ position: relative; padding: 14px 28px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--hl); font-size: 13px; }
.t10 .nav .brand{ display: flex; align-items: center; gap: 10px; font-weight: 600; }
.t10 .nav .brand i{ width: 22px; height: 22px; background: var(--accent); border-radius: 5px; display: inline-block; }
.t10 .nav nav{ display: flex; gap: 20px; }
.t10 .nav nav a{ color: var(--mute); text-decoration: none; transition: color .15s; }
.t10 .nav nav a:hover{ color: inherit; }
.t10 .nav .cta{ background: var(--accent); color: #fff; padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 0; cursor: pointer; }
.t10 .hero{ padding: 56px 28px 40px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: center; border-bottom: 1px solid var(--hl); }
.t10-mobile .hero{ grid-template-columns: 1fr; padding: 28px 18px; gap: 24px; }
.t10 .hero .kicker{ font-size: 12px; color: var(--accent); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.t10 .hero h1{ font-family: "Inter", sans-serif; font-weight: 700; font-size: clamp(38px, 5.5vw, 64px); line-height: 1.05; margin: 12px 0 16px; letter-spacing: -0.025em; }
.t10 .hero h1 em{ color: var(--accent); font-style: normal; }
.t10 .hero .sub{ font-size: 16px; color: var(--mute); max-width: 480px; line-height: 1.55; margin-bottom: 22px; }
.t10 .hero .actions{ display: flex; gap: 10px; flex-wrap: wrap; }
.t10 .btn{ padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid var(--hl); background: white; color: inherit; }
.t10.dark .btn{ background: #14181f; }
.t10 .btn.primary{ background: var(--accent); color: #fff; border-color: var(--accent); }
.t10 .hero .pic{ background: var(--hl); aspect-ratio: 4/5; border-radius: 14px; position: relative; overflow: hidden; }
.t10 .hero .pic::after{ content: "headshot"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--mute); font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
.t10 .hero .pic .credentials{ position: absolute; bottom: 12px; left: 12px; right: 12px; background: rgba(255,255,255,.9); backdrop-filter: blur(8px); padding: 10px 12px; border-radius: 10px; font-size: 12px; color: #14181f; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; z-index: 1; }
.t10.dark .hero .pic .credentials{ background: rgba(20,24,31,.85); color: #e6e9ef; }
.t10 .hero .pic .credentials b{ display: block; opacity: .55; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500; }
.t10 .logos{ padding: 20px 28px; border-bottom: 1px solid var(--hl); display: flex; gap: 28px; align-items: center; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mute); overflow-x: auto; }
.t10 .logos .label{ flex-shrink: 0; }
.t10 .logos .l{ padding: 6px 12px; border: 1px solid var(--hl); border-radius: 6px; flex-shrink: 0; font-family: "JetBrains Mono", monospace; }
.t10 .stats{ padding: 36px 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; border-bottom: 1px solid var(--hl); }
.t10-mobile .stats{ grid-template-columns: repeat(2, 1fr); padding: 24px 18px; }
.t10 .stats .s b{ display: block; font-size: 36px; font-weight: 600; letter-spacing: -0.02em; color: var(--accent); }
.t10 .stats .s span{ font-size: 12px; color: var(--mute); }
.t10 section{ padding: 40px 28px; border-bottom: 1px solid var(--hl); }
.t10-mobile section{ padding: 28px 18px; }
.t10 section h2{ font-size: 11px; color: var(--accent); letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 6px; font-weight: 600; }
.t10 section .lead{ font-size: 26px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 24px; max-width: 640px; line-height: 1.2; }
.t10 .projects{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.t10-mobile .projects{ grid-template-columns: 1fr; }
.t10 .pcard{ border: 1px solid var(--hl); border-radius: 12px; overflow: hidden; transition: border-color .15s, transform .15s; cursor: pointer; }
.t10 .pcard:hover{ border-color: var(--accent); transform: translateY(-2px); }
.t10 .pcard .ph{ aspect-ratio: 16/9; }
.t10 .pcard .body{ padding: 14px 16px; }
.t10 .pcard .body h3{ font-size: 18px; margin: 0 0 4px; font-weight: 600; }
.t10 .pcard .body .meta{ font-size: 12px; color: var(--mute); margin-bottom: 8px; }
.t10 .pcard .body p{ font-size: 13px; color: var(--mute); margin: 0; line-height: 1.5; }
.t10 .timeline{ position: relative; padding-left: 22px; }
.t10 .timeline::before{ content: ""; position: absolute; left: 4px; top: 0; bottom: 0; width: 2px; background: var(--hl); }
.t10 .titem{ position: relative; padding: 0 0 22px; }
.t10 .titem::before{ content: ""; position: absolute; left: -22px; top: 6px; width: 10px; height: 10px; background: var(--accent); border-radius: 999px; border: 2px solid white; box-shadow: 0 0 0 2px var(--accent); }
.t10.dark .titem::before{ border-color: #0a0c12; }
.t10 .titem h4{ font-size: 16px; margin: 0 0 2px; font-weight: 600; }
.t10 .titem .where{ font-size: 13px; color: var(--mute); }
.t10 .titem p{ font-size: 13px; color: var(--mute); margin: 6px 0 0; }
.t10 .grid2{ display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.t10-mobile .grid2{ grid-template-columns: 1fr; gap: 22px; }
.t10 .skills{ display: flex; flex-wrap: wrap; gap: 6px; }
.t10 .skills span{ border: 1px solid var(--hl); padding: 5px 10px; border-radius: 6px; font-size: 12px; }
.t10 .cta-block{ padding: 40px 28px; background: var(--accent); color: #fff; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.t10-mobile .cta-block{ flex-direction: column; align-items: flex-start; padding: 28px 18px; }
.t10 .cta-block h3{ font-size: 26px; margin: 0; font-weight: 600; letter-spacing: -0.01em; }
.t10 .cta-block button{ background: white; color: var(--accent); border: 0; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
`;
function Tpl10Corporate({ mode, dark }) {
  const p = PERSONAS.developer;
  return (<>
    <style>{T10_CSS}</style>
    <div className={`t10 ${mode === 'mobile' ? 't10-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="nav">
        <div className="brand"><i></i> {p.name.split(" ")[0]}.dev</div>
        {mode !== 'mobile' && <nav><a>Work</a><a>Experience</a><a>About</a><a>Contact</a></nav>}
      </div>
      <section className="hero">
        <div>
          <div className="kicker">Available · Sept 2026</div>
          <h1>Building <em>reliable systems</em>, one small tool at a time.</h1>
          <p className="sub">{p.name} — final-year Computer Science at {p.school}. Previously at Stripe, WatSys Lab. Looking for new-grad software engineering roles.</p>
          <div className="actions">
            <button className="btn primary">View work →</button>
            <button className="btn">Schedule a call</button>
          </div>
        </div>
        <div className="pic imgph">
          <div className="credentials">
            <div><b>School</b>UWaterloo CS</div>
            <div><b>GPA</b>3.92 / 4.0</div>
            <div><b>Languages</b>EN · KR</div>
            <div><b>Status</b>Open to relocate</div>
          </div>
        </div>
      </section>

      <div className="logos">
        <span className="label">Recently at</span>
        <span className="l">Stripe</span><span className="l">WatSys Lab</span><span className="l">ETH Zürich</span><span className="l">Hack the North</span>
      </div>

      <div className="stats">
        <div className="s"><b>14</b><span>Open-source repos</span></div>
        <div className="s"><b>2.1k</b><span>Commits in 2025</span></div>
        <div className="s"><b>4</b><span>Internships</span></div>
        <div className="s"><b>3.92</b><span>GPA / 4.00</span></div>
      </div>

      <section>
        <h2>Selected work</h2>
        <p className="lead">Production systems and side-quests I'm proud of.</p>
        <div className="projects">
          {p.projects.map((pr,i)=>(
            <div className="pcard" key={i}>
              <div className="imgph ph">{pr.title}</div>
              <div className="body">
                <div className="meta">{pr.kind} · {pr.year}</div>
                <h3>{pr.title}</h3>
                <p>{pr.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Experience & Education</h2>
        <p className="lead">Where I've worked, learned, and shipped.</p>
        <div className="grid2">
          <div className="timeline">
            {p.experience.map((e,i)=>(<div className="titem" key={i}><h4>{e.role}</h4><div className="where">{e.org} · {e.time}</div><p>{e.note}</p></div>))}
            {p.education.map((e,i)=>(<div className="titem" key={i}><h4>{e.degree}</h4><div className="where">{e.org} · {e.time}</div></div>))}
          </div>
          <div>
            <h4 style={{ fontSize: 14, margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mute)' }}>Skills</h4>
            <div className="skills">{p.skills.map(s=>(<span key={s}>{s}</span>))}</div>
            <h4 style={{ fontSize: 14, margin: '20px 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mute)' }}>Online</h4>
            <div style={{ fontSize: 13, lineHeight: 1.8 }}>{p.socials.map((s,i)=><div key={i}>{s}</div>)}</div>
          </div>
        </div>
      </section>

      <section>
        <h2>Currently</h2>
        <p className="lead">This semester's focus.</p>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
          {p.now.map((n, i) => (
            <div key={i} style={{ border: '1px solid var(--hl)', borderRadius: 12, padding: 16, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 14, right: 14, width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></div>
              <div style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6, fontWeight: 600 }}>Now · {String(i+1).padStart(2,"0")}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>{n}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>What people say</h2>
        <p className="lead">Selected references.</p>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 16 }}>
          {p.testimonials.map((tt, i) => (
            <div key={i} style={{ border: '1px solid var(--hl)', borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 28, color: 'var(--accent)', lineHeight: 1, fontWeight: 700 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.45, margin: '8px 0 14px', fontWeight: 500 }}>{tt.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--mute)' }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--hl)' }}></div>
                <div>{tt.author}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Awards & Recognition</h2>
        <p className="lead">Notable selections.</p>
        <div>
          {p.awards.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px', gap: 14, padding: '14px 0', borderTop: '1px solid var(--hl)', alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'color-mix(in oklch, var(--accent) 12%, transparent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>★</div>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{a.name}</span>
              <span style={{ fontSize: 12, color: 'var(--mute)', textAlign: 'right' }}>{a.year}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Writing & Languages</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1.4fr 1fr', gap: 30 }}>
          <div>
            <h4 style={{ fontSize: 14, margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mute)' }}>Selected writing</h4>
            {p.writing.map((w, i) => (
              <div key={i} style={{ padding: '12px 0', borderTop: '1px solid var(--hl)', display: 'grid', gridTemplateColumns: '1fr 160px 60px', gap: 12, alignItems: 'baseline', fontSize: 13 }}>
                <b style={{ fontWeight: 500 }}>{w.title}</b>
                <span style={{ color: 'var(--mute)' }}>{w.where}</span>
                <span style={{ color: 'var(--mute)', textAlign: 'right' }}>{w.year}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 14, margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mute)' }}>Languages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.languages.map(l => (<div key={l} style={{ fontSize: 13, padding: '6px 0', borderTop: '1px solid var(--hl)' }}>{l}</div>))}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-block">
        <h3>Let's build something. {p.email}</h3>
        <button>Get in touch →</button>
      </div>
    </div>
  </>);
}

window.Tpl06Playful = Tpl06Playful;
window.Tpl073D = Tpl073D;
window.Tpl08Notebook = Tpl08Notebook;
window.Tpl09Newspaper = Tpl09Newspaper;
window.Tpl10Corporate = Tpl10Corporate;

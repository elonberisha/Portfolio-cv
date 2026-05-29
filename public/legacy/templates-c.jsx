/* global React, PERSONAS */
const { useState: _u11, useEffect: _e11 } = React;

/* ─────────────────────────────────────────────────────────────────
   11 — BOARDING PASS  ·  developer persona
   Signature: ticket layout, dashed tear, barcode, monospaced rows.
   ───────────────────────────────────────────────────────────────── */
const T11_CSS = `
.t11{ font-family: "IBM Plex Mono", monospace; background: #e9e4d8; color: #14110b; min-height: 100%; padding: 22px 22px 60px; }
.t11.dark{ background: #14110b; color: #e9e4d8; }
.t11 .pass{ background: #fff; color: #14110b; box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 30px 60px -40px rgba(0,0,0,.35); display: grid; grid-template-columns: 1fr 220px; margin-bottom: 16px; }
.t11.dark .pass{ background: #1c1a13; color: #f0eadb; }
.t11-mobile .pass{ grid-template-columns: 1fr; }
.t11 .pass .left{ padding: 22px; }
.t11 .pass .right{ border-left: 2px dashed currentColor; padding: 22px 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; position: relative; }
.t11 .pass .right::before, .t11 .pass .right::after{ content: ""; position: absolute; left: -10px; width: 18px; height: 18px; background: #e9e4d8; border-radius: 999px; }
.t11.dark .pass .right::before, .t11.dark .pass .right::after{ background: #14110b; }
.t11 .pass .right::before{ top: -10px; }
.t11 .pass .right::after{ bottom: -10px; }
.t11-mobile .pass .right{ border-left: 0; border-top: 2px dashed currentColor; }
.t11-mobile .pass .right::before{ top: -10px; left: 50%; transform: translateX(-50%); }
.t11-mobile .pass .right::after{ display: none; }
.t11 .ribbon{ display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; border-bottom: 1px solid currentColor; padding-bottom: 8px; margin-bottom: 16px; }
.t11 .ports{ display: grid; grid-template-columns: 1fr auto 1fr; gap: 18px; align-items: center; margin-bottom: 18px; }
.t11 .ports .code{ font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 56px; line-height: 1; letter-spacing: -0.02em; }
.t11-mobile .ports .code{ font-size: 38px; }
.t11 .ports .lbl{ font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .6; margin-bottom: 4px; }
.t11 .ports .arrow{ font-size: 24px; opacity: .55; }
.t11 .grid4{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px 22px; margin-bottom: 14px; }
.t11-mobile .grid4{ grid-template-columns: repeat(2, 1fr); }
.t11 .grid4 .lbl{ font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; }
.t11 .grid4 .val{ font-weight: 700; font-size: 16px; }
.t11 .barcode{ display: flex; align-items: end; height: 60px; gap: 1.5px; }
.t11 .barcode i{ background: currentColor; height: 100%; display: block; }
.t11 .seat{ font-family: "IBM Plex Mono", monospace; font-size: 32px; font-weight: 700; line-height: 1; }
.t11 h2{ font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; margin: 32px 0 12px; padding-bottom: 6px; border-bottom: 2px solid currentColor; display: flex; justify-content: space-between; }
.t11 h2 small{ font-weight: 400; opacity: .55; letter-spacing: 0.1em; }
.t11 .row-itin{ display: grid; grid-template-columns: 80px 1fr 100px 80px; gap: 14px; padding: 10px 0; border-bottom: 1px dashed currentColor; font-size: 12px; align-items: baseline; }
.t11-mobile .row-itin{ grid-template-columns: 60px 1fr 60px; }
.t11-mobile .row-itin .meta{ display: none; }
.t11 .row-itin .code{ font-weight: 700; font-size: 13px; }
.t11 .row-itin .meta{ opacity: .65; }
.t11 .stamp{ display: inline-block; border: 2px solid #b03227; color: #b03227; padding: 6px 14px; font-weight: 700; letter-spacing: 0.18em; transform: rotate(-8deg); font-size: 13px; text-transform: uppercase; }
.t11.dark .stamp{ color: #ff7a6c; border-color: #ff7a6c; }
.t11 .tags{ display: flex; flex-wrap: wrap; gap: 6px; }
.t11 .tag{ border: 1px solid currentColor; padding: 3px 8px; font-size: 11px; letter-spacing: 0.08em; }
.t11 .ticket-foot{ font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .55; display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid currentColor; }
`;
function Tpl11BoardingPass({ mode, dark }) {
  const p = PERSONAS.developer;
  const bars = useMemoBars(64);
  return (<>
    <style>{T11_CSS}</style>
    <div className={`t11 ${mode === 'mobile' ? 't11-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="pass">
        <div className="left">
          <div className="ribbon"><span>★ Folio Air · Boarding Pass</span><span>Class: New Grad · 2026</span></div>
          <div className="ports">
            <div><div className="lbl">From</div><div className="code">WAT</div><div style={{ fontSize: 11, opacity: .65 }}>{p.school}</div></div>
            <div className="arrow">───→</div>
            <div><div className="lbl">To</div><div className="code">SFO</div><div style={{ fontSize: 11, opacity: .65 }}>Bay Area · TBD</div></div>
          </div>
          <div className="grid4">
            <div><div className="lbl">Passenger</div><div className="val">{p.name}</div></div>
            <div><div className="lbl">Field</div><div className="val">{p.role}</div></div>
            <div><div className="lbl">Date</div><div className="val">12 MAY 26</div></div>
            <div><div className="lbl">Status</div><div className="val">Available Sep 26</div></div>
          </div>
          <div className="grid4" style={{ marginBottom: 0 }}>
            <div><div className="lbl">Email</div><div style={{ fontSize: 12 }}>{p.email}</div></div>
            <div><div className="lbl">Github</div><div style={{ fontSize: 12 }}>{p.socials[0]}</div></div>
            <div><div className="lbl">Located</div><div style={{ fontSize: 12 }}>{p.location}</div></div>
            <div><div className="lbl">Visa</div><div style={{ fontSize: 12 }}>TN/H1-B ok</div></div>
          </div>
        </div>
        <div className="right">
          <div>
            <div className="lbl" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .55 }}>Seat</div>
            <div className="seat">24F</div>
            <div className="lbl" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .55, marginTop: 12 }}>Gate</div>
            <div className="seat">D12</div>
          </div>
          <div className="stamp">Cleared for hiring</div>
          <div className="barcode">{bars.map((h, i) => (<i key={i} style={{ width: h.w + 'px', height: h.h + '%' }} />))}</div>
        </div>
      </div>

      <h2>Itinerary · Selected work <small>{p.projects.length} legs</small></h2>
      {p.projects.map((pr, i) => (
        <div className="row-itin" key={i}>
          <span className="code">{pr.title.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase()}{String(i+1).padStart(2,"0")}</span>
          <span><b>{pr.title}</b><br/><span className="meta">{pr.note}</span></span>
          <span className="meta">{pr.kind}</span>
          <span style={{ textAlign: 'right' }}>{pr.year}</span>
        </div>
      ))}

      <h2>Boarding log · Experience <small>{p.experience.length} flights</small></h2>
      {p.experience.map((e, i) => (
        <div className="row-itin" key={i}>
          <span className="code">{e.org.split(/\s+/)[0].slice(0,3).toUpperCase()}</span>
          <span><b>{e.role}</b><br/><span className="meta">{e.note}</span></span>
          <span className="meta">{e.org}</span>
          <span style={{ textAlign: 'right' }}>{e.time}</span>
        </div>
      ))}

      <h2>Manifest · Skills + Languages</h2>
      <div className="tags">{p.skills.map(s => (<span key={s} className="tag">{s}</span>))}</div>
      <div style={{ marginTop: 10, fontSize: 12 }}>{p.languages.join(" / ")}</div>

      <h2>Notes from the cabin</h2>
      <div style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 640 }}>{p.tagline} — currently {p.now[0].toLowerCase()}.</div>

      <div className="ticket-foot" style={{ marginTop: 30 }}>
        <span>FOLIO/AIR · {p.socials[0]}</span><span>END OF PASS</span>
      </div>
    </div>
  </>);
}

function useMemoBars(n) {
  return React.useMemo(() => Array.from({ length: n }, () => ({ w: Math.random() < 0.5 ? 1 : 2, h: 60 + Math.random() * 40 })), [n]);
}

/* ─────────────────────────────────────────────────────────────────
   12 — MUSEUM WALL  ·  designer persona
   Signature: vitrine cards with plate numbers, sober serif labels, hairline rules.
   ───────────────────────────────────────────────────────────────── */
const T12_CSS = `
.t12{ font-family: "Instrument Serif", "EB Garamond", serif; background: #ece6db; color: #1a1714; min-height: 100%; padding: 30px 28px 60px; }
.t12.dark{ background: #14110d; color: #ece6db; }
.t12 .top{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .65; padding-bottom: 14px; border-bottom: 1px solid currentColor; }
.t12 .titleblock{ padding: 56px 0 36px; text-align: center; border-bottom: 1px solid currentColor; }
.t12-mobile .titleblock{ padding: 28px 0; }
.t12 .titleblock .kicker{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; opacity: .55; }
.t12 .titleblock h1{ font-family: "Instrument Serif", serif; font-size: clamp(54px, 9vw, 124px); line-height: 1; margin: 14px 0 10px; letter-spacing: -0.01em; }
.t12-mobile .titleblock h1{ font-size: 52px; }
.t12 .titleblock .sub{ font-family: "EB Garamond", serif; font-style: italic; font-size: 16px; max-width: 540px; margin: 0 auto; opacity: .75; }
.t12 .wall{ display: grid; grid-template-columns: 1fr 1fr; gap: 36px 28px; padding: 38px 0; border-bottom: 1px solid currentColor; }
.t12-mobile .wall{ grid-template-columns: 1fr; gap: 28px; }
.t12 .piece{ display: grid; grid-template-columns: 130px 1fr; gap: 16px; align-items: start; }
.t12 .piece .vitrine{ background: #fff; aspect-ratio: 3/4; border: 1px solid currentColor; padding: 12px; display: flex; align-items: center; justify-content: center; font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .6; box-shadow: inset 0 0 0 4px #ece6db, inset 0 0 0 5px rgba(0,0,0,.15); }
.t12.dark .piece .vitrine{ background: #1a1714; box-shadow: inset 0 0 0 4px #14110d, inset 0 0 0 5px rgba(255,255,255,.18); }
.t12 .piece .plate{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; opacity: .55; margin-bottom: 4px; }
.t12 .piece h3{ font-family: "Instrument Serif", serif; font-size: 26px; margin: 0 0 6px; letter-spacing: -0.005em; line-height: 1.1; }
.t12 .piece .label{ font-family: "EB Garamond", serif; font-style: italic; font-size: 13px; opacity: .8; }
.t12 .piece .detail{ font-family: "Inter", sans-serif; font-size: 11px; opacity: .6; margin-top: 6px; }
.t12 h2{ font-family: "Instrument Serif", serif; font-size: 36px; margin: 30px 0 20px; letter-spacing: -0.005em; }
.t12 h2 small{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; margin-left: 14px; }
.t12 .cv{ display: grid; grid-template-columns: 1fr 1fr; gap: 36px; font-family: "EB Garamond", serif; font-size: 14px; line-height: 1.6; }
.t12-mobile .cv{ grid-template-columns: 1fr; }
.t12 .cv h4{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; margin: 0 0 10px; font-weight: 500; }
.t12 .cv-item{ padding: 10px 0; border-top: 1px solid currentColor; display: grid; grid-template-columns: 84px 1fr; gap: 12px; }
.t12 .cv-item .yr{ font-family: "Inter", sans-serif; font-size: 11px; opacity: .55; }
.t12 .docent{ background: #1a1714; color: #ece6db; padding: 28px; margin: 38px 0; font-family: "EB Garamond", serif; font-style: italic; font-size: 20px; line-height: 1.5; max-width: 720px; }
.t12.dark .docent{ background: #ece6db; color: #1a1714; }
.t12 .docent cite{ display: block; font-style: normal; font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 14px; opacity: .65; }
.t12 .legend{ font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; padding-top: 16px; border-top: 1px solid currentColor; opacity: .7; }
`;
function Tpl12Museum({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T12_CSS}</style>
    <div className={`t12 ${mode === 'mobile' ? 't12-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="top"><span>Folio · Galleria</span><span>Spring exhibition · 2026</span><span>Hall 03</span></div>
      <section className="titleblock">
        <div className="kicker">Solo Exhibition · Plate № 01—{String(p.projects.length).padStart(2,"0")}</div>
        <h1>{p.name}</h1>
        <div className="sub">A working retrospective of books, posters, and type — selected works on view through summer.</div>
      </section>

      <h2>The Collection<small>{p.projects.length} pieces</small></h2>
      <div className="wall">
        {p.projects.map((pr, i) => (
          <div className="piece" key={i}>
            <div className="vitrine">{pr.kind}</div>
            <div>
              <div className="plate">Plate № {String(i+1).padStart(2,"0")}</div>
              <h3>{pr.title}</h3>
              <div className="label">{pr.kind}, {pr.year}. {pr.note}</div>
              <div className="detail">Print, screen, mixed media · acquisition of the studio.</div>
            </div>
          </div>
        ))}
      </div>

      <div className="docent">
        "{p.testimonials[0].quote}"
        <cite>— {p.testimonials[0].author}, Wall text</cite>
      </div>

      <h2>Provenance<small>cv · selected</small></h2>
      <div className="cv">
        <div>
          <h4>Practice</h4>
          {p.experience.map((e, i) => (<div className="cv-item" key={i}><span className="yr">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity: .65, fontSize: 12 }}>{e.note}</span></div></div>))}
          <h4 style={{ marginTop: 22 }}>Distinctions</h4>
          {p.awards.map((a, i) => (<div className="cv-item" key={i}><span className="yr">{a.year}</span><span>{a.name}</span></div>))}
        </div>
        <div>
          <h4>Education</h4>
          {p.education.map((e, i) => (<div className="cv-item" key={i}><span className="yr">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity: .65, fontSize: 12 }}>{e.org}</span></div></div>))}
          <h4 style={{ marginTop: 22 }}>Now in the studio</h4>
          {p.now.map((n, i) => (<div className="cv-item" key={i}><span className="yr">№ {String(i+1).padStart(2,"0")}</span><span style={{ fontStyle: 'italic' }}>{n}</span></div>))}
        </div>
      </div>

      <div className="legend"><span>Curator · {p.name}</span><span>Catalogue raisonné · folio.app/{p.name.split(" ")[0].toLowerCase()}</span><span>Free admission</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   13 — TRADING CARD  ·  developer persona
   Signature: stacked TCG cards, holo accent, stat bars, foil flip.
   ───────────────────────────────────────────────────────────────── */
const T13_CSS = `
.t13{ font-family: "DM Sans", sans-serif; background: #0d1b2a; color: #e9eef5; min-height: 100%; padding: 22px 22px 60px;
  background-image:
    radial-gradient(circle at 20% 0%, rgba(120, 80, 220, .22), transparent 50%),
    radial-gradient(circle at 80% 100%, rgba(80, 200, 220, .18), transparent 50%);
}
.t13.light{ background: #e9eef5; color: #0d1b2a; background-image:
    radial-gradient(circle at 20% 0%, rgba(120, 80, 220, .12), transparent 50%),
    radial-gradient(circle at 80% 100%, rgba(80, 200, 220, .12), transparent 50%);
}
.t13 .top{ display: flex; justify-content: space-between; font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-bottom: 22px; }
.t13 .deck{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.t13-mobile .deck{ grid-template-columns: 1fr; }
.t13 .card{ background: linear-gradient(155deg, #1b2a45 0%, #2c1b45 100%); border-radius: 18px; padding: 4px; border: 1px solid rgba(255,255,255,.15); box-shadow: 0 30px 60px -30px rgba(0,0,0,.6); position: relative; overflow: hidden; transition: transform .25s; }
.t13.light .card{ background: linear-gradient(155deg, #ffffff 0%, #f0eaff 100%); border-color: rgba(0,0,0,.08); }
.t13 .card:hover{ transform: translateY(-4px); }
.t13 .card::before{ content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%); transform: translateX(-100%); animation: t13holo 4s ease-in-out infinite; pointer-events: none; }
@keyframes t13holo{ 0%{ transform: translateX(-100%) } 60%, 100%{ transform: translateX(100%) } }
.t13 .card-inner{ background: #0f1a30; border-radius: 14px; padding: 16px; height: 100%; position: relative; z-index: 1; }
.t13.light .card-inner{ background: #fafbfd; color: #0d1b2a; }
.t13 .legendary .card-inner{ background: #18102a; }
.t13.light .legendary .card-inner{ background: #fff4e8; }
.t13 .head-card{ display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.t13 .head-card .name{ font-family: "Unbounded", sans-serif; font-weight: 700; font-size: 22px; letter-spacing: -0.01em; }
.t13 .head-card .hp{ font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 700; }
.t13 .head-card .hp i{ color: #ff7a6c; font-style: normal; }
.t13 .card-art{ aspect-ratio: 4/3; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; margin-bottom: 10px; background: rgba(255,255,255,.04); }
.t13.light .card-art{ border-color: rgba(0,0,0,.1); background: rgba(0,0,0,.03); }
.t13 .card-type{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-bottom: 8px; }
.t13 .desc{ font-size: 13px; line-height: 1.45; opacity: .85; padding: 8px 0; border-top: 1px solid rgba(255,255,255,.1); border-bottom: 1px solid rgba(255,255,255,.1); margin-bottom: 8px; }
.t13.light .desc{ border-color: rgba(0,0,0,.08); }
.t13 .stat-row{ display: flex; justify-content: space-between; font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .65; margin-bottom: 4px; }
.t13 .stat-bar{ height: 4px; background: rgba(255,255,255,.08); border-radius: 999px; overflow: hidden; margin-bottom: 8px; }
.t13.light .stat-bar{ background: rgba(0,0,0,.08); }
.t13 .stat-bar i{ display: block; height: 100%; background: linear-gradient(90deg, #6df5a4, #79b6ff); }
.t13 .card-foot{ display: flex; justify-content: space-between; font-family: "JetBrains Mono", monospace; font-size: 9px; opacity: .55; letter-spacing: 0.14em; text-transform: uppercase; margin-top: 6px; }
.t13 .hero-card{ background: linear-gradient(155deg, #ffd06f 0%, #ff7a6c 100%); border-radius: 22px; padding: 4px; box-shadow: 0 30px 60px -30px rgba(0,0,0,.6); margin-bottom: 16px; position: relative; overflow: hidden; }
.t13 .hero-card::before{ content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,.4) 50%, transparent 65%); transform: translateX(-100%); animation: t13holo 5s ease-in-out infinite; pointer-events: none; }
.t13 .hero-card .hero-inner{ background: #1a0e2c; border-radius: 18px; padding: 22px; position: relative; z-index: 1; }
.t13.light .hero-card .hero-inner{ background: #fff; color: #0d1b2a; }
.t13 .hero-card .ribbon{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .65; }
.t13 .hero-card h1{ font-family: "Unbounded", sans-serif; font-weight: 900; font-size: clamp(34px, 5.5vw, 56px); line-height: 1; margin: 8px 0 12px; letter-spacing: -0.02em; }
.t13 .hero-card .grid-stats{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.15); }
.t13-mobile .hero-card .grid-stats{ grid-template-columns: repeat(2, 1fr); }
.t13.light .hero-card .grid-stats{ border-color: rgba(0,0,0,.1); }
.t13 .hero-card .grid-stats b{ display: block; font-family: "Unbounded", sans-serif; font-weight: 700; font-size: 22px; }
.t13 .hero-card .grid-stats small{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .6; }
.t13 h2{ font-family: "Unbounded", sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase; margin: 30px 0 14px; display: flex; justify-content: space-between; align-items: baseline; }
.t13 h2 small{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .55; font-weight: 400; }
.t13 .timeline-card{ background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 14px; margin-bottom: 8px; display: grid; grid-template-columns: 1fr 100px; gap: 12px; align-items: baseline; }
.t13.light .timeline-card{ background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.08); }
.t13 .timeline-card b{ font-family: "Unbounded", sans-serif; font-weight: 700; }
`;
function Tpl13TradingCard({ mode, dark }) {
  const p = PERSONAS.developer;
  const stats = [{ k: "build", v: 92 }, { k: "ship", v: 88 }, { k: "debug", v: 95 }, { k: "design", v: 70 }];
  return (<>
    <style>{T13_CSS}</style>
    <div className={`t13 ${mode === 'mobile' ? 't13-mobile' : ''} ${dark ? '' : 'light'}`}>
      <div className="top"><span>★ Folio TCG · Series 2026</span><span>Rare · Foil</span></div>

      <div className="hero-card">
        <div className="hero-inner">
          <div className="ribbon">№ 001 / 099 · Legendary</div>
          <h1>{p.name}</h1>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: .7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.role} · {p.school}</div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.5, maxWidth: 560 }}>{p.tagline}</p>
          <div className="grid-stats">
            <div><b>14</b><small>Repos</small></div>
            <div><b>2.1k</b><small>Commits 25</small></div>
            <div><b>4</b><small>Interns</small></div>
            <div><b>3.92</b><small>GPA</small></div>
          </div>
        </div>
      </div>

      <h2>Projects deck <small>collect them all</small></h2>
      <div className="deck">
        {p.projects.map((pr, i) => (
          <div className={`card ${i === 0 ? 'legendary' : ''}`} key={i}>
            <div className="card-inner">
              <div className="head-card">
                <span className="name">{pr.title}</span>
                <span className="hp"><i>HP</i> {80 + (i * 7) % 30}</span>
              </div>
              <div className="card-art">{pr.kind} · illus.</div>
              <div className="card-type">{pr.kind} · {pr.year} · {['common', 'rare', 'rare', 'common', 'foil', 'rare'][i] || 'common'}</div>
              <div className="desc">{pr.note}</div>
              {stats.slice(0, 2).map((s, k) => (<div key={k}><div className="stat-row"><span>{s.k}</span><span>{Math.max(40, s.v - i * 3)}</span></div><div className="stat-bar"><i style={{ width: `${Math.max(40, s.v - i * 3)}%` }}></i></div></div>))}
              <div className="card-foot"><span>FOLIO/TCG</span><span>№ {String(i+1).padStart(3,"0")}/099</span></div>
            </div>
          </div>
        ))}
      </div>

      <h2>Trainer history <small>experience</small></h2>
      {p.experience.map((e, i) => (
        <div className="timeline-card" key={i}>
          <div><b>{e.role}</b> · {e.org}<div style={{ fontSize: 12, opacity: .7, marginTop: 4 }}>{e.note}</div></div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: .65, textAlign: 'right' }}>{e.time}</span>
        </div>
      ))}

      <h2>Badges <small>{p.awards.length} earned</small></h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {p.awards.map((a, i) => (
          <div key={i} style={{ background: 'linear-gradient(145deg, #ffd06f, #ff7a6c)', borderRadius: 14, padding: 2, color: '#1a0e2c' }}>
            <div style={{ background: dark ? '#0d1b2a' : '#fff', color: dark ? '#e9eef5' : '#0d1b2a', borderRadius: 12, padding: '10px 14px', fontSize: 12 }}>
              <div style={{ fontFamily: '"Unbounded", sans-serif', fontWeight: 700 }}>{a.name}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, opacity: .65, marginTop: 4 }}>{a.year}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Tech tree <small>skill stack</small></h2>
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 8 }}>
        {p.skills.map((s, i) => (
          <div key={s} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 12, alignItems: 'center', fontSize: 12, padding: '6px 0' }}>
            <span>{s}</span>
            <div className="stat-bar"><i style={{ width: `${65 + (i * 17) % 30}%` }}></i></div>
          </div>
        ))}
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   14 — MANIFESTO  ·  designer persona
   Signature: huge typographic poster, no images, list+number rhythm.
   ───────────────────────────────────────────────────────────────── */
const T14_CSS = `
.t14{ font-family: "Unbounded", sans-serif; background: #f0ec4a; color: #100c0c; min-height: 100%; padding: 26px 26px 60px; }
.t14.dark{ background: #100c0c; color: #f0ec4a; }
.t14 .top{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 2px solid currentColor; }
.t14 h1{ font-family: "Unbounded", sans-serif; font-weight: 900; font-size: clamp(54px, 11vw, 168px); line-height: 0.88; letter-spacing: -0.04em; margin: 28px 0 22px; text-transform: uppercase; }
.t14-mobile h1{ font-size: 56px; }
.t14 h1 span{ display: block; }
.t14 h1 .x{ -webkit-text-stroke: 2px currentColor; color: transparent; }
.t14 .lede{ font-family: "Inter", sans-serif; font-size: 17px; max-width: 640px; line-height: 1.5; font-weight: 500; padding-bottom: 28px; border-bottom: 2px solid currentColor; }
.t14 .number{ font-family: "Unbounded", sans-serif; font-weight: 900; font-size: clamp(96px, 14vw, 220px); line-height: 1; letter-spacing: -0.04em; padding: 38px 0 18px; border-bottom: 2px solid currentColor; display: flex; align-items: baseline; justify-content: space-between; }
.t14-mobile .number{ font-size: 90px; }
.t14 .number small{ font-family: "Inter", sans-serif; font-weight: 600; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; max-width: 220px; line-height: 1.5; padding-left: 12px; text-align: right; }
.t14 .creed{ font-family: "Unbounded", sans-serif; font-weight: 700; font-size: clamp(28px, 4vw, 44px); line-height: 1.1; padding: 38px 0; border-bottom: 2px solid currentColor; letter-spacing: -0.02em; }
.t14-mobile .creed{ font-size: 26px; }
.t14 .creed em{ font-style: italic; font-family: "EB Garamond", serif; font-weight: 400; }
.t14 h2{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 600; margin: 32px 0 18px; display: flex; justify-content: space-between; }
.t14 .points{ list-style: none; padding: 0; margin: 0; }
.t14 .points li{ padding: 14px 0; border-top: 2px solid currentColor; display: grid; grid-template-columns: 60px 1fr; gap: 14px; align-items: baseline; font-family: "Unbounded", sans-serif; font-weight: 700; font-size: 22px; line-height: 1.15; letter-spacing: -0.01em; }
.t14-mobile .points li{ font-size: 18px; }
.t14 .points li .n{ font-family: "Unbounded", sans-serif; font-size: 13px; font-weight: 900; letter-spacing: 0.02em; opacity: .55; }
.t14 .points li small{ font-family: "Inter", sans-serif; font-weight: 500; font-size: 13px; letter-spacing: 0; text-transform: none; opacity: .7; display: block; margin-top: 6px; line-height: 1.45; }
.t14 .roll{ font-family: "Inter", sans-serif; font-size: 13px; line-height: 1.6; columns: 2; column-gap: 24px; column-rule: 1px solid currentColor; padding-top: 22px; border-top: 2px solid currentColor; }
.t14-mobile .roll{ columns: 1; }
.t14 .roll b{ font-family: "Unbounded", sans-serif; font-weight: 700; font-size: 14px; display: block; margin-top: 6px; }
.t14 .sign{ padding-top: 26px; margin-top: 30px; border-top: 4px solid currentColor; font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; display: flex; justify-content: space-between; }
.t14 .sign b{ font-family: "Unbounded", sans-serif; font-size: 28px; letter-spacing: -0.01em; text-transform: none; font-weight: 900; }
.t14-mobile .sign{ flex-direction: column; gap: 10px; }
`;
function Tpl14Manifesto({ mode, dark }) {
  const p = PERSONAS.designer;
  const principles = [
    { p: "Make less, make it slower.", n: "Mass produces noise. Cadence produces signal." },
    { p: "The margin is a held breath.", n: "What you leave out is what makes the thing feel held." },
    { p: "Print before screen.", n: "A page does not refresh. Decide once, and well." },
    { p: "Books are software.", n: "Read them as version histories of an idea." },
    { p: "Type is a body.", n: "Letters lean, breathe, slouch, hold tension." },
    { p: "Steal politely.", n: "Cite the dead. Argue with the living." },
  ];
  return (<>
    <style>{T14_CSS}</style>
    <div className={`t14 ${mode === 'mobile' ? 't14-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="top"><span>Manifesto № 01</span><span>{p.location} · 2026</span><span>Folio.app/{p.name.split(" ")[0].toLowerCase()}</span></div>

      <h1><span>A</span><span className="x">PRACTICE</span><span>IN</span><span>PUBLIC.</span></h1>
      <p className="lede"><b>{p.name}</b> — {p.tagline} What follows is a working manifesto: rules I keep, books I read, work I've made, and the names of people who have made me better.</p>

      <div className="number">06<small>principles I'm trying to live by</small></div>

      <ol className="points">
        {principles.map((it, i) => (
          <li key={i}><span className="n">№ {String(i+1).padStart(2,"0")}</span><div>{it.p}<small>{it.n}</small></div></li>
        ))}
      </ol>

      <div className="creed">"A practice is just <em>showing up</em> a lot of times. Every Tuesday. Even the bad ones."</div>

      <h2>Works produced<span>{p.projects.length} pieces</span></h2>
      <ol className="points">
        {p.projects.map((pr, i) => (
          <li key={i}><span className="n">{String(i+1).padStart(2,"0")}</span><div>{pr.title}<small>{pr.kind} · {pr.year} — {pr.note}</small></div></li>
        ))}
      </ol>

      <h2>Roll call<span>cv · in brief</span></h2>
      <div className="roll">
        <p>Worked with: <b>{p.experience.map(e => e.org).join(" · ")}</b></p>
        <p>Studied at: <b>{p.education.map(e => e.org).join(" · ")}</b></p>
        <p>Skilled in: <b>{p.skills.join(" · ")}</b></p>
        <p>Awarded: <b>{p.awards.map(a => a.name).join(" · ")}</b></p>
        <p>Languages: <b>{p.languages.join(" · ")}</b></p>
        <p>Reading now: <b>{p.now.join(" · ")}</b></p>
      </div>

      <div className="sign">
        <span>Signed, in earnest,</span>
        <b>{p.name}</b>
        <span>{p.email}</span>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   15 — ATLAS / CARTOGRAPHIC  ·  business persona
   Signature: contour rules, lat/long marginalia, scale bar, key.
   ───────────────────────────────────────────────────────────────── */
const T15_CSS = `
.t15{ font-family: "EB Garamond", serif; background: #f5efde; color: #221d12; min-height: 100%; padding: 0;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(120, 80, 40, .06) 0 1px, transparent 1px),
    radial-gradient(circle at 88% 30%, rgba(120, 80, 40, .06) 0 1px, transparent 1px);
}
.t15.dark{ background: #14110b; color: #f5efde; }
.t15 .margin{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .65; }
.t15 .bar{ height: 36px; padding: 10px 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid currentColor; }
.t15 .titleplate{ padding: 36px 22px; border-bottom: 4px double currentColor; display: grid; grid-template-columns: 1fr 240px; gap: 24px; align-items: end; }
.t15-mobile .titleplate{ grid-template-columns: 1fr; }
.t15 .titleplate .compass{ width: 110px; aspect-ratio: 1; border: 1.5px solid currentColor; border-radius: 999px; position: relative; align-self: end; justify-self: end; }
.t15-mobile .titleplate .compass{ justify-self: start; }
.t15 .titleplate .compass::before{ content: "N"; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); font-family: "Major Mono Display", monospace; font-size: 11px; }
.t15 .titleplate .compass::after{ content: ""; position: absolute; top: 18%; left: 50%; width: 2px; height: 65%; background: currentColor; transform: translateX(-50%); }
.t15 .titleplate .compass i{ position: absolute; inset: 12px; border-radius: 999px; border: 1px dashed currentColor; opacity: .55; }
.t15 h1{ font-family: "EB Garamond", serif; font-weight: 500; font-size: clamp(40px, 6.5vw, 84px); line-height: 1; margin: 0 0 8px; letter-spacing: -0.01em; font-style: italic; }
.t15-mobile h1{ font-size: 48px; }
.t15 .titleplate .key{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 14px; opacity: .65; }
.t15 .titleplate .deck{ font-family: "EB Garamond", serif; font-style: italic; font-size: 16px; max-width: 540px; opacity: .8; }
.t15 .legend{ display: grid; grid-template-columns: repeat(4, 1fr); padding: 18px 22px; gap: 14px; border-bottom: 1px solid currentColor; }
.t15-mobile .legend{ grid-template-columns: repeat(2, 1fr); }
.t15 .legend > div{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; }
.t15 .legend > div b{ font-family: "EB Garamond", serif; font-weight: 500; font-size: 15px; display: block; margin-top: 4px; font-style: italic; letter-spacing: 0; text-transform: none; }
.t15 section{ padding: 26px 22px; border-bottom: 1px solid currentColor; position: relative; }
.t15 section::after{ content: ""; position: absolute; top: 18px; right: 22px; width: 60px; height: 1.5px; background: currentColor; }
.t15 section h2{ font-family: "Major Mono Display", monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; margin: 0 0 10px; }
.t15 section h2 + .deck{ font-family: "EB Garamond", serif; font-style: italic; font-size: 22px; max-width: 540px; margin-bottom: 18px; line-height: 1.3; }
.t15 .coords{ display: grid; grid-template-columns: 110px 1fr; gap: 18px; padding: 12px 0; border-top: 1px dashed currentColor; align-items: baseline; }
.t15 .coords:first-of-type{ border-top: 0; padding-top: 0; }
.t15 .coords .latlong{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.12em; opacity: .65; }
.t15 .coords h3{ font-family: "EB Garamond", serif; font-style: italic; font-size: 22px; margin: 0 0 4px; font-weight: 500; }
.t15 .coords p{ margin: 4px 0 0; font-size: 14px; line-height: 1.5; opacity: .85; }
.t15 .coords .tag{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; }
.t15 .scale-bar{ display: flex; align-items: center; gap: 10px; padding: 14px 0; font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.14em; opacity: .75; }
.t15 .scale-bar i{ display: inline-block; width: 28px; height: 6px; background: currentColor; }
.t15 .scale-bar i:nth-child(2){ background: transparent; border: 1px solid currentColor; }
.t15 .ledger{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-family: "EB Garamond", serif; font-size: 14px; line-height: 1.55; }
.t15-mobile .ledger{ grid-template-columns: 1fr; }
.t15 .ledger h4{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; margin: 0 0 8px; opacity: .65; font-weight: 400; }
.t15 .ledger .item{ padding: 8px 0; border-top: 1px dashed currentColor; display: grid; grid-template-columns: 70px 1fr; gap: 12px; }
.t15 .ledger .item .yr{ font-family: "Major Mono Display", monospace; font-size: 10px; opacity: .6; }
.t15 .pull{ font-family: "EB Garamond", serif; font-style: italic; font-size: 22px; line-height: 1.3; max-width: 640px; padding: 14px 0; }
.t15 .pull cite{ display: block; font-family: "Major Mono Display", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .6; margin-top: 10px; }
.t15 .colophon{ padding: 22px; font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .7; }
`;
function Tpl15Atlas({ mode, dark }) {
  const p = PERSONAS.business;
  return (<>
    <style>{T15_CSS}</style>
    <div className={`t15 ${mode === 'mobile' ? 't15-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="bar margin"><span>fol. 03 · sht. 04</span><span>scale 1 : 1 — life-size</span><span>{p.location} · 48.85°N 2.35°E</span></div>

      <section className="titleplate" style={{ borderBottom: 'none' }}>
        <div>
          <div className="margin" style={{ marginBottom: 10 }}>An Atlas of</div>
          <h1>{p.name}</h1>
          <div className="deck">A working cartography — projects, ports of call, and the routes between them — surveyed from {p.location}.</div>
        </div>
        <div className="compass"><i></i></div>
      </section>

      <div className="legend">
        <div>Surveyor<b>{p.name}</b></div>
        <div>Station<b>{p.school}</b></div>
        <div>Discipline<b>{p.role}</b></div>
        <div>Drawn<b>Spring 2026</b></div>
      </div>

      <section>
        <h2>Sheet I · Voyages <span style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', opacity: .55, float: 'right' }}>fol. 01</span></h2>
        <div className="deck">"Each project is a port. The line between them is the practice."</div>
        {p.projects.map((pr, i) => (
          <div className="coords" key={i}>
            <div>
              <div className="latlong">{(48 + i * 0.7).toFixed(2)}°N · {(2 + i * 0.4).toFixed(2)}°E</div>
              <div className="tag">{pr.kind}</div>
            </div>
            <div>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
              <div className="latlong" style={{ marginTop: 4 }}>logged {pr.year}</div>
            </div>
          </div>
        ))}
        <div className="scale-bar"><i></i><i></i><i></i><i></i><span>0 — 5 — 10 — 15 km of practice</span></div>
      </section>

      <section>
        <h2>Sheet II · The route <span style={{ fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.16em', opacity: .55, float: 'right' }}>fol. 02</span></h2>
        <div className="ledger">
          <div>
            <h4>Stations passed</h4>
            {p.experience.map((e, i) => (<div className="item" key={i}><span className="yr">{e.time}</span><div><b style={{ fontStyle: 'italic' }}>{e.role}</b>, {e.org}<br/><span style={{ opacity: .7, fontSize: 13 }}>{e.note}</span></div></div>))}
          </div>
          <div>
            <h4>Schools mapped</h4>
            {p.education.map((e, i) => (<div className="item" key={i}><span className="yr">{e.time}</span><div><b style={{ fontStyle: 'italic' }}>{e.degree}</b><br/><span style={{ opacity: .7, fontSize: 13 }}>{e.org}</span></div></div>))}
          </div>
        </div>
      </section>

      <section>
        <h2>Sheet III · Marginalia</h2>
        <div className="pull">"{p.testimonials[0].quote}"<cite>— marginal note, hand of {p.testimonials[0].author}</cite></div>
      </section>

      <section>
        <h2>Sheet IV · Key & languages</h2>
        <div className="ledger">
          <div>
            <h4>Languages spoken</h4>
            <div style={{ fontStyle: 'italic' }}>{p.languages.join(" · ")}</div>
            <h4 style={{ marginTop: 16 }}>Instruments</h4>
            <div style={{ fontStyle: 'italic' }}>{p.skills.join(" · ")}</div>
          </div>
          <div>
            <h4>Currently surveying</h4>
            {p.now.map((n, i) => (<div className="item" key={i}><span className="yr">№ {String(i+1).padStart(2,"0")}</span><span style={{ fontStyle: 'italic' }}>{n}</span></div>))}
          </div>
        </div>
      </section>

      <div className="colophon"><span>Folio Atlas · drawn by hand</span><span>{p.email}</span></div>
    </div>
  </>);
}

window.Tpl11BoardingPass = Tpl11BoardingPass;
window.Tpl12Museum = Tpl12Museum;
window.Tpl13TradingCard = Tpl13TradingCard;
window.Tpl14Manifesto = Tpl14Manifesto;
window.Tpl15Atlas = Tpl15Atlas;

/* global React, PERSONAS */
const { useState: _u16, useEffect: _e16 } = React;

/* ─────────────────────────────────────────────────────────────────
   16 — RECEIPT  ·  business persona
   Signature: thermal-paper receipt, line items + totals, perforated foot.
   ───────────────────────────────────────────────────────────────── */
const T16_CSS = `
.t16{ font-family: "IBM Plex Mono", monospace; background: #ddd6c4; color: #1a1714; min-height: 100%; padding: 22px 22px 60px; }
.t16.dark{ background: #14110d; color: #efe9d8; }
.t16 .paper{ background: #faf6e6; color: #1a1714; max-width: 560px; margin: 0 auto; padding: 22px 22px 6px; box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 30px 60px -40px rgba(0,0,0,.4); position: relative; }
.t16.dark .paper{ background: #1f1c14; color: #efe9d8; }
.t16 .paper::after{ content: ""; position: absolute; bottom: -18px; left: 0; right: 0; height: 18px; background:
  linear-gradient(135deg, transparent 33%, #faf6e6 33% 66%, transparent 66%) 0 0 / 18px 18px,
  linear-gradient(45deg, transparent 33%, #faf6e6 33% 66%, transparent 66%) 0 0 / 18px 18px; }
.t16.dark .paper::after{ background:
  linear-gradient(135deg, transparent 33%, #1f1c14 33% 66%, transparent 66%) 0 0 / 18px 18px,
  linear-gradient(45deg, transparent 33%, #1f1c14 33% 66%, transparent 66%) 0 0 / 18px 18px; }
.t16 .head{ text-align: center; padding-bottom: 14px; border-bottom: 1.5px dashed currentColor; }
.t16 .head .brand{ font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 22px; letter-spacing: 0.08em; }
.t16 .head .sub{ font-size: 11px; opacity: .65; letter-spacing: 0.1em; margin-top: 4px; text-transform: uppercase; }
.t16 .head .addr{ font-size: 11px; opacity: .75; margin-top: 10px; line-height: 1.4; }
.t16 .meta{ font-size: 11px; padding: 10px 0; border-bottom: 1.5px dashed currentColor; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.t16 .meta div span{ opacity: .55; }
.t16 .section-hd{ font-size: 11px; padding: 14px 0 6px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .8; font-weight: 700; display: flex; justify-content: space-between; }
.t16 .line{ display: grid; grid-template-columns: 1fr 70px; gap: 10px; padding: 4px 0; font-size: 12px; line-height: 1.45; }
.t16 .line .price{ text-align: right; font-variant-numeric: tabular-nums; }
.t16 .line.sub{ padding-left: 14px; font-size: 11px; opacity: .65; }
.t16 .dashes{ border-top: 1.5px dashed currentColor; margin: 6px 0; }
.t16 .total{ font-size: 14px; font-weight: 700; padding: 6px 0; display: grid; grid-template-columns: 1fr 70px; gap: 10px; }
.t16 .total .price{ text-align: right; }
.t16 .foot{ padding: 14px 0; text-align: center; font-size: 11px; opacity: .75; line-height: 1.5; border-top: 1.5px dashed currentColor; }
.t16 .barcode{ display: flex; align-items: end; justify-content: center; height: 40px; gap: 1.5px; margin: 10px 0; }
.t16 .barcode i{ background: currentColor; display: block; height: 100%; }
.t16 .h1-pop{ font-size: 14px; font-weight: 700; text-align: center; margin-top: 8px; }
.t16 .stamp{ display: inline-block; border: 2px solid #2c8f4a; color: #2c8f4a; padding: 3px 10px; font-weight: 700; letter-spacing: 0.18em; transform: rotate(-6deg); font-size: 11px; }
.t16 .qr{ width: 64px; aspect-ratio: 1; background:
  conic-gradient(from 0deg at 50% 50%, currentColor 25%, transparent 0 50%, currentColor 0 75%, transparent 0);
  background-size: 8px 8px; opacity: .85; margin: 8px auto 0; border: 6px solid currentColor; }
`;
function Tpl16Receipt({ mode, dark }) {
  const p = PERSONAS.business;
  const bars = React.useMemo(() => Array.from({ length: 40 }, () => ({ w: Math.random() < 0.5 ? 1 : 2 })), []);
  return (<>
    <style>{T16_CSS}</style>
    <div className={`t16 ${mode === 'mobile' ? 't16-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="paper">
        <div className="head">
          <div className="brand">FOLIO/MART</div>
          <div className="sub">★ Curriculum Vitae · since 2002 ★</div>
          <div className="addr">{p.school} · {p.location}<br/>folio.app/{p.name.split(" ")[0].toLowerCase()}</div>
        </div>

        <div className="meta">
          <div><span>RECEIPT #</span> {String(Math.floor(Math.random() * 90000) + 10000)}</div>
          <div style={{ textAlign: 'right' }}><span>DATE</span> 12-MAY-26</div>
          <div><span>CUSTOMER</span> {p.name}</div>
          <div style={{ textAlign: 'right' }}><span>POS</span> 04 · CASHIER ME</div>
          <div><span>EMAIL</span> {p.email}</div>
          <div style={{ textAlign: 'right' }}><span>LANE</span> {p.role.split(" ")[0]}</div>
        </div>

        <div className="section-hd"><span>★ PROJECTS</span><span>QTY · USD</span></div>
        {p.projects.map((pr, i) => (
          <React.Fragment key={i}>
            <div className="line"><span>{pr.title.toUpperCase()}</span><span className="price">$ {(20 + i * 7).toFixed(2)}</span></div>
            <div className="line sub"><span>{pr.kind} · {pr.year}</span><span></span></div>
            <div className="line sub"><span>↳ {pr.note}</span><span></span></div>
          </React.Fragment>
        ))}

        <div className="dashes"></div>
        <div className="section-hd"><span>★ EXPERIENCE</span><span>HRS</span></div>
        {p.experience.map((e, i) => (
          <div className="line" key={i}><span>{e.role.toUpperCase()} @ {e.org}</span><span className="price">{e.time.includes("–") ? "·" : ""}{(160 + i * 80)}h</span></div>
        ))}

        <div className="dashes"></div>
        <div className="section-hd"><span>★ EDUCATION</span><span>CR</span></div>
        {p.education.map((e, i) => (
          <div className="line" key={i}><span>{e.degree.toUpperCase()}</span><span className="price">{(15 + i * 3)}cr</span></div>
        ))}

        <div className="dashes"></div>
        <div className="section-hd"><span>★ SKILLS · LANGUAGES</span><span></span></div>
        <div className="line" style={{ gridTemplateColumns: '1fr' }}><span>{p.skills.join(" · ")}</span></div>
        <div className="line sub" style={{ gridTemplateColumns: '1fr' }}><span>LANG: {p.languages.join(" · ")}</span></div>

        <div className="dashes"></div>
        <div className="section-hd"><span>★ AWARDS</span><span>YR</span></div>
        {p.awards.map((a, i) => (
          <div className="line" key={i}><span>{a.name.toUpperCase()}</span><span className="price">{a.year}</span></div>
        ))}

        <div className="dashes"></div>
        <div className="section-hd"><span>★ CURRENTLY (now playing)</span><span></span></div>
        {p.now.map((n, i) => (
          <div className="line sub" key={i} style={{ gridTemplateColumns: '1fr' }}><span>→ {n}</span></div>
        ))}

        <div className="dashes"></div>
        <div className="total"><span>SUBTOTAL · entries</span><span className="price">{p.projects.length + p.experience.length + p.education.length + p.awards.length}</span></div>
        <div className="total"><span>TAX (0% — student)</span><span className="price">$ 0.00</span></div>
        <div className="total" style={{ borderTop: '2px solid currentColor', paddingTop: 8, fontSize: 16 }}>
          <span>TOTAL · value</span><span className="price">priceless</span>
        </div>

        <div className="h1-pop">★ THANK YOU FOR YOUR CONSIDERATION ★</div>
        <div style={{ textAlign: 'center', margin: '6px 0' }}><span className="stamp">PAID · IN PRACTICE</span></div>

        <div className="barcode">{bars.map((b, i) => (<i key={i} style={{ width: b.w, height: `${60 + (i * 17) % 40}%` }} />))}</div>
        <div style={{ textAlign: 'center', fontSize: 10, opacity: .65, letterSpacing: '0.1em' }}>★ {p.name.toUpperCase().replace(/\s/g, "·")} ★ {p.email.toUpperCase()} ★</div>

        <div className="qr"></div>
        <div className="foot">
          Returns accepted indefinitely.<br/>
          Keep this receipt for your records.<br/>
          ▰ folio.app — built with care, deployed in 12 seconds ▰
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   17 — LIBRARY CARD  ·  designer persona
   Signature: Dewey-style cards, typewriter type, date stamps.
   ───────────────────────────────────────────────────────────────── */
const T17_CSS = `
.t17{ font-family: "Special Elite", "Courier New", monospace; background: #d8cdb4; color: #2a2117; min-height: 100%; padding: 28px 24px 60px; }
.t17.dark{ background: #1a160e; color: #d8cdb4; }
.t17 .ribbon{ text-align: center; font-family: "Special Elite", monospace; letter-spacing: 0.18em; text-transform: uppercase; font-size: 11px; padding-bottom: 14px; border-bottom: 2px solid currentColor; opacity: .8; }
.t17 .catalog{ display: grid; grid-template-columns: 200px 1fr; gap: 22px; padding: 24px 0; border-bottom: 2px solid currentColor; }
.t17-mobile .catalog{ grid-template-columns: 1fr; }
.t17 .catalog .name h1{ font-family: "EB Garamond", serif; font-size: clamp(36px, 6.5vw, 72px); line-height: 1; font-weight: 500; font-style: italic; margin: 0 0 6px; letter-spacing: -0.01em; }
.t17-mobile .catalog .name h1{ font-size: 42px; }
.t17 .catalog .name .role{ font-family: "Special Elite", monospace; font-size: 12px; letter-spacing: 0.1em; opacity: .8; }
.t17 .catalog .num{ background: #fff; color: #2a2117; padding: 14px; box-shadow: 2px 3px 0 rgba(0,0,0,.15); transform: rotate(-1deg); }
.t17.dark .catalog .num{ background: #2a2117; color: #d8cdb4; }
.t17 .catalog .num .lbl{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; }
.t17 .catalog .num .val{ font-family: "Special Elite", monospace; font-size: 22px; margin: 2px 0; }
.t17 h2{ font-family: "Special Elite", monospace; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; margin: 24px 0 14px; padding-bottom: 4px; border-bottom: 2px solid currentColor; display: flex; justify-content: space-between; }
.t17 .stacks{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.t17-mobile .stacks{ grid-template-columns: 1fr; }
.t17 .index-card{ background: #fff; color: #2a2117; padding: 16px 18px; box-shadow: 3px 3px 0 rgba(0,0,0,.18); position: relative; min-height: 130px;
  background-image: repeating-linear-gradient(transparent 0 22px, rgba(0,0,0,.06) 22px 23px); background-size: 100% 23px; background-position: 0 36px;
}
.t17.dark .index-card{ background: #2a2117; color: #d8cdb4; background-image: repeating-linear-gradient(transparent 0 22px, rgba(255,255,255,.06) 22px 23px); }
.t17 .index-card.tilt-l{ transform: rotate(-1deg); }
.t17 .index-card.tilt-r{ transform: rotate(1.4deg); }
.t17 .index-card .ddc{ font-family: "Special Elite", monospace; font-size: 11px; opacity: .65; letter-spacing: 0.1em; }
.t17 .index-card h3{ font-family: "EB Garamond", serif; font-style: italic; font-size: 22px; margin: 2px 0 6px; font-weight: 500; line-height: 1.1; }
.t17 .index-card .body-card{ font-family: "Special Elite", monospace; font-size: 12px; line-height: 1.65; }
.t17 .index-card .by{ font-family: "Special Elite", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .55; margin-top: 8px; }
.t17 .stamp{ display: inline-block; border: 2.5px solid #b03227; color: #b03227; padding: 4px 10px; font-family: "Special Elite", monospace; font-weight: 700; letter-spacing: 0.18em; transform: rotate(-7deg); font-size: 11px; text-transform: uppercase; }
.t17 .date-slip{ background: #fff; color: #2a2117; padding: 14px; box-shadow: 3px 3px 0 rgba(0,0,0,.18); transform: rotate(-1deg); max-width: 340px; }
.t17.dark .date-slip{ background: #2a2117; color: #d8cdb4; }
.t17 .date-slip .hdr{ font-family: "Special Elite", monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; padding-bottom: 6px; border-bottom: 1px solid currentColor; margin-bottom: 8px; opacity: .8; }
.t17 .date-slip .stamp-row{ display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed currentColor; font-size: 12px; font-family: "Special Elite", monospace; }
.t17 .ledger{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; font-family: "Special Elite", monospace; font-size: 13px; line-height: 1.6; }
.t17-mobile .ledger{ grid-template-columns: 1fr; }
.t17 .ledger h4{ font-family: "EB Garamond", serif; font-style: italic; font-size: 20px; margin: 0 0 10px; font-weight: 500; }
.t17 .ledger .item{ padding: 6px 0; border-top: 1px dashed currentColor; }
.t17 .ledger .item .yr{ opacity: .65; font-size: 11px; letter-spacing: 0.08em; }
.t17 .colophon{ padding: 20px 0 0; font-family: "Special Elite", monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .7; display: flex; justify-content: space-between; border-top: 2px solid currentColor; margin-top: 26px; }
`;
function Tpl17Library({ mode, dark }) {
  const p = PERSONAS.designer;
  const ddc = ["741.6", "070.5", "686.2", "655.1", "769.5", "709.0"];
  return (<>
    <style>{T17_CSS}</style>
    <div className={`t17 ${mode === 'mobile' ? 't17-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="ribbon">★ ★ ★   FOLIO PUBLIC LIBRARY · MAIN BRANCH   ★ ★ ★</div>

      <div className="catalog">
        <div className="num">
          <div className="lbl">CALL №</div>
          <div className="val">741.6</div>
          <div className="val">MAR/{p.name.split(" ")[1].slice(0,3).toUpperCase()}</div>
          <div className="lbl" style={{ marginTop: 6 }}>VOL. III · 2026</div>
          <div style={{ marginTop: 10 }}><span className="stamp">CATALOGUED</span></div>
        </div>
        <div className="name">
          <h1>{p.name}</h1>
          <div className="role">{p.role.toUpperCase()} · {p.school.toUpperCase()}</div>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.55, maxWidth: 540 }}>{p.tagline}</div>
          <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span className="stamp" style={{ color: '#2c6f5a', borderColor: '#2c6f5a' }}>ON SHELF</span>
            <span style={{ fontSize: 11, alignSelf: 'center', letterSpacing: '0.1em' }}>LOCATED · {p.location.toUpperCase()}</span>
            <span style={{ fontSize: 11, alignSelf: 'center', letterSpacing: '0.1em' }}>HOLDS · {p.experience.length}</span>
          </div>
        </div>
      </div>

      <h2><span>Catalogue · works</span><span style={{ opacity: .55 }}>{p.projects.length} entries</span></h2>
      <div className="stacks">
        {p.projects.map((pr, i) => (
          <div className={`index-card ${i % 2 ? 'tilt-r' : 'tilt-l'}`} key={i}>
            <div className="ddc">{ddc[i % ddc.length]} / {pr.title.split(" ")[0].slice(0, 3).toUpperCase()}</div>
            <h3>{pr.title}</h3>
            <div className="body-card">{pr.note}<br/>—{pr.kind}, {pr.year}.</div>
            <div className="by">CARD {String(i+1).padStart(2,"0")} OF {String(p.projects.length).padStart(2,"0")} · {pr.kind.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <h2><span>Date due slip</span><span style={{ opacity: .55 }}>experience</span></h2>
      <div className="date-slip">
        <div className="hdr">↳ Borrowed by employers · do not detach</div>
        {p.experience.map((e, i) => (
          <div className="stamp-row" key={i}>
            <span><b>{e.role}</b> · {e.org}</span>
            <span style={{ opacity: .65 }}>{e.time}</span>
          </div>
        ))}
        <div style={{ marginTop: 10 }}><span className="stamp">RETURNED</span> <span className="stamp" style={{ color: '#2c6f5a', borderColor: '#2c6f5a' }}>REISSUED</span></div>
      </div>

      <h2><span>Acquisitions</span><span style={{ opacity: .55 }}>cv · education · awards</span></h2>
      <div className="ledger">
        <div>
          <h4>Education</h4>
          {p.education.map((e, i) => (<div className="item" key={i}><b>{e.degree}</b><br/><span className="yr">{e.org} · {e.time}</span></div>))}
          <h4 style={{ marginTop: 16 }}>Languages</h4>
          <div style={{ fontFamily: '"Special Elite", monospace', fontSize: 13 }}>{p.languages.join(" · ")}</div>
        </div>
        <div>
          <h4>Honours</h4>
          {p.awards.map((a, i) => (<div className="item" key={i}><b>{a.name}</b><br/><span className="yr">{a.year}</span></div>))}
          <h4 style={{ marginTop: 16 }}>Currently on desk</h4>
          {p.now.map((n, i) => (<div className="item" key={i} style={{ fontSize: 12 }}>→ {n}</div>))}
        </div>
      </div>

      <div className="colophon"><span>★ FOLIO PUBLIC LIBRARY</span><span>{p.email}</span><span>FREE WITH CARD</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   18 — CONCERT POSTER  ·  designer persona
   Signature: layered riso colors, screaming type, band-bill rhythm.
   ───────────────────────────────────────────────────────────────── */
const T18_CSS = `
.t18{ font-family: "Bebas Neue", "Inter", sans-serif; background: #f0e7d4; color: #1d1612; min-height: 100%; padding: 0; overflow: hidden; position: relative; }
.t18.dark{ background: #1d1612; color: #f7c948; }
.t18 .splash{ padding: 28px 26px 18px; position: relative; }
.t18 .splash .stripe{ position: absolute; inset: 0; background: #ff5747; mix-blend-mode: multiply; transform: skewY(-4deg) translateY(-30%); height: 60%; pointer-events: none; }
.t18.dark .splash .stripe{ background: #6b21a8; mix-blend-mode: screen; }
.t18 .splash .stripe2{ position: absolute; inset: 0; background: #2456b3; mix-blend-mode: multiply; transform: skewY(3deg) translateY(20%); height: 60%; pointer-events: none; top: 30%; }
.t18.dark .splash .stripe2{ background: #d62246; mix-blend-mode: screen; }
.t18 .splash > *{ position: relative; z-index: 1; }
.t18 .tour{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; display: flex; justify-content: space-between; margin-bottom: 18px; opacity: .85; }
.t18 .head-poster{ display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
.t18 .head-poster .pres{ font-family: "Inter", sans-serif; font-style: italic; font-size: 16px; }
.t18 h1{ font-family: "Bebas Neue", sans-serif; font-weight: 400; font-size: clamp(82px, 16vw, 220px); line-height: 0.78; letter-spacing: 0; margin: 6px 0 8px; text-transform: uppercase; }
.t18-mobile h1{ font-size: 86px; }
.t18 h1 span.huge{ display: block; }
.t18 h1 .tilt{ display: inline-block; transform: rotate(-2deg); }
.t18 .splash .dates{ font-family: "Inter", sans-serif; font-size: 14px; letter-spacing: 0.04em; margin-top: 6px; max-width: 640px; line-height: 1.5; }
.t18 .splash .dates b{ font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 0.04em; display: inline-block; padding: 0 6px; background: #f7c948; color: #1d1612; }
.t18.dark .splash .dates b{ background: #f7c948; color: #1d1612; }
.t18 .lineup{ padding: 26px; background: currentColor; color: #f0e7d4; }
.t18.dark .lineup{ color: #1d1612; }
.t18 .lineup h2{ font-family: "Bebas Neue", sans-serif; font-size: 32px; margin: 0 0 12px; letter-spacing: 0.04em; display: flex; justify-content: space-between; }
.t18 .lineup .row-bill{ display: grid; grid-template-columns: 1fr 1fr 60px; gap: 18px; padding: 12px 0; border-top: 2px solid currentColor; font-family: "Bebas Neue", sans-serif; font-size: clamp(20px, 3vw, 32px); letter-spacing: 0.03em; align-items: baseline; line-height: 1; }
.t18-mobile .lineup .row-bill{ grid-template-columns: 1fr 60px; }
.t18-mobile .lineup .row-bill .meta{ display: none; }
.t18 .lineup .row-bill:first-of-type{ font-size: clamp(28px, 4vw, 52px); }
.t18 .lineup .row-bill .meta{ font-family: "Inter", sans-serif; font-size: 12px; letter-spacing: 0.02em; opacity: .75; text-transform: none; line-height: 1.4; align-self: center; }
.t18 .lineup .row-bill .yr{ font-family: "Inter", sans-serif; font-size: 11px; opacity: .55; letter-spacing: 0.18em; text-align: right; }
.t18 section{ padding: 26px; border-bottom: 2px solid currentColor; }
.t18 section h2{ font-family: "Bebas Neue", sans-serif; font-size: 38px; margin: 0 0 16px; letter-spacing: 0.04em; display: flex; justify-content: space-between; align-items: baseline; }
.t18 section h2 small{ font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em; opacity: .65; }
.t18 .ribbon-row{ background: #f7c948; color: #1d1612; padding: 10px 26px; font-family: "Bebas Neue", sans-serif; font-size: 22px; letter-spacing: 0.08em; display: flex; justify-content: space-between; overflow: hidden; }
.t18.dark .ribbon-row{ background: #ff5747; color: #1d1612; }
.t18 .grid2{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t18-mobile .grid2{ grid-template-columns: 1fr; }
.t18 .grid2 .blk{ font-family: "Inter", sans-serif; font-size: 13px; line-height: 1.5; }
.t18 .grid2 .blk h3{ font-family: "Bebas Neue", sans-serif; font-size: 24px; margin: 0 0 8px; letter-spacing: 0.04em; }
.t18 .grid2 .blk .row{ padding: 7px 0; border-top: 1px dashed currentColor; }
.t18 .grid2 .blk .row:first-child{ border-top: 0; padding-top: 0; }
.t18 .grid2 .blk .row b{ font-family: "Bebas Neue", sans-serif; font-size: 18px; letter-spacing: 0.03em; }
.t18 .quotebox{ padding: 26px; font-family: "Bebas Neue", sans-serif; font-size: clamp(28px, 4.5vw, 48px); line-height: 1.05; letter-spacing: 0.04em; }
.t18-mobile .quotebox{ font-size: 28px; }
.t18 .quotebox cite{ font-family: "Inter", sans-serif; font-style: normal; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; display: block; margin-top: 12px; }
.t18 .colophon{ padding: 16px 26px; font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .8; }
`;
function Tpl18Poster({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T18_CSS}</style>
    <div className={`t18 ${mode === 'mobile' ? 't18-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="splash">
        <div className="stripe"></div><div className="stripe2"></div>
        <div className="tour"><span>SPRING TOUR · 2026</span><span>FREE WITH RSVP</span><span>ALL AGES</span></div>
        <div className="head-poster">
          <span className="pres">Folio.app proudly presents</span>
        </div>
        <h1>
          <span className="huge">{p.name.split(" ")[0]}</span>
          <span className="huge"><span className="tilt">{p.name.split(" ")[1]}</span></span>
        </h1>
        <div className="dates">
          <b>{p.location.toUpperCase()}</b> · {p.school} · {p.role} ·<br/>
          <b>SHOWS</b> 02 MAR · 14 APR · 30 MAY — with special guests & supporting acts below.
        </div>
      </div>

      <div className="ribbon-row"><span>★ TONIGHT'S BILL ★</span><span>DOORS 7 · MUSIC 8</span></div>

      <div className="lineup">
        <h2><span>WORKS / SETLIST</span><small style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: '0.16em' }}>{p.projects.length} songs</small></h2>
        {p.projects.map((pr, i) => (
          <div className="row-bill" key={i}>
            <span>{pr.title.toUpperCase()}</span>
            <span className="meta">{pr.kind} · {pr.note}</span>
            <span className="yr">'{pr.year.slice(-2)}</span>
          </div>
        ))}
      </div>

      <div className="ribbon-row"><span>★ WORDS FROM THE PRESS ★</span><span>★</span></div>

      <div className="quotebox">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}</cite></div>

      <section>
        <h2>BACKSTAGE · CV<small>full bio</small></h2>
        <div className="grid2">
          <div className="blk">
            <h3>Past venues / experience</h3>
            {p.experience.map((e, i) => (<div className="row" key={i}><b>{e.role}</b> · {e.org}<br/><span style={{ opacity: .65 }}>{e.time} — {e.note}</span></div>))}
          </div>
          <div className="blk">
            <h3>Where I trained</h3>
            {p.education.map((e, i) => (<div className="row" key={i}><b>{e.degree}</b><br/><span style={{ opacity: .65 }}>{e.org} · {e.time}</span></div>))}
          </div>
        </div>
      </section>

      <section>
        <h2>MERCH TABLE<small>skills · awards</small></h2>
        <div className="grid2">
          <div className="blk">
            <h3>★ Skills</h3>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 22, letterSpacing: '0.04em', lineHeight: 1.3 }}>{p.skills.join(" · ")}</div>
            <h3 style={{ marginTop: 14 }}>★ Languages</h3>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13 }}>{p.languages.join(" · ")}</div>
          </div>
          <div className="blk">
            <h3>★ Awards / trophies</h3>
            {p.awards.map((a, i) => (<div className="row" key={i}><b>{a.name}</b> <span style={{ opacity: .65 }}>· {a.year}</span></div>))}
          </div>
        </div>
      </section>

      <div className="colophon"><span>★ FOLIO/RECORDS ★</span><span>RISO ED. OF 99</span><span>{p.email.toUpperCase()}</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   19 — FINDER WINDOW  ·  developer persona
   Signature: macOS file browser, projects-as-files, sidebar, list view.
   ───────────────────────────────────────────────────────────────── */
const T19_CSS = `
.t19{ font-family: -apple-system, "Inter", "SF Pro Text", sans-serif; background: #c6c2bc; color: #1c1c1e; min-height: 100%; padding: 22px 22px 60px; font-size: 13px;
  background-image: radial-gradient(circle at 30% 10%, rgba(255,200,150,.18), transparent 40%), radial-gradient(circle at 80% 60%, rgba(150,200,255,.18), transparent 40%);
}
.t19.dark{ background: #2a2a2c; color: #f0f0f3; background-image: radial-gradient(circle at 30% 10%, rgba(120,80,40,.2), transparent 40%), radial-gradient(circle at 80% 60%, rgba(40,80,120,.2), transparent 40%); }
.t19 .win{ background: #fafafa; border-radius: 12px; box-shadow: 0 30px 60px -30px rgba(0,0,0,.4), 0 2px 6px rgba(0,0,0,.1); overflow: hidden; border: 0.5px solid rgba(0,0,0,.15); max-width: 920px; margin: 0 auto; }
.t19.dark .win{ background: #1c1c1e; border-color: rgba(255,255,255,.1); color: #f0f0f3; }
.t19 .titlebar{ background: linear-gradient(180deg, #ececec, #d8d8d8); padding: 10px 14px; display: flex; align-items: center; gap: 10px; border-bottom: 0.5px solid rgba(0,0,0,.15); }
.t19.dark .titlebar{ background: linear-gradient(180deg, #3a3a3c, #2a2a2c); border-color: rgba(255,255,255,.1); }
.t19 .titlebar .dots{ display: flex; gap: 8px; }
.t19 .titlebar .dots i{ width: 12px; height: 12px; border-radius: 999px; background: #d8d8d8; }
.t19 .titlebar .dots i:nth-child(1){ background: #ff5f57; }
.t19 .titlebar .dots i:nth-child(2){ background: #febc2e; }
.t19 .titlebar .dots i:nth-child(3){ background: #28c840; }
.t19 .titlebar .title-w{ flex: 1; text-align: center; font-size: 12px; color: rgba(0,0,0,.55); font-weight: 500; }
.t19.dark .titlebar .title-w{ color: rgba(255,255,255,.55); }
.t19 .toolbar{ display: flex; align-items: center; gap: 12px; padding: 8px 14px; border-bottom: 0.5px solid rgba(0,0,0,.1); }
.t19.dark .toolbar{ border-color: rgba(255,255,255,.1); }
.t19 .toolbar .seg{ display: flex; gap: 0; background: rgba(0,0,0,.06); border-radius: 6px; overflow: hidden; }
.t19 .toolbar .seg button{ background: transparent; border: 0; padding: 4px 10px; font-size: 11px; color: inherit; cursor: pointer; }
.t19 .toolbar .seg button.on{ background: rgba(255,255,255,.9); }
.t19.dark .toolbar .seg{ background: rgba(255,255,255,.08); }
.t19.dark .toolbar .seg button.on{ background: rgba(255,255,255,.15); }
.t19 .toolbar .search{ flex: 1; background: rgba(0,0,0,.06); border-radius: 6px; padding: 4px 10px; font-size: 11px; color: rgba(0,0,0,.55); }
.t19.dark .toolbar .search{ background: rgba(255,255,255,.08); color: rgba(255,255,255,.55); }
.t19 .body-win{ display: grid; grid-template-columns: 200px 1fr; min-height: 480px; }
.t19-mobile .body-win{ grid-template-columns: 1fr; }
.t19-mobile .sidebar{ display: none; }
.t19 .sidebar{ background: rgba(0,0,0,.025); border-right: 0.5px solid rgba(0,0,0,.1); padding: 12px 8px; font-size: 12px; }
.t19.dark .sidebar{ background: rgba(255,255,255,.03); border-color: rgba(255,255,255,.08); }
.t19 .sidebar h4{ font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,.45); margin: 12px 8px 4px; font-weight: 600; }
.t19.dark .sidebar h4{ color: rgba(255,255,255,.4); }
.t19 .sidebar .item{ padding: 4px 8px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.t19 .sidebar .item.on{ background: rgba(0, 122, 255, 0.85); color: #fff; }
.t19 .sidebar .item:hover:not(.on){ background: rgba(0,0,0,.06); }
.t19.dark .sidebar .item:hover:not(.on){ background: rgba(255,255,255,.05); }
.t19 .sidebar .item .ic{ width: 14px; height: 14px; background: currentColor; border-radius: 3px; opacity: .65; }
.t19 .sidebar .item.on .ic{ background: #fff; opacity: 1; }
.t19 .files{ overflow: hidden; }
.t19 .file-head{ display: grid; grid-template-columns: 1.6fr 1fr 80px 90px; gap: 0; padding: 6px 12px; background: rgba(0,0,0,.04); font-size: 10px; letter-spacing: 0.04em; color: rgba(0,0,0,.55); font-weight: 600; text-transform: uppercase; border-bottom: 0.5px solid rgba(0,0,0,.1); }
.t19-mobile .file-head{ grid-template-columns: 1fr 80px; }
.t19-mobile .file-head .kind, .t19-mobile .file-head .size{ display: none; }
.t19.dark .file-head{ background: rgba(255,255,255,.04); color: rgba(255,255,255,.5); }
.t19 .file{ display: grid; grid-template-columns: 1.6fr 1fr 80px 90px; gap: 0; padding: 8px 12px; align-items: center; font-size: 13px; border-top: 0.5px solid rgba(0,0,0,.05); cursor: pointer; }
.t19-mobile .file{ grid-template-columns: 1fr 80px; }
.t19-mobile .file .kind, .t19-mobile .file .size{ display: none; }
.t19 .file:hover{ background: rgba(0, 122, 255, 0.08); }
.t19 .file.sel{ background: rgba(0, 122, 255, 0.85); color: #fff; }
.t19 .file .name{ display: flex; align-items: center; gap: 8px; }
.t19 .file .ic{ width: 18px; height: 22px; background: linear-gradient(180deg, #ffd06f, #ffb24a); border-radius: 3px 3px 1px 1px; position: relative; flex-shrink: 0; }
.t19 .file .ic::before{ content: ""; position: absolute; right: 3px; top: 3px; width: 6px; height: 6px; background: rgba(255,255,255,.4); border-radius: 1px; }
.t19 .file .ic.code{ background: linear-gradient(180deg, #79b6ff, #2456b3); }
.t19 .file .ic.text{ background: linear-gradient(180deg, #d0d0d0, #a0a0a0); }
.t19 .file .ic.folder{ background: linear-gradient(180deg, #79b6ff, #4a8fdc); border-radius: 0 3px 3px 3px; }
.t19 .file .kind, .t19 .file .size, .t19 .file .date{ font-size: 11px; opacity: .75; }
.t19 .preview{ border-top: 0.5px solid rgba(0,0,0,.1); padding: 16px 18px; background: rgba(0,0,0,.025); }
.t19.dark .preview{ background: rgba(255,255,255,.03); border-color: rgba(255,255,255,.08); }
.t19 .preview h2{ font-size: 18px; font-weight: 600; margin: 0 0 4px; letter-spacing: -0.01em; }
.t19 .preview .meta{ font-size: 11px; opacity: .65; margin-bottom: 12px; }
.t19 .preview .grid-meta{ display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; font-size: 12px; }
.t19 .preview .grid-meta b{ opacity: .55; font-weight: 500; font-size: 11px; }
.t19 .terminal-block{ background: #1d1d1f; color: #f0f0f3; border-radius: 8px; padding: 14px 16px; font-family: "JetBrains Mono", monospace; font-size: 12px; line-height: 1.55; margin: 18px auto 0; max-width: 920px; }
.t19 .terminal-block .ln{ display: flex; gap: 10px; }
.t19 .terminal-block .ln .prompt{ color: #6df5a4; }
.t19 .terminal-block .ln .out{ color: #b8b8c0; }
.t19 .desktop-icons{ display: flex; gap: 24px; padding: 16px 0; max-width: 920px; margin: 0 auto; flex-wrap: wrap; }
.t19 .desktop-icon{ width: 80px; text-align: center; font-size: 11px; cursor: pointer; }
.t19 .desktop-icon .ic{ width: 48px; height: 48px; margin: 0 auto 4px; border-radius: 10px; background: linear-gradient(160deg, #ff5f57, #c33); box-shadow: 0 4px 12px -2px rgba(0,0,0,.3); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; }
.t19 .desktop-icon:nth-child(2) .ic{ background: linear-gradient(160deg, #007aff, #0055cc); }
.t19 .desktop-icon:nth-child(3) .ic{ background: linear-gradient(160deg, #34c759, #1f8a3f); }
.t19 .desktop-icon:nth-child(4) .ic{ background: linear-gradient(160deg, #af52de, #6b21a8); }
`;
function Tpl19Finder({ mode, dark }) {
  const p = PERSONAS.developer;
  const [sel, setSel] = React.useState(0);
  const sizes = ["1.4 MB", "880 KB", "2.1 MB", "640 KB", "1.2 MB", "420 KB"];
  return (<>
    <style>{T19_CSS}</style>
    <div className={`t19 ${mode === 'mobile' ? 't19-mobile' : ''} ${dark ? 'dark' : ''}`}>
      {mode !== 'mobile' && (
        <div className="desktop-icons">
          <div className="desktop-icon"><div className="ic">CV</div>{p.name.split(" ")[0]}_CV.pdf</div>
          <div className="desktop-icon"><div className="ic">⌥</div>about.md</div>
          <div className="desktop-icon"><div className="ic">⌘</div>Projects</div>
          <div className="desktop-icon"><div className="ic">♥</div>contact.vcf</div>
        </div>
      )}
      <div className="win">
        <div className="titlebar">
          <div className="dots"><i></i><i></i><i></i></div>
          <div className="title-w">{p.name} — ~/folio</div>
        </div>
        <div className="toolbar">
          <span style={{ fontSize: 13 }}>‹ ›</span>
          <div className="seg"><button>≡</button><button className="on">▤</button><button>⊞</button></div>
          <div className="search">🔍 Search "{p.name.split(" ")[0]}"</div>
        </div>
        <div className="body-win">
          <aside className="sidebar">
            <h4>Favourites</h4>
            <div className="item on"><span className="ic"></span>folio</div>
            <div className="item"><span className="ic"></span>Projects</div>
            <div className="item"><span className="ic"></span>cv.pdf</div>
            <div className="item"><span className="ic"></span>Writing</div>
            <h4>Tags</h4>
            <div className="item"><span className="ic" style={{ background: '#ff5747' }}></span>Available</div>
            <div className="item"><span className="ic" style={{ background: '#28c840' }}></span>Open source</div>
            <div className="item"><span className="ic" style={{ background: '#007aff' }}></span>Internships</div>
          </aside>
          <div className="files">
            <div className="file-head">
              <div className="name">Name</div>
              <div className="kind">Kind</div>
              <div className="size">Size</div>
              <div className="date">Modified</div>
            </div>
            {p.projects.map((pr, i) => (
              <div className={`file ${i === sel ? 'sel' : ''}`} key={i} onClick={() => setSel(i)}>
                <div className="name"><span className={`ic ${i % 3 === 0 ? 'code' : i % 3 === 1 ? '' : 'text'}`}></span>{pr.title.toLowerCase().replace(/\s+/g, "-")}{i % 3 === 0 ? ".go" : i % 3 === 1 ? ".md" : ".txt"}</div>
                <div className="kind">{pr.kind} doc</div>
                <div className="size">{sizes[i % sizes.length]}</div>
                <div className="date">{pr.year}</div>
              </div>
            ))}
            <div className="file"><div className="name"><span className="ic folder"></span>experience</div><div className="kind">Folder</div><div className="size">{p.experience.length} items</div><div className="date">2026</div></div>
            <div className="file"><div className="name"><span className="ic folder"></span>education</div><div className="kind">Folder</div><div className="size">{p.education.length} items</div><div className="date">2026</div></div>
            <div className="file"><div className="name"><span className="ic"></span>cv.pdf</div><div className="kind">PDF</div><div className="size">1 page</div><div className="date">Today</div></div>
            <div className="file"><div className="name"><span className="ic text"></span>readme.md</div><div className="kind">Markdown</div><div className="size">2.3 KB</div><div className="date">Today</div></div>
          </div>
        </div>
        <div className="preview">
          <h2>{p.projects[sel].title}</h2>
          <div className="meta">{p.projects[sel].kind} · {p.projects[sel].year} · {sizes[sel % sizes.length]}</div>
          <p style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 12px' }}>{p.projects[sel].note}</p>
          <div className="grid-meta">
            <div><b>Owner</b> {p.name}</div>
            <div><b>Where</b> {p.location}</div>
            <div><b>Language</b> {p.skills[sel % p.skills.length]}</div>
            <div><b>Tags</b> {p.projects[sel].kind}</div>
            <div><b>School</b> {p.school}</div>
            <div><b>Online</b> {p.socials[0]}</div>
          </div>
        </div>
      </div>

      <div className="terminal-block">
        <div className="ln"><span className="prompt">$</span><span>cat about.md</span></div>
        <div className="ln"><span></span><span className="out">// {p.name} — {p.role}</span></div>
        <div className="ln"><span></span><span className="out">// {p.tagline}</span></div>
        <div className="ln"><span></span><span className="out">// based in {p.location} · graduating {p.education[0].time.split("–")[1]}</span></div>
        <div className="ln"><span className="prompt">$</span><span>ls experience/</span></div>
        {p.experience.map((e, i) => (<div className="ln" key={i}><span></span><span className="out">{e.time.padEnd(14, " ")} {e.role} @ {e.org}</span></div>))}
        <div className="ln"><span className="prompt">$</span><span>./deploy --subdomain {p.name.split(" ")[0].toLowerCase()}</span></div>
        <div className="ln"><span></span><span className="out" style={{ color: '#6df5a4' }}>✓ live at {p.name.split(" ")[0].toLowerCase()}.folio.app</span></div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   20 — BOTANICAL PLATE  ·  business persona
   Signature: herbarium sheet, Latin caption, hand-drawn grid lines, specimen labels.
   ───────────────────────────────────────────────────────────────── */
const T20_CSS = `
.t20{ font-family: "EB Garamond", serif; background: #f0eadb; color: #2a2418; min-height: 100%; padding: 0; position: relative;
  background-image:
    linear-gradient(rgba(80,60,30,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(80,60,30,.06) 1px, transparent 1px);
  background-size: 28px 28px;
}
.t20.dark{ background: #14110b; color: #f0eadb; background-image: linear-gradient(rgba(255,240,210,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,240,210,.05) 1px, transparent 1px); }
.t20 .sheet{ padding: 28px 26px 60px; border: 1.5px solid currentColor; margin: 16px; }
.t20 .topplate{ display: grid; grid-template-columns: 1fr 200px; gap: 24px; padding-bottom: 18px; border-bottom: 1.5px solid currentColor; }
.t20-mobile .topplate{ grid-template-columns: 1fr; }
.t20 .topplate .kicker{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; opacity: .7; }
.t20 .topplate h1{ font-family: "EB Garamond", serif; font-style: italic; font-weight: 500; font-size: clamp(40px, 6.5vw, 84px); line-height: 1; letter-spacing: -0.01em; margin: 10px 0 8px; }
.t20-mobile .topplate h1{ font-size: 46px; }
.t20 .topplate .latin{ font-family: "EB Garamond", serif; font-style: italic; font-size: 18px; opacity: .75; }
.t20 .topplate .latin span{ font-style: normal; opacity: .6; }
.t20 .topplate .specimen{ background: #fff; padding: 14px; box-shadow: 1px 2px 0 rgba(0,0,0,.1); transform: rotate(-1deg); color: #2a2418; }
.t20.dark .topplate .specimen{ background: #1c1810; color: #f0eadb; }
.t20 .topplate .specimen .lbl{ font-family: "Major Mono Display", monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; }
.t20 .topplate .specimen b{ font-family: "EB Garamond", serif; font-style: italic; font-size: 16px; display: block; margin: 1px 0 6px; }
.t20 h2{ font-family: "EB Garamond", serif; font-style: italic; font-weight: 500; font-size: 32px; margin: 26px 0 14px; letter-spacing: -0.005em; display: flex; justify-content: space-between; align-items: baseline; }
.t20 h2 small{ font-family: "Major Mono Display", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; }
.t20 .specimens{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; }
.t20-mobile .specimens{ grid-template-columns: 1fr; }
.t20 .plate{ display: flex; flex-direction: column; align-items: stretch; gap: 8px; }
.t20 .plate .img{ aspect-ratio: 3/4; background: #fff; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; position: relative;
  background-image:
    radial-gradient(circle at 30% 35%, rgba(80,60,30,.18) 0 6%, transparent 7%),
    radial-gradient(circle at 50% 50%, rgba(80,60,30,.1) 0 22%, transparent 23%),
    radial-gradient(circle at 65% 70%, rgba(80,60,30,.14) 0 12%, transparent 13%);
}
.t20.dark .plate .img{ background: #1c1810; }
.t20 .plate .img::before{ content: attr(data-n); position: absolute; top: 8px; left: 8px; font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .65; }
.t20 .plate .img::after{ content: attr(data-r); position: absolute; bottom: 8px; right: 8px; font-family: "Major Mono Display", monospace; font-size: 9px; letter-spacing: 0.18em; opacity: .55; }
.t20 .plate .cap{ font-family: "EB Garamond", serif; font-style: italic; font-size: 18px; line-height: 1.1; }
.t20 .plate .cap span{ font-style: normal; font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; display: block; margin-top: 4px; }
.t20 .plate p{ font-size: 13px; line-height: 1.5; margin: 4px 0 0; opacity: .85; }
.t20 .pinned{ background: #fff; color: #2a2418; padding: 14px 18px; box-shadow: 2px 3px 0 rgba(0,0,0,.1); transform: rotate(-0.5deg); margin: 8px 0; }
.t20.dark .pinned{ background: #1c1810; color: #f0eadb; }
.t20 .pinned .lbl{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; }
.t20 .ledger{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 14px; line-height: 1.55; }
.t20-mobile .ledger{ grid-template-columns: 1fr; }
.t20 .ledger h4{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .55; margin: 0 0 10px; font-weight: 400; }
.t20 .ledger .row{ padding: 8px 0; border-top: 1px dashed currentColor; display: grid; grid-template-columns: 90px 1fr; gap: 12px; }
.t20 .ledger .row .yr{ font-family: "Major Mono Display", monospace; font-size: 11px; opacity: .55; }
.t20 .ledger .row b{ font-family: "EB Garamond", serif; font-style: italic; font-weight: 500; }
.t20 .footplate{ font-family: "Major Mono Display", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; display: flex; justify-content: space-between; padding-top: 18px; border-top: 1.5px solid currentColor; margin-top: 24px; }
`;
function Tpl20Botanical({ mode, dark }) {
  const p = PERSONAS.business;
  const latin = ["Strategia okonkwoii", "Mercatus lagosensis", "Operatio cotidiana", "Analytica narrativa", "Communitas fundatorum"];
  const localities = ["Lagos", "Paris", "London", "Accra", "Nairobi"];
  return (<>
    <style>{T20_CSS}</style>
    <div className={`t20 ${mode === 'mobile' ? 't20-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="sheet">
        <div className="topplate">
          <div>
            <div className="kicker">Herbarium folio.app · plate № 014 · Spring 2026</div>
            <h1>{p.name}</h1>
            <div className="latin"><span>collected by</span> the student herself · <span>at</span> {p.school} · <span>locality</span> {p.location}</div>
            <p style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 560, fontStyle: 'italic', marginTop: 12, opacity: .85 }}>{p.tagline} A working specimen sheet of projects, posts, and field notes — pinned, labelled, kept dry.</p>
          </div>
          <div className="specimen">
            <div className="lbl">Specimen card</div>
            <b>Studens vivax</b>
            <div className="lbl">Family</div>
            <div style={{ fontSize: 13, fontStyle: 'italic' }}>{p.role.split(" ")[0]}aceae</div>
            <div className="lbl" style={{ marginTop: 6 }}>Determined</div>
            <div style={{ fontSize: 12 }}>12 May 2026 · A. Okonkwo</div>
            <div className="lbl" style={{ marginTop: 6 }}>Contact</div>
            <div style={{ fontSize: 12 }}>{p.email}</div>
          </div>
        </div>

        <h2>Specimens<small>Selected works · {p.projects.length} plates</small></h2>
        <div className="specimens">
          {p.projects.map((pr, i) => (
            <div className="plate" key={i}>
              <div className="img" data-n={`№ ${String(i+1).padStart(3,"0")}`} data-r={localities[i % localities.length]}></div>
              <div className="cap">{latin[i % latin.length]}<span>fam. {pr.kind} · coll. {pr.year} · {localities[i % localities.length]}</span></div>
              <p><b>{pr.title}</b> — {pr.note}</p>
            </div>
          ))}
        </div>

        <h2>Field notes<small>currently in the press</small></h2>
        {p.now.map((n, i) => (
          <div className="pinned" key={i}>
            <div className="lbl">Note {String(i+1).padStart(2,"0")} · {String(12 - i).padStart(2,"0")} May 2026</div>
            <div style={{ fontStyle: 'italic', fontSize: 16, lineHeight: 1.4 }}>{n}</div>
          </div>
        ))}

        <h2>Provenance<small>cv · curriculum</small></h2>
        <div className="ledger">
          <div>
            <h4>Pressed under</h4>
            {p.experience.map((e, i) => (<div className="row" key={i}><span className="yr">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity: .7, fontSize: 13 }}>{e.note}</span></div></div>))}
          </div>
          <div>
            <h4>Studied in the gardens of</h4>
            {p.education.map((e, i) => (<div className="row" key={i}><span className="yr">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity: .7, fontSize: 13 }}>{e.org}</span></div></div>))}
          </div>
        </div>

        <h2>Conservator's note<small>reference</small></h2>
        <div style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: 20, lineHeight: 1.4, maxWidth: 640, paddingLeft: 18, borderLeft: '3px solid currentColor' }}>
          "{p.testimonials[0].quote}"
          <div style={{ fontStyle: 'normal', fontFamily: '"Major Mono Display", monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: .65, marginTop: 10 }}>— {p.testimonials[0].author}</div>
        </div>

        <h2>Languages & instruments<small>collector's toolkit</small></h2>
        <div className="ledger">
          <div>
            <h4>Tongues spoken</h4>
            <div style={{ fontStyle: 'italic', fontSize: 15 }}>{p.languages.join(" · ")}</div>
          </div>
          <div>
            <h4>Field instruments</h4>
            <div style={{ fontStyle: 'italic', fontSize: 15 }}>{p.skills.join(" · ")}</div>
          </div>
        </div>

        <div className="footplate"><span>★ Herbarium folio.app</span><span>{p.email}</span><span>plate № 014 / 099</span></div>
      </div>
    </div>
  </>);
}

window.Tpl16Receipt = Tpl16Receipt;
window.Tpl17Library = Tpl17Library;
window.Tpl18Poster = Tpl18Poster;
window.Tpl19Finder = Tpl19Finder;
window.Tpl20Botanical = Tpl20Botanical;

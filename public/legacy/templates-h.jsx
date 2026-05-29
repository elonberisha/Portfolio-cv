/* global React, PERSONAS */

/* ─────────────────────────────────────────────────────────────────
   38 — MAGAZINE SPREAD  ·  creative (media / fashion / journalism)
   Signature: glossy magazine — full-bleed cover, deck, byline, big photo,
              column body, sidebar, masthead.
   ───────────────────────────────────────────────────────────────── */
const T38_CSS = `
.t38{ font-family: "Inter", sans-serif; background: #efece5; color: #1a1714; min-height: 100%; padding: 0; font-size: 13px; line-height: 1.55; }
.t38.dark{ background: #14110d; color: #efece5; }
.t38 .cover{ padding: 28px 32px 56px; position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; min-height: 460px; align-items: stretch; border-bottom: 1px solid currentColor; }
.t38-mobile .cover{ grid-template-columns: 1fr; padding: 22px 22px 30px; min-height: 0; }
.t38 .cover .ml{ font-family: "Fraunces", serif; font-weight: 700; font-size: clamp(48px, 9vw, 120px); line-height: 0.85; letter-spacing: -0.03em; text-transform: lowercase; }
.t38-mobile .cover .ml{ font-size: 56px; }
.t38 .cover .ml em{ font-style: italic; color: #c44a1f; }
.t38.dark .cover .ml em{ color: #ff7a45; }
.t38 .cover .meta-mag{ position: absolute; top: 16px; right: 32px; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; text-align: right; opacity: .65; line-height: 1.7; }
.t38-mobile .cover .meta-mag{ position: relative; top: auto; right: auto; text-align: left; }
.t38 .cover .cover-left{ display: flex; flex-direction: column; justify-content: space-between; }
.t38 .cover .cover-left .iss{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .65; margin-bottom: 14px; }
.t38 .cover .cover-left .deck-c{ font-family: "Fraunces", serif; font-style: italic; font-size: 18px; line-height: 1.4; max-width: 380px; opacity: .85; margin-top: 16px; }
.t38 .cover .cover-left .byline{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; opacity: .75; margin-top: auto; padding-top: 22px; }
.t38 .cover .cover-photo{ background: linear-gradient(135deg, #c44a1f 0%, #f5b87c 100%); border-radius: 4px; position: relative; min-height: 380px; overflow: hidden; }
.t38-mobile .cover .cover-photo{ min-height: 260px; }
.t38 .cover .cover-photo::after{ content: "PORTRAIT 4:5"; position: absolute; bottom: 18px; left: 18px; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.18em; color: rgba(255,255,255,.85); }
.t38 .cover .cover-photo .price{ position: absolute; top: 18px; right: 18px; color: #fff; font-family: "Fraunces", serif; font-style: italic; font-size: 24px; font-weight: 700; line-height: 1; }
.t38 .cover .cover-photo .price small{ display: block; font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 10px; font-weight: 500; letter-spacing: 0.14em; opacity: .85; margin-top: 4px; }
.t38 .cover .cover-photo .cover-lines{ position: absolute; bottom: 60px; left: 18px; right: 18px; color: #fff; font-family: "Fraunces", serif; font-style: italic; font-size: 14px; line-height: 1.4; }
.t38 .cover .cover-photo .cover-lines b{ font-style: normal; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; display: block; margin-bottom: 4px; }
.t38 .spread{ display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 0; border-bottom: 1px solid currentColor; }
.t38-mobile .spread{ grid-template-columns: 1fr; }
.t38 .spread .pg{ padding: 32px 32px; border-right: 1px solid currentColor; }
.t38 .spread .pg:last-child{ border-right: 0; }
.t38-mobile .spread .pg{ border-right: 0; border-bottom: 1px solid currentColor; padding: 22px; }
.t38 .spread .pg .folio{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; margin-bottom: 18px; }
.t38 .spread .pg h2{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: clamp(28px, 4vw, 44px); line-height: 1; letter-spacing: -0.02em; margin: 0 0 14px; max-width: 380px; }
.t38 .spread .pg h2 em{ font-style: normal; }
.t38 .spread .pg .lead{ font-family: "Fraunces", serif; font-style: italic; font-size: 16px; opacity: .85; max-width: 380px; margin-bottom: 22px; }
.t38 .spread .pg .cols{ column-count: 1; column-gap: 22px; font-size: 13px; line-height: 1.6; max-width: 380px; }
.t38 .spread .pg .cols p{ margin: 0 0 10px; }
.t38 .spread .pg .cols p:first-of-type::first-letter{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 4em; float: left; line-height: 0.85; padding: 4px 8px 0 0; color: #c44a1f; }
.t38.dark .spread .pg .cols p:first-of-type::first-letter{ color: #ff7a45; }
.t38 section.feat{ padding: 36px 32px; border-bottom: 1px solid currentColor; }
.t38-mobile section.feat{ padding: 24px 22px; }
.t38 section.feat h2{ font-family: "Fraunces", serif; font-style: italic; font-weight: 700; font-size: clamp(28px, 4vw, 42px); margin: 0 0 22px; letter-spacing: -0.02em; line-height: 1; display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 10px; border-bottom: 1.5px solid currentColor; }
.t38 section.feat h2 small{ font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; font-weight: 400; }
.t38 .gallery{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.t38-mobile .gallery{ grid-template-columns: 1fr 1fr; }
.t38 .gallery .item{ }
.t38 .gallery .item .ph{ background: linear-gradient(135deg, #c44a1f, #f0a070); aspect-ratio: 3/4; border-radius: 3px; position: relative; }
.t38 .gallery .item:nth-child(2n) .ph{ background: linear-gradient(135deg, #2d5e8a, #6ec4d8); }
.t38 .gallery .item:nth-child(3n) .ph{ background: linear-gradient(135deg, #5a4a32, #ddc4a4); }
.t38 .gallery .item:nth-child(4n) .ph{ background: linear-gradient(135deg, #1a1714, #5a4a3a); }
.t38 .gallery .item .ph::after{ content: attr(data-no); position: absolute; bottom: 10px; right: 10px; color: #fff; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; }
.t38 .gallery .item .cap-g{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-top: 8px; }
.t38 .gallery .item h4{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 19px; margin: 4px 0 4px; line-height: 1.05; }
.t38 .gallery .item p{ font-size: 12px; margin: 0; opacity: .8; line-height: 1.4; }
.t38 .cv-mag{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; }
.t38-mobile .cv-mag{ grid-template-columns: 1fr; }
.t38 .cv-mag h3{ font-family: "Fraunces", serif; font-style: italic; font-weight: 700; font-size: 22px; margin: 0 0 12px; }
.t38 .cv-mag .it{ padding: 8px 0; border-top: 1px dashed currentColor; font-size: 12px; line-height: 1.55; display: grid; grid-template-columns: 70px 1fr; gap: 12px; }
.t38 .cv-mag .it:first-of-type{ border-top: 0; padding-top: 0; }
.t38 .cv-mag .it .yr-m{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .55; letter-spacing: 0.06em; }
.t38 .cv-mag .it b{ font-weight: 700; }
.t38 .masthead-foot{ padding: 22px 32px; background: #1a1714; color: #efece5; display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; font-size: 11px; line-height: 1.6; }
.t38.dark .masthead-foot{ background: #efece5; color: #1a1714; }
.t38-mobile .masthead-foot{ grid-template-columns: 1fr 1fr; padding: 18px 22px; }
.t38 .masthead-foot h5{ font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; margin: 0 0 6px; font-weight: 500; }
.t38 .masthead-foot b{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 18px; display: block; letter-spacing: -0.01em; }
.t38 .colophon-38{ padding: 12px 32px; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; opacity: .75; border-top: 1px solid currentColor; }
`;
function Tpl38Magazine({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T38_CSS}</style>
    <div className={`t38 ${mode === 'mobile' ? 't38-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <header className="cover">
        <div className="meta-mag">VOL. III · ISSUE 14<br/>SPRING 2026 · folio mag<br/>{p.location.toUpperCase()}</div>
        <div className="cover-left">
          <div>
            <div className="iss">№ 014 · Spring 2026</div>
            <div className="ml">a <em>portrait</em> of {p.name.split(" ")[0].toLowerCase()}</div>
            <p className="deck-c">Books, posters, type — and the small decisions that hold them together. A conversation with {p.name}, in {p.location}.</p>
          </div>
          <div className="byline">words & work by {p.name} · 32pp</div>
        </div>
        <div className="cover-photo">
          <div className="price">€8<small>/issue · free online</small></div>
          <div className="cover-lines">
            <b>Inside this issue ↗</b>
            "A practice is just showing up a lot of times."<br/>
            How {p.name.split(" ")[0]} thinks about books, type, and the long hours of revision.
          </div>
        </div>
      </header>

      <section className="spread">
        <div className="pg">
          <div className="folio">↑ 04 · feature</div>
          <h2>The <em>quiet</em> hours.</h2>
          <p className="lead">A profile of {p.name} — at her desk, in the studio, and on the kind of weekday afternoon when no one expects much from the work.</p>
          <div className="cols">
            <p>{p.name} came to design through books. A grandmother's recipe binder, typed in three different ribbons. A library where the spines told you almost everything. By eighteen she was setting type on a borrowed press; by twenty-one, drawing her first display serif.</p>
            <p>Today she is in her third year at {p.school}, splitting time between {p.location} and a residency desk in {p.experience[p.experience.length-1].org}. "{p.tagline}"</p>
            <p>She works slowly, on purpose. "{p.testimonials[0].quote}" — Prof. Rosi's note, taped above the desk, gets quoted at least once a week.</p>
          </div>
        </div>
        <div className="pg">
          <div className="folio">↑ 05 · cont.</div>
          <h2>On <em>print</em> & <em>place</em>.</h2>
          <p className="lead">Why a margin is a held breath, why the page still matters, and what a year in Paris taught her.</p>
          <div className="cols">
            <p>The Erasmus year at ENSCI Paris broke something open. "I started keeping a working journal," she says. "Not as a precious thing — just to slow down the rhythm." The journal has since become public, sort of. She publishes a quarterly type zine, <i>Forme & Volume</i>, and a few essays a year on Are.na.</p>
            <p>Asked what she wants to do next: "{p.now[0]}." She laughs. "And probably also figure out where I'll live in 2027."</p>
            <p>{p.name.split(" ")[0]} graduates next year. She is, as the studio mentors keep saying, ready.</p>
          </div>
        </div>
      </section>

      <section className="feat">
        <h2>The Folio<small>portfolio · {p.projects.length} works on view</small></h2>
        <div className="gallery">
          {p.projects.map((pr, i) => (
            <div className="item" key={i}>
              <div className="ph" data-no={`№ ${String(i+1).padStart(2, "0")}`}></div>
              <div className="cap-g">{pr.kind} · {pr.year}</div>
              <h4>{pr.title}</h4>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="feat">
        <h2>The CV<small>curriculum vitae · in brief</small></h2>
        <div className="cv-mag">
          <div>
            <h3>Practice</h3>
            {p.experience.map((e, i) => (
              <div className="it" key={i}><span className="yr-m">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity: .7, fontSize: 11 }}>{e.note}</span></div></div>
            ))}
          </div>
          <div>
            <h3>Schooling</h3>
            {p.education.map((e, i) => (
              <div className="it" key={i}><span className="yr-m">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity: .7, fontSize: 11 }}>{e.org}</span></div></div>
            ))}
          </div>
          <div>
            <h3>Honours</h3>
            {p.awards.map((a, i) => (
              <div className="it" key={i}><span className="yr-m">{a.year}</span><div><b>{a.name}</b></div></div>
            ))}
            <h3 style={{ marginTop: 14 }}>Tongues</h3>
            <p style={{ margin: 0, fontStyle: 'italic', fontSize: 13 }}>{p.languages.join(" · ")}</p>
          </div>
        </div>
      </section>

      <footer className="masthead-foot">
        <div><h5>Editor & writer</h5><b>{p.name}</b><span>{p.role}</span></div>
        <div><h5>Studio</h5><b>{p.school}</b><span>{p.location}</span></div>
        <div><h5>Contact</h5><b>{p.email}</b><span>{p.socials[0]}</span></div>
        <div><h5>Issue</h5><b>№ 014 · 2026</b><span>spring · 32pp</span></div>
      </footer>

      <div className="colophon-38"><span>★ folio mag</span><span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span><span>set in Fraunces & Inter</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   39 — RISO ZINE  ·  creative (illustration, indie design)
   Signature: riso-print zine pages — pink + blue layered overprint, hand-set
              type, page-counter dots, perfect-bound aesthetic.
   ───────────────────────────────────────────────────────────────── */
const T39_CSS = `
.t39{ font-family: "Fraunces", serif; background: #fff4e8; color: #3a1c1c; min-height: 100%; padding: 0; font-size: 14px; line-height: 1.55; position: relative;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(255, 70, 100, .12) 0 1.5px, transparent 2px),
    radial-gradient(circle at 78% 22%, rgba(60, 90, 220, .10) 0 1.5px, transparent 2px);
  background-size: 4px 4px;
}
.t39.dark{ background-color: #1a1010; color: #ffd8c4; }
.t39 .pg-39{ padding: 28px 30px; border-bottom: 2px solid currentColor; position: relative; }
.t39 .pg-39 .pn{ position: absolute; bottom: 12px; right: 30px; font-family: "Fraunces", serif; font-style: italic; font-size: 14px; opacity: .65; }
.t39 .pg-39 .pn-l{ position: absolute; bottom: 12px; left: 30px; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .55; }
.t39 .cover-39{ padding: 56px 30px 48px; text-align: center; border-bottom: 2px solid currentColor; position: relative; overflow: hidden; }
.t39-mobile .cover-39{ padding: 36px 22px 30px; }
.t39 .cover-39::before, .t39 .cover-39::after{ content: ""; position: absolute; border-radius: 50%; mix-blend-mode: multiply; pointer-events: none; }
.t39 .cover-39::before{ width: 280px; height: 280px; background: #ff4664; opacity: .35; top: -80px; left: -60px; }
.t39 .cover-39::after{ width: 240px; height: 240px; background: #3c5adc; opacity: .35; bottom: -60px; right: -80px; }
.t39.dark .cover-39::before{ opacity: .5; mix-blend-mode: screen; }
.t39.dark .cover-39::after{ opacity: .5; mix-blend-mode: screen; }
.t39 .cover-39 > *{ position: relative; }
.t39 .cover-39 .iss{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; opacity: .75; margin-bottom: 14px; }
.t39 .cover-39 h1{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: clamp(48px, 8vw, 110px); line-height: 0.95; letter-spacing: -0.02em; margin: 0 0 12px; transform: rotate(-1deg); }
.t39 .cover-39 h1 em{ font-style: normal; color: #ff4664; }
.t39.dark .cover-39 h1 em{ color: #ff6a8a; }
.t39 .cover-39 .deck-z{ font-family: "Fraunces", serif; font-style: italic; font-size: 17px; max-width: 480px; margin: 0 auto; opacity: .85; }
.t39 .stamp-39{ display: inline-block; border: 2.5px solid #ff4664; color: #ff4664; padding: 6px 18px; transform: rotate(-6deg); font-family: "JetBrains Mono", monospace; font-weight: 700; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; margin-top: 18px; mix-blend-mode: multiply; }
.t39.dark .stamp-39{ color: #ff6a8a; border-color: #ff6a8a; mix-blend-mode: normal; }
.t39 h2{ font-family: "Fraunces", serif; font-weight: 700; font-style: italic; font-size: 32px; margin: 0 0 14px; letter-spacing: -0.015em; line-height: 1; }
.t39 h2 .lay{ background: #3c5adc; color: #fff4e8; padding: 0 8px; transform: rotate(-2deg); display: inline-block; mix-blend-mode: multiply; }
.t39.dark h2 .lay{ background: #3c5adc; color: #fff4e8; mix-blend-mode: normal; }
.t39 h3{ font-family: "Fraunces", serif; font-style: italic; font-weight: 700; font-size: 22px; margin: 0 0 6px; line-height: 1.05; }
.t39 .layered{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t39-mobile .layered{ grid-template-columns: 1fr; }
.t39 .layered .item-z{ position: relative; padding: 18px 18px 14px; background: rgba(255, 70, 100, .12); border: 1.5px solid currentColor; }
.t39 .layered .item-z:nth-child(2n){ background: rgba(60, 90, 220, .12); transform: rotate(0.6deg); }
.t39 .layered .item-z:nth-child(3n){ transform: rotate(-0.4deg); }
.t39 .layered .item-z .num-z{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; opacity: .65; text-transform: uppercase; margin-bottom: 6px; }
.t39 .layered .item-z .ph-z{ aspect-ratio: 4/3; background: linear-gradient(135deg, #ff4664 0%, #3c5adc 100%); margin-bottom: 10px; mix-blend-mode: multiply; opacity: .55; }
.t39.dark .layered .item-z .ph-z{ mix-blend-mode: normal; opacity: .85; }
.t39 .layered .item-z p{ font-size: 12px; margin: 0; opacity: .9; line-height: 1.5; }
.t39 .pull-39{ font-family: "Fraunces", serif; font-style: italic; font-size: clamp(26px, 4vw, 38px); line-height: 1.2; padding: 28px 22px; max-width: 720px; margin: 0 auto; text-align: center; }
.t39 .pull-39 .acc{ color: #ff4664; }
.t39.dark .pull-39 .acc{ color: #ff6a8a; }
.t39 .pull-39 cite{ display: block; font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: .65; margin-top: 14px; }
.t39 .cv-zine{ display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.t39-mobile .cv-zine{ grid-template-columns: 1fr; }
.t39 .cv-zine .col h3{ font-style: italic; }
.t39 .cv-zine .it-z{ padding: 8px 0; border-bottom: 2px dashed currentColor; font-size: 13px; line-height: 1.55; display: grid; grid-template-columns: 80px 1fr; gap: 10px; }
.t39 .cv-zine .it-z .yr-z{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .65; letter-spacing: 0.04em; }
.t39 .cv-zine .it-z b{ font-weight: 700; font-style: italic; }
.t39 .skills-z{ display: flex; flex-wrap: wrap; gap: 6px; }
.t39 .skills-z span{ background: #ff4664; color: #fff4e8; padding: 3px 10px; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.04em; transform: rotate(-1deg); display: inline-block; mix-blend-mode: multiply; }
.t39 .skills-z span:nth-child(3n){ background: #3c5adc; transform: rotate(1deg); }
.t39.dark .skills-z span{ mix-blend-mode: normal; }
.t39 .colophon-39{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; display: flex; justify-content: space-between; padding: 18px 30px; border-top: 4px double currentColor; opacity: .75; }
`;
function Tpl39RisoZine({ mode, dark }) {
  const p = PERSONAS.designer;
  return (<>
    <style>{T39_CSS}</style>
    <div className={`t39 ${mode === 'mobile' ? 't39-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <section className="cover-39">
        <div className="iss">★ folio zine · issue № 014 · spring 2026 ★</div>
        <h1>{p.name.split(" ")[0]} —<br/>a <em>working</em> zine.</h1>
        <p className="deck-z">Posters, books, type and the small decisions in between. {p.name}'s portfolio, hand-set in two colours.</p>
        <div className="stamp-39">★ riso edition of 99 ★</div>
      </section>

      <section className="pg-39">
        <h2>About <span className="lay">the maker</span></h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 620, fontStyle: 'italic' }}>{p.tagline} I'm {p.name}, a {p.role.toLowerCase()} student at {p.school}, currently in {p.location}. This is a working folder of things made in the last three years.</p>
        <div className="pn-l">page 02 · about</div>
        <div className="pn">2</div>
      </section>

      <section className="pg-39">
        <h2>Works <span className="lay">in colour</span></h2>
        <div className="layered">
          {p.projects.map((pr, i) => (
            <div className="item-z" key={i}>
              <div className="num-z">№ {String(i+1).padStart(2,"0")} · {pr.kind} · {pr.year}</div>
              <div className="ph-z"></div>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>
        <div className="pn-l">pages 04—09 · works</div>
        <div className="pn">4—9</div>
      </section>

      <div className="pull-39">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}</cite></div>

      <section className="pg-39">
        <h2>The <span className="lay">long version</span></h2>
        <div className="cv-zine">
          <div className="col">
            <h3>Where I've worked</h3>
            {p.experience.map((e, i) => (<div className="it-z" key={i}><span className="yr-z">{e.time}</span><div><b>{e.role}</b>, {e.org}<br/><span style={{ opacity: .7, fontSize: 11 }}>{e.note}</span></div></div>))}
            <h3 style={{ marginTop: 14 }}>What I'm good at</h3>
            <div className="skills-z">{p.skills.map(s => (<span key={s}>{s}</span>))}</div>
          </div>
          <div className="col">
            <h3>Where I learned</h3>
            {p.education.map((e, i) => (<div className="it-z" key={i}><span className="yr-z">{e.time}</span><div><b>{e.degree}</b><br/><span style={{ opacity: .7, fontSize: 11 }}>{e.org}</span></div></div>))}
            <h3 style={{ marginTop: 14 }}>Distinctions</h3>
            {p.awards.map((a, i) => (<div className="it-z" key={i}><span className="yr-z">{a.year}</span><div><b>{a.name}</b></div></div>))}
            <h3 style={{ marginTop: 14 }}>Tongues</h3>
            <p style={{ margin: 0, fontStyle: 'italic', fontSize: 13 }}>{p.languages.join(" · ")}</p>
          </div>
        </div>
        <div className="pn-l">pages 10—14 · cv</div>
        <div className="pn">14</div>
      </section>

      <section className="pg-39">
        <h2>Currently <span className="lay">on the table</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
          {p.now.map((n, i) => (
            <div key={i} style={{ background: 'rgba(60,90,220,.12)', padding: 14, border: '1.5px solid currentColor', fontStyle: 'italic', fontSize: 14, transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.16em', opacity: .65, marginBottom: 4, fontStyle: 'normal', textTransform: 'uppercase' }}>now · № {String(i+1).padStart(2,"0")}</div>
              {n}
            </div>
          ))}
        </div>
        <div className="pn-l">page 16 · now</div>
        <div className="pn">16</div>
      </section>

      <div className="colophon-39"><span>★ folio zine</span><span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online · {p.email}</span><span>printed pink + blue · ed. of 99</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   40 — PHOTO FOLIO  ·  creative (photography / film)
   Signature: contact sheet — film frames numbered, marked, light table feel.
   ───────────────────────────────────────────────────────────────── */
const T40_CSS = `
.t40{ font-family: "JetBrains Mono", monospace; background: #1a1a1a; color: #f0eddf; min-height: 100%; padding: 0; font-size: 12px; line-height: 1.55; }
.t40.light{ background: #eceadd; color: #1a1a1a; }
.t40 .head-40{ padding: 22px 26px 16px; border-bottom: 1px solid currentColor; display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; }
.t40-mobile .head-40{ grid-template-columns: 1fr; }
.t40 .head-40 .roll{ font-size: 10px; letter-spacing: 0.18em; opacity: .65; text-transform: uppercase; }
.t40 .head-40 h1{ font-family: "Instrument Serif", "EB Garamond", serif; font-weight: 400; font-style: italic; font-size: clamp(36px, 5.5vw, 60px); margin: 6px 0 4px; line-height: 1; letter-spacing: -0.005em; }
.t40 .head-40 .strap-40{ font-size: 12px; opacity: .75; }
.t40 .head-40 .meta-40{ font-size: 10px; letter-spacing: 0.06em; text-align: right; line-height: 1.7; opacity: .75; }
.t40-mobile .head-40 .meta-40{ text-align: left; }
.t40 .contact{ padding: 22px 26px; border-bottom: 1px solid currentColor; }
.t40-mobile .contact{ padding: 16px 18px; }
.t40 .contact .sheet-lbl{ font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-bottom: 12px; display: flex; justify-content: space-between; }
.t40 .frames{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.t40-mobile .frames{ grid-template-columns: repeat(2, 1fr); }
.t40 .frame-40{ background: #2a2a2a; aspect-ratio: 3/2; position: relative; border: 4px solid #1a1a1a; box-shadow: 0 0 0 1px #4a4a4a inset; cursor: pointer; transition: transform .15s; }
.t40.light .frame-40{ background: #d8d4c8; border-color: #eceadd; box-shadow: 0 0 0 1px #888 inset; }
.t40 .frame-40:hover{ transform: scale(1.02); }
.t40 .frame-40.selected{ border-color: #ff4040; box-shadow: 0 0 0 2px #ff4040 inset; }
.t40 .frame-40.crossed::after{ content: ""; position: absolute; inset: 4px; background: linear-gradient(135deg, transparent 47%, #ff4040 47% 53%, transparent 53%); pointer-events: none; }
.t40 .frame-40 .ph-40{ position: absolute; inset: 0; background-size: cover; background-position: center; }
.t40 .frame-40 .num-40{ position: absolute; top: -16px; left: 4px; font-size: 9px; letter-spacing: 0.1em; opacity: .65; }
.t40 .frame-40 .lbl-40{ position: absolute; bottom: -16px; left: 4px; right: 4px; font-size: 8px; letter-spacing: 0.06em; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.t40 .frame-40 .ph-40.f1{ background: linear-gradient(135deg, #4a3a2a, #ddc4a4); }
.t40 .frame-40 .ph-40.f2{ background: linear-gradient(135deg, #2a4a5a, #6ec4d8); }
.t40 .frame-40 .ph-40.f3{ background: linear-gradient(135deg, #5a2a3a, #d4a4b4); }
.t40 .frame-40 .ph-40.f4{ background: linear-gradient(135deg, #1a1a1a, #5a5a5a); }
.t40 .frame-40 .ph-40.f5{ background: linear-gradient(135deg, #3a3a1a, #b4b48a); }
.t40 .frame-40 .ph-40.f6{ background: linear-gradient(135deg, #2a3a2a, #8aa48a); }
.t40 .frame-40 .ph-40.f7{ background: linear-gradient(135deg, #4a2a1a, #c4744a); }
.t40 .frame-40 .ph-40.f8{ background: linear-gradient(135deg, #1a2a3a, #6a8ac4); }
.t40 .selected-strip{ padding: 14px 26px; border-bottom: 1px solid currentColor; display: grid; grid-template-columns: 1fr auto auto; gap: 18px; font-size: 11px; opacity: .85; }
.t40-mobile .selected-strip{ grid-template-columns: 1fr; }
.t40 .selected-strip b{ font-family: "Instrument Serif", serif; font-style: italic; font-size: 16px; opacity: 1; }
.t40 .section-40{ padding: 26px 26px; border-bottom: 1px solid currentColor; }
.t40-mobile .section-40{ padding: 18px 18px; }
.t40 .section-40 h2{ font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin: 0 0 14px; padding-bottom: 4px; border-bottom: 1px dashed currentColor; display: flex; justify-content: space-between; font-weight: 500; }
.t40 .row-40{ display: grid; grid-template-columns: 80px 1fr 140px 80px; gap: 14px; padding: 8px 0; border-bottom: 1px dashed color-mix(in oklab, currentColor 22%, transparent); font-size: 12px; align-items: baseline; }
.t40-mobile .row-40{ grid-template-columns: 70px 1fr 60px; }
.t40-mobile .row-40 .kind40{ display: none; }
.t40 .row-40 .n40{ font-size: 10px; opacity: .55; letter-spacing: 0.06em; }
.t40 .row-40 b{ font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; font-size: 16px; }
.t40 .row-40 .kind40{ font-size: 10px; opacity: .65; letter-spacing: 0.08em; text-transform: uppercase; }
.t40 .row-40 .yr40{ font-size: 10px; opacity: .55; text-align: right; }
.t40 .quote-40{ font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.35; padding: 16px 24px; border-left: 3px solid currentColor; max-width: 640px; margin: 18px 0; }
.t40 .quote-40 cite{ display: block; font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; margin-top: 10px; }
.t40 .colophon-40{ padding: 14px 26px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; display: flex; justify-content: space-between; }
`;
function Tpl40PhotoFolio({ mode, dark }) {
  // film/creative persona
  const p = PERSONAS.film || PERSONAS.designer;
  const frames = (p.projects || []).slice(0, 8);
  return (<>
    <style>{T40_CSS}</style>
    <div className={`t40 ${mode === 'mobile' ? 't40-mobile' : ''} ${dark === false ? 'light' : ''}`}>
      <div className="head-40">
        <div>
          <div className="roll">★ Roll № 014 · {p.school} · folio film</div>
          <h1>{p.name}</h1>
          <div className="strap-40">{p.tagline}</div>
        </div>
        <div className="meta-40">
          {p.role}<br/>{p.school}<br/>{p.location}<br/>{p.email}
        </div>
      </div>

      <section className="contact">
        <div className="sheet-lbl"><span>★ contact sheet · 36 exp · Kodak Tri-X 400</span><span>roll 014 / 016</span></div>
        <div className="frames">
          {Array.from({ length: 8 }, (_, i) => {
            const pr = frames[i];
            const cl = ['f1','f2','f3','f4','f5','f6','f7','f8'][i];
            const sel = i === 0;
            return (
              <div className={`frame-40 ${sel ? 'selected' : ''} ${i === 3 || i === 5 ? 'crossed' : ''}`} key={i}>
                <div className={`ph-40 ${cl}`}></div>
                <div className="num-40">№ {String(i+1).padStart(2,"0")}A</div>
                <div className="lbl-40">{pr ? pr.title : '— —'}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="selected-strip">
        <span><b>★ frame 01A</b> — selected for final print · scan + 16x20 prepared</span>
        <span>shot @ f/2.8 · 1/125s · iso 400</span>
        <span>{p.location} · 2025</span>
      </div>

      <section className="section-40">
        <h2><span>● Selected works · prints</span><span style={{ fontWeight: 400 }}>{p.projects.length} on file</span></h2>
        {p.projects.map((pr, i) => (
          <div className="row-40" key={i}>
            <span className="n40">№ {String(i+1).padStart(2,"0")}A</span>
            <span><b>{pr.title}</b><div style={{ opacity: .65, fontSize: 11, marginTop: 2 }}>{pr.note}</div></span>
            <span className="kind40">{pr.kind}</span>
            <span className="yr40">{pr.year}</span>
          </div>
        ))}
      </section>

      <section className="section-40">
        <h2><span>● Experience · in the field</span><span style={{ fontWeight: 400 }}>{p.experience.length} jobs</span></h2>
        {p.experience.map((e, i) => (
          <div className="row-40" key={i} style={{ gridTemplateColumns: mode === 'mobile' ? '80px 1fr' : '110px 1fr 140px' }}>
            <span className="n40">{e.time}</span>
            <span><b>{e.role}</b><div style={{ opacity: .65, fontSize: 11, marginTop: 2 }}>{e.org} — {e.note}</div></span>
            {mode !== 'mobile' && <span className="kind40">{e.org}</span>}
          </div>
        ))}
      </section>

      <div className="quote-40">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}</cite></div>

      <section className="section-40">
        <h2><span>● Schooling · training</span></h2>
        {p.education.map((e, i) => (
          <div className="row-40" key={i} style={{ gridTemplateColumns: mode === 'mobile' ? '80px 1fr' : '110px 1fr 140px' }}>
            <span className="n40">{e.time}</span>
            <span><b>{e.degree}</b></span>
            {mode !== 'mobile' && <span className="kind40">{e.org}</span>}
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'mobile' ? '1fr' : '1fr 1fr', gap: 22, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 6 }}>★ Awards</div>
            {p.awards.map((a, i) => (<div key={i} style={{ padding: '4px 0', fontSize: 12 }}><span style={{ fontFamily: '"Instrument Serif",serif', fontStyle: 'italic', fontWeight: 400, fontSize: 14 }}>{a.name}</span> <span style={{ opacity: .55 }}>· {a.year}</span></div>))}
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, marginBottom: 6 }}>★ Equipment / skills</div>
            <div style={{ fontFamily: '"Instrument Serif",serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.7 }}>{p.skills.join(" · ")}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .65, margin: '14px 0 6px' }}>★ Languages</div>
            <div style={{ fontFamily: '"Instrument Serif",serif', fontStyle: 'italic', fontSize: 14 }}>{p.languages.join(" · ")}</div>
          </div>
        </div>
      </section>

      <div className="colophon-40"><span>★ folio film · roll 014</span><span>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</span><span>developed in earnest</span></div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   41 — RESEARCH PAPER  ·  edu / social sciences
   Signature: APA-style academic paper — title page, abstract, sections,
              hanging-indent references, page header.
   ───────────────────────────────────────────────────────────────── */
const T41_CSS = `
.t41{ font-family: "EB Garamond", "Times New Roman", serif; background: #f7f3eb; color: #1a1610; min-height: 100%; padding: 0; font-size: 14px; line-height: 2; }
.t41.dark{ background: #14110d; color: #ece6d5; }
.t41 .pg-header{ display: flex; justify-content: space-between; padding: 14px 56px 8px; font-size: 11px; letter-spacing: 0.04em; opacity: .65; font-family: "IBM Plex Serif", serif; }
.t41-mobile .pg-header{ padding: 12px 22px 6px; }
.t41 .body-paper{ max-width: 760px; margin: 0 auto; padding: 18px 56px 60px; }
.t41-mobile .body-paper{ padding: 16px 22px 40px; }
.t41 .title-page{ text-align: center; padding: 64px 0 36px; border-bottom: 1px solid currentColor; margin-bottom: 30px; }
.t41-mobile .title-page{ padding: 32px 0; }
.t41 .title-page h1{ font-family: "EB Garamond", serif; font-weight: 700; font-size: clamp(28px, 4.5vw, 40px); line-height: 1.2; margin: 0 0 22px; max-width: 560px; margin-left: auto; margin-right: auto; }
.t41 .title-page .author{ font-size: 16px; font-style: italic; margin: 0; }
.t41 .title-page .affil{ font-size: 14px; opacity: .85; margin: 14px 0 0; line-height: 1.7; }
.t41 .title-page .note{ font-size: 12px; opacity: .65; margin-top: 28px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6; font-style: italic; }
.t41 h2{ font-family: "EB Garamond", serif; font-weight: 700; font-size: 18px; margin: 24px 0 8px; letter-spacing: 0.04em; text-align: center; }
.t41 h3{ font-family: "EB Garamond", serif; font-weight: 700; font-style: italic; font-size: 16px; margin: 18px 0 6px; }
.t41 h4{ font-family: "EB Garamond", serif; font-weight: 700; font-size: 14px; margin: 14px 0 2px; text-indent: 0; }
.t41 p{ margin: 0; max-width: 100%; }
.t41 p.indent{ text-indent: 28px; }
.t41 p .cite{ font-style: italic; }
.t41 .abstract{ padding: 14px 0; margin-bottom: 18px; border-bottom: 1px solid currentColor; }
.t41 .abstract h2{ margin-top: 0; }
.t41 .abstract p{ font-size: 13px; line-height: 1.85; }
.t41 .keywords{ font-size: 13px; margin-top: 14px; font-style: italic; text-indent: 0; }
.t41 .keywords::before{ content: "Keywords: "; font-style: italic; font-weight: 700; }
.t41 .table-1{ width: 100%; border-collapse: collapse; font-size: 13px; margin: 14px 0 18px; line-height: 1.5; }
.t41 .table-1 .cap-t{ font-size: 13px; font-style: italic; padding-bottom: 6px; text-align: left; }
.t41 .table-1 .cap-t b{ font-style: normal; font-weight: 700; }
.t41 .table-1 thead{ border-top: 1.5px solid currentColor; border-bottom: 1px solid currentColor; }
.t41 .table-1 tbody{ border-bottom: 1.5px solid currentColor; }
.t41 .table-1 th{ text-align: left; font-weight: 700; padding: 6px 8px 6px 0; font-size: 12px; }
.t41 .table-1 td{ padding: 5px 8px 5px 0; vertical-align: top; }
.t41 .table-1 td.r{ text-align: right; font-variant-numeric: tabular-nums; }
.t41 .refs{ margin-top: 24px; }
.t41 .refs h2{ text-align: left; }
.t41 .ref-it{ padding-left: 28px; text-indent: -28px; margin: 8px 0; font-size: 13px; line-height: 1.7; }
.t41 .ref-it .italic{ font-style: italic; }
.t41 .footer-41{ font-family: "IBM Plex Serif", serif; font-size: 11px; letter-spacing: 0.04em; opacity: .65; text-align: center; padding-top: 14px; border-top: 1px solid currentColor; margin-top: 22px; }
.t41 .pull-41{ padding: 12px 22px; border-left: 3px solid currentColor; font-style: italic; font-size: 14px; line-height: 1.55; margin: 16px 0; max-width: 640px; }
.t41 .pull-41 cite{ display: block; font-style: normal; font-family: "IBM Plex Serif", serif; font-size: 11px; opacity: .65; margin-top: 8px; }
`;
function Tpl41ResearchPaper({ mode, dark }) {
  const p = PERSONAS.edu;
  return (<>
    <style>{T41_CSS}</style>
    <div className={`t41 ${mode === 'mobile' ? 't41-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="pg-header"><span>RUNNING HEAD: A WORKING CURRICULUM</span><span>1</span></div>

      <div className="body-paper">
        <section className="title-page">
          <h1>A Working Curriculum: Five Years of Coursework, Clinical Hours, and Field Notes</h1>
          <p className="author">{p.name}</p>
          <p className="affil">{p.faculty}<br/>{p.school}</p>
          <p className="note">Author note: {p.tagline} Correspondence: {p.email}. Filed at portfolio-cv.online · 12 May 2026.</p>
        </section>

        <section className="abstract">
          <h2>Abstract</h2>
          <p>This brief curriculum vitae sets out the academic, clinical, and applied work of the candidate from 2020 to 2026, organised in the form of a paper for ease of review. The candidate has pursued the {p.role.split(" — ")[0]} at {p.school}, with concurrent work as a research assistant, hotline volunteer, and teaching assistant. Five selected projects, {p.experience.length} positions, {p.awards.length} honours, and {p.languages.length} languages are presented in tabular and narrative form below. The paper concludes with a brief statement of current research and references.</p>
          <p className="keywords">{p.role.toLowerCase().split(" — ")[0]}, fieldwork, applied research, curriculum vitae, {p.skills.slice(0, 3).join(", ").toLowerCase()}</p>
        </section>

        <h2>Introduction</h2>
        <p className="indent">{p.tagline} The present curriculum reflects an applied program of study undertaken at {p.school}, supplemented by an exchange at the candidate's external host institution and by ongoing service in community settings. As the discipline has shifted toward evidence-based, participatory work (see Selimi, 2025), the candidate has organised her contributions around projects that move between data collection and direct contact with adolescent participants.</p>
        <p className="indent">The remainder of this paper presents (a) selected projects in tabular form (Table 1), (b) a record of practice (Table 2), (c) education (Table 3), (d) honours (Table 4), and (e) a brief reference statement from the candidate's principal supervisor.</p>

        <h2>Selected Projects</h2>
        <p className="indent">The {p.projects.length} projects listed in <i>Table 1</i> were undertaken in the period 2023–2026, with the most recent — the Tirana Adolescent Study — currently in the analysis phase. Each project is described in terms of its kind, year, and a brief disposition.</p>

        <table className="table-1">
          <caption className="cap-t"><b>Table 1.</b> Selected projects, 2023–2026.</caption>
          <thead><tr><th style={{ width: 50 }}>№</th><th>Project</th><th>Kind</th><th style={{ width: 60, textAlign: 'right' }} className="r">Year</th></tr></thead>
          <tbody>{p.projects.map((pr, i) => (<tr key={i}><td>{i+1}</td><td><i>{pr.title}.</i> {pr.note}</td><td>{pr.kind}</td><td className="r">{pr.year}</td></tr>))}</tbody>
        </table>

        <h2>Record of Practice</h2>
        <p className="indent">Positions held during the program are presented in <i>Table 2</i>. The candidate has combined research assistantships with two ongoing service roles: as a hotline volunteer and as a teaching assistant in Introductory Psychology.</p>

        <table className="table-1">
          <caption className="cap-t"><b>Table 2.</b> Record of practice and service.</caption>
          <thead><tr><th style={{ width: 90 }}>Period</th><th>Position</th><th>Organisation</th></tr></thead>
          <tbody>{p.experience.map((e, i) => (<tr key={i}><td>{e.time}</td><td><i>{e.role}.</i> {e.note}</td><td>{e.org}</td></tr>))}</tbody>
        </table>

        <h2>Education</h2>
        <table className="table-1">
          <caption className="cap-t"><b>Table 3.</b> Degrees and exchanges.</caption>
          <thead><tr><th style={{ width: 90 }}>Years</th><th>Programme</th><th>Institution</th></tr></thead>
          <tbody>{p.education.map((e, i) => (<tr key={i}><td>{e.time}</td><td><i>{e.degree}</i></td><td>{e.org}</td></tr>))}</tbody>
        </table>

        <h2>Honours and Reference</h2>
        <table className="table-1">
          <caption className="cap-t"><b>Table 4.</b> Honours and distinctions.</caption>
          <thead><tr><th style={{ width: 60 }}>Year</th><th>Distinction</th></tr></thead>
          <tbody>{p.awards.map((a, i) => (<tr key={i}><td>{a.year}</td><td>{a.name}</td></tr>))}</tbody>
        </table>

        <div className="pull-41">"{p.testimonials[0].quote}"<cite>— {p.testimonials[0].author}, supervising professor.</cite></div>

        <h2>Currently</h2>
        <p className="indent">The candidate is presently engaged in (1) writing the master's thesis on social anxiety in Albanian adolescents; (2) reading Yalom's <i>The Gift of Therapy</i>; and (3) volunteering at a regional support hotline two evenings each week. A short list of current items is included for completeness:</p>
        <ul style={{ paddingLeft: 28, marginTop: 4 }}>{p.now.map((n, i) => (<li key={i} style={{ marginBottom: 4 }}>{n}.</li>))}</ul>

        <h2>Languages and Methods</h2>
        <p className="indent"><i>Languages:</i> {p.languages.join("; ")}.</p>
        <p className="indent"><i>Methods and tools:</i> {p.skills.join("; ")}.</p>

        <section className="refs">
          <h2>References</h2>
          <p className="ref-it">{p.name}. ({p.education[0].time.split("–")[1]}). <span className="italic">Loneliness in 17-year-olds: A mixed-methods study from four secondary schools in Tirana.</span> Albanian Journal of Psychology, 12(2), 14–32.</p>
          <p className="ref-it">{p.name}. (2025). <span className="italic">What CBT is, plainly.</span> Notebook Notes. https://notebook-notes.example</p>
          <p className="ref-it">{p.name}. (2024). <span className="italic">On not over-diagnosing teenagers.</span> Notebook Notes. https://notebook-notes.example</p>
          <p className="ref-it">{p.testimonials[0].author.replace(",", "").split(",")[0]}. (2025). Personal communication regarding the candidate's work as a research assistant at the UT Department of Psychology.</p>
        </section>

        <div className="footer-41">A WORKING CURRICULUM · {p.email} · {p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   42 — FIELD NOTEBOOK  ·  edu / anthropology / sociology
   Signature: ruled notebook, dated entries, marginal sketches, taped photos.
   ───────────────────────────────────────────────────────────────── */
const T42_CSS = `
.t42{ font-family: "Patrick Hand", "Caveat", cursive; background: #f4ecd6; color: #2a2417; min-height: 100%; padding: 0; font-size: 16px; line-height: 1.55;
  background-image: repeating-linear-gradient(transparent 0 26px, rgba(80,60,30,.15) 26px 27px);
  background-position: 0 28px;
}
.t42.dark{ background-color: #1a160d; color: #f4ecd6; background-image: repeating-linear-gradient(transparent 0 26px, rgba(255,235,180,.1) 26px 27px); }
.t42 .nb{ max-width: 760px; margin: 0 auto; padding: 32px 36px 40px; position: relative; }
.t42-mobile .nb{ padding: 24px 22px 30px; }
.t42 .nb::before{ content: ""; position: absolute; left: 70px; top: 0; bottom: 0; width: 1px; background: rgba(176, 50, 39, .35); }
.t42-mobile .nb::before{ left: 50px; }
.t42 .nb-head{ margin-bottom: 22px; padding-bottom: 12px; border-bottom: 2px solid currentColor; display: flex; justify-content: space-between; align-items: baseline; }
.t42 .nb-head .nb-id{ font-family: "Patrick Hand", cursive; font-size: 14px; opacity: .75; }
.t42 .nb-head .nb-date{ font-family: "Caveat", cursive; font-size: 26px; transform: rotate(-2deg); background: #ffd166; padding: 0 8px; color: #2a2417; }
.t42 .nb-cover{ background: #ffd166; color: #2a2417; padding: 18px 22px; margin-bottom: 22px; border: 2px solid currentColor; box-shadow: 4px 4px 0 rgba(0,0,0,.15); transform: rotate(-0.5deg); }
.t42 .nb-cover h1{ font-family: "Caveat", cursive; font-weight: 700; font-size: clamp(40px, 6vw, 64px); line-height: 0.95; margin: 0 0 8px; }
.t42 .nb-cover .sub-cov{ font-family: "Patrick Hand", cursive; font-size: 17px; line-height: 1.5; max-width: 500px; }
.t42 .nb-cover .arrow{ display: inline-block; font-family: "Caveat", cursive; transform: rotate(-12deg); }
.t42 .entry{ margin-bottom: 24px; }
.t42 .entry .date-e{ font-family: "Caveat", cursive; font-size: 24px; font-weight: 700; transform: rotate(-1deg); display: inline-block; background: rgba(46, 196, 182, .45); padding: 0 6px; margin-bottom: 8px; }
.t42 .entry h2{ font-family: "Caveat", cursive; font-weight: 700; font-size: 32px; margin: 4px 0 6px; line-height: 1; transform: rotate(-0.5deg); }
.t42 .entry h2::before{ content: "✱ "; color: #b03227; }
.t42 .entry p{ margin: 0 0 8px; }
.t42 .clip{ background: #fffaea; color: #2a2417; padding: 12px 16px; box-shadow: 3px 3px 0 rgba(0,0,0,.12); border: 1px solid rgba(0,0,0,.15); margin: 10px 0 14px; transform: rotate(-0.8deg); position: relative; max-width: 540px; }
.t42 .clip::before{ content: ""; position: absolute; top: -10px; left: 18px; width: 60px; height: 14px; background: rgba(46, 196, 182, .55); transform: rotate(-3deg); }
.t42 .clip .meta-cl{ font-family: "Patrick Hand", cursive; font-size: 13px; opacity: .65; }
.t42 .clip h3{ font-family: "Caveat", cursive; font-weight: 700; font-size: 22px; margin: 2px 0 4px; }
.t42 .clip p{ font-size: 15px; }
.t42 .ph-tape{ background: linear-gradient(135deg, #4a3a2a, #b48a5a); width: 120px; aspect-ratio: 4/3; box-shadow: 3px 3px 0 rgba(0,0,0,.15); border: 4px solid #fffaea; transform: rotate(2deg); display: inline-flex; align-items: center; justify-content: center; font-family: "Patrick Hand", cursive; color: #fffaea; font-size: 11px; letter-spacing: 0.06em; margin: 6px 14px 6px 0; float: right; position: relative; }
.t42 .ph-tape::before{ content: ""; position: absolute; top: -8px; left: 50%; width: 40px; height: 12px; background: rgba(255,255,255,.55); transform: translateX(-50%) rotate(-4deg); }
.t42 .arrow-doodle{ font-family: "Caveat", cursive; font-size: 22px; color: #b03227; transform: rotate(-10deg); display: inline-block; margin: 0 8px; }
.t42 .scribble-42{ font-family: "Caveat", cursive; font-size: 18px; opacity: .85; display: inline-block; }
.t42 .underline-42{ text-decoration: underline wavy currentColor; text-underline-offset: 4px; text-decoration-thickness: 2px; }
.t42 h3-sect{ font-family: "Caveat", cursive; font-weight: 700; font-size: 28px; margin: 20px 0 8px; padding-bottom: 4px; border-bottom: 2px dashed currentColor; display: block; }
.t42 ul.list-42{ padding-left: 0; list-style: none; }
.t42 ul.list-42 li{ padding-left: 28px; position: relative; margin: 4px 0; line-height: 1.55; }
.t42 ul.list-42 li::before{ content: "→"; position: absolute; left: 0; color: #b03227; font-family: "Caveat", cursive; transform: rotate(-8deg); font-size: 22px; top: -3px; }
.t42 .skills-42{ display: flex; flex-wrap: wrap; gap: 4px; }
.t42 .skills-42 span{ background: #ffd166; color: #2a2417; padding: 2px 10px; font-family: "Patrick Hand", cursive; font-size: 14px; transform: rotate(-1deg); display: inline-block; }
.t42 .skills-42 span:nth-child(2n){ background: rgba(46, 196, 182, .5); transform: rotate(1deg); }
.t42 .skills-42 span:nth-child(3n){ background: #ff7a45; color: #fff; }
.t42 .sign-42{ margin-top: 24px; padding-top: 18px; border-top: 2px dashed currentColor; font-family: "Caveat", cursive; font-size: 22px; }
.t42 .stamp-42{ display: inline-block; border: 2.5px solid #b03227; color: #b03227; padding: 4px 14px; transform: rotate(-5deg); font-family: "Patrick Hand", cursive; font-weight: 700; letter-spacing: 0.16em; font-size: 13px; text-transform: uppercase; }
`;
function Tpl42FieldNotebook({ mode, dark }) {
  const p = PERSONAS.edu;
  return (<>
    <style>{T42_CSS}</style>
    <div className={`t42 ${mode === 'mobile' ? 't42-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="nb">
        <div className="nb-head">
          <div className="nb-id">field notebook · vol. III · {p.faculty} · {p.school}</div>
          <div className="nb-date">12 / V / 26</div>
        </div>

        <div className="nb-cover">
          <h1>{p.name} <span className="arrow">↘</span></h1>
          <div className="sub-cov">{p.tagline} {p.role} · {p.location}.</div>
        </div>

        <div className="entry">
          <span className="date-e">★ Field notes</span>
          <h2>About me, in brief</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55 }}>I'm <span className="underline-42">{p.name}</span>, in my second year of master's at {p.school}. I'm interested in adolescent mental health, school-based interventions, and trying to do research that actually reaches kids <span className="arrow-doodle">↘</span></p>
          <p>This notebook holds projects, work experience, and notes from the desk + the field.</p>
        </div>

        <div className="entry">
          <span className="date-e">Vol. I — works</span>
          <h2>Projects on the go</h2>
          {p.projects.map((pr, i) => (
            <div className="clip" key={i}>
              {i % 2 === 0 && <div className="ph-tape">photo {String(i+1).padStart(2,"0")}</div>}
              <div className="meta-cl">{pr.kind} — {pr.year}</div>
              <h3>{pr.title}</h3>
              <p>{pr.note}</p>
            </div>
          ))}
        </div>

        <div className="entry">
          <span className="date-e">Vol. II — experience</span>
          <h2>Where I've been</h2>
          <ul className="list-42">
            {p.experience.map((e, i) => (
              <li key={i}><span className="scribble-42" style={{ fontSize: 22 }}><b style={{ background: 'rgba(255, 209, 102, .65)', padding: '0 4px', transform: 'rotate(-1deg)', display: 'inline-block' }}>{e.role}</b></span> at {e.org} <span className="scribble-42" style={{ opacity: .65 }}>({e.time})</span><br/><span style={{ fontSize: 14, opacity: .75 }}>{e.note}</span></li>
            ))}
          </ul>
        </div>

        <div className="entry">
          <span className="date-e">Vol. III — schooling</span>
          <h2>Where I learned</h2>
          <ul className="list-42">
            {p.education.map((e, i) => (
              <li key={i}><span style={{ background: 'rgba(46, 196, 182, .45)', padding: '0 4px', transform: 'rotate(-1deg)', display: 'inline-block', fontFamily: '"Caveat", cursive', fontSize: 22 }}>{e.degree}</span> · {e.org} <span style={{ opacity: .65, fontSize: 14 }}>({e.time})</span></li>
            ))}
          </ul>
        </div>

        <div className="clip" style={{ transform: 'rotate(1.2deg)', maxWidth: 600 }}>
          <div className="meta-cl">★ note from the supervisor</div>
          <p style={{ fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.25, margin: 0 }}>"{p.testimonials[0].quote}"</p>
          <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: 14, marginTop: 6, opacity: .65 }}>— {p.testimonials[0].author}</div>
        </div>

        <div className="entry">
          <span className="date-e">★ Honours</span>
          <h2>Little prizes</h2>
          <ul className="list-42">
            {p.awards.map((a, i) => (<li key={i}><span style={{ background: '#ffd166', padding: '0 6px', display: 'inline-block', transform: 'rotate(-1deg)', fontFamily: '"Caveat",cursive', fontSize: 22, color: '#2a2417' }}>{a.name}</span> <span style={{ opacity: .65 }}>· {a.year}</span></li>))}
          </ul>
        </div>

        <div className="entry">
          <span className="date-e">★ Tools</span>
          <h2>Methods & tongues</h2>
          <div style={{ marginBottom: 10 }}><span className="scribble-42">skills →</span></div>
          <div className="skills-42">{p.skills.map(s => (<span key={s}>{s}</span>))}</div>
          <div style={{ marginTop: 14, marginBottom: 6 }}><span className="scribble-42">languages →</span></div>
          <div className="skills-42">{p.languages.map(l => (<span key={l}>{l}</span>))}</div>
        </div>

        <div className="entry">
          <span className="date-e">★ Now on the desk</span>
          <h2>Currently</h2>
          <ul className="list-42">{p.now.map((n, i) => (<li key={i}>{n}</li>))}</ul>
        </div>

        <div className="sign-42">
          <div className="stamp-42">★ filed in earnest ★</div>
          <div style={{ marginTop: 10 }}>signed → <span className="underline-42">{p.name}</span> · {p.email}</div>
          <div style={{ marginTop: 4, fontSize: 18 }}>folio → {p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</div>
        </div>
      </div>
    </div>
  </>);
}

/* ─────────────────────────────────────────────────────────────────
   43 — SYLLABUS  ·  edu (teaching / education)
   Signature: course syllabus — course header, week schedule, reading list,
              grading rubric, office hours.
   ───────────────────────────────────────────────────────────────── */
const T43_CSS = `
.t43{ font-family: "IBM Plex Sans", sans-serif; background: #f5f3ec; color: #1a1610; min-height: 100%; padding: 0; font-size: 13px; line-height: 1.6; }
.t43.dark{ background: #131009; color: #ece6d5; }
.t43 .syl{ max-width: 880px; margin: 0 auto; padding: 32px 36px 60px; }
.t43-mobile .syl{ padding: 22px 22px 40px; }
.t43 .course-head{ padding: 22px 26px; background: #4a3a8a; color: #f5f3ec; border-radius: 2px; }
.t43.dark .course-head{ background: #6a5ad8; color: #131009; }
.t43 .course-head .code{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .8; }
.t43 .course-head h1{ font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: clamp(28px, 4.5vw, 44px); margin: 6px 0; letter-spacing: -0.015em; line-height: 1.05; }
.t43 .course-head .strap-43{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 15px; opacity: .9; }
.t43 .course-head .meta-43{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 16px; font-size: 11px; line-height: 1.6; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.18); }
.t43-mobile .course-head .meta-43{ grid-template-columns: repeat(2, 1fr); }
.t43 .course-head .meta-43 b{ display: block; font-family: "JetBrains Mono", monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .8; margin-bottom: 4px; font-weight: 500; }
.t43 section{ padding: 24px 0; border-bottom: 1px solid currentColor; }
.t43 section:last-child{ border-bottom: 0; }
.t43 section h2{ font-family: "IBM Plex Serif", serif; font-weight: 700; font-size: 22px; margin: 0 0 14px; letter-spacing: -0.01em; display: flex; justify-content: space-between; align-items: baseline; }
.t43 section h2 small{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: .65; font-weight: 400; }
.t43 .descr-43{ font-size: 14px; line-height: 1.7; max-width: 720px; }
.t43 .descr-43 b{ font-weight: 600; }
.t43 .week{ display: grid; grid-template-columns: 80px 1fr 120px; gap: 16px; padding: 12px 0; border-top: 1px solid currentColor; align-items: baseline; }
.t43-mobile .week{ grid-template-columns: 60px 1fr; }
.t43-mobile .week .meta-w{ display: none; }
.t43 .week .wk-no{ font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.06em; opacity: .65; text-transform: uppercase; }
.t43 .week .wk-title b{ font-weight: 600; font-family: "IBM Plex Serif", serif; font-size: 15px; }
.t43 .week .wk-title small{ display: block; font-size: 12px; opacity: .65; margin-top: 2px; }
.t43 .week .wk-title .read{ font-family: "IBM Plex Serif", serif; font-style: italic; font-size: 12px; opacity: .85; margin-top: 6px; }
.t43 .week .meta-w{ font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: .65; text-align: right; letter-spacing: 0.06em; }
.t43 .grade-table{ width: 100%; border-collapse: collapse; font-size: 13px; }
.t43 .grade-table th{ text-align: left; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; padding: 8px 10px; border-bottom: 1px solid currentColor; font-weight: 500; }
.t43 .grade-table td{ padding: 9px 10px; border-bottom: 1px solid color-mix(in oklab, currentColor 22%, transparent); }
.t43 .grade-table td.r{ text-align: right; font-variant-numeric: tabular-nums; }
.t43 .grade-table tr:last-child td{ border-bottom: 0; font-weight: 700; padding-top: 10px; border-top: 2px solid currentColor; }
.t43 .office{ display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.t43-mobile .office{ grid-template-columns: 1fr; }
.t43 .office .panel{ padding: 16px 18px; border: 1px solid currentColor; }
.t43 .office .panel h3{ font-family: "IBM Plex Serif", serif; font-size: 16px; margin: 0 0 8px; font-weight: 600; }
.t43 .quote-43{ background: #e8e5d8; padding: 18px 22px; border-left: 4px solid #4a3a8a; margin: 14px 0; font-style: italic; font-size: 14px; line-height: 1.55; }
.t43.dark .quote-43{ background: #1c1820; border-color: #6a5ad8; }
.t43 .quote-43 cite{ display: block; font-style: normal; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-top: 8px; }
.t43 .obj-list{ list-style: none; padding: 0; margin: 0; }
.t43 .obj-list li{ padding-left: 28px; position: relative; padding-top: 4px; padding-bottom: 4px; line-height: 1.55; }
.t43 .obj-list li::before{ content: counter(item, decimal-leading-zero); counter-increment: item; position: absolute; left: 0; top: 4px; font-family: "JetBrains Mono", monospace; font-size: 11px; color: #4a3a8a; font-weight: 700; }
.t43.dark .obj-list li::before{ color: #8a7ae8; }
.t43 .obj-list{ counter-reset: item; }
.t43 .pol-grid{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; font-size: 12px; line-height: 1.55; }
.t43-mobile .pol-grid{ grid-template-columns: 1fr; }
.t43 .pol-grid .it-pol{ padding: 10px 14px; border: 1px solid currentColor; }
.t43 .pol-grid .it-pol b{ display: block; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: .65; margin-bottom: 4px; font-weight: 500; }
.t43 .foot-43{ font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; opacity: .65; text-align: center; padding-top: 18px; }
`;
function Tpl43Syllabus({ mode, dark }) {
  const p = PERSONAS.edu;
  const weeks = [
    { w: 'About', t: 'Introductions, who I am, why I do this', m: 'discussion · 1h', read: p.tagline },
    ...p.projects.map((pr, i) => ({ w: `${i+1}`, t: pr.title, m: `${pr.kind} · ${pr.year}`, read: pr.note }))
  ];
  return (<>
    <style>{T43_CSS}</style>
    <div className={`t43 ${mode === 'mobile' ? 't43-mobile' : ''} ${dark ? 'dark' : ''}`}>
      <div className="syl">
        <div className="course-head">
          <div className="code">PSYC 401 · Spring 2026 · 4 credits · MWF 11—12</div>
          <h1>The Curriculum of {p.name}</h1>
          <div className="strap-43">A working course in adolescent psychology, applied research, and getting better at one's craft.</div>
          <div className="meta-43">
            <div><b>Instructor</b>{p.name}<br/>{p.role}</div>
            <div><b>Office</b>Room 312<br/>{p.school}</div>
            <div><b>Hours</b>Tue/Thu 14–16<br/>or by appointment</div>
            <div><b>Email</b>{p.email}<br/>responds within 24h</div>
          </div>
        </div>

        <section>
          <h2>Course description<small>at a glance</small></h2>
          <p className="descr-43">{p.tagline} This course traces five years of academic work, clinical hours, and field practice — organised as a teaching syllabus for ease of review. Each "week" below corresponds to a real project, position, or chapter of the work I have done at {p.school} and beyond.</p>
        </section>

        <section>
          <h2>Learning objectives<small>by end of the syllabus, you will</small></h2>
          <ol className="obj-list">
            <li>Understand the candidate's research interests: adolescent mental health, school-based interventions, and applied work that "reaches kids".</li>
            <li>Be acquainted with five selected projects, including the in-progress Tirana Adolescent Study.</li>
            <li>Review the candidate's clinical hours, hotline service, and teaching record.</li>
            <li>Have a working sense of the candidate's methods (R, NVivo, qualitative coding, CBT-informed interviewing).</li>
            <li>Be able to write the candidate a reference letter, should you wish to.</li>
          </ol>
        </section>

        <section>
          <h2>Weekly schedule<small>{weeks.length} weeks · syllabus · readings</small></h2>
          {weeks.map((wk, i) => (
            <div className="week" key={i}>
              <span className="wk-no">Wk {String(i).padStart(2,"0")}</span>
              <div className="wk-title">
                <b>{wk.t}</b>
                <div className="read"><i>Reading / disposition:</i> {wk.read}</div>
              </div>
              <span className="meta-w">{wk.m}</span>
            </div>
          ))}
        </section>

        <section>
          <h2>Practical / field hours<small>experience · {p.experience.length} placements</small></h2>
          {p.experience.map((e, i) => (
            <div className="week" key={i}>
              <span className="wk-no">{e.time}</span>
              <div className="wk-title">
                <b>{e.role}</b> · {e.org}
                <div className="read"><i>Hours:</i> {e.note}</div>
              </div>
              <span className="meta-w">{e.org}</span>
            </div>
          ))}
        </section>

        <section>
          <h2>Grading rubric<small>education + awards</small></h2>
          <table className="grade-table">
            <thead><tr><th>Component</th><th>Year</th><th className="r" style={{ textAlign: 'right' }}>Weight</th></tr></thead>
            <tbody>
              {p.education.map((e, i) => (<tr key={'e'+i}><td>{e.degree} · {e.org}</td><td>{e.time}</td><td className="r">{[40, 30, 10][i] || 10}%</td></tr>))}
              {p.awards.map((a, i) => (<tr key={'a'+i}><td>{a.name}</td><td>{a.year}</td><td className="r">+{[5, 5, 5][i] || 5}%</td></tr>))}
              <tr><td>Total</td><td></td><td className="r">100% + extra credit</td></tr>
            </tbody>
          </table>
        </section>

        <div className="quote-43">
          "{p.testimonials[0].quote}"
          <cite>— {p.testimonials[0].author}, course external examiner</cite>
        </div>

        <section>
          <h2>Required reading<small>methods, languages, currently on the desk</small></h2>
          <div className="pol-grid">
            <div className="it-pol"><b>Methods</b>{p.skills.join(" · ")}</div>
            <div className="it-pol"><b>Languages of instruction</b>{p.languages.join(" · ")}</div>
            <div className="it-pol"><b>Currently</b>{p.now.join("; ")}</div>
          </div>
        </section>

        <section>
          <h2>Office hours & contact<small>policies</small></h2>
          <div className="office">
            <div className="panel">
              <h3>How to reach me</h3>
              <p style={{ margin: 0 }}>Email is best: <b>{p.email}</b>. I respond within 24 hours on weekdays. For longer conversations, book a slot in office hours — Tue/Thu 14–16, room 312.</p>
            </div>
            <div className="panel">
              <h3>Online / extras</h3>
              <p style={{ margin: 0 }}>Folio site: <b>{p.name.split(" ")[0].toLowerCase()}.portfolio-cv.online</b>. Writing on adolescent psychology in plain Albanian goes to <i>Notebook Notes</i> ({p.socials[1] || 'substack'}).</p>
            </div>
          </div>
        </section>

        <div className="foot-43">★ Syllabus revised 12 May 2026 · subject to change · folio.psyc-401</div>
      </div>
    </div>
  </>);
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    Tpl38Magazine, Tpl39RisoZine, Tpl40PhotoFolio,
    Tpl41ResearchPaper, Tpl42FieldNotebook, Tpl43Syllabus,
  });
}

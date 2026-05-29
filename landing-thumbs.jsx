/* global React */
// Compact thumbnail components — capture the vibe of each of the 25 templates
// without loading the full template scripts. Designed to fit a 280×260 thumb port.

const TH = (props) => <div {...props} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', ...props.style }} />;

/* 01 — Terminal */
function ThTerminal() {
  return (
    <TH style={{ background: '#0a0d10', color: '#e6e6e6', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, padding: 12 }}>
      <div style={{ color: '#6df5a4' }}>jordan@dev:~$ whoami</div>
      <div style={{ fontWeight: 700, fontSize: 18, marginTop: 4, lineHeight: 1.05 }}>jordan park.<br/>builds tiny<br/>tools.</div>
      <div style={{ marginTop: 8, fontSize: 8, opacity: .6 }}>━━━━━━━━━━━━━</div>
      <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '50px 1fr', gap: '2px 8px', fontSize: 8 }}>
        <span style={{ color: '#7aa9ff' }}>role</span><span>CS · final yr</span>
        <span style={{ color: '#7aa9ff' }}>based</span><span>Toronto, CA</span>
        <span style={{ color: '#7aa9ff' }}>stack</span><span>Go · Rust · Linux</span>
      </div>
      <div style={{ marginTop: 8, border: '1px dashed #6df5a4', padding: 6, fontSize: 8 }}>
        <span style={{ color: '#6df5a4' }}>./tinyk8s</span> · 1.4k lines
      </div>
    </TH>
  );
}

/* 02 — Editorial */
function ThEditorial() {
  return (
    <TH style={{ background: '#f6f1e7', color: '#1a1814', padding: '8px 14px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: .6, textAlign: 'center', borderBottom: '1px solid #1a1814', paddingBottom: 4, marginBottom: 6 }}>№ 07 · Spring</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 900, fontSize: 38, lineHeight: 0.85, textAlign: 'center', marginTop: 14 }}>The<br/>Quiet<br/><span style={{ fontStyle: 'normal' }}>Hours</span></div>
      <div style={{ borderTop: '1px solid #1a1814', marginTop: 14, paddingTop: 4, fontSize: 7, columnCount: 2, columnRule: '1px solid #1a1814', columnGap: 8, fontFamily: 'IBM Plex Serif, serif', lineHeight: 1.3 }}>
        I came to design through books — flipping through my grandmother's recipe binder.
      </div>
    </TH>
  );
}

/* 03 — Brutalist */
function ThBrutalist() {
  return (
    <TH style={{ background: '#efeae2', color: '#0c0c0c', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #0c0c0c', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>jordan / index</span><span>toronto · cs</span>
      </div>
      <div style={{ padding: '4px 10px', borderBottom: '1px solid #0c0c0c', overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: 'Archivo Black, sans-serif', fontSize: 13 }}>
        JORDAN PARK · LOOKING FOR · NEW GRAD · AVAILABLE
      </div>
      <div style={{ padding: 12, fontFamily: 'Archivo Black, sans-serif', fontSize: 28, lineHeight: 0.86, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>BUILDS<br/>TINY<br/>TOOLS.</div>
      <div style={{ borderTop: '1px solid #0c0c0c', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: 8, borderRight: '1px solid #0c0c0c', fontSize: 8, fontFamily: 'Archivo Black, sans-serif', textTransform: 'uppercase' }}>tinyk8s</div>
        <div style={{ padding: 8, fontSize: 8, fontFamily: 'Archivo Black, sans-serif', textTransform: 'uppercase' }}>lex.fish</div>
      </div>
    </TH>
  );
}

/* 04 — Y2K */
function ThY2K() {
  return (
    <TH style={{ background: '#d3d6e0', padding: 6 }}>
      <div style={{ background: '#e6e9f0', border: '1px solid #888', boxShadow: '1px 1px 0 #fff inset, -1px -1px 0 #6d6d8a inset' }}>
        <div style={{ background: 'linear-gradient(180deg, #4a5cc7, #2a3b9c)', color: '#fff', padding: '2px 6px', fontFamily: 'VT323, monospace', fontSize: 10 }}>★ lina_marc.html — Netscape</div>
        <div style={{ padding: 8 }}>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 22, color: '#2a3b9c', textShadow: '2px 2px 0 #ff5cc4', lineHeight: 1 }}>Lina_</div>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 10, color: '#000', marginTop: 4 }}>welcome to my homepage!! ♡</div>
          <div style={{ background: '#000', color: '#00ff80', fontFamily: 'VT323, monospace', fontSize: 10, padding: '2px 6px', marginTop: 6, overflow: 'hidden', whiteSpace: 'nowrap', border: '2px inset #888' }}>★彡 NOW OPEN FOR FREELANCE ★彡</div>
          <div style={{ display: 'flex', gap: 3, marginTop: 6, flexWrap: 'wrap' }}>
            {['home', 'works', 'cv.txt', 'guestbook'].map(b => (
              <div key={b} style={{ background: 'linear-gradient(180deg, #fff, #c0c0d0)', border: '1px solid #000', padding: '1px 6px', fontFamily: 'VT323, monospace', fontSize: 9 }}>[ {b} ]</div>
            ))}
          </div>
        </div>
      </div>
    </TH>
  );
}

/* 05 — Swiss Grid */
function ThSwiss() {
  return (
    <TH style={{ background: '#fafaf8', color: '#0d0d0d', fontFamily: 'Inter, sans-serif', padding: 12, fontSize: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 5, borderBottom: '1px solid rgba(0,0,0,.12)' }}>
        <span>Amara Okonkwo — Business & Strategy</span>
        <span style={{ display: 'flex', gap: 10 }}><span>01</span><span>02</span><span>03</span><span>04</span></span>
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 7, opacity: .55 }}>01.0</div>
        <div style={{ fontWeight: 500, fontSize: 16, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 4 }}>Operator turned strategist. Marketplaces, growth, ops at scale.</div>
      </div>
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {['04', '02', '4.2k', '3'].map((n, i) => (<div key={i}><div style={{ fontWeight: 300, fontSize: 18, letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</div><div style={{ fontSize: 6, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: .55, marginTop: 2 }}>{['Projects','Interns','Subs','Lang'][i]}</div></div>))}
      </div>
    </TH>
  );
}

/* 06 — Playful */
function ThPlayful() {
  return (
    <TH style={{ background: '#fff5d6', color: '#2d1810', padding: 14, fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: '#ff7a45', borderRadius: '50%', opacity: .9 }} />
      <div style={{ position: 'relative', fontSize: 9, fontWeight: 600 }}>lina.studio*</div>
      <div style={{ position: 'relative', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, lineHeight: 0.95, marginTop: 14, letterSpacing: '-0.03em' }}>Hi, I'm<br/><span style={{ background: '#ffd166', padding: '0 6px', borderRadius: 8, display: 'inline-block', transform: 'rotate(-2deg)' }}>Lina</span> — I<br/>make <span style={{ background: '#2ec4b6', color: '#fff', padding: '0 8px', borderRadius: 999, display: 'inline-block', transform: 'rotate(2deg)' }}>soft</span> things.</div>
      <div style={{ position: 'absolute', right: 10, top: 60, background: '#ff7a45', color: '#fff', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, textAlign: 'center', lineHeight: 1.1, transform: 'rotate(12deg)' }}>★ OPEN<br/>2026 ★</div>
    </TH>
  );
}

/* 07 — Experimental */
function Th3D() {
  return (
    <TH style={{ background: '#06070a', color: '#e9ecf3', padding: 14, fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(60% 50% at 30% 20%, rgba(122,90,248,.5), transparent), radial-gradient(50% 50% at 80% 60%, rgba(248,96,130,.4), transparent)' }} />
      <div style={{ position: 'relative', fontSize: 8, opacity: .65, letterSpacing: '0.1em', textTransform: 'uppercase' }}>jordan park · cs final year</div>
      <div style={{ position: 'relative', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, lineHeight: 0.9, marginTop: 16, letterSpacing: '-0.03em' }}>I make<br/>computers do<br/>small <i>strange</i><br/>things.</div>
      <div style={{ position: 'relative', marginTop: 16, padding: '8px 10px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, transform: 'rotateX(-4deg) rotateY(2deg)' }}>tinyk8s</div>
    </TH>
  );
}

/* 08 — Notebook */
function ThNotebook() {
  return (
    <TH style={{ background: '#faf6e7', backgroundImage: 'linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)', backgroundSize: '14px 14px', color: '#2a2417', padding: 12, fontFamily: 'Patrick Hand, cursive' }}>
      <div style={{ background: '#ffd166', padding: '2px 6px', display: 'inline-block', transform: 'rotate(2deg)', fontSize: 9 }}>12 / may / 26</div>
      <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 32, lineHeight: 0.95, marginTop: 4 }}>Hi! I'm<br/><span style={{ textDecoration: 'underline wavy currentColor', textUnderlineOffset: 4 }}>Amara</span> ↘</div>
      <div style={{ marginTop: 8, background: '#fffaea', padding: 7, boxShadow: '3px 3px 0 rgba(0,0,0,.12)', transform: 'rotate(-1deg)', fontSize: 10, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -5, left: 12, width: 40, height: 10, background: 'rgba(46, 196, 182, 0.55)' }} />
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, fontWeight: 700 }}>Mercado Brief</div>
        <div>weekly read · 4.2k subs</div>
      </div>
    </TH>
  );
}

/* 09 — Newspaper */
function ThNewspaper() {
  return (
    <TH style={{ background: '#f0e9d5', color: '#1a1610', padding: 10, fontFamily: 'IBM Plex Serif, serif' }}>
      <div style={{ borderBottom: '3px double currentColor', paddingBottom: 4, textAlign: 'center' }}>
        <div style={{ fontStyle: 'italic', fontSize: 7, opacity: .75 }}>Vol. III · No. 04</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 22, lineHeight: 1, marginTop: 2 }}>The Amara Times</div>
        <div style={{ fontStyle: 'italic', fontSize: 7 }}>A portfolio, a curriculum — published from Paris</div>
      </div>
      <div style={{ padding: '4px 0', borderBottom: '1px solid currentColor', fontStyle: 'italic', fontSize: 7, display: 'flex', justifyContent: 'space-between' }}><span>"All the work that's fit to print."</span><span>Tuesday, May 12</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, paddingTop: 6 }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 14, lineHeight: 1.05 }}>The student behind Mercado Brief is also studying marketplaces.</div>
          <div style={{ fontStyle: 'italic', fontSize: 7, marginTop: 4 }}>A graduate of Lagos and a current MSc at HEC…</div>
        </div>
        <div style={{ fontSize: 7, borderLeft: '1px solid currentColor', paddingLeft: 6 }}>
          <div style={{ fontStyle: 'italic', paddingBottom: 2, borderBottom: '1px solid currentColor' }}>By the desk</div>
          <div style={{ padding: '2px 0' }}><i>Program</i> MSc</div>
          <div style={{ padding: '2px 0' }}><i>School</i> HEC Paris</div>
        </div>
      </div>
    </TH>
  );
}

/* 10 — Corporate */
function ThCorporate() {
  return (
    <TH style={{ background: '#ffffff', color: '#14181f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #e5e7ec', display: 'flex', justifyContent: 'space-between', fontSize: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><i style={{ display: 'inline-block', width: 12, height: 12, background: '#1f4ed8', borderRadius: 3 }}/>jordan.dev</span>
        <span style={{ background: '#1f4ed8', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 7 }}>Download CV</span>
      </div>
      <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 8 }}>
        <div>
          <div style={{ fontSize: 7, color: '#1f4ed8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Available · Sept 2026</div>
          <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 4 }}>Building <span style={{ color: '#1f4ed8' }}>reliable systems</span>, one small tool at a time.</div>
        </div>
        <div style={{ background: '#e5e7ec', aspectRatio: '4/5', borderRadius: 5, position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, background: 'rgba(255,255,255,.9)', borderRadius: 4, padding: 3, fontSize: 6 }}><b>UWaterloo</b><br/>3.92 GPA</div>
        </div>
      </div>
      <div style={{ padding: '6px 10px', borderTop: '1px solid #e5e7ec', display: 'flex', gap: 6, fontSize: 7 }}>
        <span style={{ border: '1px solid #e5e7ec', padding: '1px 5px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace' }}>Stripe</span>
        <span style={{ border: '1px solid #e5e7ec', padding: '1px 5px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace' }}>ETH Z.</span>
      </div>
    </TH>
  );
}

/* 11 — Boarding Pass */
function ThBoarding() {
  return (
    <TH style={{ background: '#e9e4d8', padding: 8, fontFamily: 'IBM Plex Mono, monospace' }}>
      <div style={{ background: '#fff', color: '#14110b', display: 'grid', gridTemplateColumns: '1fr 60px', boxShadow: '0 4px 12px rgba(0,0,0,.15)' }}>
        <div style={{ padding: 10 }}>
          <div style={{ fontSize: 6, letterSpacing: '0.14em', opacity: .65, paddingBottom: 4, borderBottom: '1px solid #14110b' }}>★ Folio Air · Boarding Pass</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 14px 1fr', gap: 4, alignItems: 'center', marginTop: 6 }}>
            <div><div style={{ fontSize: 6, opacity: .6 }}>FROM</div><div style={{ fontWeight: 700, fontSize: 24, lineHeight: 1 }}>WAT</div></div>
            <div style={{ fontSize: 11, opacity: .55 }}>→</div>
            <div><div style={{ fontSize: 6, opacity: .6 }}>TO</div><div style={{ fontWeight: 700, fontSize: 24, lineHeight: 1 }}>SFO</div></div>
          </div>
          <div style={{ marginTop: 8, fontSize: 7, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <div><div style={{ opacity: .55, fontSize: 6 }}>PASSENGER</div><b>Jordan Park</b></div>
            <div><div style={{ opacity: .55, fontSize: 6 }}>DATE</div><b>12 MAY 26</b></div>
          </div>
        </div>
        <div style={{ borderLeft: '2px dashed #14110b', padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 5, opacity: .55, letterSpacing: '0.12em' }}>SEAT</div><div style={{ fontWeight: 700, fontSize: 16 }}>24F</div></div>
          <div style={{ display: 'flex', gap: 1, alignItems: 'end', height: 28 }}>
            {Array.from({ length: 24 }, (_, i) => (<i key={i} style={{ width: i % 2 ? 1 : 2, height: 50 + (i * 17) % 50 + '%', background: '#14110b', display: 'block' }} />))}
          </div>
        </div>
      </div>
    </TH>
  );
}

/* 12 — Museum */
function ThMuseum() {
  return (
    <TH style={{ background: '#ece6db', color: '#1a1714', padding: 14, fontFamily: 'Instrument Serif, serif' }}>
      <div style={{ fontSize: 6, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: .65, fontFamily: 'Inter, sans-serif', textAlign: 'center', borderBottom: '1px solid #1a1714', paddingBottom: 4 }}>FOLIO · GALLERIA · SPRING 2026</div>
      <div style={{ textAlign: 'center', padding: '16px 0 12px', borderBottom: '1px solid #1a1714' }}>
        <div style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', opacity: .55 }}>Solo Exhibition · Plate № 01—06</div>
        <div style={{ fontSize: 30, lineHeight: 1, marginTop: 6, letterSpacing: '-0.01em' }}>Lina Marchetti</div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 9, marginTop: 4, opacity: .75 }}>A working retrospective.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
        {[1,2].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 6 }}>
            <div style={{ background: '#fff', aspectRatio: '3/4', border: '1px solid #1a1714', boxShadow: 'inset 0 0 0 2px #ece6db, inset 0 0 0 3px rgba(0,0,0,.15)' }} />
            <div>
              <div style={{ fontSize: 6, opacity: .55, fontFamily: 'Inter, sans-serif', letterSpacing: '0.18em' }}>Plate № {String(i).padStart(2,"0")}</div>
              <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.1 }}>{['Atelier 21','Notturno'][i-1]}</div>
              <div style={{ fontStyle: 'italic', fontSize: 7, fontFamily: 'EB Garamond, serif', opacity: .8 }}>2025</div>
            </div>
          </div>
        ))}
      </div>
    </TH>
  );
}

/* 13 — Trading Card */
function ThTCG() {
  return (
    <TH style={{ background: '#0d1b2a', color: '#e9eef5', padding: 10, fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 0%, rgba(120,80,220,.4), transparent 50%), radial-gradient(circle at 80% 100%, rgba(80,200,220,.3), transparent 50%)' }} />
      <div style={{ position: 'relative', background: 'linear-gradient(155deg, #ffd06f, #ff7a6c)', borderRadius: 8, padding: 2, marginTop: 6 }}>
        <div style={{ background: '#1a0e2c', borderRadius: 6, padding: 10 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, letterSpacing: '0.2em', opacity: .65, textTransform: 'uppercase' }}>№ 001 / 099 · Legendary</div>
          <div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 900, fontSize: 18, lineHeight: 1, letterSpacing: '-0.02em', marginTop: 4 }}>Jordan Park</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, opacity: .65, marginTop: 3 }}>CS · UWaterloo</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginTop: 8, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,.15)' }}>
            {[['14','Repos'],['2.1k','Commits'],['4','Interns'],['3.92','GPA']].map(([n,l],i)=>(<div key={i}><div style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 11 }}>{n}</div><div style={{ fontSize: 5, opacity: .6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div></div>))}
          </div>
        </div>
      </div>
    </TH>
  );
}

/* 14 — Manifesto */
function ThManifesto() {
  return (
    <TH style={{ background: '#f0ec4a', color: '#100c0c', padding: 10, fontFamily: 'Unbounded, sans-serif' }}>
      <div style={{ fontSize: 6, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #100c0c', paddingBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
        <span>Manifesto № 01</span><span>Milan · 2026</span>
      </div>
      <div style={{ fontWeight: 900, fontSize: 32, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', marginTop: 10 }}>A<br/><span style={{ WebkitTextStroke: '1px #100c0c', color: 'transparent' }}>PRACTICE</span><br/>IN<br/>PUBLIC.</div>
    </TH>
  );
}

/* 15 — Atlas */
function ThAtlas() {
  return (
    <TH style={{ background: '#f5efde', color: '#221d12', fontFamily: 'EB Garamond, serif' }}>
      <div style={{ padding: '6px 10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid currentColor', fontFamily: 'Major Mono Display, monospace', fontSize: 6, letterSpacing: '0.18em', opacity: .65 }}>
        <span>fol. 03 · sht. 04</span><span>1:1 — life-size</span><span>48.85°N</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px', padding: 10, gap: 8 }}>
        <div>
          <div style={{ fontFamily: 'Major Mono Display, monospace', fontSize: 5, letterSpacing: '0.22em', opacity: .65, textTransform: 'uppercase' }}>An Atlas of</div>
          <div style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 24, lineHeight: 1, marginTop: 4, letterSpacing: '-0.01em' }}>Amara Okonkwo</div>
          <div style={{ fontStyle: 'italic', fontSize: 7, marginTop: 4, opacity: .75 }}>A working cartography of projects & ports.</div>
        </div>
        <div style={{ width: 40, height: 40, border: '1px solid currentColor', borderRadius: '50%', position: 'relative', alignSelf: 'end' }}>
          <span style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Major Mono Display, monospace', fontSize: 6 }}>N</span>
          <span style={{ position: 'absolute', top: '20%', left: '50%', width: 1, height: '60%', background: 'currentColor', transform: 'translateX(-50%)' }} />
        </div>
      </div>
      <div style={{ padding: '6px 10px', borderTop: '1px solid currentColor', fontSize: 7, fontStyle: 'italic' }}>
        <div style={{ fontFamily: 'Major Mono Display, monospace', fontStyle: 'normal', fontSize: 5, opacity: .65, letterSpacing: '0.2em' }}>48.95°N · 2.40°E</div>
        <div>Mercado Brief — fam. Newsletter</div>
      </div>
    </TH>
  );
}

/* 16 — Receipt */
function ThReceipt() {
  return (
    <TH style={{ background: '#ddd6c4', padding: 8, fontFamily: 'IBM Plex Mono, monospace' }}>
      <div style={{ background: '#faf6e6', color: '#1a1714', padding: '10px 14px', maxWidth: 200, margin: '0 auto', boxShadow: '0 8px 18px rgba(0,0,0,.15)' }}>
        <div style={{ textAlign: 'center', paddingBottom: 4, borderBottom: '1.5px dashed currentColor' }}>
          <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.06em' }}>FOLIO/MART</div>
          <div style={{ fontSize: 6, opacity: .65, letterSpacing: '0.08em', marginTop: 2, textTransform: 'uppercase' }}>★ CV · since 2002 ★</div>
        </div>
        <div style={{ marginTop: 4, fontSize: 7, lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, letterSpacing: '0.1em', paddingTop: 2 }}>★ PROJECTS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>MERCADO BRIEF</span><span>$20.00</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>HAWKER GTM</span><span>$27.00</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOUNDERS</span><span>$34.00</span></div>
          <div style={{ borderTop: '1.5px dashed currentColor', marginTop: 4, paddingTop: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>TOTAL · value</span><span>priceless</span></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, gap: 1 }}>{Array.from({length: 20}, (_,i) => <i key={i} style={{ width: i%2 ? 1 : 2, height: 10, background: '#1a1714' }} />)}</div>
      </div>
    </TH>
  );
}

/* 17 — Library */
function ThLibrary() {
  return (
    <TH style={{ background: '#d8cdb4', color: '#2a2117', padding: 12, fontFamily: 'Special Elite, monospace' }}>
      <div style={{ textAlign: 'center', fontSize: 6, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: .8, borderBottom: '2px solid currentColor', paddingBottom: 4 }}>★ FOLIO PUBLIC LIBRARY ★</div>
      <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 10, marginTop: 10 }}>
        <div style={{ background: '#fff', color: '#2a2117', padding: 6, boxShadow: '2px 2px 0 rgba(0,0,0,.15)', transform: 'rotate(-1deg)', fontSize: 6 }}>
          <div style={{ letterSpacing: '0.15em', opacity: .55, fontSize: 5 }}>CALL №</div>
          <div style={{ fontSize: 12 }}>741.6</div>
          <div style={{ fontSize: 12 }}>MAR</div>
          <div style={{ marginTop: 4, border: '1.5px solid #b03227', color: '#b03227', padding: '1px 4px', display: 'inline-block', transform: 'rotate(-5deg)', fontWeight: 700, letterSpacing: '0.14em', fontSize: 6 }}>CATALOGUED</div>
        </div>
        <div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1, fontWeight: 500 }}>Lina Marchetti</div>
          <div style={{ fontSize: 7, marginTop: 4, letterSpacing: '0.06em' }}>3RD YR · POLITECNICO</div>
          <div style={{ marginTop: 8, background: '#fff', padding: 5, boxShadow: '2px 2px 0 rgba(0,0,0,.15)', transform: 'rotate(1.4deg)', fontSize: 6, backgroundImage: 'repeating-linear-gradient(transparent 0 9px, rgba(0,0,0,.06) 9px 10px)' }}>
            <div style={{ opacity: .65 }}>741.6 / ATE</div>
            <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 11, fontWeight: 500, lineHeight: 1.1 }}>Atelier 21</div>
          </div>
        </div>
      </div>
    </TH>
  );
}

/* 18 — Concert Poster */
function ThPoster() {
  return (
    <TH style={{ background: '#f0e7d4', color: '#1d1612', fontFamily: 'Bebas Neue, sans-serif' }}>
      <div style={{ padding: 10, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#ff5747', mixBlendMode: 'multiply', transform: 'skewY(-4deg) translateY(-30%)', height: '60%' }} />
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, bottom: 0, background: '#2456b3', mixBlendMode: 'multiply', transform: 'skewY(3deg) translateY(20%)', height: '60%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 8 }}>Folio.app proudly presents</div>
          <div style={{ fontSize: 38, lineHeight: 0.78, textTransform: 'uppercase', marginTop: 4 }}>Lina<br/><span style={{ display: 'inline-block', transform: 'rotate(-2deg)' }}>Marchetti</span></div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, marginTop: 6 }}><span style={{ background: '#f7c948', padding: '0 4px', fontFamily: 'Bebas Neue, sans-serif', fontSize: 12 }}>MILAN</span> · 02 MAR · 14 APR</div>
        </div>
      </div>
      <div style={{ padding: 4, background: '#f7c948', color: '#1d1612', fontSize: 7, letterSpacing: '0.08em', textAlign: 'center' }}>★ TONIGHT'S BILL ★ DOORS 7 ★</div>
    </TH>
  );
}

/* 19 — Finder */
function ThFinder() {
  return (
    <TH style={{ background: '#c6c2bc', padding: 8 }}>
      <div style={{ background: '#fafafa', borderRadius: 6, overflow: 'hidden', border: '0.5px solid rgba(0,0,0,.15)', boxShadow: '0 8px 20px rgba(0,0,0,.2)' }}>
        <div style={{ background: 'linear-gradient(180deg, #ececec, #d8d8d8)', padding: '4px 6px', display: 'flex', gap: 5, alignItems: 'center', borderBottom: '0.5px solid rgba(0,0,0,.15)' }}>
          <div style={{ display: 'flex', gap: 3 }}><i style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }}/><i style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }}/><i style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }}/></div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 8, color: 'rgba(0,0,0,.55)' }}>Jordan — ~/folio</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', minHeight: 160 }}>
          <div style={{ background: 'rgba(0,0,0,.025)', borderRight: '0.5px solid rgba(0,0,0,.1)', padding: 6, fontSize: 7 }}>
            <div style={{ opacity: .45, fontSize: 5, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Fav</div>
            <div style={{ padding: '2px 4px', borderRadius: 3, background: 'rgba(0, 122, 255, 0.85)', color: '#fff', fontSize: 6 }}>folio</div>
            <div style={{ padding: '2px 4px', fontSize: 6 }}>Projects</div>
            <div style={{ padding: '2px 4px', fontSize: 6 }}>cv.pdf</div>
          </div>
          <div>
            <div style={{ padding: '3px 6px', background: 'rgba(0,0,0,.04)', display: 'grid', gridTemplateColumns: '1fr 30px', fontSize: 6, color: 'rgba(0,0,0,.55)', letterSpacing: '0.04em', fontWeight: 600 }}><span>NAME</span><span>SIZE</span></div>
            {['tinyk8s.go', 'lex.fish.md', 'ferro-db.go', 'cv.pdf'].map((f, i) => (
              <div key={i} style={{ padding: '3px 6px', display: 'grid', gridTemplateColumns: '1fr 30px', fontSize: 7, alignItems: 'center', gap: 4, borderTop: '0.5px solid rgba(0,0,0,.05)', background: i === 0 ? 'rgba(0, 122, 255, 0.85)' : 'transparent', color: i === 0 ? '#fff' : 'inherit' }}>
                <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><i style={{ width: 8, height: 10, background: i % 2 ? '#a0a0a0' : '#79b6ff', borderRadius: '2px 2px 0 0', display: 'block' }} />{f}</span>
                <span style={{ fontSize: 6, opacity: .65 }}>1MB</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TH>
  );
}

/* 20 — Botanical */
function ThBotanical() {
  return (
    <TH style={{ background: '#f0eadb', backgroundImage: 'linear-gradient(rgba(80,60,30,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(80,60,30,.06) 1px, transparent 1px)', backgroundSize: '14px 14px', padding: 8, color: '#2a2418', fontFamily: 'EB Garamond, serif' }}>
      <div style={{ border: '1.5px solid currentColor', padding: 10, height: 'calc(100% - 16px)' }}>
        <div style={{ fontFamily: 'Major Mono Display, monospace', fontSize: 5, letterSpacing: '0.22em', opacity: .7, textTransform: 'uppercase', paddingBottom: 4, borderBottom: '1.5px solid currentColor' }}>Herbarium · plate № 014 · Spring 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px', gap: 6, marginTop: 6 }}>
          <div>
            <div style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 20, lineHeight: 1, letterSpacing: '-0.01em' }}>Amara Okonkwo</div>
            <div style={{ fontStyle: 'italic', fontSize: 7, marginTop: 4, opacity: .75 }}>at HEC · Paris</div>
          </div>
          <div style={{ background: '#fff', padding: 4, boxShadow: '1px 2px 0 rgba(0,0,0,.1)', transform: 'rotate(-1deg)', fontSize: 5 }}>
            <div style={{ fontFamily: 'Major Mono Display, monospace', fontSize: 5, letterSpacing: '0.18em', opacity: .55 }}>SPECIMEN</div>
            <div style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 9, marginTop: 2 }}>Studens vivax</div>
          </div>
        </div>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[1, 2].map(i => (
            <div key={i}>
              <div style={{ background: '#fff', aspectRatio: '3/4', border: '1px solid currentColor', backgroundImage: 'radial-gradient(circle at 40% 40%, rgba(80,60,30,.18) 0 12%, transparent 13%), radial-gradient(circle at 60% 70%, rgba(80,60,30,.12) 0 8%, transparent 9%)' }} />
            </div>
          ))}
        </div>
      </div>
    </TH>
  );
}

/* 21 — Resume */
function ThResume() {
  return (
    <TH style={{ background: '#eceae5', padding: 8 }}>
      <div style={{ background: '#fff', display: 'grid', gridTemplateColumns: '70px 1fr', height: '100%', boxShadow: '0 8px 18px rgba(0,0,0,.15)' }}>
        <aside style={{ background: '#1c1d22', color: '#f3efe7', padding: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f3efe7', color: '#1c1d22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11 }}>AO</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 12, lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 6 }}>Amara Okonkwo</div>
          <div style={{ fontSize: 6, opacity: .75, marginTop: 2 }}>MSc · HEC Paris</div>
          <div style={{ fontSize: 5, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: .55, marginTop: 8, fontWeight: 600 }}>Skills</div>
          {['Strategy','Finance','SQL','French'].map((s, i) => (<div key={i} style={{ marginTop: 3 }}><div style={{ fontSize: 6, marginBottom: 1 }}>{s}</div><div style={{ height: 1.5, background: 'rgba(243,239,231,.18)' }}><i style={{ display: 'block', height: '100%', background: '#f3efe7', width: [95,80,65,80][i]+'%' }} /></div></div>))}
        </aside>
        <main style={{ padding: 8, color: '#1c1d22', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 9, lineHeight: 1.3, letterSpacing: '-0.005em', marginBottom: 6 }}>Operator turned strategist. Marketplaces, growth, ops at scale.</div>
          <div style={{ fontSize: 5, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: .55, paddingBottom: 2, borderBottom: '1px solid rgba(0,0,0,.1)', fontWeight: 600 }}>Experience</div>
          {[['Strategy intern · Bain & Co.', 'Summer 25'], ['Ops associate · Lori', '2022–23']].map(([r, t], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 4, padding: '2px 0', fontSize: 6 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 5, opacity: .55 }}>{t}</span>
              <span><b style={{ fontWeight: 600 }}>{r}</b></span>
            </div>
          ))}
        </main>
      </div>
    </TH>
  );
}

/* 22 — Bento */
function ThBento() {
  return (
    <TH style={{ background: '#f4f1ec', padding: 8, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 32, gap: 4 }}>
        <div style={{ gridColumn: 'span 4', gridRow: 'span 2', background: '#fff', borderRadius: 8, padding: '6px 8px' }}>
          <div style={{ fontSize: 5, opacity: .5, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>About ↗</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 16, lineHeight: 1, letterSpacing: '-0.015em', marginTop: 4 }}>Lina,<br/><span style={{ opacity: .55 }}>designer in Milan.</span></div>
        </div>
        <div style={{ gridColumn: 'span 2', gridRow: 'span 1', background: '#fff', borderRadius: 8, padding: '4px 6px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {[['06','proj'],['03','jobs'],['03','awd']].map(([n,l],i)=>(<div key={i} style={{ borderRight: i<2?'1px solid rgba(0,0,0,.08)':'none', padding: '0 3px' }}><div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 10, letterSpacing: '-0.02em' }}>{n}</div><div style={{ fontSize: 5, opacity: .55, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div></div>))}
        </div>
        <div style={{ gridColumn: 'span 2', gridRow: 'span 1', background: '#ffefe0', borderRadius: 8, padding: '4px 6px' }}>
          <div style={{ fontSize: 5, opacity: .5, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Now ↗</div>
          <div style={{ fontSize: 7, marginTop: 2 }}>Drawing a display serif</div>
        </div>
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2', background: '#ffd9b3', borderRadius: 8 }}/>
        <div style={{ gridColumn: 'span 3', gridRow: 'span 2', background: '#fff', borderRadius: 8, padding: '4px 6px' }}>
          <div style={{ fontSize: 5, opacity: .5, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Editorial ↗</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 11, lineHeight: 1, marginTop: 4 }}>Forme & Volume</div>
        </div>
        <div style={{ gridColumn: 'span 6', gridRow: 'span 1', background: '#18181b', color: '#fafafa', borderRadius: 8, padding: '4px 8px', fontSize: 7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 10 }}>Let's make something →</b><span style={{ opacity: .65 }}>lina.m@uni.it</span></div>
      </div>
    </TH>
  );
}

/* 23 — Notion */
function ThNotion() {
  return (
    <TH style={{ background: '#fff', padding: '12px 14px', color: '#37352f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ height: 24, background: 'linear-gradient(135deg, #f1eee6, #e6d9c5)', margin: '-12px -14px 0', borderRadius: 0, position: 'relative' }} />
      <div style={{ width: 30, height: 30, borderRadius: 6, background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 16, marginTop: -14, marginLeft: 4 }}>A</div>
      <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: 6 }}>Amara — portfolio & CV</div>
      <div style={{ marginTop: 6, fontSize: 7, paddingBottom: 4, borderBottom: '1px solid rgba(55,53,47,.09)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 2, padding: '1px 0' }}><span style={{ opacity: .55 }}>Role</span><span>MSc · HEC</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 2, padding: '1px 0' }}><span style={{ opacity: .55 }}>Status</span><span><span style={{ background: '#ddedea', color: '#1f5e51', padding: '0 4px', borderRadius: 2, fontSize: 6 }}>● Open</span></span></div>
      </div>
      <div style={{ background: '#f7f6f3', borderRadius: 3, padding: '5px 6px', marginTop: 6, fontSize: 7, lineHeight: 1.4, display: 'flex', gap: 4 }}>
        <span>💡</span><span>Operator turned strategist.</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 10, marginTop: 8 }}>Selected work</div>
      <div style={{ marginTop: 4, fontSize: 6, display: 'grid', gridTemplateColumns: '1fr 30px 20px', gap: 4, padding: '2px 0', borderBottom: '1px solid rgba(55,53,47,.08)' }}><b>Mercado Brief</b><span style={{ background: 'rgba(55,53,47,.08)', padding: '0 3px', borderRadius: 2 }}>News</span><span style={{ opacity: .55 }}>'25</span></div>
    </TH>
  );
}

/* 24 — Spare */
function ThSpare() {
  return (
    <TH style={{ background: '#fbfaf7', color: '#1c1815', padding: '18px 16px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 6, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: .55 }}>
        <span>lina.studio · index</span>
        <span style={{ display: 'flex', gap: 8 }}><span>work</span><span>about</span></span>
      </div>
      <div style={{ marginTop: 28, fontFamily: 'Fraunces, serif', fontWeight: 400, fontSize: 18, lineHeight: 1, letterSpacing: '-0.025em' }}>I'm Lina, a designer working in <em style={{ color: '#b3441f', fontStyle: 'italic' }}>books, type & print</em>.</div>
      <div style={{ marginTop: 16, borderTop: '1px solid rgba(28,24,21,.12)', paddingTop: 6, fontSize: 7 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', padding: '2px 0' }}><span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, opacity: .55, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Status</span><span>Available · Sep 2026</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', padding: '2px 0', borderTop: '1px solid rgba(28,24,21,.12)' }}><span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, opacity: .55, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Focus</span><span>Print · identity · type</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', padding: '2px 0', borderTop: '1px solid rgba(28,24,21,.12)' }}><span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, opacity: .55, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Studying</span><span>Politecnico di Milano</span></div>
      </div>
    </TH>
  );
}

/* 25 — Blog */
function ThBlog() {
  return (
    <TH style={{ background: '#f7f5f0', color: '#1a1714', padding: '10px 12px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4, borderBottom: '1px solid rgba(26,23,20,.1)', fontSize: 7 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 11, letterSpacing: '-0.015em' }}>jpark.dev</span>
        <span style={{ display: 'flex', gap: 6, opacity: .65 }}><span>writing</span><span>projects</span><span>cv</span></span>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 5, opacity: .55, letterSpacing: '0.14em', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>Featured · May 8</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 14, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 3 }}>tinyk8s: what 1,400 lines teaches you about Kubernetes</div>
        <div style={{ fontSize: 7, opacity: .85, lineHeight: 1.4, marginTop: 3 }}>A 1,400-line container orchestrator is not a Kubernetes replacement…</div>
      </div>
      <div style={{ marginTop: 8, fontSize: 5, opacity: .55, letterSpacing: '0.14em', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>Archive</div>
      <div style={{ marginTop: 4, display: 'grid', gridTemplateColumns: '32px 1fr', gap: 6, fontSize: 7, padding: '3px 0', borderTop: '1px solid rgba(26,23,20,.1)' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6, opacity: .55 }}>Apr 12</span>
        <div><b style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 9 }}>A storage engine that fits in your head</b></div>
      </div>
    </TH>
  );
}

window.TEMPLATE_THUMBS = [
  { id: 'terminal',  name: 'Terminal',         tags: ['dev', 'mono'],         Thumb: ThTerminal,  url: 'jordan.portfolio-cv.online' },
  { id: 'editorial', name: 'Editorial',        tags: ['design', 'serif'],     Thumb: ThEditorial, url: 'lina.portfolio-cv.online' },
  { id: 'brutalist', name: 'Brutalist',        tags: ['dev', 'raw'],          Thumb: ThBrutalist, url: 'jordan.dev' },
  { id: 'y2k',       name: 'Y2K',              tags: ['design', 'retro'],     Thumb: ThY2K,       url: 'lina_marc.geocities' },
  { id: 'swiss',     name: 'Swiss Grid',       tags: ['business', 'grid'],    Thumb: ThSwiss,     url: 'amara.okonkwo.com' },
  { id: 'playful',   name: 'Playful',          tags: ['design', 'warm'],      Thumb: ThPlayful,   url: 'lina.studio' },
  { id: '3d',        name: 'Experimental',     tags: ['dev', 'depth'],        Thumb: Th3D,        url: 'jpark.computer' },
  { id: 'notebook',  name: 'Notebook',         tags: ['personal', 'warm'],    Thumb: ThNotebook,  url: 'amara.notes' },
  { id: 'newspaper', name: 'Newspaper',        tags: ['business', 'print'],   Thumb: ThNewspaper, url: 'amara.times' },
  { id: 'corporate', name: 'Corporate',        tags: ['dev', 'clean'],        Thumb: ThCorporate, url: 'jordanpark.portfolio-cv.online' },
  { id: 'boarding',  name: 'Boarding Pass',    tags: ['dev', 'ticket'],       Thumb: ThBoarding,  url: 'folio.air/jordan' },
  { id: 'museum',    name: 'Museum',           tags: ['design', 'serif'],     Thumb: ThMuseum,    url: 'galleria/lina' },
  { id: 'tcg',       name: 'Trading Card',     tags: ['dev', 'holo'],         Thumb: ThTCG,       url: 'folio.tcg/jordan' },
  { id: 'manifesto', name: 'Manifesto',        tags: ['design', 'type'],      Thumb: ThManifesto, url: 'lina.manifesto' },
  { id: 'atlas',     name: 'Atlas',            tags: ['business', 'map'],     Thumb: ThAtlas,     url: 'atlas/amara' },
  { id: 'receipt',   name: 'Receipt',          tags: ['business', 'mono'],    Thumb: ThReceipt,   url: 'folio.mart/amara' },
  { id: 'library',   name: 'Library Card',     tags: ['design', 'archive'],   Thumb: ThLibrary,   url: 'library/lina' },
  { id: 'poster',    name: 'Concert Poster',   tags: ['design', 'riso'],      Thumb: ThPoster,    url: 'lina.tour/26' },
  { id: 'finder',    name: 'Finder Window',    tags: ['dev', 'os'],           Thumb: ThFinder,    url: '~/folio/jordan' },
  { id: 'botanical', name: 'Botanical Plate',  tags: ['business', 'archive'], Thumb: ThBotanical, url: 'herbarium/amara' },
  { id: 'resume',    name: 'Resume',           tags: ['business', 'cv'],      Thumb: ThResume,    url: 'amara.cv' },
  { id: 'bento',     name: 'Bento Grid',       tags: ['design', 'modular'],   Thumb: ThBento,     url: 'lina.cards' },
  { id: 'notion',    name: 'Notion Doc',       tags: ['business', 'doc'],     Thumb: ThNotion,    url: 'amara.notion.site' },
  { id: 'spare',     name: 'Spare',            tags: ['design', 'minimal'],   Thumb: ThSpare,     url: 'lina.studio' },
  { id: 'blog',      name: 'Blog Journal',     tags: ['dev', 'blog'],         Thumb: ThBlog,      url: 'jpark.dev' },
];

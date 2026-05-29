/* global React, ReactDOM, TEMPLATE_THUMBS */
const { useState, useEffect, useRef, useMemo } = React;

/* ── nav ───────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="nav">
      <div className="brand">portfolio-cv<i>.online</i><span className="mono">free for every student · forever</span></div>
      <nav>
        <a href="#templates">Templates</a>
        <a href="#how">How it works</a>
        <a href="#students">Examples</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="right">
        <a className="sign" href="signin.html">Sign in</a>
        <button className="cta" onClick={() => document.getElementById('deploy-input')?.focus()}>Start free →</button>
      </div>
    </header>
  );
}

/* ── deploy widget — used in hero + final cta ─────────────────── */
function DeployWidget({ id = 'deploy-input', initial = 'your-name' }) {
  const [val, setVal] = useState(initial);
  const [stage, setStage] = useState('idle'); // idle | typing | deploying | done
  useEffect(() => {
    // gentle auto-type hint on mount, only if input has default
    if (val !== initial) return;
    let i = 0;
    const target = initial;
    setVal('');
    setStage('typing');
    const id = setInterval(() => {
      i++;
      setVal(target.slice(0, i));
      if (i >= target.length) { clearInterval(id); setStage('idle'); }
    }, 90);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deploy = () => {
    if (stage === 'deploying') return;
    setStage('deploying');
    setTimeout(() => setStage('done'), 1700);
  };

  return (
    <div className="deploy-widget">
      <div className="row">
        <div className="input-wrap">
          <input
            id={id}
            value={val}
            onChange={(e) => setVal(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24))}
            placeholder="your-name"
            spellCheck={false}
            autoComplete="off"
          />
          <span>.portfolio-cv.online</span>
        </div>
        <button
          className={`deploy-btn ${stage === 'deploying' ? 'deploying' : ''} ${stage === 'done' ? 'deployed' : ''}`}
          onClick={deploy}
        >
          {stage === 'idle' || stage === 'typing' ? <>Deploy <span>→</span></> : null}
          {stage === 'deploying' ? <>Deploying… <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>◐</span></> : null}
          {stage === 'done' ? <>Live ✓</> : null}
        </button>
      </div>
      <div className={`status ${stage === 'done' ? 'live' : ''}`}>
        <i className="dot"></i>
        {stage === 'idle' && <>Available. Picks SSL, builds page, ships to CDN.</>}
        {stage === 'typing' && <>Checking availability…</>}
        {stage === 'deploying' && <>Building… → uploading to edge → live in seconds.</>}
        {stage === 'done' && <>{val || 'your-name'}.portfolio-cv.online is live · share it on LinkedIn.</>}
      </div>
      <div className="why">
        <span>Free forever</span>
        <span>SSL included</span>
        <span>PDF export</span>
        <span>Custom domain included</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

/* ── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const previews = useMemo(() => [
    TEMPLATE_THUMBS[1],  // Editorial
    TEMPLATE_THUMBS[0],  // Terminal — center
    TEMPLATE_THUMBS[21], // Bento
  ], []);
  return (
    <section className="hero">
      <div className="left">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', background: 'var(--live)', padding: '5px 10px', borderRadius: 4 }}>★ 100% Free</span>
          <span className="kicker" style={{ margin: 0 }}><i></i>Built by a student who hated building portfolios</span>
        </div>
        <h1>
          Your <em>portfolio</em>.<br />
          Deployed in <span className="strike">{"3\u00a0weeks"}</span> <em>60 seconds</em>.
        </h1>
        <p className="lede">
          A <b>free, forever-free</b> platform for students with <b>no CV and no portfolio</b>. Pick a template, fill in your details, push it live on your own <b>portfolio-cv.online</b> subdomain. No code, no hosting bills, no excuses.
        </p>
        <DeployWidget />
      </div>
      <div className="hero-right">
        <div className="hero-stack">
          {previews.map((tpl, i) => {
            const Thumb = tpl.Thumb;
            return (
              <div key={tpl.id} className={`preview p${i + 1}`}>
                <div className="chrome">
                  <div className="dots"><i></i><i></i><i></i></div>
                  <div className="url">{tpl.url}</div>
                  <div style={{ width: 32 }} />
                </div>
                <div className="port"><Thumb /></div>
              </div>
            );
          })}
          <div className="floater f1">Free forever · 25 templates</div>
          <div className="floater f2">live in 60s ⚡</div>
        </div>
      </div>
    </section>
  );
}

/* ── live counter band ─────────────────────────────────────────── */
function CounterBand() {
  const [n, setN] = useState(12847);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 4200);
    return () => clearInterval(id);
  }, []);
  const recent = [
    'maria.portfolio-cv.online · 2m ago',
    'tomislav.portfolio-cv.online · 4m ago',
    'aïcha.portfolio-cv.online · 6m ago',
    'kenji.portfolio-cv.online · 7m ago',
    'olamide.portfolio-cv.online · 9m ago',
    'sara.portfolio-cv.online · 11m ago',
    'arda.portfolio-cv.online · 13m ago',
    'priya.portfolio-cv.online · 15m ago',
  ];
  const stream = [...recent, ...recent];
  return (
    <div className="counter-band">
      <span className="lbl"><i></i>LIVE · DEPLOYED TODAY</span>
      <span className="stream">
        <span className="stream-track">
          {stream.map((s, i) => (<span key={i}>↗ <i>{s.split(' · ')[0]}</i> · {s.split(' · ')[1]}</span>))}
        </span>
      </span>
      <span className="num">{n.toLocaleString()}</span>
      <span className="stat"><b>187</b>schools</span>
      <span className="stat"><b>54</b>countries</span>
    </div>
  );
}

/* ── templates marquee ─────────────────────────────────────────── */
function Templates() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'design', 'dev', 'business', 'serif', 'mono', 'minimal', 'warm'];
  const items = filter === 'all'
    ? TEMPLATE_THUMBS
    : TEMPLATE_THUMBS.filter(t => t.tags.includes(filter));
  // duplicate for seamless marquee
  const track = filter === 'all' ? [...items, ...items] : items;

  return (
    <section id="templates" style={{ paddingTop: 96, paddingBottom: 0, maxWidth: 'none', padding: '96px 0 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div className="section-head">
          <div>
            <div className="kicker">25 templates · 0 lookalikes</div>
            <h2>Pick a vibe. <em>Make it yours.</em></h2>
          </div>
          <div className="meta">
            <span>{TEMPLATE_THUMBS.length} ready to ship</span>
            <span>updated weekly</span>
          </div>
        </div>
      </div>

      <div className="template-marquee">
        <div className="filter-row" style={{ maxWidth: 1320, margin: '0 auto' }}>
          <span className="label">Filter:</span>
          {filters.map(f => (
            <button key={f} className={`pill ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? `all · ${TEMPLATE_THUMBS.length}` : `${f} · ${TEMPLATE_THUMBS.filter(t => t.tags.includes(f)).length}`}
            </button>
          ))}
        </div>
        <div className="track" key={filter} style={filter !== 'all' ? { animation: 'none', justifyContent: 'flex-start', flexWrap: 'wrap', padding: '12px 32px', maxWidth: 1320, margin: '0 auto' } : {}}>
          {track.map((tpl, i) => {
            const Thumb = tpl.Thumb;
            const realIndex = i >= TEMPLATE_THUMBS.length ? i - TEMPLATE_THUMBS.length : i;
            return (
              <div className="thumb" key={`${tpl.id}-${i}`}>
                <div className="thumb-chrome">
                  <div className="dots"><i></i><i></i><i></i></div>
                  <div className="url">{tpl.url}</div>
                  <span style={{ width: 12 }} />
                </div>
                <div className="thumb-port"><Thumb /></div>
                <div className="thumb-meta">
                  <h4>{tpl.name}</h4>
                  <span className="num">№ {String(realIndex + 1).padStart(2, '0')}</span>
                  <div className="tags">{tpl.tags.map(t => (<span key={t}>{t}</span>))}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── how it works ──────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="how">
      <div className="section-head">
        <div>
          <div className="kicker">how it works · three steps · ~60 seconds</div>
          <h2>Pick. Fill. <em>Deploy.</em></h2>
        </div>
        <div className="meta"><span>no signup required to preview</span><span>1-click deploy when ready</span></div>
      </div>

      <div className="how">
        <div className="step">
          <span className="n">01</span>
          <div className="lbl">Step one</div>
          <h3>Pick a template.</h3>
          <p>25 directions across editorial, brutalist, terminal, museum, manifesto, and more. Live-preview any of them with sample data.</p>
          <div className="demo">
            <div className="demo-picker">
              {Array.from({ length: 8 }, (_, i) => (
                <div className={`mini ${i === 1 ? 'sel' : ''}`} key={i}><i /></div>
              ))}
            </div>
          </div>
        </div>

        <div className="step">
          <span className="n">02</span>
          <div className="lbl">Step two</div>
          <h3>Fill in your details.</h3>
          <p>One simple form. Auto-saved. Drag projects to reorder. Upload a PDF and we'll parse it. Update anytime — your site rebuilds in seconds.</p>
          <div className="demo">
            <div className="demo-form">
              <div className="row">
                <div className="field fld"><span className="lbl-fld">Name</span><span className="val">Lina Marchetti</span></div>
                <div className="field fld"><span className="lbl-fld">Role</span><span className="val">Graphic Design</span></div>
              </div>
              <div className="field fld foc"><span className="lbl-fld">Tagline</span><span className="val">Books, posters, type.</span></div>
              <div className="area">↗ Project: Atelier 21 — Identity, 2025<br/>↗ Project: Forme & Volume — Editorial, 2024</div>
            </div>
          </div>
        </div>

        <div className="step">
          <span className="n">03</span>
          <div className="lbl">Step three</div>
          <h3>Deploy to your subdomain.</h3>
          <p>One button. Free subdomain with SSL. Connect a custom domain if you have one. Share the link.</p>
          <div className="demo">
            <div className="demo-deploy">
              <div className="url"><span className="ssl">●●●</span> https://lina.portfolio-cv.online</div>
              <div className="log">
                <div className="ln"><span className="p">$</span><span>folio deploy</span></div>
                <div className="ln"><span></span><span>→ building static bundle…</span></div>
                <div className="ln"><span></span><span>→ pushing to edge…</span></div>
                <div className="ln done"><span>✓</span><span>live in 11s</span></div>
              </div>
              <span className="stamp">● live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── student examples ──────────────────────────────────────────── */
function Students() {
  const examples = [
    { tplIdx: 1, name: 'Lina Marchetti', role: 'Graphic Design · Politecnico di Milano', url: 'lina.portfolio-cv.online', quote: 'I used to keep my work in a Google Doc. Now it lives on a real URL I can put on my CV.', avatar: 'LM' },
    { tplIdx: 6, name: 'Jordan Park', role: 'Computer Science · UWaterloo', url: 'jpark.computer', quote: 'My recruiter asked for a portfolio on Monday. I sent her this link on Monday.', avatar: 'JP' },
    { tplIdx: 4, name: 'Amara Okonkwo', role: 'MSc Strategy · HEC Paris', url: 'amara.okonkwo.com', quote: 'Designed without making me feel I had to learn design. I just wrote.', avatar: 'AO' },
  ];
  return (
    <section id="students">
      <div className="section-head">
        <div>
          <div className="kicker">live now · made by students like you</div>
          <h2>Real students. <em>Real subdomains.</em></h2>
        </div>
        <div className="meta"><span>click any to visit</span><span>open in new tab</span></div>
      </div>
      <div className="students">
        {examples.map((ex, i) => {
          const tpl = TEMPLATE_THUMBS[ex.tplIdx];
          const Thumb = tpl.Thumb;
          return (
            <div className="student-card" key={i}>
              <div className="browser">
                <div className="dots"><i></i><i></i><i></i></div>
                <div className="url">{ex.url}</div>
                <span style={{ width: 18 }} />
              </div>
              <div className="preview"><Thumb /></div>
              <div className="meta-stu">
                <div className="avatar">{ex.avatar}</div>
                <div className="who"><b>{ex.name}</b><small>{ex.role}</small></div>
                <a className="visit" href="#" onClick={(e) => e.preventDefault()}>visit ↗</a>
              </div>
              <div className="quote">"{ex.quote}"</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── features ──────────────────────────────────────────────────── */
function Features() {
  return (
    <section id="features">
      <div className="section-head">
        <div>
          <div className="kicker">the boring stuff, handled</div>
          <h2>You write. <em>We do the rest.</em></h2>
        </div>
        <div className="meta"><span>shipping today</span><span>more next month</span></div>
      </div>
      <div className="features">
        <div className="feature w6 h3 dark-f">
          <div className="lbl">Subdomain</div>
          <h4 style={{ color: 'white', fontSize: 28 }}>Your name. Your URL.</h4>
          <p>Every student gets a free <b>name.portfolio-cv.online</b> subdomain. SSL included. Custom domain supported. Indexed by search engines if you want it to be.</p>
          <div className="feat-visual">
            <span className="url-pill"><i className="dot"></i>https://lina.portfolio-cv.online</span>
            <span className="url-pill" style={{ marginLeft: 8 }}><i className="dot"></i>https://jpark.computer</span>
          </div>
        </div>

        <div className="feature w3">
          <div className="lbl">PDF Export</div>
          <h4>One-click CV PDF.</h4>
          <div className="feat-visual"><div className="pdf"><b>PDF</b><i /><i /><i style={{ width: '60%' }} /><i style={{ width: '70%' }} /></div></div>
        </div>

        <div className="feature w3">
          <div className="lbl">Responsive</div>
          <h4>Works on every screen.</h4>
          <div className="feat-visual"><div className="device-row"><div className="laptop"><i /><i style={{ width: '70%' }} /><i style={{ width: '50%' }} /><i style={{ width: '80%' }} /></div><div className="phone"><i style={{ background: 'var(--accent)', width: '60%' }} /><i /><i style={{ width: '50%' }} /></div></div></div>
        </div>

        <div className="feature w3">
          <div className="lbl">Themes</div>
          <h4>Dark, light, or both.</h4>
          <div className="feat-visual"><div className="theme-row"><div className="swatch lt" /><div className="swatch dk" /><div className="swatch acc" /><div className="swatch gr" /></div></div>
        </div>

        <div className="feature w3 accent-f">
          <div className="lbl" style={{ color: 'rgba(255,255,255,.75)' }}>Privacy</div>
          <h4 style={{ color: 'white' }}>Yours. Not ours.</h4>
          <p>Your data isn't sold, fed to a model, or used for "personalisation".</p>
          <div className="feat-visual"><span className="lock" style={{ background: 'rgba(255,255,255,.18)', borderColor: 'rgba(255,255,255,.25)', color: 'white' }}>🔒 GDPR-compliant</span></div>
        </div>

        <div className="feature w6">
          <div className="lbl">Built-in animations</div>
          <h4>Templates that move.</h4>
          <p>Every template ships with thoughtful animations — type-on heros, marquees, scroll reveals, hover micro-interactions. No JS knowledge needed.</p>
          <div className="feat-visual"><div className="marquee-tiny"><div><span>★ MARQUEE</span><span>· SCROLL REVEAL</span><span>· TYPE-ON</span><span>· HOVER TILT</span><span>· HOLO SWEEP</span><span>★ MARQUEE</span><span>· SCROLL REVEAL</span><span>· TYPE-ON</span></div></div></div>
        </div>

        <div className="feature w3">
          <div className="lbl">Analytics</div>
          <h4>Who's reading.</h4>
          <p>Anonymous visit counts per page. Privacy-friendly. No cookies.</p>
        </div>

        <div className="feature w3">
          <div className="lbl">Updates</div>
          <h4>Change anything, anytime.</h4>
          <p>Edit a project → site rebuilds → live in 11 seconds.</p>
        </div>
      </div>
    </section>
  );
}

/* ── pricing strip ─────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" style={{ padding: '60px 0', maxWidth: 'none', margin: 0 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div className="section-head">
          <div>
            <div className="kicker" style={{ opacity: 0.65 }}>pricing · short version</div>
            <h2>Free for students. <em>Forever.</em></h2>
          </div>
          <div className="meta"><span>verified with school email</span><span>everything included</span></div>
        </div>
      </div>

      <div className="pricing">
        <div>
          <div className="lbl">For students · forever</div>
          <h3><em>Free</em></h3>
          <p>Every student with a verified school email. No card. No expiry. No upsell. No hidden tiers. Everything is free.</p>
        </div>
        <div>
          <div className="lbl">Everything included</div>
          <ul>
            <li>All templates</li>
            <li>Free subdomain + SSL</li>
            <li>Custom domain support</li>
            <li>PDF export</li>
            <li>Analytics</li>
            <li>Unlimited updates</li>
          </ul>
        </div>
        <div>
          <div className="lbl">Why free?</div>
          <p>Built by a student, for students. No investors, no monetisation, no catch. Just a tool that should have existed.</p>
        </div>
      </div>
    </section>
  );
}

/* ── faq ───────────────────────────────────────────────────────── */
function FAQ() {
  const qs = [
    { q: "Is it really free?", a: "Yes. If you have a verified school email, every feature is free forever — no trial, no card, no expiry, no hidden tiers. Built by a student, for students." },
    { q: "Do I need to know how to code?", a: "No. You pick a template, fill in a form, and click Deploy. Everything you see — the type, the animations, the responsive layouts — is already built into the template." },
    { q: "Can I change templates later without losing my data?", a: "Yes. Your content is stored separately from the template. Switch any time and your projects, experience, and CV will fill the new design automatically." },
    { q: "What about a real domain like lina.com?", a: "You can plug in any domain you own — free. We handle the SSL certificate and the DNS instructions step-by-step." },
    { q: "Will my site look the same on mobile?", a: "Every template is built for both desktop and mobile from day one. You can preview both before you deploy." },
    { q: "Can I export a PDF CV?", a: "Yes — one button. Your CV is laid out as a print-ready single-page PDF that works with most ATS systems." },
    { q: "What if I'm not a student?", a: "Right now the platform is only for students with a verified school email. We built it for students and want to keep it focused." },
    { q: "Is my data sold or used to train AI?", a: "No. Your portfolio data isn't sold, shared, or used to train models. We're GDPR-compliant by default." },
  ];
  return (
    <section id="faq">
      <div className="section-head">
        <div>
          <div className="kicker">questions · honest answers</div>
          <h2>The fine print, <em>plainly.</em></h2>
        </div>
        <div className="meta"><span>still curious?</span><span>email hi@portfolio-cv.online</span></div>
      </div>
      <div className="faq">
        {qs.map((q, i) => (
          <details className="q" key={i} open={i === 0}>
            <summary>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span>{q.q}</span>
              <span className="ind">+</span>
            </summary>
            <p>{q.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── final cta ─────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="final-cta" style={{ padding: '90px 32px', maxWidth: 'none', margin: 0 }}>
      <h2>Your work. <em>On a URL.</em><br />Today.</h2>
      <p>Stop emailing zip files. Pick a template, write your story, push to your subdomain.</p>
      <DeployWidget id="final-deploy" initial="me" />
      <div className="small">12,847 students have already done it.</div>
    </section>
  );
}

/* ── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="brand-foot">folio<i>.</i>
        <small>Free portfolios and CVs for students. Built so the next 100,000 first-year students can stop using a Google Doc as their portfolio.</small>
      </div>
      <div>
        <h5>Product</h5>
        <ul>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#students">Examples</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#features">Features</a></li>
        </ul>
      </div>
      <div>
        <h5>Resources</h5>
        <ul>
          <li><a href="#">CV writing guide</a></li>
          <li><a href="#">Portfolio do's & don'ts</a></li>
          <li><a href="#">Student blog</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">Roadmap</a></li>
        </ul>
      </div>
      <div>
        <h5>Schools</h5>
        <ul>
          <li><a href="#">Bring folio to your campus</a></li>
          <li><a href="#">Workshops</a></li>
          <li><a href="#">Career office partnership</a></li>
          <li><a href="#">Student ambassadors</a></li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">hi@portfolio-cv.online</a></li>
        </ul>
      </div>
      <div className="foot-bottom">
        <span>© 2026 folio. · Made in a dorm room, hosted globally.</span>
        <span>v1.0 · 25 templates · 187 schools</span>
      </div>
    </footer>
  );
}

/* ── app ───────────────────────────────────────────────────────── */
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <CounterBand />
      <Templates />
      <HowItWorks />
      <Students />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

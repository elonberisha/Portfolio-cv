import CounterBand from '@/components/landing/CounterBand'
import DeployWidget from '@/components/landing/DeployWidget'
import { TEMPLATE_THUMBS, THUMB_MAP } from '@/components/landing/LandingThumbs'
import TemplatesSection from '@/components/landing/TemplatesSection'
import { isAuthenticated } from '@/lib/auth'
import { getLandingData, type FeaturedStudent } from '@/lib/stats'

import LandingStyles from './LandingStyles'

function Hero({ loggedIn, templateCount }: { loggedIn: boolean; templateCount: number }) {
  const previews = [
    TEMPLATE_THUMBS[1],
    TEMPLATE_THUMBS[0],
    TEMPLATE_THUMBS[21],
  ]

  return (
    <section className="hero">
      <div className="left">
        <div className="hero-kickers">
          <span className="free-badge">100% Free</span>
          <span className="kicker"><i></i>Built by a student who hated building portfolios</span>
        </div>
        <h1>
          Your <em>portfolio</em>.<br />
          Deployed in <span className="strike"><span>3</span><span>weeks</span></span> <em>60 seconds</em>.
        </h1>
        <p className="lede">
          A <b>free, forever-free</b> platform for students with <b>no CV and no
          portfolio</b>. Pick a template, fill in your details, push it live on
          your own <b>portfolio-cv.online</b> subdomain. No code, no hosting
          bills, no excuses.
        </p>
        <DeployWidget loggedIn={loggedIn} />
      </div>

      <div className="hero-right">
        <div className="hero-stack">
          {previews.map((tpl, index) => {
            const Thumb = tpl.Thumb
            return (
              <div key={tpl.id} className={`preview p${index + 1}`}>
                <div className="chrome">
                  <div className="dots"><i></i><i></i><i></i></div>
                  <div className="url">{tpl.url}</div>
                  <div style={{ width: 32 }} />
                </div>
                <div className="port"><Thumb /></div>
              </div>
            )
          })}
          <div className="floater f1">Free forever - {templateCount} templates</div>
          <div className="floater f2">live in 60s</div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how">
      <div className="section-head">
        <div>
          <div className="kicker">how it works - three steps - ~60 seconds</div>
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
          <p>One simple form. Auto-saved. Add projects, education, skills, and a Europass-standard CV structure. Update anytime; your site rebuilds in seconds.</p>
          <div className="demo">
            <div className="demo-form">
              <div className="row">
                <div className="field fld"><span className="lbl-fld">Name</span><span className="val">Lina Marchetti</span></div>
                <div className="field fld"><span className="lbl-fld">Role</span><span className="val">Graphic Design</span></div>
              </div>
              <div className="field fld foc"><span className="lbl-fld">Tagline</span><span className="val">Books, posters, type.</span></div>
              <div className="area">Project: Atelier 21 - Identity, 2025<br />Project: Forme & Volume - Editorial, 2024</div>
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
              <div className="url"><span className="ssl">...</span> https://lina.portfolio-cv.online</div>
              <div className="log">
                <div className="ln"><span className="p">$</span><span>portfolio-cv deploy</span></div>
                <div className="ln"><span></span><span>- building static bundle...</span></div>
                <div className="ln"><span></span><span>- pushing to edge...</span></div>
                <div className="ln done"><span>ok</span><span>live in 11s</span></div>
              </div>
              <span className="stamp">live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('')
}

function Students({ students }: { students: FeaturedStudent[] }) {
  // No published portfolios yet → hide the section entirely so the landing
  // page never shows fabricated "real students".
  if (students.length === 0) return null

  return (
    <section id="students">
      <div className="section-head">
        <div>
          <div className="kicker">live now - made by students like you</div>
          <h2>Real students. <em>Real subdomains.</em></h2>
        </div>
        <div className="meta"><span>click any to visit</span><span>open in new tab</span></div>
      </div>
      <div className="students">
        {students.map((student) => {
          const Thumb = (student.templateSlug && THUMB_MAP[student.templateSlug]) || TEMPLATE_THUMBS[0].Thumb
          const role = student.university ?? student.facultyGroup ?? 'Student'
          return (
            <div className="student-card" key={student.subdomain}>
              <div className="browser">
                <div className="dots"><i></i><i></i><i></i></div>
                <div className="url">{student.url}</div>
                <span style={{ width: 18 }} />
              </div>
              <div className="preview"><Thumb /></div>
              <div className="meta-stu">
                <div className="avatar">{initials(student.name)}</div>
                <div className="who"><b>{student.name}</b><small>{role}</small></div>
                <a className="visit" href={`https://${student.url}`} target="_blank" rel="noopener noreferrer">visit</a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

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
          <p>Every student gets a free <b>name.portfolio-cv.online</b> subdomain. SSL included. Custom domain support planned.</p>
          <div className="feat-visual">
            <span className="url-pill"><i className="dot"></i>https://lina.portfolio-cv.online</span>
            <span className="url-pill" style={{ marginLeft: 8 }}><i className="dot"></i>https://jordan.portfolio-cv.online</span>
          </div>
        </div>

        <div className="feature w3">
          <div className="lbl">PDF Export</div>
          <h4>Europass-standard CV PDF.</h4>
          <p>Export a clean CV built around a Europass-standard structure.</p>
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
          <p>Your data is not sold, shared, or used to train models.</p>
          <div className="feat-visual"><span className="lock" style={{ background: 'rgba(255,255,255,.18)', borderColor: 'rgba(255,255,255,.25)', color: 'white' }}>Privacy-first</span></div>
        </div>

        <div className="feature w6">
          <div className="lbl">Built-in animations</div>
          <h4>Templates that move.</h4>
          <p>Every template ships with thoughtful animations: type-on heroes, marquees, scroll reveals, hover micro-interactions.</p>
          <div className="feat-visual"><div className="marquee-tiny"><div><span>* MARQUEE</span><span>- SCROLL REVEAL</span><span>- TYPE-ON</span><span>- HOVER TILT</span><span>- HOLO SWEEP</span><span>* MARQUEE</span></div></div></div>
        </div>

        <div className="feature w3">
          <div className="lbl">Analytics</div>
          <h4>Who is reading.</h4>
          <p>Anonymous visit counts per page. Privacy-friendly. No cookies.</p>
        </div>

        <div className="feature w3">
          <div className="lbl">Updates</div>
          <h4>Change anything, anytime.</h4>
          <p>Edit a project, rebuild, and publish in seconds.</p>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: '60px 0', maxWidth: 'none', margin: 0 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div className="section-head">
          <div>
            <div className="kicker" style={{ opacity: 0.65 }}>pricing - short version</div>
            <h2>Free for students. <em>Forever.</em></h2>
          </div>
          <div className="meta"><span>verified with school email</span><span>everything included</span></div>
        </div>
      </div>

      <div className="pricing">
        <div>
          <div className="lbl">For students - forever</div>
          <h3><em>Free</em></h3>
          <p>Every student with a verified school email. No card. No expiry. No upsell. No hidden tiers.</p>
        </div>
        <div>
          <div className="lbl">Everything included</div>
          <ul>
            <li>All templates</li>
            <li>Free subdomain + SSL</li>
            <li>Custom domain support planned</li>
            <li>Europass-standard CV export</li>
            <li>Analytics</li>
            <li>Unlimited updates</li>
          </ul>
        </div>
        <div>
          <div className="lbl">Why free?</div>
          <p>Built by a student, for students. No investors, no monetisation, no catch.</p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const questions = [
    { q: 'Is it really free?', a: 'Yes. If you have a verified school email, every feature is free forever.' },
    { q: 'Do I need to know how to code?', a: 'No. Pick a template, fill in a form, and click Deploy.' },
    { q: 'Can I change templates later without losing my data?', a: 'Yes. Your content is stored separately from the template.' },
    { q: 'What about a real domain like lina.com?', a: 'Custom domain support is planned. Every student starts with a free portfolio-cv.online subdomain.' },
    { q: 'Will my site look the same on mobile?', a: 'Every template is built for desktop and mobile from day one.' },
    { q: 'Can I export a PDF CV?', a: 'Yes. One button creates a print-ready CV PDF using a Europass-standard structure.' },
    { q: 'What if I am not a student?', a: 'Right now the platform is focused on verified students.' },
    { q: 'Is my data sold or used to train AI?', a: 'No. Your portfolio data is not sold, shared, or used to train models.' },
  ]

  return (
    <section id="faq">
      <div className="section-head">
        <div>
          <div className="kicker">questions - honest answers</div>
          <h2>The fine print, <em>plainly.</em></h2>
        </div>
        <div className="meta"><span>still curious?</span><span>email hi@portfolio-cv.online</span></div>
      </div>
      <div className="faq">
        {questions.map((item, index) => (
          <details className="q" key={item.q} open={index === 0}>
            <summary>
              <span className="num">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.q}</span>
              <span className="ind">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FinalCTA({ loggedIn, studentCount }: { loggedIn: boolean; studentCount: number }) {
  return (
    <section className="final-cta" style={{ padding: '90px 32px', maxWidth: 'none', margin: 0 }}>
      <h2>Your work. <em>On a URL.</em><br />Today.</h2>
      <p>Stop emailing zip files. Pick a template, write your story, push to your subdomain.</p>
      <DeployWidget id="final-deploy" initial="me" loggedIn={loggedIn} />
      {studentCount > 0 && (
        <div className="small">{studentCount.toLocaleString()} students have already done it.</div>
      )}
    </section>
  )
}

export default async function HomePage() {
  const [loggedIn, data] = await Promise.all([isAuthenticated(), getLandingData()])

  return (
    <>
      <LandingStyles />
      <Hero loggedIn={loggedIn} templateCount={data.templateCount} />
      <CounterBand
        studentCount={data.studentCount}
        schoolCount={data.schoolCount}
        countryCount={data.countryCount}
        recentDeploys={data.recentDeploys}
      />
      <TemplatesSection featured={data.featuredTemplates} templateCount={data.templateCount} />
      <HowItWorks />
      <Students students={data.featuredStudents} />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA loggedIn={loggedIn} studentCount={data.studentCount} />
    </>
  )
}

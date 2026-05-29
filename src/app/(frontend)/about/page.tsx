import Link from 'next/link'

import styles from './page.module.css'

export const metadata = {
  title: 'About - portfolio-cv.online',
  description: 'Why portfolio-cv.online exists and how it helps students build free portfolio and CV pages.',
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero}>
        <div>
          <div className={styles.kicker}><i></i>About portfolio-cv.online</div>
          <h1>
            Every student deserves a serious <em>public profile</em>.
          </h1>
          <p>
            portfolio-cv.online is a free platform for students who need more than
            a PDF CV. It gives them a portfolio, a CV, and a shareable subdomain
            they can send to employers, universities, mentors, and collaborators.
          </p>
        </div>
        <div className={styles.labCard} aria-hidden="true">
          <div className={styles.labTop}>
            <span></span><span></span><span></span>
            <b>student-profile.graph</b>
          </div>
          <div className={styles.orbit}>
            <i className={styles.nodeA}>CV</i>
            <i className={styles.nodeB}>URL</i>
            <i className={styles.nodeC}>PDF</i>
            <i className={styles.nodeD}>CMS</i>
            <strong>portfolio-cv</strong>
          </div>
          <div className={styles.labLog}>
            <span>domain verified</span>
            <span>template selected</span>
            <span>portfolio published</span>
          </div>
        </div>
      </section>

      <section className={styles.statement}>
        <div>
          <span className={styles.number}>01</span>
          <h2>Built for students first.</h2>
        </div>
        <p>
          The platform is designed around verified university access. Students
          create an account, choose a template for their faculty group, fill in
          their details, and publish a portfolio on their own
          <b> name.portfolio-cv.online</b> subdomain.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <span>Free</span>
          <h3>No paywall for opportunity.</h3>
          <p>
            Students should not need hosting, code, or subscription tools just
            to present their work professionally.
          </p>
        </article>
        <article className={styles.card}>
          <span>Verified</span>
          <h3>University domains matter.</h3>
          <p>
            Admins can approve university email domains, so access can stay
            focused on accredited student communities.
          </p>
        </article>
        <article className={styles.card}>
          <span>Flexible</span>
          <h3>Not every faculty needs the same CV.</h3>
          <p>
            A computer science portfolio, a medical profile, and a law CV need
            different structures. The platform is planned around those groups.
          </p>
        </article>
      </section>

      <section className={styles.featureMatrix}>
        <div className={styles.sectionHeadLight}>
          <div className={styles.kicker}>What it includes</div>
          <h2>Not a CV generator. A student presence system.</h2>
        </div>
        <div className={styles.matrix}>
          <div>
            <span>01</span>
            <b>Portfolio builder</b>
            <p>Projects, case studies, media, links, awards, publications, fieldwork, and faculty-specific sections.</p>
          </div>
          <div>
            <span>02</span>
            <b>CV export</b>
            <p>Clean PDF export based on a Europass-standard CV structure.</p>
          </div>
          <div>
            <span>03</span>
            <b>Student subdomain</b>
            <p>Each student can publish on a memorable URL like name.portfolio-cv.online.</p>
          </div>
          <div>
            <span>04</span>
            <b>Admin-controlled access</b>
            <p>University domains can be approved in the admin panel so signup stays student-focused.</p>
          </div>
          <div>
            <span>05</span>
            <b>Template groups</b>
            <p>Tech, business, law, medicine, creative, education, sports, and agriculture can each have different layouts.</p>
          </div>
          <div>
            <span>06</span>
            <b>CMS foundation</b>
            <p>Payload CMS handles users, templates, portfolios, universities, media, and admin workflows.</p>
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className={styles.sectionHead}>
          <div className={styles.kicker}>Principles</div>
          <h2>Simple rules for a student platform.</h2>
        </div>
        <div className={styles.list}>
          <div>
            <b>Useful before beautiful.</b>
            <span>The page must help a student get understood quickly.</span>
          </div>
          <div>
            <b>Portfolio plus CV.</b>
            <span>Projects, education, skills, experience, and PDF export belong together.</span>
          </div>
          <div>
            <b>Respect student data.</b>
            <span>No selling profile data, no fake scarcity, no dark patterns.</span>
          </div>
          <div>
            <b>Kosovo first, expandable later.</b>
            <span>The initial focus is Kosovo universities, with a structure that can grow.</span>
          </div>
        </div>
      </section>

      <section className={styles.roadmap}>
        <div className={styles.sectionHeadLight}>
          <div className={styles.kicker}>Roadmap</div>
          <h2>What comes next after the foundation.</h2>
        </div>
        <div className={styles.timeline}>
          <article>
            <span>Now</span>
            <h3>Real auth + CMS</h3>
            <p>Sign up, sign in, dashboard, Payload collections, verified university domains, and portfolio data.</p>
          </article>
          <article>
            <span>Next</span>
            <h3>Faculty-specific editors</h3>
            <p>Different input flows for CS, medicine, law, creative work, sports profiles, and social sciences.</p>
          </article>
          <article>
            <span>Later</span>
            <h3>Exports and integrations</h3>
            <p>PDF export, Europass-standard CV structure, Cloudinary media, analytics, and richer interactive template previews.</p>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to build your student profile?</h2>
        <p>Start with a subdomain, then shape the portfolio around your field.</p>
        <div>
          <Link href="/signup" className={styles.primary}>Start free {'->'}</Link>
          <Link href="/templates" className={styles.secondary}>View templates</Link>
        </div>
      </section>
    </main>
  )
}

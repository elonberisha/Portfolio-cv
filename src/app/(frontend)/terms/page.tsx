import Link from 'next/link'

import styles from './page.module.css'

export const metadata = {
  title: 'Terms of Use - portfolio-cv.online',
  description: 'Terms of Use for portfolio-cv.online, a free portfolio and Europass-standard CV platform for students.',
}

const sections = [
  {
    number: '01',
    title: 'What portfolio-cv.online is',
    body: 'portfolio-cv.online is a free platform that helps students create an online portfolio, a CV, and a shareable student profile. The platform is designed for verified students and university communities.',
  },
  {
    number: '02',
    title: 'Who can use the platform',
    body: 'You may use the platform if you are a student or a person with a legitimate student-related reason to create a portfolio. We may require university email verification or other checks before allowing full access.',
  },
  {
    number: '03',
    title: 'Your account',
    body: 'You are responsible for the information you provide, for keeping your login details secure, and for activity that happens through your account. One person should not create multiple accounts to bypass limits or verification.',
  },
  {
    number: '04',
    title: 'Your content stays yours',
    body: 'You own the content you add to your profile, including text, projects, images, links, education details, work experience, and CV information. By publishing content, you allow portfolio-cv.online to host, display, format, and deliver that content as part of the service.',
  },
  {
    number: '05',
    title: 'Content rules',
    body: 'Do not upload illegal, harmful, misleading, discriminatory, hateful, violent, or infringing content. Do not impersonate another person, publish private information without permission, or use the platform for spam, malware, phishing, or fraud.',
  },
  {
    number: '06',
    title: 'Europass-standard CV structure',
    body: 'The platform may provide CV export based on a Europass-standard structure. You are responsible for checking that the exported CV is accurate, complete, and suitable for your own application or submission.',
  },
  {
    number: '07',
    title: 'Free service',
    body: 'The platform is currently offered for free to students. We may change, limit, pause, or discontinue features if required for security, abuse prevention, maintenance, legal compliance, or sustainability of the project.',
  },
  {
    number: '08',
    title: 'Availability and data',
    body: 'We aim to keep the platform reliable, but the service is provided as is. We do not guarantee uninterrupted availability, permanent storage, perfect exports, employer results, admissions results, or that every feature will remain available forever.',
  },
  {
    number: '09',
    title: 'Suspension or removal',
    body: 'We may suspend accounts, remove content, disable public pages, or block access if we believe the account violates these terms, creates security risk, abuses the service, or causes harm to other users or the platform.',
  },
  {
    number: '10',
    title: 'Changes to these terms',
    body: 'We may update these terms as the platform develops. When the changes are important, we will try to notify users through the platform or by email. Continued use of the platform means you accept the updated terms.',
  },
  {
    number: '11',
    title: 'Applicable law',
    body: 'These terms are intended to be governed by the laws of the Republic of Kosovo, unless another mandatory law applies to you as a user.',
  },
  {
    number: '12',
    title: 'Contact',
    body: 'For questions about these terms, contact hi@portfolio-cv.online.',
  },
]

export default function TermsPage() {
  return (
    <main className={styles.termsPage}>
      <section className={styles.hero}>
        <div className={styles.kicker}><i></i>Terms of Use</div>
        <h1>
          Clear rules for a free student <em>portfolio platform</em>.
        </h1>
        <p>
          These terms explain how portfolio-cv.online may be used, what users
          are responsible for, and how published portfolio and CV content is
          handled.
        </p>
        <div className={styles.meta}>
          <span>Last updated: May 28, 2026</span>
          <span>Applies to public pages, accounts, dashboards, and CV exports</span>
        </div>
      </section>

      <section className={styles.notice}>
        <strong>Short version:</strong>
        <span>
          Use the platform honestly, publish only content you have the right to
          share, keep your account secure, and remember that the service is free
          and provided as is.
        </span>
      </section>

      <section className={styles.sections}>
        {sections.map((section) => (
          <article key={section.number} className={styles.section}>
            <span>{section.number}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.cta}>
        <h2>Questions before creating an account?</h2>
        <p>Read the privacy page next, or contact the project directly.</p>
        <div>
          <Link href="/privacy" className={styles.secondary}>Privacy Policy</Link>
          <a href="mailto:hi@portfolio-cv.online" className={styles.primary}>Contact</a>
        </div>
      </section>
    </main>
  )
}

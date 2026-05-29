import Link from 'next/link'

import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy - portfolio-cv.online',
  description: 'Privacy Policy for portfolio-cv.online, a free student portfolio and Europass-standard CV platform.',
}

const sections = [
  {
    number: '01',
    title: 'Who we are',
    body: 'portfolio-cv.online is a free student portfolio and CV platform built from Kosovo. For privacy questions, contact hi@portfolio-cv.online.',
  },
  {
    number: '02',
    title: 'Information you provide',
    body: 'When you create an account, we may collect your name, email address, password, university details, faculty group, subdomain, profile image, portfolio content, CV information, projects, education, work experience, skills, links, certificates, and other details you choose to add.',
  },
  {
    number: '03',
    title: 'Account security',
    body: 'Passwords are handled by the authentication system and should be stored as secure hashes, not plain text. If two-factor authentication is enabled, related security settings may also be stored.',
  },
  {
    number: '04',
    title: 'Why we use your information',
    body: 'We use your information to create your account, verify student access, provide the dashboard, generate portfolio pages, prepare CV exports, manage templates, support admin workflows, prevent abuse, and keep the platform secure.',
  },
  {
    number: '05',
    title: 'Published portfolio content',
    body: 'If you publish your portfolio, the information you choose to make public may be visible to anyone with the link or subdomain. You control what you add to your profile and portfolio.',
  },
  {
    number: '06',
    title: 'University verification',
    body: 'The platform may use approved university email domains or institution records to decide whether an account can be created or verified. University request data may be reviewed by administrators.',
  },
  {
    number: '07',
    title: 'Service providers',
    body: 'The platform may use hosting, database, media storage, email, analytics, or infrastructure providers to operate the service. These providers process information only as needed to run the platform.',
  },
  {
    number: '08',
    title: 'Cookies and sessions',
    body: 'Login sessions may use strictly necessary cookies so users can stay signed in. If privacy-friendly analytics or other optional tools are added later, the policy should be updated before they are used.',
  },
  {
    number: '09',
    title: 'How long we keep data',
    body: 'Account and portfolio data is kept while your account exists. University verification requests and admin records may be kept as needed for review, security, abuse prevention, and platform administration.',
  },
  {
    number: '10',
    title: 'Your choices',
    body: 'You can update your profile information from your account when editing tools are available. You may request account deletion, correction, or export by contacting hi@portfolio-cv.online.',
  },
  {
    number: '11',
    title: 'Children',
    body: 'The platform is intended for students and is not intended for children under 16. If we learn that we collected data from a child under 16, we will take steps to remove it.',
  },
  {
    number: '12',
    title: 'Changes',
    body: 'This policy may be updated as the platform changes. When updates are important, we will try to notify users through the platform or by email.',
  },
]

export default function PrivacyPage() {
  return (
    <main className={styles.privacyPage}>
      <section className={styles.hero}>
        <div className={styles.kicker}><i></i>Privacy Policy</div>
        <h1>
          Student data should be handled with <em>care</em>.
        </h1>
        <p>
          This policy explains what portfolio-cv.online collects, why it is
          needed, how published portfolio content works, and how students can
          ask for changes or deletion.
        </p>
        <div className={styles.meta}>
          <span>Last updated: May 29, 2026</span>
          <span>Contact: hi@portfolio-cv.online</span>
        </div>
      </section>

      <section className={styles.notice}>
        <strong>Short version:</strong>
        <span>
          We collect the information needed to run student accounts, portfolios,
          CV exports, verification, and admin workflows. Your portfolio content
          is public only when you publish it.
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
        <h2>Want the legal rules too?</h2>
        <p>The Terms of Use explain acceptable use, ownership, and account rules.</p>
        <div>
          <Link href="/terms" className={styles.primary}>Read Terms</Link>
          <a href="mailto:hi@portfolio-cv.online" className={styles.secondary}>Contact</a>
        </div>
      </section>
    </main>
  )
}

import { redirect } from 'next/navigation'
import Link from 'next/link'

import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser } from '@/lib/auth'

import styles from './page.module.css'

const facultyGroups = [
  'Tech & Engineering',
  'Business & Management',
  'Law & Politics',
  'Medical & Healthcare',
  'Creative & Media',
  'Education & Social Sciences',
  'Sports',
  'Agriculture & Environment',
]

const setupSteps = [
  {
    number: '01',
    title: 'Confirm your student identity',
    text: 'Your account is active. University domain verification and faculty matching will decide which portfolio sections fit you best.',
    status: 'Active',
  },
  {
    number: '02',
    title: 'Choose your faculty group',
    text: 'The CMS will use this to show the right portfolio fields: projects for tech, rotations for medical, publications for law, and more.',
    status: 'Next',
  },
  {
    number: '03',
    title: 'Pick a template',
    text: 'Start from a template that fits your field, then reuse the same profile data for portfolio pages and Europass-standard CV export.',
    status: 'Ready',
  },
  {
    number: '04',
    title: 'Publish your subdomain',
    text: 'When the builder is connected, your public page will be published on your portfolio-cv.online subdomain.',
    status: 'Planned',
  },
]

type DashboardProps = {
  searchParams?: Promise<{
    subdomain?: string
  }>
}

function cleanSubdomain(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24)
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  const params = searchParams ? await searchParams : {}
  const requestedSubdomain = cleanSubdomain(params.subdomain)
  const subdomain = user.subdomain || requestedSubdomain || 'your-name'
  const displayName = user.firstName || 'student'
  const fullName = user.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user.email

  return (
    <main className={styles.dashboard}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Student workspace</p>
          <h1>
            Build your portfolio, then export your <em>Europass-standard CV</em>.
          </h1>
          <p className={styles.lede}>
            Hi {displayName}. This is the setup room for your public student
            profile. Start with the essentials: identity, faculty group,
            template, and subdomain.
          </p>
        </div>

        <aside className={styles.profileCard}>
          <div className={styles.profileTop}>
            <span>{fullName.slice(0, 2).toUpperCase()}</span>
            <LogoutButton />
          </div>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Subdomain</dt>
              <dd>{subdomain}.portfolio-cv.online</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Account active</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className={styles.progress}>
        <div className={styles.progressHead}>
          <span>Setup progress</span>
          <b>1 / 4 ready</b>
        </div>
        <div className={styles.progressTrack}>
          <i />
        </div>
      </section>

      <section className={styles.setupGrid}>
        {setupSteps.map((step) => (
          <article key={step.number} className={styles.stepCard}>
            <div className={styles.stepMeta}>
              <span>{step.number}</span>
              <b>{step.status}</b>
            </div>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.builder}>
        <div className={styles.builderCopy}>
          <p className={styles.kicker}>What appears after signup</p>
          <h2>Your portfolio starts as structured student data.</h2>
          <p>
            The dashboard should not ask every student the same questions. The
            next version of the builder will change the CMS fields based on the
            selected faculty group.
          </p>
          <div className={styles.actions}>
            <Link href="/templates" className={styles.primary}>
              Choose template {'->'}
            </Link>
            <Link href="/admin" className={styles.secondary}>
              Open CMS
            </Link>
          </div>
        </div>

        <div className={styles.fieldPanel}>
          <div className={styles.panelTop}>
            <span>Portfolio setup</span>
            <b>{subdomain}</b>
          </div>
          <div className={styles.fakeField}>
            <label>Public URL</label>
            <span>{subdomain}.portfolio-cv.online</span>
          </div>
          <div className={styles.groupList}>
            {facultyGroups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
          <div className={styles.note}>
            Builder form fields will be connected to Payload CMS collections.
          </div>
        </div>
      </section>
    </main>
  )
}

import { redirect } from 'next/navigation'
import Link from 'next/link'

import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser } from '@/lib/auth'
import { getMyPortfolio } from '@/lib/portfolio'

import styles from './page.module.css'

const FACULTY_LABELS: Record<string, string> = {
  tech: 'Tech & Engineering',
  business: 'Business & Management',
  law: 'Law & Politics',
  medical: 'Medical & Healthcare',
  creative: 'Creative & Media',
  education: 'Education & Social Sciences',
  sports: 'Sports',
  agriculture: 'Agriculture & Environment',
}

type DashboardProps = {
  searchParams?: Promise<{ subdomain?: string }>
}

function cleanSubdomain(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24)
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const params = searchParams ? await searchParams : {}
  const requestedSubdomain = cleanSubdomain(params.subdomain)
  const subdomain = user.subdomain || requestedSubdomain || 'your-name'
  const displayName = user.firstName || 'student'
  const fullName = user.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user.email

  const portfolio = await getMyPortfolio(user.id)

  // Resolve real completion state for each setup step.
  const template = portfolio?.template
  const templateName = template && typeof template === 'object' ? (template as any).name : null
  const hasFaculty = Boolean(user.facultyGroup)
  const hasTemplate = Boolean(template)
  const hasDetails = Boolean(
    portfolio &&
      (portfolio.bio ||
        portfolio.headline ||
        (portfolio.education && portfolio.education.length) ||
        (portfolio.projects && portfolio.projects.length) ||
        (portfolio.skills && portfolio.skills.length)),
  )
  const isPublished = Boolean(portfolio?.published)

  const steps = [
    {
      number: '01',
      title: 'Choose your faculty group',
      text: 'This decides which portfolio sections fit your field — projects for tech, rotations for medical, and more.',
      done: hasFaculty,
      value: hasFaculty ? FACULTY_LABELS[user.facultyGroup] : null,
      href: '/dashboard/edit',
      cta: 'Set field',
    },
    {
      number: '02',
      title: 'Pick a template',
      text: 'Start from a design that fits your field. You can switch templates anytime without losing your data.',
      done: hasTemplate,
      value: templateName,
      href: '/templates',
      cta: hasTemplate ? 'Change template' : 'Browse templates',
    },
    {
      number: '03',
      title: 'Fill in your details',
      text: 'Add your bio, education, links, skills, and projects. This is the content that fills your template.',
      done: hasDetails,
      value: hasDetails ? 'Details added' : null,
      href: '/dashboard/edit',
      cta: hasDetails ? 'Edit details' : 'Add details',
    },
    {
      number: '04',
      title: 'Publish your subdomain',
      text: 'Push your page live at your portfolio-cv.online subdomain. Publishing tools arrive with the public builder.',
      done: isPublished,
      value: isPublished ? 'Live' : null,
      href: null,
      cta: 'Coming soon',
    },
  ]

  const completed = steps.filter((s) => s.done).length
  const pct = Math.round((completed / steps.length) * 100)

  return (
    <main className={styles.dashboard}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Student workspace</p>
          <h1>
            Build your portfolio, then export your <em>Europass-standard CV</em>.
          </h1>
          <p className={styles.lede}>
            Hi {displayName}. Work through the steps below to set up your public
            student profile: faculty group, template, and your details.
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
              <dt>Faculty</dt>
              <dd>{hasFaculty ? FACULTY_LABELS[user.facultyGroup] : 'Not set'}</dd>
            </div>
            <div>
              <dt>Template</dt>
              <dd>{templateName || 'Not chosen'}</dd>
            </div>
          </dl>
          {user.role === 'admin' && (
            <Link href="/admin" className={styles.adminLink}>
              Open admin CMS {'->'}
            </Link>
          )}
        </aside>
      </section>

      <section className={styles.progress}>
        <div className={styles.progressHead}>
          <span>Setup progress</span>
          <b>
            {completed} / {steps.length} done · {pct}%
          </b>
        </div>
        <div className={styles.progressTrack}>
          <i style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className={styles.setupGrid}>
        {steps.map((step) => (
          <article key={step.number} className={`${styles.stepCard} ${step.done ? styles.stepDone : ''}`}>
            <div className={styles.stepMeta}>
              <span>{step.number}</span>
              <b>{step.done ? '✓ Done' : 'To do'}</b>
            </div>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
            {step.value && <div className={styles.stepValue}>{step.value}</div>}
            {step.href ? (
              <Link href={step.href} className={styles.stepCta}>
                {step.cta} {'->'}
              </Link>
            ) : (
              <span className={styles.stepCtaMuted}>{step.cta}</span>
            )}
          </article>
        ))}
      </section>

      <section className={styles.cta}>
        <div>
          <p className={styles.kicker}>Next step</p>
          <h2>
            {hasTemplate ? 'Keep filling in your portfolio details.' : 'Pick a template to get started.'}
          </h2>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/templates" className={styles.primary}>
            {hasTemplate ? 'Change template' : 'Choose template'} {'->'}
          </Link>
          <Link href="/dashboard/edit" className={styles.secondary}>
            Edit details
          </Link>
        </div>
      </section>
    </main>
  )
}

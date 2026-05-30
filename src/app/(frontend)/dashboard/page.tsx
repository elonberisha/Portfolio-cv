import { redirect } from 'next/navigation'
import Link from 'next/link'

import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser } from '@/lib/auth'
import { getMyCV, getMyPortfolio } from '@/lib/portfolio'

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

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const [portfolio, cv] = await Promise.all([getMyPortfolio(user.id), getMyCV(user.id)])

  // No template picked yet → resume onboarding.
  if (!portfolio || !portfolio.template) redirect('/templates?onboarding=1')

  const template = portfolio.template
  const templateName = template && typeof template === 'object' ? (template as any).name : null
  const templateSlug = template && typeof template === 'object' ? (template as any).slug : null
  const subdomain = user.subdomain || 'your-name'
  const fullName = user.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user.email

  const cvSource = (cv?.source as 'builder' | 'upload') || null
  const cvFileUrl = cv?.file && typeof cv.file === 'object' ? (cv.file as any).url : null
  const isPublished = Boolean(portfolio.published)

  return (
    <main className={styles.dashboard}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Student workspace</p>
          <h1>
            Your portfolio &amp; <em>Europass CV</em>.
          </h1>
          <p className={styles.lede}>
            Welcome back, {user.firstName || 'student'}. Manage your live page and your CV
            from here.
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
              <dd>{user.facultyGroup ? FACULTY_LABELS[user.facultyGroup] : 'Not set'}</dd>
            </div>
          </dl>
          {user.role === 'admin' && (
            <Link href="/admin" className={styles.adminLink}>
              Open admin CMS {'->'}
            </Link>
          )}
        </aside>
      </section>

      <section className={styles.columns}>
        {/* Portfolio column */}
        <article className={styles.col}>
          <div className={styles.colHead}>
            <span className={styles.num}>Portfolio</span>
            <b className={isPublished ? styles.live : styles.draft}>
              {isPublished ? '● Live' : '○ Draft'}
            </b>
          </div>
          <div className={styles.thumb}>
            {templateSlug ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/template-thumbs/${templateSlug}.webp`} alt={`${templateName} preview`} />
            ) : (
              <div className={styles.thumbEmpty}>No template</div>
            )}
          </div>
          <div className={styles.colBody}>
            <h2>{templateName || 'Your template'}</h2>
            <p>Edit your page in the studio — text, cards, images, layout.</p>
            <div className={styles.colActions}>
              <Link href="/dashboard/studio" className={styles.primary}>
                Edit in studio {'->'}
              </Link>
              <Link href="/templates" className={styles.secondary}>
                Change template
              </Link>
            </div>
          </div>
        </article>

        {/* CV column */}
        <article className={styles.col}>
          <div className={styles.colHead}>
            <span className={styles.num}>CV</span>
            <b className={cvSource ? styles.live : styles.draft}>
              {cvSource === 'builder' ? '● Europass' : cvSource === 'upload' ? '● Uploaded' : '○ None'}
            </b>
          </div>
          <div className={styles.cvBox}>
            {cvSource === 'upload' ? (
              <p>You uploaded a PDF CV. Uploaded CVs can be replaced or deleted.</p>
            ) : cvSource === 'builder' ? (
              <p>You built a Europass CV. Edit it anytime.</p>
            ) : (
              <p>No CV yet. Build a Europass CV or upload a PDF.</p>
            )}
          </div>
          <div className={styles.colBody}>
            <div className={styles.colActions}>
              {cvSource === 'upload' ? (
                <>
                  {cvFileUrl && (
                    <a href={cvFileUrl} target="_blank" rel="noreferrer" className={styles.primary}>
                      View PDF {'->'}
                    </a>
                  )}
                  <Link href="/dashboard/cv" className={styles.secondary}>
                    Replace / delete
                  </Link>
                </>
              ) : cvSource === 'builder' ? (
                <Link href="/dashboard/cv" className={styles.primary}>
                  Edit CV {'->'}
                </Link>
              ) : (
                <Link href="/dashboard/cv" className={styles.primary}>
                  Create CV {'->'}
                </Link>
              )}
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import styles from './Navbar.module.css'

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          portfolio-cv<span className={styles.logoMark}>.online</span>
          <span className={styles.tagline}>free for every student - forever</span>
        </Link>

        <div className={styles.centerLinks}>
          <Link href="/templates" className={styles.link}>
            Templates
          </Link>
          <Link href="/#how" className={styles.link}>
            How it works
          </Link>
          <Link href="/#students" className={styles.link}>
            Examples
          </Link>
          <Link href="/#pricing" className={styles.link}>
            Pricing
          </Link>
          <Link href="/#faq" className={styles.link}>
            FAQ
          </Link>
        </div>

        <div className={styles.links}>
          {user ? (
            <Link href="/dashboard" className={styles.dashboardBtn}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className={styles.signInLink}>
                Sign in
              </Link>
              <Link href="/signup" className={styles.signupBtn}>
                Start free {'->'}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

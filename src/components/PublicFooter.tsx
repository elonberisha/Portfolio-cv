'use client'

import { usePathname } from 'next/navigation'

import styles from './PublicFooter.module.css'

export default function PublicFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        portfolio-cv<i>.online</i>
        <small>
          Free portfolio and CV pages for students, with verified university
          access, subdomains, templates, and Europass-standard CV export.
        </small>
      </div>

      <div>
        <h5>Product</h5>
        <ul>
          <li><a href="/templates">Templates</a></li>
          <li><a href="/#how">How it works</a></li>
          <li><a href="/#students">Examples</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/#features">Features</a></li>
        </ul>
      </div>

      <div>
        <h5>Resources</h5>
        <ul>
          <li><a href="/#faq">CV writing guide</a></li>
          <li><a href="/#faq">Portfolio guide</a></li>
          <li><a href="/#faq">Student blog</a></li>
          <li><a href="/#faq">Changelog</a></li>
          <li><a href="/#faq">Roadmap</a></li>
        </ul>
      </div>

      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="mailto:hi@portfolio-cv.online">hi@portfolio-cv.online</a></li>
        </ul>
      </div>

      <div className={styles.bottom}>
        <span>2026 portfolio-cv.online. Free for verified students.</span>
        <span>25 templates - 8 faculty groups - Kosovo first</span>
      </div>
    </footer>
  )
}

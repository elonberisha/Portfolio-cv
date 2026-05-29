'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../auth.module.css'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important: includes cookies in response
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.errors?.[0]?.message || 'Invalid email or password')
        setLoading(false)
        return
      }

      // JWT cookie is automatically set by Payload via Set-Cookie header
      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh() // Refresh server components to pick up new auth state
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <span className={styles.authMark}>portfolio-cv.online</span>
        <h1 className={styles.authTitle}>Sign in</h1>
        <p className={styles.authSubtitle}>
          Welcome back. Enter your credentials below.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@university.edu"
              required
              className={styles.input}
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className={styles.input}
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footer}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className={styles.footerLink}>
            Sign up free
          </Link>
        </p>
      </div>
    </main>
  )
}

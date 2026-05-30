'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../auth.module.css'

function cleanSubdomain(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24)
}

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedSubdomain = cleanSubdomain(searchParams.get('subdomain') || '')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    subdomain: requestedSubdomain,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function updateSubdomain(value: string) {
    updateField('subdomain', cleanSubdomain(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      // Create user via Payload REST API
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          subdomain: formData.subdomain || undefined,
          role: 'student',
          agreedToTerms: true,
        }),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(
          data.errors?.[0]?.message ||
            'Failed to create account. Please try again.',
        )
        setLoading(false)
        return
      }

      // Auto-login after signup
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      })

      if (loginRes.ok) {
        router.push('/templates?onboarding=1')
        router.refresh()
      } else {
        // Account created but auto-login failed, redirect to signin
        router.push('/signin')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <span className={styles.authMark}>portfolio-cv.online</span>
        <h1 className={styles.authTitle}>Create your account</h1>
        <p className={styles.authSubtitle}>
          Free forever. No credit card needed.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <label className={styles.label}>
              <span>First name</span>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Elon"
                required
                className={styles.input}
                autoComplete="given-name"
              />
            </label>
            <label className={styles.label}>
              <span>Last name</span>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Berisha"
                required
                className={styles.input}
                autoComplete="family-name"
              />
            </label>
          </div>

          <label className={styles.label}>
            <span>University email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="your.name@university.edu"
              required
              className={styles.input}
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            <span>Portfolio URL</span>
            <div className={styles.subdomainField}>
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => updateSubdomain(e.target.value)}
                placeholder="your-name"
                required
                className={styles.input}
                autoComplete="off"
              />
              <span>.portfolio-cv.online</span>
            </div>
          </label>

          <label className={styles.label}>
            <span>Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className={styles.input}
              autoComplete="new-password"
            />
          </label>

          <label className={styles.label}>
            <span>Confirm password</span>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="Repeat your password"
              required
              className={styles.input}
              autoComplete="new-password"
            />
          </label>

          <p className={styles.terms}>
            By signing up, you agree to our{' '}
            <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Creating account...' : 'Sign up free'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link href="/signin" className={styles.footerLink}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

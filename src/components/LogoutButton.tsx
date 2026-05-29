'use client'

import { useRouter } from 'next/navigation'
import styles from '@/app/(frontend)/dashboard/page.module.css'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
      Sign out
    </button>
  )
}

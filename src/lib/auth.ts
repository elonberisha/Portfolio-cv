import { cookies } from 'next/headers'

/**
 * Get the current user from Payload's JWT cookie (server-side only).
 * Returns the user object if authenticated, null otherwise.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) return null

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/users/me`,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
        cache: 'no-store',
      },
    )

    if (!res.ok) return null

    const data = await res.json()
    return data.user || null
  } catch {
    return null
  }
}

/**
 * Check if a user is authenticated (server-side).
 * Lighter than getCurrentUser — only checks cookie existence.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get('payload-token')?.value
}

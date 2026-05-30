'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides marketing chrome (navbar/footer) on app surfaces like the dashboard,
 * studio CMS and CV builder, where the full-bleed app UI owns the viewport.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/dashboard')) return null
  return <>{children}</>
}

/* Frontend route group layout — html/body provided by root layout.tsx */
import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar'
import PublicFooter from '@/components/PublicFooter'
import ChromeGate from '@/components/ChromeGate'

export const metadata: Metadata = {
  title: 'portfolio-cv.online — Free portfolio for every student',
  description: 'Free portfolio & CV platform for university students. Built by a student, for students.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ChromeGate>
        <Navbar />
      </ChromeGate>
      {children}
      <ChromeGate>
        <PublicFooter />
      </ChromeGate>
    </>
  )
}

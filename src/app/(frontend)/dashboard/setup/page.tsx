import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyPortfolio } from '@/lib/portfolio'

import SetupClient from './SetupClient'

export default async function SetupPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const portfolio = await getMyPortfolio(user.id)
  if (!portfolio || !portfolio.template) redirect('/templates?onboarding=1')

  // If the student already has bio content they've been through setup — skip it.
  if (portfolio.bio) redirect('/dashboard/studio')

  const u = user as any
  return (
    <SetupClient
      initial={{
        firstName:  u.firstName  ?? '',
        lastName:   u.lastName   ?? '',
        email:      u.email      ?? '',
        headline:   portfolio.headline ?? '',
        bio:        portfolio.bio     ?? '',
        phone:      portfolio.phone   ?? '',
        location:   portfolio.location ?? '',
        website:    portfolio.website  ?? '',
        experience: (portfolio.experience as any[]) ?? [],
        education:  (portfolio.education  as any[]) ?? [],
        projects:   (portfolio.projects   as any[]) ?? [],
        publications:   (portfolio.publications    as any[]) ?? [],
        research:       (portfolio.research        as any[]) ?? [],
        portfolioItems: (portfolio.portfolioItems  as any[]) ?? [],
        caseStudies:    (portfolio.caseStudies     as any[]) ?? [],
        competitions:   (portfolio.competitions    as any[]) ?? [],
        teaching:       (portfolio.teaching        as any[]) ?? [],
        fieldwork:      (portfolio.fieldwork       as any[]) ?? [],
        skills:     (portfolio.skills     as any[]) ?? [],
        links:      (portfolio.links      as any[]) ?? [],
        languages:  (portfolio.languages  as any[]) ?? [],
      }}
      facultyGroup={u.facultyGroup ?? 'tech'}
    />
  )
}

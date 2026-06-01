import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyPortfolio } from '@/lib/portfolio'

import StudioClient from './StudioClient'
import type { SidebarInitial } from './StudioSidebar'

export default async function StudioPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const portfolio = await getMyPortfolio(user.id)
  // No template chosen yet — send them to pick one first.
  if (!portfolio || !portfolio.template) redirect('/templates?onboarding=1')

  const template = portfolio.template
  const templateName = template && typeof template === 'object' ? (template as any).name : null
  const templateSlug = template && typeof template === 'object' ? (template as any).slug : null

  const details: SidebarInitial = {
    published: Boolean(portfolio.published),
  }

  const subdomain = (user as any).subdomain ?? null
  const u = user as any

  const portfolioData = {
    firstName:  u.firstName  ?? '',
    lastName:   u.lastName   ?? '',
    email:      u.email      ?? '',
    headline:   portfolio.headline   ?? '',
    bio:        portfolio.bio        ?? '',
    phone:      (portfolio as any).phone    ?? '',
    location:   (portfolio as any).location ?? '',
    website:    (portfolio as any).website  ?? '',
    experience: (portfolio.experience as any[]) ?? [],
    education:  (portfolio.education  as any[]) ?? [],
    skills:     (portfolio.skills     as any[]) ?? [],
  }

  return (
    <StudioClient
      initialHtml={portfolio.pageHtml || ''}
      templateName={templateName}
      templateSlug={templateSlug}
      details={details}
      subdomain={subdomain}
      portfolioData={portfolioData}
      portfolioId={String(portfolio.id)}
    />
  )
}

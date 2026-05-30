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

  const details: SidebarInitial = {
    facultyGroup: user.facultyGroup || '',
    headline: portfolio.headline || '',
    bio: portfolio.bio || '',
    skills: (portfolio.skills || []).map((s: any) => s.name).filter(Boolean).join(', '),
    links: (portfolio.links || []).map((l: any) => ({ platform: l.platform || 'other', url: l.url || '' })),
    education: (portfolio.education || []).map((e: any) => ({
      degree: e.degree || '',
      institution: e.institution || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
    })),
    projects: (portfolio.projects || []).map((p: any) => ({
      title: p.title || '',
      description: p.description || '',
      liveUrl: p.liveUrl || '',
    })),
    published: Boolean(portfolio.published),
  }

  return (
    <StudioClient
      initialHtml={portfolio.pageHtml || ''}
      templateName={templateName}
      details={details}
    />
  )
}

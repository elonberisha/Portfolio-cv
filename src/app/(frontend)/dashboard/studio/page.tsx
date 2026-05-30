import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyPortfolio } from '@/lib/portfolio'

import StudioClient from './StudioClient'

export default async function StudioPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const portfolio = await getMyPortfolio(user.id)
  // No template chosen yet — send them to pick one first.
  if (!portfolio || !portfolio.template) redirect('/templates?onboarding=1')

  const template = portfolio.template
  const templateName = template && typeof template === 'object' ? (template as any).name : null

  return (
    <StudioClient
      initialHtml={portfolio.pageHtml || ''}
      templateName={templateName}
    />
  )
}

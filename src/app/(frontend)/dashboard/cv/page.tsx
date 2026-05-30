import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyCV, getMyPortfolio } from '@/lib/portfolio'
import { portfolioToCvData } from '@/lib/profileSync'

import CVClient, { type CVInitial } from './CVClient'

export default async function CVPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const [cv, portfolio] = await Promise.all([getMyCV(user.id), getMyPortfolio(user.id)])

  // Prefill the builder from the user + portfolio when there's no CV yet, so
  // the two surfaces stay symmetric (the reverse of the CV → portfolio sync).
  const prefill = portfolioToCvData(portfolio, user)

  const initial: CVInitial = {
    source: (cv?.source as 'builder' | 'upload') || null,
    data: (cv?.data as any) || prefill,
    fileUrl: cv?.file && typeof cv.file === 'object' ? (cv.file as any).url : null,
  }

  return <CVClient initial={initial} />
}

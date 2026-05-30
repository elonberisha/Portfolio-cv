import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyCV, getMyPortfolio } from '@/lib/portfolio'

import CVClient, { type CVInitial } from './CVClient'

export default async function CVPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const [cv, portfolio] = await Promise.all([getMyCV(user.id), getMyPortfolio(user.id)])

  // Prefill the builder from the user + portfolio when there's no CV yet.
  const prefill = {
    personalInfo: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      headline: portfolio?.headline || '',
      email: user.email || '',
      about: portfolio?.bio || '',
    },
    education: (portfolio?.education || []).map((e: any) => ({
      qualification: e.degree || '',
      institution: e.institution || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
    })),
  }

  const initial: CVInitial = {
    source: (cv?.source as 'builder' | 'upload') || null,
    data: (cv?.data as any) || prefill,
    fileUrl: cv?.file && typeof cv.file === 'object' ? (cv.file as any).url : null,
  }

  return <CVClient initial={initial} />
}

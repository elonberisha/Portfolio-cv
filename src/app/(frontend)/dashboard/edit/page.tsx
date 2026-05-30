import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { getMyPortfolio } from '@/lib/portfolio'

import PortfolioEditor, { type EditorInitial } from './PortfolioEditor'
import styles from './editor.module.css'

export default async function EditPortfolioPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const portfolio = await getMyPortfolio(user.id)

  const initial: EditorInitial = {
    facultyGroup: user.facultyGroup || '',
    headline: portfolio?.headline || '',
    bio: portfolio?.bio || '',
    links: (portfolio?.links || []).map((l: any) => ({ platform: l.platform || 'other', url: l.url || '' })),
    education: (portfolio?.education || []).map((e: any) => ({
      degree: e.degree || '',
      institution: e.institution || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
    })),
    skills: (portfolio?.skills || []).map((s: any) => s.name).filter(Boolean).join(', '),
    projects: (portfolio?.projects || []).map((p: any) => ({
      title: p.title || '',
      description: p.description || '',
      liveUrl: p.liveUrl || '',
    })),
  }

  return (
    <main className={styles.page}>
      <PortfolioEditor initial={initial} />
    </main>
  )
}

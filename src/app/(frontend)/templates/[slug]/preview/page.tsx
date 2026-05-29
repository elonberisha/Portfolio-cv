import { notFound } from 'next/navigation'
import { getTemplateBySlug } from '@/lib/templateCatalog'
import PreviewClient from './PreviewClient'

type PreviewPageProps = {
  params: Promise<{ slug: string }>
}

// Hide the global Navbar/Footer for this route — it's a fullscreen experience
export const dynamic = 'force-dynamic'

export default async function TemplatePreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  return (
    <PreviewClient
      slug={slug}
      templateName={template.name}
    />
  )
}

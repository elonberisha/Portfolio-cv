import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { aiEnabled, improveText, IMPROVE_MODES, MAX_INPUT, type ImproveMode } from '@/lib/aiText'
import { checkRateLimit } from '@/lib/rateLimit'

// POST /api/ai/improve — rewrite one piece of the student's own text (bio,
// summary, a description). Wording help only: the key stays server-side, the
// model never auto-writes (the client previews and the student accepts).
export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 })

  if (!aiEnabled()) {
    return NextResponse.json({ enabled: false, error: 'AI help is not available yet.' }, { status: 503 })
  }

  const body = (await request.json().catch(() => null)) as { text?: unknown; mode?: unknown } | null
  const text = typeof body?.text === 'string' ? body.text : ''
  const mode = body?.mode as ImproveMode

  if (!text.trim()) {
    return NextResponse.json({ error: 'Nothing to improve.' }, { status: 400 })
  }
  if (text.length > MAX_INPUT) {
    return NextResponse.json({ error: 'That text is too long to improve.' }, { status: 400 })
  }
  if (!IMPROVE_MODES.includes(mode)) {
    return NextResponse.json({ error: 'Unknown mode.' }, { status: 400 })
  }

  // Per-user quota to protect the free tier.
  const { ok, retryAfter } = checkRateLimit(`ai:${user.id}`, { max: 20, windowMs: 60 * 60 * 1000 })
  if (!ok) {
    const mins = Math.max(1, Math.ceil(retryAfter / 60))
    return NextResponse.json(
      { error: `You've used your AI help for now. Try again in ${mins} min.` },
      { status: 429 },
    )
  }

  const result = await improveText({ text, mode })
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }
  return NextResponse.json({ text: result.text })
}

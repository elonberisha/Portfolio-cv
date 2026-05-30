import { NextResponse } from 'next/server'

import { aiEnabled } from '@/lib/aiText'

// GET /api/ai/status — a simple feature flag so the UI can hide the AI button
// entirely when no provider key is configured. Reveals only a boolean.
export async function GET() {
  return NextResponse.json({ enabled: aiEnabled() })
}

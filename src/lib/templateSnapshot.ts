import { sanitizeHtml } from './sanitizeHtml'

// Render a template via /preview.html?id=<slug> headlessly and capture its
// self-contained HTML (markup + inline <style>) so the generic studio editor
// can mutate it. Mirrors scripts/gen-thumbs.mjs's render path.
//
// NOTE: puppeteer is a devDependency. On serverless this needs a hosted
// Chromium (e.g. @sparticuz/chromium). We dynamic-import and fail soft: if
// snapshotting is unavailable, return '' so callers can seed lazily later.

const BASE = process.env.PREVIEW_BASE || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function snapshotTemplateHtml(slug: string): Promise<string> {
  let puppeteer: any
  try {
    // Dynamic import keeps this out of the production bundle's hard deps.
    puppeteer = (await import('puppeteer')).default
  } catch {
    return ''
  }

  let browser: any
  try {
    browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 })
    await page.goto(`${BASE}/preview.html?id=${encodeURIComponent(slug)}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })
    // Give Babel a beat to compile + React to paint.
    await new Promise((r) => setTimeout(r, 900))

    // Grab the rendered root markup plus any inline styles in <head>.
    const html: string = await page.evaluate(() => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.outerHTML)
        .join('\n')
      const root =
        document.getElementById('root') || document.querySelector('main') || document.body
      return `${styles}\n${root ? root.innerHTML : ''}`
    })

    return sanitizeHtml(html)
  } catch {
    return ''
  } finally {
    if (browser) await browser.close().catch(() => {})
  }
}

// Generate static preview images for every template so the gallery loads
// instantly instead of booting a live React+Babel iframe per card.
//
// Usage:
//   1. Start the app:   npm start   (or npm run dev) — server on :3000
//   2. In another shell: node scripts/gen-thumbs.mjs
//
// Output: public/template-thumbs/<slug>.webp
//
// Re-run whenever templates change. Pass slugs as args to limit:
//   node scripts/gen-thumbs.mjs scoreboard lexfutura

import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'template-thumbs')
const BASE = process.env.PREVIEW_BASE || 'http://localhost:3000'

// Logical render width + the slice of the page we capture. We only grab the
// top of each template (the card crops to the top anyway), then downscale to
// OUT_WIDTH so the browser isn't decoding 57 huge bitmaps in the gallery.
const WIDTH = 1200
const HEIGHT = 900
const OUT_WIDTH = 640

async function getSlugs() {
  const src = await readFile(path.join(ROOT, 'src', 'lib', 'templateCatalog.ts'), 'utf8')
  return [...src.matchAll(/^\s*\['([a-z0-9]+)',/gm)].map((m) => m[1])
}

async function main() {
  const filter = process.argv.slice(2)
  const all = await getSlugs()
  const slugs = filter.length ? all.filter((s) => filter.includes(s)) : all

  await mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 })

  let ok = 0
  for (const slug of slugs) {
    try {
      await page.goto(`${BASE}/preview.html?id=${slug}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })
      // Give Babel a beat to compile + React to paint.
      await new Promise((r) => setTimeout(r, 900))
      const raw = await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      })
      await sharp(raw)
        .resize({ width: OUT_WIDTH })
        .webp({ quality: 80 })
        .toFile(path.join(OUT_DIR, `${slug}.webp`))
      ok++
      console.log(`✓ ${slug}`)
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`)
    }
  }

  await browser.close()
  console.log(`\nDone — ${ok}/${slugs.length} thumbnails written to public/template-thumbs/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

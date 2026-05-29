/**
 * Patches Payload's RootLayout to add suppressHydrationWarning to <head>, <style>, and <body>.
 * This prevents hydration errors caused by browser extensions (e.g. webcrx)
 * that inject styles into <head> before React hydrates.
 *
 * Run automatically via postinstall.
 */
const fs = require('fs')
const path = require('path')

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@payloadcms',
  'next',
  'dist',
  'layouts',
  'Root',
  'index.js',
)

if (!fs.existsSync(filePath)) {
  console.log('[patch] Payload RootLayout not found, skipping patch.')
  process.exit(0)
}

let content = fs.readFileSync(filePath, 'utf8')

// Patch <head> element
if (!content.includes('_jsx("head", {\n      suppressHydrationWarning')) {
  content = content.replace(
    '_jsx("head", {',
    '_jsx("head", {\n      suppressHydrationWarning: true,',
  )
}

// Patch <style> element inside head
if (!content.includes('_jsx("style", {\n        suppressHydrationWarning')) {
  content = content.replace(
    '_jsx("style", {',
    '_jsx("style", {\n        suppressHydrationWarning: true,',
  )
}

// Patch <body> element
if (!content.includes('_jsxs("body", {\n      suppressHydrationWarning')) {
  content = content.replace(
    '_jsxs("body", {',
    '_jsxs("body", {\n      suppressHydrationWarning: true,',
  )
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('[patch] Payload RootLayout patched with suppressHydrationWarning.')

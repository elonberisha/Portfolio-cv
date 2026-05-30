// Minimal, dependency-free HTML sanitizer for user-controlled page documents.
//
// `pageHtml` is stored, then re-rendered inside a sandboxed iframe. Even with
// the sandbox we strip anything executable on save as defense-in-depth:
//   - <script> / <iframe> / <object> / <embed> / <link> / <meta> elements
//   - inline event handlers (on* attributes)
//   - javascript: / data:text/html URLs in href/src/etc.
//
// This is intentionally conservative: we keep <style> (templates ship their
// design as inline <style>) but remove anything that can run JS.

const DANGEROUS_TAGS = ['script', 'iframe', 'object', 'embed', 'link', 'meta', 'base', 'form']

function stripTag(html: string, tag: string): string {
  // Remove paired <tag>...</tag> (including self-closing / unclosed at EOF).
  const paired = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')
  const single = new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi')
  return html.replace(paired, '').replace(single, '')
}

export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return ''

  let html = input

  // Drop dangerous elements entirely.
  for (const tag of DANGEROUS_TAGS) {
    html = stripTag(html, tag)
  }

  // Strip inline event handlers: on*="..." / on*='...' / on*=value
  html = html.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
  html = html.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
  html = html.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')

  // Neutralize javascript: and data:text/html URLs in attributes.
  html = html.replace(
    /(href|src|xlink:href|action|formaction)\s*=\s*"(\s*(?:javascript:|data:text\/html)[^"]*)"/gi,
    '$1="#"',
  )
  html = html.replace(
    /(href|src|xlink:href|action|formaction)\s*=\s*'(\s*(?:javascript:|data:text\/html)[^']*)'/gi,
    "$1='#'",
  )

  return html
}

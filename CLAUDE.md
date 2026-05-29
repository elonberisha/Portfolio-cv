# portfolio-cv.online — Claude Instructions

## Project Overview

Free portfolio & CV platform for Kosovo university students. Built with:
- **Next.js 16.2.6** (App Router, `--no-turbopack` for dev)
- **Payload CMS 3.85** (embedded, admin at `/admin`)
- **SQLite** (dev) / **PostgreSQL** (prod)
- **TypeScript** throughout

## Design Skills

**Always load the relevant design skill before doing any design work.**

| Skill | When to use |
|-------|------------|
| `frontend-design` | Primary design skill — 8 visual anchors (Swiss, Industrial, Brutalist, Aurora Maximalism, Chaotic Maximalism, Retro-Futuristic, Organic, Lo-Fi). Use for ALL UI/page work. Pick one anchor per component/page and commit fully. |
| `frontend-design-ultimate` | Anti-AI-slop checklist, mobile-first patterns, React + Tailwind + shadcn/ui component patterns. Use alongside frontend-design. |
| `impeccable` | Design critique and polish. Use commands: `audit`, `polish`, `critique`, `bolder`, `colorize`, `typeset`. Run after building any UI to catch generic/weak design choices. |
| `huashu-design` | High-fidelity HTML prototypes, interactive demos, animation. Use when building demo/mockup pages. |

**This project's register: Brand** — design IS the product (portfolio platform, marketing site). Distinctiveness is the bar.

**Preferred anchors for this project:**
- Landing page / marketing: **Swiss** or **Aurora Maximalism**
- Auth pages (signin/signup): **Swiss** or **Industrial**
- Dashboard: **Industrial** (functional, data-dense, monospace)
- Portfolio templates: varies per template — use the template's own anchor

**Never default to generic.** No Inter/Roboto/Arial on marketing surfaces. No solid white/gray backgrounds. No purple gradients on white.

## Architecture

```
src/
  app/
    layout.tsx              — ROOT layout, uses Payload's RootLayout (html/body provider)
    PayloadStyles.tsx       — Client component importing Payload SCSS
    (frontend)/             — Public pages (landing, auth, dashboard)
      layout.tsx            — Passthrough + Navbar
      page.tsx              — Landing page
      signin/page.tsx
      signup/page.tsx
      dashboard/page.tsx
    (payload)/              — Admin panel
      layout.tsx            — Passthrough only
      admin/[[...segments]]/
  payload/
    payload.config.ts
    collections/
      Users.ts
      Universities.ts
      UniversityRequests.ts
      Portfolios.ts
      Templates.ts
      Media.ts
  components/
    Navbar.tsx              — Server component, JWT-conditional
  lib/
    auth.ts                 — getCurrentUser(), isAuthenticated()
scripts/
  patch-payload-hydration.js  — Postinstall patch for suppressHydrationWarning
```

## Key Rules

> **DEV SERVER: ALWAYS use `npm run dev`. Never `npm run dev -- --turbopack`, never `next dev` directly. Turbopack breaks Payload SCSS.**

- `npm run dev` runs `next dev --webpack` — this is mandatory, not optional
- Email verification is **disabled in dev**, enabled in production (conditional in Users.ts)
- The `payload-token` HTTP-only cookie is how we check auth server-side
- After `npm install`, the postinstall script re-patches Payload's node_modules automatically

## CSS / Styling

- Global styles: `src/app/(frontend)/globals.css` — design tokens: `--paper`, `--ink`, `--accent` (#d35234), `--live` (#2d8a4f), `--hairline`
- Payload admin CSS: loaded via `PayloadStyles.tsx` (client component, imports SCSS)
- Module CSS for pages: `*.module.css` files alongside each page

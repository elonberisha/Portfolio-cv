# Postgres migration runbook

This project uses **PostgreSQL in both local dev and production** (full parity).
SQLite remains only as a no-`DATABASE_URI` fallback.

## How the adapter is chosen

`src/payload/payload.config.ts`:

- `DATABASE_URI` set → **Postgres**
- `DATABASE_URI` unset → SQLite (`./portfolio-cv.db`)

Schema strategy under Postgres:

| Env | `push` | Meaning |
|-----|--------|---------|
| dev (`NODE_ENV !== production`) | `true` | schema auto-syncs from the collection config on boot |
| prod (`NODE_ENV === production`) | `false` | schema changes apply **only** via committed migrations |

This is what prevents the schema-drift bug class: production never silently
diverges from `*.ts` collection definitions.

---

## One-time setup (needs YOUR credentials — Claude can't do this part)

Claude cannot create database accounts or write secrets into `.env.local`.
Do these steps yourself:

### 1. Create a Postgres instance

Pick one (both have free tiers):

- **Supabase** — https://supabase.com → New project → Project Settings →
  Database → Connection string → **URI** (use the "Session" / port 5432 string,
  or the pooled 6543 string for serverless).
- **Neon** — https://neon.tech → New project → copy the connection string.

### 2. Add the connection string to `.env.local`

```bash
DATABASE_URI=postgresql://USER:PASSWORD@HOST:5432/DBNAME
```

> Local dev and production use the same env var. For production (Vercel etc.),
> set `DATABASE_URI` in the host's environment variables — **never** commit it.

### 3. Generate the first migration

With `DATABASE_URI` pointing at the (empty) Postgres DB:

```bash
npm run migrate:create
```

This introspects the schema and writes `src/payload/migrations/<timestamp>.ts`.
**Commit that file.**

### 4. Apply migrations

```bash
npm run migrate          # apply pending migrations
npm run migrate:status   # see what's applied / pending
```

In dev with `push: true`, the schema also auto-syncs on boot, so you mostly
run `migrate:create` + commit; the running migrations matter most for prod.

---

## Day-to-day workflow

1. Edit a collection (e.g. add a field in `Portfolios.ts`).
2. Dev picks it up automatically (`push: true`) after a server restart.
3. Before shipping: `npm run migrate:create` → commit the generated file.
4. Production deploy runs `npm run migrate` to apply it.

## Production deploy hook

Add to your deploy pipeline (e.g. Vercel build command or a release step):

```bash
npm run migrate && npm run build
```

So the DB schema is always migrated before the new app code goes live.

---

## Notes / gotchas

- **No real data to move.** The dev SQLite DB held only throwaway test data, so
  there's nothing to export/import — Postgres starts clean and migrations build
  the schema.
- **Type differences** (booleans, dates, JSON) are handled by Payload's adapter;
  no manual SQL needed.
- If you ever want to wipe and rebuild the dev Postgres schema from scratch:
  `npm run migrate:fresh` (drops everything — dev only).

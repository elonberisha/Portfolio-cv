import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Universities } from './collections/Universities'
import { UniversityRequests } from './collections/UniversityRequests'
import { Portfolios } from './collections/Portfolios'
import { Templates } from './collections/Templates'
import { Media } from './collections/Media'
import { CVs } from './collections/CVs'
import { seedDatabase } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Database adapter selection:
//   - DATABASE_URI set  → PostgreSQL (Supabase/Neon). Used in BOTH local dev
//     and production for full dev/prod parity.
//   - DATABASE_URI unset → SQLite fallback (no-setup local scratch DB).
//
// Schema strategy with Postgres:
//   - dev  (NODE_ENV !== 'production'): push = true → schema auto-syncs, fast
//     iteration, no migration files needed.
//   - prod (NODE_ENV === 'production'): push = false → schema changes apply
//     ONLY through committed migrations (`npm run migrate`). This is what kills
//     the schema-drift class of bug — production never silently diverges.
const isProd = process.env.NODE_ENV === 'production'

const dbAdapter = process.env.DATABASE_URI
  ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI,
      },
      migrationDir: path.resolve(dirname, 'migrations'),
      push: !isProd,
    })
  : sqliteAdapter({
      client: {
        url: 'file:./portfolio-cv.db',
      },
      push: true, // Auto-push schema changes in dev
    })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— portfolio-cv.online',
    },
    // Default to dark theme for the admin panel
    theme: 'dark',
    // Suppress hydration warnings from browser extensions (e.g. webcrx)
    suppressHydrationWarning: true,
  },

  collections: [
    Users,
    Universities,
    UniversityRequests,
    Portfolios,
    Templates,
    Media,
    CVs,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me-in-production-1234',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: dbAdapter,

  sharp,

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  onInit: async (payload) => {
    await seedDatabase(payload)
  },
})

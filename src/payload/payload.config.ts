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

// Use SQLite for local dev, Postgres (Supabase) for production
const dbAdapter = process.env.DATABASE_URI
  ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI,
      },
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

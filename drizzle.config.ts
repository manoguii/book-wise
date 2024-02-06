import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DRIZZLE_DATABASE_URL,
  },
} satisfies Config

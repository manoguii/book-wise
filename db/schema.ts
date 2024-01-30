import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  index,
} from 'drizzle-orm/pg-core'
import type { AdapterAccount } from '@auth/core/adapters'

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const book = pgTable(
  'books',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    author: text('author').notNull(),
    summary: text('summary').notNull(),
    coverUrl: text('cover_url').notNull(),
    totalPages: integer('total_pages').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('book_name_idx').on(table.name),
  }),
)

export const category = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
})

export const rating = pgTable('ratings', {
  id: uuid('id').primaryKey().defaultRandom(),
  rate: integer('rate').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),

  bookId: uuid('book_id')
    .notNull()
    .references(() => book.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
})

export const categoriesOnBooks = pgTable(
  'categories_on_books',
  {
    bookId: uuid('book_id').references(() => book.id),
    categoryId: uuid('category_id').references(() => category.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.bookId, table.categoryId] }),
  }),
)

import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
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

export const books = pgTable(
  'book',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    author: text('author').notNull(),
    summary: text('summary').notNull(),
    coverUrl: text('coverUrl').notNull(),
    totalPages: integer('totalPages').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('book_name_idx').on(table.name),
  }),
)

export const categories = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
})

export const ratings = pgTable('rating', {
  id: uuid('id').primaryKey().defaultRandom(),
  rate: integer('rate').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),

  bookId: uuid('bookId')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const categoriesOnBooks = pgTable('categoryOnBook', {
  bookId: uuid('bookId').references(() => books.id),
  categoryId: uuid('categoryId').references(() => categories.id),
})

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  ratings: many(ratings),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const ratingRelations = relations(ratings, ({ one }) => ({
  book: one(books, { fields: [ratings.bookId], references: [books.id] }),
  user: one(users, { fields: [ratings.userId], references: [users.id] }),
}))

export const bookRelations = relations(books, ({ many }) => ({
  ratings: many(ratings),
  categories: many(categoriesOnBooks),
}))

export const categoryRelations = relations(categories, ({ many }) => ({
  books: many(categoriesOnBooks),
}))

export const categoryOnBookRelations = relations(
  categoriesOnBooks,
  ({ one }) => ({
    book: one(books, {
      fields: [categoriesOnBooks.bookId],
      references: [books.id],
    }),
    category: one(categories, {
      fields: [categoriesOnBooks.categoryId],
      references: [categories.id],
    }),
  }),
)

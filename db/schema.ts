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

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const account = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
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

export const session = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationToken = pgTable(
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

export const category = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
})

export const rating = pgTable('rating', {
  id: uuid('id').primaryKey().defaultRandom(),
  rate: integer('rate').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),

  bookId: uuid('bookId')
    .notNull()
    .references(() => book.id, { onDelete: 'cascade' }),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
})

export const categoryOnBook = pgTable('categoryOnBook', {
  bookId: uuid('bookId').references(() => book.id),
  categoryId: uuid('categoryId').references(() => category.id),
})

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  ratings: many(rating),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const ratingRelations = relations(rating, ({ one }) => ({
  book: one(book, { fields: [rating.bookId], references: [book.id] }),
  user: one(user, { fields: [rating.userId], references: [user.id] }),
}))

export const bookRelations = relations(book, ({ many }) => ({
  ratings: many(rating),
  categories: many(categoryOnBook),
}))

export const categoryRelations = relations(category, ({ many }) => ({
  books: many(categoryOnBook),
}))

export const categoryOnBookRelations = relations(categoryOnBook, ({ one }) => ({
  book: one(book, { fields: [categoryOnBook.bookId], references: [book.id] }),
  category: one(category, {
    fields: [categoryOnBook.categoryId],
    references: [category.id],
  }),
}))

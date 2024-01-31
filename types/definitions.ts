import { book } from '@/db/schema'

export type Book = typeof book.$inferSelect

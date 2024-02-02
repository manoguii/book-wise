import { eq, sql } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '..'
import { book, category, categoryOnBook, rating } from '../schema'

type Category = typeof category.$inferSelect

async function getBookById(bookId: string) {
  const query = await db
    .select({
      id: book.id,
      name: book.name,
      author: book.author,
      coverUrl: book.coverUrl,
      summary: book.summary,
      totalPages: book.totalPages,
      createdAt: book.createdAt,
      averageRating: sql<string>`AVG(${rating.rate}) as averageRating`,
      ratingCount: sql<string>`(SELECT COUNT(*) FROM rating WHERE ${rating.bookId} = ${bookId})`,
      categories: sql<
        Category[]
      >`JSON_AGG(json_build_object('id', category.id, 'name', category.name))`,
    })
    .from(book)
    .where(eq(book.id, bookId))
    .leftJoin(rating, eq(rating.bookId, book.id))
    .leftJoin(categoryOnBook, eq(categoryOnBook.bookId, book.id))
    .leftJoin(category, eq(category.id, categoryOnBook.categoryId))
    .groupBy(book.id)

  return query[0]
}

export default cache(getBookById)

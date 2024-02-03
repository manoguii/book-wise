import { avg, eq, sql } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '..'
import { books, categories, categoriesOnBooks, ratings } from '../schema'

type Category = typeof categories.$inferSelect

async function getBookById(bookId: string) {
  const query = await db
    .select({
      id: books.id,
      name: books.name,
      author: books.author,
      coverUrl: books.coverUrl,
      summary: books.summary,
      totalPages: books.totalPages,
      createdAt: books.createdAt,
      averageRating: avg(ratings.rate),
      ratingCount: sql<string>`(SELECT COUNT(*) FROM rating WHERE ${ratings.bookId} = ${bookId})`,
      categories: sql<
        Category[]
      >`JSON_AGG(json_build_object('id', category.id, 'name', category.name))`,
    })
    .from(books)
    .where(eq(books.id, bookId))
    .leftJoin(ratings, eq(ratings.bookId, books.id))
    .leftJoin(categoriesOnBooks, eq(categoriesOnBooks.bookId, books.id))
    .leftJoin(categories, eq(categories.id, categoriesOnBooks.categoryId))
    .groupBy(books.id)

  return query[0]
}

export default cache(getBookById)

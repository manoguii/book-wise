import { eq, sql } from 'drizzle-orm'
import { db } from '..'
import { book, category, categoryOnBook, rating } from '../schema'

export type Category = typeof category.$inferSelect

export async function getBookById(id: string) {
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
      ratingCount: sql<string>`COUNT(${rating.rate}) as ratingCount`,
      categories: sql<
        Category[]
      >`JSON_AGG(json_build_object('id', category.id, 'name', category.name)) AS categories`,
    })
    .from(book)
    .where(eq(book.id, id))
    .leftJoin(rating, eq(rating.bookId, book.id))
    .leftJoin(categoryOnBook, eq(categoryOnBook.bookId, book.id))
    .leftJoin(category, eq(category.id, categoryOnBook.categoryId))
    .groupBy(book.id)

  return query[0]
}

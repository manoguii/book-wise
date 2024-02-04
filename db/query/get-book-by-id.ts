import { avg, count, eq } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '..'
import { books, ratings } from '../schema'

async function getBookById(bookId: string) {
  const query = await db.query.books.findFirst({
    where: (book) => eq(book.id, bookId),
    with: {
      categories: {
        columns: {},
        with: {
          category: true,
        },
      },
    },
  })

  const bookMetrics = await db
    .select({
      averageRating: avg(ratings.rate),
      ratingCount: count(ratings.id),
    })
    .from(books)
    .where(eq(books.id, bookId))
    .leftJoin(ratings, eq(books.id, ratings.bookId))
    .groupBy(books.id)

  if (!query) {
    return null
  }

  return {
    ...query,
    ...bookMetrics[0],
    categories: query?.categories.map((category) => category.category),
  }
}

export default cache(getBookById)

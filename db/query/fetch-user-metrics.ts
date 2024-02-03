import { count, countDistinct, eq, sql, sumDistinct } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { TAGS } from '../constants'
import { book, category, categoryOnBook, rating } from '../schema'

const fetchUserMetrics = unstable_cache(
  async (userId: string) => {
    const pagesRead = await db
      .select({
        value: sumDistinct(book.totalPages),
      })
      .from(rating)
      .innerJoin(book, eq(rating.bookId, book.id))
      .where(eq(rating.userId, userId))

    const authorsRead = await db
      .select({
        value: countDistinct(book.author),
      })
      .from(rating)
      .innerJoin(book, eq(rating.bookId, book.id))
      .where(eq(rating.userId, userId))

    const mostReadCategory = await db
      .select({
        category: category.name,
        quantity: count().as('quantity'),
      })
      .from(categoryOnBook)
      .innerJoin(book, eq(categoryOnBook.bookId, book.id))
      .innerJoin(category, eq(categoryOnBook.categoryId, category.id))
      .innerJoin(rating, eq(book.id, rating.bookId))
      .where(eq(rating.userId, userId))
      .groupBy(category.name)
      .orderBy(sql`quantity DESC`)
      .limit(1)

    const booksRated = await db
      .select({
        value: countDistinct(book.id),
      })
      .from(rating)
      .innerJoin(book, eq(rating.bookId, book.id))
      .where(eq(rating.userId, userId))

    return {
      pagesRead: pagesRead[0],
      booksRated: booksRated[0],
      authorsRead: authorsRead[0],
      mostReadCategory: mostReadCategory[0],
    }
  },
  [TAGS.user_reviews],
  {
    tags: [TAGS.user_reviews],
  },
)

export default fetchUserMetrics

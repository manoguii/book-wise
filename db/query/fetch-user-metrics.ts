import { count, countDistinct, eq, sql, sumDistinct } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { TAGS } from '../constants'
import { books, categories, categoriesOnBooks, ratings } from '../schema'

const fetchUserMetrics = unstable_cache(
  async (userId: string) => {
    const pagesRead = await db
      .select({
        value: sumDistinct(books.totalPages),
      })
      .from(ratings)
      .innerJoin(books, eq(ratings.bookId, books.id))
      .where(eq(ratings.userId, userId))

    const authorsRead = await db
      .select({
        value: countDistinct(books.author),
      })
      .from(ratings)
      .innerJoin(books, eq(ratings.bookId, books.id))
      .where(eq(ratings.userId, userId))

    const mostReadCategory = await db
      .select({
        category: categories.name,
        quantity: count().as('quantity'),
      })
      .from(categoriesOnBooks)
      .innerJoin(books, eq(categoriesOnBooks.bookId, books.id))
      .innerJoin(categories, eq(categoriesOnBooks.categoryId, categories.id))
      .innerJoin(ratings, eq(books.id, ratings.bookId))
      .where(eq(ratings.userId, userId))
      .groupBy(categories.name)
      .orderBy(sql`quantity DESC`)
      .limit(1)

    const booksRated = await db
      .select({
        value: countDistinct(books.id),
      })
      .from(ratings)
      .innerJoin(books, eq(ratings.bookId, books.id))
      .where(eq(ratings.userId, userId))

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

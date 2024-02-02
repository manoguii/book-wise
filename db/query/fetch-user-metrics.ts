import { count, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { db } from '..'
import { TAGS } from '../constants'
import { book, category, categoryOnBook, rating } from '../schema'

const fetchUserMetrics = unstable_cache(
  async (userId: string) => {
    // const pagesRead =
    // const authorsRead = await
    const mostReadCategory = await db
      .select({
        category: category.name,
        quantity: count(),
      })
      .from(categoryOnBook)
      .innerJoin(book, eq(categoryOnBook.bookId, book.id))
      .innerJoin(category, eq(categoryOnBook.categoryId, category.id))
      .innerJoin(rating, eq(book.id, rating.bookId))
      .where(eq(rating.userId, userId))
      .groupBy(category.name)

    const booksRated = await db
      .select({
        value: count(rating.id),
      })
      .from(rating)
      .where(eq(rating.userId, userId))

    return {
      booksRated: booksRated[0],
      mostReadCategory: mostReadCategory.reduce((max, obj) =>
        max.quantity > obj.quantity ? max : obj,
      ),
    }
  },
  [TAGS.user_reviews],
  {
    tags: [TAGS.user_reviews],
  },
)

export default cache(fetchUserMetrics)

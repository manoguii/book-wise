import { count, desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { PER_PAGE, TAGS } from '../constants'
import { book, rating } from '../schema'

const fetchUserReviews = unstable_cache(
  async (userId: string, params: { page: number }) => {
    const total = await db
      .select({ value: count(rating.id) })
      .from(rating)
      .where(eq(rating.userId, userId))

    const totalPages = Math.ceil(total[0].value / PER_PAGE)

    const query = await db
      .select({
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        createdAt: rating.createdAt,
        book: {
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: book.coverUrl,
        },
      })
      .from(rating)
      .leftJoin(book, eq(rating.bookId, book.id))
      .where(eq(rating.userId, userId))
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)
      .orderBy(desc(rating.createdAt))

    return {
      ratings: query,
      totalPages,
    }
  },
  [TAGS.user_reviews],
  {
    tags: [TAGS.user_reviews],
  },
)

export default fetchUserReviews

import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { db } from '..'
import { TAGS } from '../constants'
import { rating, user } from '../schema'

const fetchBookReviews = unstable_cache(
  async (bookId: string) => {
    const query = await db
      .select({
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        createdAt: rating.createdAt,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(rating)
      .leftJoin(user, eq(rating.userId, user.id))
      .where(eq(rating.bookId, bookId))

    return query
  },
  [TAGS.book_reviews],
  {
    tags: [TAGS.book_reviews],
  },
)

export default cache(fetchBookReviews)

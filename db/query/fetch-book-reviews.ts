import { unstable_cache } from 'next/cache'
import { db } from '..'
import { rating, user } from '../schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

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
  ['book-reviews'],
  {
    tags: ['book-reviews'],
  },
)

export default cache(fetchBookReviews)

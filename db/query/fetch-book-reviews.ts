import { unstable_cache as cache } from 'next/cache'
import { db } from '..'
import { rating, user } from '../schema'
import { eq } from 'drizzle-orm'

export const fetchBookReviews = cache(
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

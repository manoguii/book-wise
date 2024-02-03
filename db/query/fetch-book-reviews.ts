import { desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { TAGS } from '../constants'
import { ratings, users } from '../schema'

const fetchBookReviews = unstable_cache(
  async (bookId: string) => {
    const query = await db
      .select({
        id: ratings.id,
        rate: ratings.rate,
        description: ratings.description,
        createdAt: ratings.createdAt,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(ratings)
      .leftJoin(users, eq(ratings.userId, users.id))
      .where(eq(ratings.bookId, bookId))
      .orderBy(desc(ratings.createdAt))

    return query
  },
  [TAGS.book_reviews],
  {
    tags: [TAGS.book_reviews],
  },
)

export default fetchBookReviews

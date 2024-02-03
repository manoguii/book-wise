import { count, desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { PER_PAGE, TAGS } from '../constants'
import { books, ratings } from '../schema'

const fetchUserReviews = unstable_cache(
  async (userId: string, params: { page: number }) => {
    const total = await db
      .select({ value: count(ratings.id) })
      .from(ratings)
      .where(eq(ratings.userId, userId))

    const totalPages = Math.ceil(total[0].value / PER_PAGE)

    const query = await db
      .select({
        id: ratings.id,
        rate: ratings.rate,
        description: ratings.description,
        createdAt: ratings.createdAt,
        book: {
          id: books.id,
          name: books.name,
          author: books.author,
          coverUrl: books.coverUrl,
        },
      })
      .from(ratings)
      .leftJoin(books, eq(ratings.bookId, books.id))
      .where(eq(ratings.userId, userId))
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)
      .orderBy(desc(ratings.createdAt))

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

import { count, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { db } from '..'
import { PER_PAGE, TAGS } from '../constants'
import { book, rating, user } from '../schema'

const fetchUserReviews = unstable_cache(
  async (userId: string, params: { page: number }) => {
    const total = await db.select({ value: count(book.id) }).from(book)

    const totalPages = Math.ceil(total[0].value / PER_PAGE)

    const query = await db
      .select({
        rating: {
          id: rating.id,
          rate: rating.rate,
          description: rating.description,
          createdAt: rating.createdAt,
        },
        book: {
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: book.coverUrl,
        },
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(rating)
      .leftJoin(book, eq(rating.bookId, book.id))
      .leftJoin(user, eq(rating.userId, user.id))
      .where(eq(rating.userId, userId))
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)

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

export default cache(fetchUserReviews)

import { count, eq } from 'drizzle-orm'
import { db } from '..'
import { book, rating, user } from '../schema'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { PER_PAGE, TAGS } from '../constants'

const fetchRecentReviews = unstable_cache(
  async (params: { page: number }) => {
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
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)

    return {
      ratings: query,
      totalPages,
    }
  },
  [TAGS.recent_reviews],
  {
    tags: [TAGS.recent_reviews],
  },
)

export default cache(fetchRecentReviews)

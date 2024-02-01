import { eq } from 'drizzle-orm'
import { db } from '..'
import { book, rating, user } from '../schema'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

const fetchRecentReviews = unstable_cache(
  async () => {
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

    return query
  },
  ['recent-reviews'],
  {
    tags: ['recent-reviews'],
  },
)

export default cache(fetchRecentReviews)

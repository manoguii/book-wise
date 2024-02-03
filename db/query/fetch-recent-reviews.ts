import { count, desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { PER_PAGE, TAGS } from '../constants'
import { books, ratings, users } from '../schema'

const fetchRecentReviews = unstable_cache(
  async (params: { page: number }) => {
    const total = await db.select({ value: count(books.id) }).from(books)

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
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(ratings)
      .leftJoin(books, eq(ratings.bookId, books.id))
      .leftJoin(users, eq(ratings.userId, users.id))
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)
      .orderBy(desc(ratings.createdAt))

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

export default fetchRecentReviews

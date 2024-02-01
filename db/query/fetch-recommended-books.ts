import { eq, sql } from 'drizzle-orm'
import { db } from '..'
import { book, rating } from '../schema'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { TAGS } from '../constants'

const fetchRecommendedBooks = unstable_cache(
  async () => {
    const query = await db
      .select({
        id: book.id,
        name: book.name,
        author: book.author,
        coverUrl: book.coverUrl,
        summary: book.summary,
        totalPages: book.totalPages,
        createdAt: book.createdAt,
        rate: sql<string>`AVG(${rating.rate}) as average_rating`,
      })
      .from(book)
      .leftJoin(rating, eq(rating.bookId, book.id))
      .groupBy(book.id)
      .having(sql`COUNT(rating.id) > 0`)
      .orderBy(sql`average_rating DESC`)
      .limit(5)

    return query
  },
  [TAGS.recommended_books],
  {
    tags: [TAGS.recommended_books],
  },
)

export default cache(fetchRecommendedBooks)

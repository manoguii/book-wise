import { unstable_cache } from 'next/cache'
import { db } from '..'
import { book, rating } from '../schema'
import { eq, sql } from 'drizzle-orm'
import { cache } from 'react'
import { TAGS } from '../constants'

const fetchAllBooks = unstable_cache(
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

    return query
  },
  [TAGS.list_of_books],
  {
    tags: [TAGS.list_of_books],
  },
)

export default cache(fetchAllBooks)

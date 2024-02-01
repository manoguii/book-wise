import { unstable_cache } from 'next/cache'
import { db } from '..'
import { book, rating } from '../schema'
import { count, eq, sql } from 'drizzle-orm'
import { cache } from 'react'
import { PER_PAGE, TAGS } from '../constants'

const fetchBooks = unstable_cache(
  async (params: { page: number }) => {
    const total = await db.select({ value: count(book.id) }).from(book)

    const totalPages = Math.ceil(total[0].value / PER_PAGE)

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
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)

    return {
      books: query,
      totalPages,
    }
  },
  [TAGS.list_of_books],
  {
    tags: [TAGS.list_of_books],
  },
)

export default cache(fetchBooks)
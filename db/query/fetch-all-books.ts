import { avg, count, desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import { db } from '..'
import { PER_PAGE, TAGS } from '../constants'
import { books, ratings } from '../schema'

const fetchBooks = unstable_cache(
  async (params: { page: number }) => {
    const total = await db.select({ value: count(books.id) }).from(books)

    const totalPages = Math.ceil(total[0].value / PER_PAGE)

    const query = await db
      .select({
        id: books.id,
        name: books.name,
        author: books.author,
        coverUrl: books.coverUrl,
        summary: books.summary,
        totalPages: books.totalPages,
        createdAt: books.createdAt,
        averageRating: avg(ratings.rate).as('average_rating'),
      })
      .from(books)
      .leftJoin(ratings, eq(ratings.bookId, books.id))
      .groupBy(books.id)
      .limit(PER_PAGE)
      .offset((params.page - 1) * PER_PAGE)
      .orderBy(desc(books.createdAt))

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

export default fetchBooks

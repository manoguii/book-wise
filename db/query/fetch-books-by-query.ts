import { avg, count, eq, ilike, or } from 'drizzle-orm'

import { db } from '..'
import { PER_PAGE } from '../constants'
import { book, rating } from '../schema'

const fetchBooksByQuery = async (params: { search: string; page: number }) => {
  const total = await db
    .select({ value: count(book.id) })
    .from(book)
    .where(
      or(
        ilike(book.name, `%${params.search}%`),
        ilike(book.author, `%${params.search}%`),
      ),
    )

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
      averageRating: avg(rating.rate).as('average_rating'),
    })
    .from(book)
    .leftJoin(rating, eq(rating.bookId, book.id))
    .groupBy(book.id)
    .where(
      or(
        ilike(book.name, `%${params.search}%`),
        ilike(book.author, `%${params.search}%`),
      ),
    )
    .limit(PER_PAGE)
    .offset((params.page - 1) * PER_PAGE)

  return {
    books: query,
    totalPages,
  }
}

export default fetchBooksByQuery

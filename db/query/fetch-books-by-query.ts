import { avg, count, eq, ilike, or } from 'drizzle-orm'

import { db } from '..'
import { PER_PAGE } from '../constants'
import { books, ratings } from '../schema'

const fetchBooksByQuery = async (params: { search: string; page: number }) => {
  const total = await db
    .select({ value: count(books.id) })
    .from(books)
    .where(
      or(
        ilike(books.name, `%${params.search}%`),
        ilike(books.author, `%${params.search}%`),
      ),
    )

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
    .where(
      or(
        ilike(books.name, `%${params.search}%`),
        ilike(books.author, `%${params.search}%`),
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

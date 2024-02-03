import { avg, Column, count, eq, SQL, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { db } from '..'
import { TAGS } from '../constants'
import { book, rating } from '../schema'

const fetchPopularBooks = unstable_cache(
  async () => {
    const avgRatingResult = await db
      .select({
        avg_rating: avg(rating.rate).as('avg_rating'),
      })
      .from(rating)

    const C = avgRatingResult[0].avg_rating
    const m = 5

    const v = cast(count(rating.id))
    const R = cast(avg(rating.rate))
    const vPlusM = sql`(${v} + ${cast(m)})`
    const mDividedByVPlusM = sql`(${cast(m)} / ${vPlusM})`
    const vDividedByVPlusM = sql`(${v} / ${vPlusM})`

    const popularBooks = await db
      .select({
        id: book.id,
        name: book.name,
        author: book.author,
        coverUrl: book.coverUrl,
        summary: book.summary,
        totalPages: book.totalPages,
        createdAt: book.createdAt,
        averageRating: avg(rating.rate).as('average_rating'),
        ratingCount: count(rating.id).as('rating_count'),
        score:
          sql<number>`(${vDividedByVPlusM} * ${R} + ${mDividedByVPlusM} * ${cast(C)})`.as(
            'score',
          ),
      })
      .from(book)
      .leftJoin(rating, eq(rating.bookId, book.id))
      .groupBy(book.id)
      .having(sql`COUNT(rating.id) > 0`)
      .orderBy(sql`score DESC`)
      .limit(6)

    return popularBooks
  },
  [TAGS.recommended_books],
  {
    tags: [TAGS.recommended_books],
  },
)

export default cache(fetchPopularBooks)

/**
 * Função para converter um valor para o tipo double precision no PostgreSQL.
 *
 * @param value - O valor a ser convertido. Pode ser uma coluna, uma expressão SQL, uma string ou um número.
 *
 * @returns Uma expressão SQL que representa o valor convertido.
 *
 * @example
 * // Converte o valor da coluna 'rating.id' para double precision
 * const v = cast(count(rating.id));
 */
function cast(
  value: Column | SQL<number> | SQL<string | null> | string | number | null,
) {
  return sql`cast(${value} as double precision)`
}

/**
 * Fórmula usada pelo IMDb para seu Top 250
 *
 * weighted rating (WR) = (v ÷ (v+m)) × R + (m ÷ (v+m)) × C
 *
 *  onde:
 *
 * - R = É a nota média do livro (avg_rating)
 * - v = É o número de avaliações do livro (rating_count)
 * - m = É o mínimo de avaliações necessárias para o livro ser listado
 * - C = É a nota média de todos os livros
 */

import { avg, Column, count, eq, SQL, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { db } from '..'
import { TAGS } from '../constants'
import { books, ratings } from '../schema'

const fetchPopularBooks = unstable_cache(
  async () => {
    const avgRatingResult = await db
      .select({
        avg_rating: avg(ratings.rate).as('avg_rating'),
      })
      .from(ratings)

    const C = avgRatingResult[0].avg_rating
    const m = 5

    const v = cast(count(ratings.id))
    const R = cast(avg(ratings.rate))
    const vPlusM = sql`(${v} + ${cast(m)})`
    const mDividedByVPlusM = sql`(${cast(m)} / ${vPlusM})`
    const vDividedByVPlusM = sql`(${v} / ${vPlusM})`

    const popularBooks = await db
      .select({
        id: books.id,
        name: books.name,
        author: books.author,
        coverUrl: books.coverUrl,
        summary: books.summary,
        totalPages: books.totalPages,
        createdAt: books.createdAt,
        averageRating: avg(ratings.rate).as('average_rating'),
        ratingCount: count(ratings.id).as('rating_count'),
        score:
          sql<number>`(${vDividedByVPlusM} * ${R} + ${mDividedByVPlusM} * ${cast(C)})`.as(
            'score',
          ),
      })
      .from(books)
      .leftJoin(ratings, eq(ratings.bookId, books.id))
      .groupBy(books.id)
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
 * // Converte o valor da coluna 'ratings.id' para double precision
 * const v = cast(count(ratings.id));
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

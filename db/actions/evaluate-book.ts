'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/auth-config'

import { db } from '..'
import { TAGS } from '../constants'
import { ratings } from '../schema'

const evaluateBookSchema = z.object({
  bookId: z.string().uuid(),
  rating: z.coerce
    .number()
    .min(1, {
      message: 'Sua avaliação deve ser no mínimo 1 estrela',
    })
    .max(5, {
      message: 'Sua avaliação deve ser no máximo 5 estrelas',
    }),
  review: z
    .string()
    .min(5, {
      message: 'A avaliação deve ter no mínimo 5 caracteres',
    })
    .max(500, {
      message: 'A avaliação deve ter no máximo 500 caracteres',
    }),
})

export async function evaluateBook(formData: FormData) {
  const input = {
    rating: formData.get('rating'),
    review: formData.get('review'),
    bookId: formData.get('bookId'),
  }

  const result = evaluateBookSchema.safeParse(input)

  if (!result.success) {
    return {
      error: result.error.errors[0].message,
    }
  }

  const session = await auth()

  if (!session) {
    return {
      error: 'Você precisa estar logado para avaliar um livro',
    }
  }

  const userId = session.user.id

  const { bookId, rating, review } = result.data

  await db.insert(ratings).values({
    rate: rating,
    bookId,
    userId,
    description: review,
  })

  revalidateTag(TAGS.user_reviews)
  revalidateTag(TAGS.book_reviews)
  revalidateTag(TAGS.recent_reviews)
  revalidateTag(TAGS.recommended_books)
}

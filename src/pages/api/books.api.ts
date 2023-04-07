import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IBookInfo } from './@types/books'
import { Category } from '@prisma/client'

interface IBooksErrorResponse {
  message: string
}

interface IBooksResponse {
  books: IBookInfo[]
  categories: Category[]
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IBooksResponse | IBooksErrorResponse>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const allBooks = await prisma.book.findMany({
    include: {
      ratings: {
        include: {
          user: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  const booksInfo = allBooks.map((book) => {
    const numberOfRatings = book.ratings.length

    const totalRate = book.ratings.reduce((acc, rating) => {
      acc += rating.rate

      return acc
    }, 0)

    const rate = totalRate / numberOfRatings

    return {
      id: book.id,
      image: book.cover_url,
      name: book.name,
      author: book.author,
      rate: Math.round(rate),
      pages: book.total_pages,
      numberOfRatings,
      ratings: book.ratings.map((rating) => {
        return {
          id: rating.id,
          userName: rating.user.name,
          userAvatarUrl: rating.user.avatar_url,
          rate: rating.rate,
          createdAt: rating.created_at,
          description: rating.description,
        }
      }),
      categories: book.categories.map((categoryRelationship) => {
        return {
          name: categoryRelationship.category.name,
          id: categoryRelationship.category.id,
        }
      }),
    }
  })

  const categories = await prisma.category.findMany()

  res.status(200).json({ books: booksInfo, categories })
}

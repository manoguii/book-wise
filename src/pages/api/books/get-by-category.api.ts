import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IAllBookInfo } from '../../@types/books'
import { calculateAverageRatings } from '@/utils/calculate-average-ratings'

interface ErrorResponse {
  message: string
}

interface IGetByCategoryResponse {
  books: IAllBookInfo[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetByCategoryResponse | ErrorResponse>,
) {
  // http://localhost:3000/api/books/get-by-category?category=Programação

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed.' })
  }

  const query = req.query.category

  if (!query) {
    return res.status(404).json({ message: 'Category is not defined.' })
  }

  const category = String(query)

  const books = await prisma.book.findMany({
    where: {
      categories: {
        some: {
          category: {
            name: {
              contains: category,
            },
          },
        },
      },
    },
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

  const booksInfo = books.map((book) => {
    const ratingAverage = calculateAverageRatings(book.ratings)

    return {
      id: book.id,
      image: book.cover_url,
      name: book.name,
      author: book.author,
      ratingAverage,
      pages: book.total_pages,
      numberOfRatings: book.ratings.length,
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

  res.status(200).json({ books: booksInfo })
}

import { IBook, IRating } from '@/pages/api/@types/ratings'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface IRatingsErrorResponse {
  message: string
}

interface IRatingsResponse {
  ratings: IRating[]
  bestRatedBooks: IBook[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRatingsResponse | IRatingsErrorResponse>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const allRatings = await prisma.rating.findMany({
    include: {
      book: true,
      user: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const ratings = allRatings.map((rating) => {
    return {
      id: rating.id,
      rate: rating.rate,
      description: rating.description,
      createdAt: rating.created_at,
      userAvatar: rating.user.avatar_url,
      userName: rating.user.name,
      bookImage: rating.book.cover_url,
      bookName: rating.book.name,
      bookAuthor: rating.book.author,
    }
  })

  const allBooks = await prisma.book.findMany({
    include: {
      ratings: true,
      categories: true,
    },
  })

  const booksInfo = allBooks.map((book) => {
    const ratingsSize = book.ratings.length

    const totalRate = book.ratings.reduce((acc, rating) => {
      acc += rating.rate

      return acc
    }, 0)

    const rate = totalRate / ratingsSize

    return {
      id: book.id,
      image: book.cover_url,
      name: book.name,
      author: book.author,
      rate,
    }
  })

  const orderDesc = booksInfo.sort((a, b) => b.rate - a.rate)

  const topFive = orderDesc.slice(0, 5)

  return res.status(200).json({ ratings, bestRatedBooks: topFive })
}

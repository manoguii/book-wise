import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { IBookInfo } from '../../@types/books'
import { calculateAverageRatings } from '@/utils/calculate-average-ratings'

interface ErrorResponse {
  message: string
}

interface IGetBestBooksResponse {
  bestRatedBooks: IBookInfo[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetBestBooksResponse | ErrorResponse>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const allBooks = await prisma.book.findMany({
    include: {
      ratings: true,
      categories: true,
    },
  })

  const booksInfo = allBooks.map((book) => {
    const ratingAverage = calculateAverageRatings(book.ratings)

    return {
      id: book.id,
      image: book.cover_url,
      name: book.name,
      author: book.author,
      ratingAverage,
    }
  })

  const orderDesc = booksInfo.sort((a, b) => b.ratingAverage - a.ratingAverage)

  const topFive = orderDesc.slice(0, 5)

  return res.status(200).json({ bestRatedBooks: topFive })
}

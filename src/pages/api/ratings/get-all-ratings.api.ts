import { IBookRating } from '@/pages/@types/ratings'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface ErrorResponse {
  message: string
}

interface IGetAllRatingsResponse {
  ratings: IBookRating[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetAllRatingsResponse | ErrorResponse>,
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

  return res.status(200).json({ ratings })
}

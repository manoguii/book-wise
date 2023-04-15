import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'
import { IBookRating } from '@/pages/@types/ratings'
import { IMetrics } from '@/pages/@types/user'

interface ErrorResponse {
  message: string
}

interface ISeekReviewsResponse {
  ratings: IBookRating[]
  metrics: IMetrics
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISeekReviewsResponse | ErrorResponse>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(404).json({ message: 'Log in to continue !' })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  })

  const allRatings = await prisma.rating.findMany({
    where: {
      user_id: user?.id,
    },
    include: {
      book: true,
      user: true,
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

  const metrics = allRatings.reduce(
    (acc, rating, _, array) => {
      acc.pagesRead += rating.book.total_pages

      acc.ratedBooks = array.length

      const arrayOfAuthors = array
        .map((rating) => {
          return rating.book.author
        })
        .filter((elem, index, self) => {
          return index === self.indexOf(elem)
        })

      acc.authorsRead = arrayOfAuthors.length

      return acc
    },
    {
      pagesRead: 0,
      ratedBooks: 0,
      authorsRead: 0,
      mostReadCategory: {},
    },
  )

  return res.status(200).json({ ratings, metrics })
}

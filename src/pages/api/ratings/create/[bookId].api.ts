import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

interface ErrorResponse {
  message: string
}

interface ICreateResponse {}

const createBodySchema = z.object({
  description: z.string(),
  rate: z.number(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICreateResponse | ErrorResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'Faça login para continuar' })

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { description, rate } = createBodySchema.parse(req.body)

  const { bookId } = req.query

  if (!bookId || typeof bookId !== 'string') {
    return res.status(404).json({ message: 'Book id is not defined!' })
  }

  const createdRating = await prisma.rating.create({
    data: {
      description,
      rate,
      book: {
        connect: {
          id: bookId,
        },
      },
      user: {
        connect: {
          email: session.user?.email!,
        },
      },
    },
    include: {
      user: true,
    },
  })

  // const rating = {
  //   id: createdRating.id,
  //   userName: createdRating.user.name,
  //   userAvatarUrl: createdRating.user.avatar_url,
  //   rate: createdRating.rate,
  //   createdAt: createdRating.created_at,
  //   description: createdRating.description,
  // }

  res.status(201).json({ rating: createdRating })
}

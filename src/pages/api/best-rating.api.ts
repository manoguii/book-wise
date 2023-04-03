import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const assessments = await prisma.rating.findMany({
    include: {
      book: {
        select: {
          author: true,
          name: true,
          cover_url: true,
        },
      },
      user: {
        select: {
          name: true,
          image: true,
          avatar_url: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const books = await prisma.rating.findMany({
    orderBy: {
      rate: 'desc',
    },
    select: {
      rate: true,
      id: true,
      book: {
        select: {
          author: true,
          name: true,
          cover_url: true,
        },
      },
    },
  })

  const bestRated = books.slice(0, 5)

  return res.status(200).json({ book: bestRated, assessment: assessments })
}

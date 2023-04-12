import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '@prisma/client'

interface ErrorResponse {
  message: string
}

interface IGetAllCategoriesResponse {
  categories: Category[]
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetAllCategoriesResponse | ErrorResponse>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const categories = await prisma.category.findMany()

  res.status(200).json({ categories })
}

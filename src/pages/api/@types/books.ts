import { Category } from '@prisma/client'

interface IRating {
  id: string
  userName: string
  userAvatarUrl: string | null
  rate: number
  createdAt: Date
  description: string
}

export interface IBookInfo {
  categories: Category[]
  ratings: IRating[]
  id: string
  image: string
  name: string
  author: string
  rate: number
  pages: number
  numberOfRatings: number
}

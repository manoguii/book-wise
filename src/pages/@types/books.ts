import { Category } from '@prisma/client'

export interface IUserRating {
  id: string
  userName: string
  userAvatarUrl: string | null
  rate: number
  createdAt: Date
  description: string
}

export interface IAllBookInfo {
  categories: Category[]
  ratings: IUserRating[]
  id: string
  image: string
  name: string
  author: string
  ratingAverage: number
  pages: number
  numberOfRatings: number
}

export type IBookInfo = {
  id: string
  image: string
  name: string
  author: string
  ratingAverage: number
}

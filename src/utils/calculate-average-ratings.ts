// import { IUserRating } from '@/pages/@types/books'
// import { Rating } from '@prisma/client'

export function calculateAverageRatings(ratings: Array<{ rate: number }>) {
  const ratingsSize = ratings.length

  const totalRate = ratings.reduce((acc, rating) => {
    acc += rating.rate

    return acc
  }, 0)

  const average = totalRate / ratingsSize

  const ratingAverage = Math.round(average)

  return ratingAverage
}

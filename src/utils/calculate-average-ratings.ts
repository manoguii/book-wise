import { Rating } from '@prisma/client'

export function calculateAverageRatings(ratings: Rating[]) {
  const ratingsSize = ratings.length

  const totalRate = ratings.reduce((acc, rating) => {
    acc += rating.rate

    return acc
  }, 0)

  const ratingAverage = totalRate / ratingsSize

  return ratingAverage
}

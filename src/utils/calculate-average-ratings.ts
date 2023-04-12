import { Rating } from '@prisma/client'

export function calculateAverageRatings(ratings: Rating[]) {
  const ratingsSize = ratings.length

  const totalRate = ratings.reduce((acc, rating) => {
    acc += rating.rate

    return acc
  }, 0)

  const average = totalRate / ratingsSize

  const ratingAverage = Math.round(average)

  return ratingAverage
}

import { Star } from '@phosphor-icons/react'
import { MyRatingContainer, Stars } from './styles'
import { useState } from 'react'

export interface MyRatingProps {
  ratingAverage?: number
  toAssess?: boolean
}

export function MyRating({
  ratingAverage = 1,
  toAssess = false,
}: MyRatingProps) {
  const [amountOfStars, setAmountOfStars] = useState(ratingAverage)

  const totalAmountOfStars = 5

  function setNewAmountOfStars(rate: number) {
    setAmountOfStars(rate)
  }

  return (
    <MyRatingContainer>
      <Stars css={{ '--stars-size': totalAmountOfStars }}>
        {Array.from({ length: totalAmountOfStars }, (_, i) => i + 1).map(
          (star) => {
            return (
              <button
                key={star}
                onClick={() => setNewAmountOfStars(star)}
                disabled={!toAssess}
              >
                <Star
                  color="rgba(131, 129, 217, 1)"
                  size={20}
                  weight={amountOfStars >= star ? 'fill' : 'bold'}
                />
              </button>
            )
          },
        )}
      </Stars>
    </MyRatingContainer>
  )
}

MyRating.displayName = 'MyRating'

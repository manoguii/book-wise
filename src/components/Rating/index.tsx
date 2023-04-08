import { Star } from '@phosphor-icons/react'
import { StarsGrid } from './styles'
import { useState } from 'react'

export interface RatingProps {
  rating?: number
  toAssess?: boolean
  setRating?: (value: number) => void
}

export function Rating({
  rating = 1,
  toAssess = false,
  setRating,
}: RatingProps) {
  const [amountOfStars, setAmountOfStars] = useState(rating)

  const totalAmountOfStars = 5

  function setNewAmountOfStars(rate: number) {
    setAmountOfStars(rate)

    if (setRating) {
      setRating(rate)
    }
  }

  return (
    <div>
      <StarsGrid css={{ '--stars-size': totalAmountOfStars }}>
        {Array.from({ length: totalAmountOfStars }, (_, i) => i + 1).map(
          (star) => {
            return (
              <button
                key={star}
                type="button"
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
      </StarsGrid>
    </div>
  )
}

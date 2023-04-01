import { Star } from '@phosphor-icons/react'
import { MyRatingContainer, Stars } from './styles'
import { useState } from 'react'

export interface MyRatingProps {
  size?: number
}

export function MyRating({ size = 5 }: MyRatingProps) {
  const [rating, setRating] = useState(size)

  function setNewRating(rate: number) {
    setRating(rate)
  }

  return (
    <MyRatingContainer>
      <Stars css={{ '--stars-size': size }}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <button key={step} onClick={() => setNewRating(step)}>
              <Star
                color="rgba(131, 129, 217, 1)"
                size={20}
                weight={rating >= step ? 'fill' : 'bold'}
              />
            </button>
          )
        })}
      </Stars>
    </MyRatingContainer>
  )
}

MyRating.displayName = 'MyRating'

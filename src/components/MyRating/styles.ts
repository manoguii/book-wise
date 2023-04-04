import { styled } from '../../styles'

export const MyRatingContainer = styled('div', {})

export const Stars = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--stars-size), 1fr)',
  gap: 4,
  width: 'max-content',

  button: {
    all: 'unset',
    cursor: 'pointer',

    '-webkit-transition': 'all 0.1s ease',
    transition: 'all 0.1s ease',

    '&:not(:disabled):hover': {
      '-webkit-transform': 'scale(1.2)',
      transform: 'scale(1.2)',
    },
  },

  svg: {
    lineHeight: 0,
  },
})

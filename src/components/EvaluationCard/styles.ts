import { Box } from '@/components/_ui/Box'
import { styled } from '@/styles'

export const EvaluationCardContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  marginTop: 8,
})

export const RatedBook = styled('div', {
  display: 'flex',
  gap: '$5',

  img: {
    borderRadius: '$md',
    objectFit: 'cover',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  strong: {
    color: '$gray-100',
  },

  span: {
    color: '$gray-400',
  },
})

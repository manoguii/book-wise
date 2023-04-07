import { Box } from '@/components/_ui/Box'
import { styled } from '@/styles'

export const EvaluationCardContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const EvaluationUser = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  '> div': {
    display: 'flex',
    gap: '$4',
  },
})

export const EvaluationUserInfo = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  strong: {
    color: '$gray-100',
  },
})

export const RatedBook = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const RatedBookImage = styled('div', {
  img: {
    borderRadius: '$md',
    objectFit: 'cover',
  },
})

export const RatedBookInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  div: {
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

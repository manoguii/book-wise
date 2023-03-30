import { styled } from '@/styles'
import { Box } from '../Box'

export const BookCardContainer = styled(Box, {
  display: 'flex',
  gap: '$5',
  maxWidth: 350,
  border: '2px solid transparent',

  '&:hover': {
    borderColor: '$gray-600',
  },
})

export const BookContainer = styled('div', {
  img: {
    borderRadius: '$md',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  div: {
    display: 'flex',
    flexDirection: 'column',
  },

  strong: {
    color: '$gray-100',
  },

  span: {
    color: '$gray-400',
  },
})

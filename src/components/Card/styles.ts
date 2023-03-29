import { styled } from '@/styles'
import { Box } from '../Box'

export const CardContainer = styled(Box, {
  background: '$gray-600',
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  maxWidth: 608,
  border: '2px solid transparent',

  '&:hover': {
    borderColor: '$gray-500',
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
  height: 156,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  span: {
    color: '$gray-400',
  },
})

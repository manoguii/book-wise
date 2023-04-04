import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const BookCardContainer = styled(Box, {
  display: 'flex',
  gap: '$5',
  border: '2px solid transparent',

  '&:hover': {
    borderColor: '$gray-600',
  },
})

export const BookImage = styled('div', {
  img: {
    borderRadius: '$md',
    objectFit: 'cover',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  strong: {
    color: '$gray-100',
  },

  span: {
    color: '$gray-400',
  },

  button: {
    maxWidth: 'max-content',
    marginLeft: 1,
    marginBottom: 1,
  },
})

export const BookInfoHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  [`${Text}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
})

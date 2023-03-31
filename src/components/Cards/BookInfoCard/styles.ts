import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const BookInfoCardContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '$10',
})

export const BookDescription = styled('div', {
  display: 'flex',
  gap: '$8',

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  [`${Text}`]: {
    marginTop: '$2',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',

  gap: '$20',
  borderTop: '1px solid $gray-600',
  padding: '$6 0px',
})

export const Metric = styled('div', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  strong: {
    color: '$white',
  },
})

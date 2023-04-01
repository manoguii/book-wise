import { Box } from '@/components/Box'
import { styled } from '@/styles'

export const CommentCardContainer = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '$4',
  padding: '$6',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  strong: {
    color: '$white',
  },

  '> div': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '$4',
  },
})

import { styled } from '@/styles'

export const Container = styled('aside', {
  background: '$gray-700',
  height: 'calc(100vh - 40px)',
  borderRadius: '$md',
  padding: '$5 $6',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  margin: '$5 0px $5 $5',
  gridRow: '1/3',

  img: {
    marginBottom: '$12',
  },

  '@media (max-width: 1160px)': {
    gridRow: '1/4',
  },
})

import { styled } from '@/styles'

export const BestRatedBooksContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  marginRight: '$8',

  '> header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export const BestRatedBooksContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  marginTop: '$4',

  '@media (max-width: 1160px)': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(287px, 1fr))',
  },
})

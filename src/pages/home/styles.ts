import { styled } from '@/styles'

export const Container = styled('main', {
  display: 'grid',
  gap: '$8',
  gridTemplateColumns:
    'minmax(180px, 200px) minmax(500px, 1fr) minmax(300px, 420px)',
  gridTemplateRows: '48px 1fr',
  margin: '$16 $5 0 0',

  '@media (max-width: 1090px)': {
    gridTemplateColumns: 'minmax(180px, 200px) 1fr',
    gridTemplateRows: '48px auto auto',
  },
})

export const Header = styled('header', {
  gridColumn: '2/4',
  gridRow: '1/2',

  display: 'flex',
  gap: '$3',
  width: '100%',
  alignItems: 'center',

  '@media (max-width: 1090px)': {
    gridColumn: '2/4',
    gridRow: '1/2',
  },
})

export const RecentReviews = styled('section', {
  gridColumn: '2/3',
  gridRow: '2/3',

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  '@media (max-width: 1090px)': {
    gridColumn: '2/4',
    gridRow: '3/4',

    marginRight: '$8',
  },
})

export const BestRated = styled('section', {
  gridColumn: '3/4',
  gridRow: '2/3',

  display: 'flex',
  flexDirection: 'column',

  '> header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
    marginTop: '$4',
  },

  '@media (max-width: 1090px)': {
    gridColumn: '2/4',
    gridRow: '2/3',
    gap: '$3',
    marginRight: '$5',

    '> header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '> div': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(287px, 1fr))',
      gap: '$3',
    },
  },
})

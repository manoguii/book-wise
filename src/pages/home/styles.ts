import { styled } from '@/styles'

export const Container = styled('main', {
  display: 'grid',
  gap: '$8',
  gridTemplateColumns:
    'minmax(200px, 252px) minmax(550px, 1fr) minmax(360px, 420px)',
  gridTemplateRows: '48px 1fr',
  margin: '$16 $6 0 0',

  '@media (max-width: 1160px)': {
    gridTemplateColumns: 'minmax(200px, 252px) 1fr',
    gridTemplateRows: '96px 1fr 1fr',

    section: {
      gridColumn: '2/4',
      gridRow: '3/4',
    },
  },
})

export const Header = styled('header', {
  gridColumn: '2/4',
  gridRow: '1/2',

  display: 'flex',
  gap: '$3',
  width: '100%',
  alignItems: 'center',

  '@media (max-width: 1160px)': {
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

  '@media (max-width: 1160px)': {
    main: {
      gridColumn: '2/4',
      gridRow: '2/3',

      marginRight: '$8',
    },
  },
})

export const BestRated = styled('section', {
  gridColumn: '3/4',
  gridRow: '2/3',

  display: 'flex',
  flexDirection: 'column',
  // marginRight: '$8',

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

    '@media (max-width: 1160px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(287px, 1fr))',
    },
  },
})

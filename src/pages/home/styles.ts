import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns:
    'minmax(200px, 252px) minmax(550px, 1fr) minmax(360px, 420px)',
  gridTemplateRows: '96px 1fr',
  maxWidth: 1440,
  margin: '0 auto',
  gap: '$8',

  header: {
    gridColumn: '2/4',
    gridRow: '1/2',

    display: 'flex',
    alignItems: 'flex-end',
    gap: '$3',
  },

  main: {
    gridColumn: '2/3',
    gridRow: '2/3',

    display: 'flex',
    flexDirection: 'column',
    gap: '$5',
  },

  section: {
    gridColumn: '3/4',
    gridRow: '2/3',
  },

  '@media (max-width: 1160px)': {
    gridTemplateColumns: 'minmax(200px, 252px) 1fr',
    gridTemplateRows: '96px 1fr 1fr',

    header: {
      gridColumn: '2/4',
      gridRow: '1/2',
    },

    main: {
      gridColumn: '2/4',
      gridRow: '2/3',

      marginRight: 60,
    },

    section: {
      gridColumn: '2/4',
      gridRow: '3/4',
    },
  },
})

export const BestRatedBooks = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  marginRight: 60,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
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

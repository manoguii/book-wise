import { styled } from '@/styles'

export const Container = styled('main', {
  maxWidth: 1440,
  margin: '0 auto',
  padding: '$5',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  background: '$gray-800',

  '@media (max-width: 1080px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ImageContainer = styled('div', {
  width: 570,
  height: 'calc(100vh - 40px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'linear-gradient(0deg, rgba(42, 40, 121, 0.6), rgba(42, 40, 121, 0.6)), rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(1px)',
  borderRadius: '$md',

  '@media (max-width: 1080px)': {
    display: 'none',
  },
})

export const LoginContainer = styled('div', {
  width: 450,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  height: 'calc(100vh - 40px)',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    marginTop: '$10',
  },

  span: {
    color: '$gray-200',
  },

  h2: {
    color: '$gray-100',
  },

  button: {
    padding: '$3 $4',
  },

  '@media (max-width: 1080px)': {
    width: 400,
  },

  '@media (max-width: 620px)': {
    maxWidth: 300,
  },
})

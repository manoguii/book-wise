import { styled } from '@/styles'

export const LoginContainer = styled('main', {
  maxWidth: 1440,
  height: 'calc(100vh - 40px)',
  margin: '0 auto',
  padding: '$5',
  display: 'grid',
  gridTemplateColumns: 'minmax(300px, 580px) 1fr',
  background: '$gray-800',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ImageContainer = styled('div', {
  height: 'calc(100vh - 40px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'relative',

  img: {
    zIndex: 1,
  },

  '&::before': {
    content: '',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 'calc(100vh - 40px)',
    borderRadius: '$md',
    opacity: 0.75,

    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage:
      "linear-gradient(0deg, rgba(42, 40, 121, 0.6), rgba(42, 40, 121, 0.6)), url('https://i.ibb.co/wKGQ5vk/Image.png')",
  },

  '@media (max-width: 1090px)': {
    '&::before': {
      width: '80%',
    },
  },

  '@media (max-width: 900px)': {
    display: 'none',
  },
})

export const LoginMethod = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  width: '60%',

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

  '@media (max-width: 1090px)': {
    width: '80%',
  },
})

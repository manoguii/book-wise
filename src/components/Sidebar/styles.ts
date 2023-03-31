import { styled } from '@/styles'
import { Button } from '../Button'
import * as Dialog from '@radix-ui/react-dialog'

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

export const RadixOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  inset: 0,
})

export const RadixContent = styled(Dialog.Content, {
  backgroundColor: '$gray-700',
  borderRadius: '$md',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '330vh',
  padding: '$12 $16',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$3',

  [`> ${Button}`]: {
    width: '100%',
    padding: '$3 $3',
  },
})

export const RadixTitle = styled(Dialog.Title, {
  fontSize: '1rem',
  marginBottom: '$8',
})

export const RadixClose = styled(Dialog.Close, {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 16,
})

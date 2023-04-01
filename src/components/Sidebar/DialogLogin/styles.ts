import { Button } from '@/components/Button'
import { styled } from '@/styles'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  inset: 0,
})

export const DialogContent = styled(Dialog.Content, {
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

export const DialogTitle = styled(Dialog.Title, {
  fontSize: '1rem',
  marginBottom: '$8',
})

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 16,
})

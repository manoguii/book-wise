import { styled } from '@/styles'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  inset: 0,
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray-800',
  borderRadius: '$md',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '90vw',
  maxWidth: '660px',
  maxHeight: '100vh',
  padding: '$16 $12 0px $12',

  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  gap: '$3',
})

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 26,
})

export const ToAssess = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$3 0px',
})

import { Box } from '@/components/_ui/Box'
import { Text } from '@/components/_ui/Text'
import { styled } from '@/styles'
import * as Dialog from '@radix-ui/react-dialog'
import * as Collapsible from '@radix-ui/react-collapsible'

export const Book = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '$10',
  padding: '$6 $8',
})

export const BookInfo = styled('div', {
  display: 'flex',
  gap: '$8',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  [`${Text}`]: {
    marginTop: '$2',
  },
})

export const BookAdditionalInformation = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderTop: '1px solid $gray-600',
  padding: '$6 0px',
})

export const BookInformation = styled('div', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  strong: {
    color: '$white',
  },
})

export const Action = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$3 0px',
})

export const CreateCommentData = styled('div', {
  div: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '$2',
    marginTop: '$3',
  },

  textArea: {
    marginTop: '$6',
  },
})

export const CreateComment = styled('form', {
  padding: '$3 $4',
  borderRadius: '$md',
  background: '$gray-700',
  boxSizing: 'border-box',
})

export const Comment = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '$4',
  padding: '$6',
})

export const UserInfo = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  strong: {
    color: '$white',
  },

  '> div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '$4',
  },
})

export const RadixDialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  inset: 0,
})

export const RadixDialogContent = styled(Dialog.Content, {
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
  padding: '$16 $12 $20 $12',

  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  gap: '$3',
})

export const RadixDialogClose = styled(Dialog.Close, {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 26,
})

export const RadixDialogPortal = styled(Dialog.Portal, {})

export const RadixCollapsibleRoot = styled(Collapsible.Root, {})

export const RadixCollapsibleTrigger = styled(Collapsible.Trigger, {})

export const RadixCollapsibleContent = styled(Collapsible.Content, {})

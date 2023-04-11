import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '@/components/_ui/Box'
import { Text } from '@/components/_ui/Text'
import { styled } from '@/styles'

export const BookCardContainer = styled(Box, {
  display: 'flex',
  gap: '$5',
  border: '2px solid transparent',

  '&:hover': {
    borderColor: '$gray-600',
  },
})

export const BookImage = styled('div', {
  img: {
    borderRadius: '$md',
    objectFit: 'cover',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [`${Text}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  strong: {
    display: 'block',
    color: '$gray-100',
  },

  span: {
    display: 'block',
    color: '$gray-400',
  },
})

export const RadixDialogTrigger = styled(Dialog.Trigger, {
  all: 'unset',
  cursor: 'pointer',
})

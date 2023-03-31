import { styled } from '@/styles'
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, 252px) 1fr',
  gridTemplateRows: '48px 34px 1fr',
  gap: '$8',
  marginRight: '$12',
})

export const Header = styled('header', {
  gridColumn: '2/3',

  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '$5',

  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
  },

  input: {
    width: 400,
  },
})

export const Categories = styled('div', {
  gridColumn: '2/3',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const Books = styled('div', {
  gridColumn: '2/3',

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '$5',
})

export const DialogTrigger = styled(Dialog.Trigger, {
  all: 'unset',
  cursor: 'pointer',
})

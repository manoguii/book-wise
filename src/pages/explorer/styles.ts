import { styled } from '@/styles'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(180px, 200px) 1fr',
  gridTemplateRows: '48px 34px auto',
  gap: '$8',
  margin: '$16 $5 0 0',
})

export const Header = styled('header', {
  gridColumn: '2/3',

  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',

  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
  },

  input: {
    maxWidth: 400,
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

export const RadixToggleGroupRoot = styled(ToggleGroup.Root, {})

export const RadixToggleGroupItem = styled(ToggleGroup.Item, {
  background: 'transparent',
  border: '1px solid $purple-100',
  borderRadius: '$full',
  width: 'max-content',
  padding: '$1 $4',
  color: '$purple-100',
  lineHeight: '$base',
  height: 34,

  '&:hover': {
    background: '$purple-200',
    color: '$gray-100',
  },

  '&[data-state=on]': {
    color: '$white',
    background: '$purple-200',
    border: '1px solid transparent',
  },
})

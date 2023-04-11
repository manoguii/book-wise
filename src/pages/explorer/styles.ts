import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, 252px) 1fr',
  gridTemplateRows: '48px 34px 1fr',
  gap: '$8',
  margin: '$16 $12 0 0',
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

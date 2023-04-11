import { Heading } from '@/components/_ui/Heading'
import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns:
    'minmax(200px, 252px) minmax(550px, 1fr) minmax(220px, 280px)',
  gridTemplateRows: '48px 1fr',
  margin: '$16 $12 0 0',
  gap: '$8',

  '> header': {
    gridColumn: '2/4',
    gridRow: '1/2',

    display: 'flex',
    gap: '$3',
    alignItems: 'center',
  },
})

export const UserRatings = styled('div', {
  gridColumn: '2/3',
  gridRow: '2/3',

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  p: {
    marginTop: '$3',
  },
})

export const ProfileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderLeft: '1px solid $gray-700',
  height: 'calc(100vh - 100px)',

  gridColumn: '3/4',
  gridRow: '2/3',
})

export const UserInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    color: '$white',
    marginTop: '$3',
  },

  '&::after': {
    content: '',
    width: 32,
    height: 5,
    background: '$gradient-horizontal',
    borderRadius: '$lg',
    marginTop: '$5',
  },
})

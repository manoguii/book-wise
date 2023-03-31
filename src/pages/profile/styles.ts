import { Heading } from '@/components/Heading'
import { styled } from '@/styles'

export const Container = styled('div', {
  maxWidth: 1440,
  display: 'grid',
  gridTemplateColumns:
    'minmax(200px, 252px) minmax(550px, 1fr) minmax(220px, 320px)',
  gridTemplateRows: '55px 1fr',
  margin: '0 auto',
  gap: '$8',

  '> header': {
    gridColumn: '2/4',
    gridRow: '1/2',

    display: 'flex',
    gap: '$3',
    marginTop: '$5',
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
  marginRight: '$8',
  alignItems: 'center',
  borderLeft: '1px solid $gray-700',
  height: 'calc(100vh - 100px)',
})

export const UserMetrics = styled('div', {})

export const UserInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',

  [`> ${Heading}`]: {
    color: '$white',
  },
})

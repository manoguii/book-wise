import { styled } from '@/styles'

export const UserMetricsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  marginTop: '$6',
})

export const Metric = styled('div', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  strong: {
    color: '$white',
  },
})

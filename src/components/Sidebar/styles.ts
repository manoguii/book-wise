import { styled } from '@/styles'

export const Container = styled('aside', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  margin: '$5 0px $5 $5',
  padding: '$5 $6',
  height: 'calc(100vh - 40px)',

  background: '$gray-700',
  borderRadius: '$md',
  position: 'absolute',
  top: 0,
  left: 0,

  img: {
    marginBottom: '$12',
  },
})

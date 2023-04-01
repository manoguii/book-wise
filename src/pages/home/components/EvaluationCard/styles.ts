import { Box } from '@/components/Box'
import { styled } from '@/styles'

export const EvaluationCardContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  '> div': {
    display: 'flex',
    gap: '$4',
  },
})

export const UserInfo = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  strong: {
    color: '$gray-100',
  },
})

export const ContainerBook = styled('div', {
  display: 'flex',
  gap: '$5',
})

export const ImageBook = styled('div', {
  img: {
    borderRadius: '$md',
  },
})

export const InfoBook = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  strong: {
    color: '$gray-100',
  },

  span: {
    color: '$gray-400',
  },
})

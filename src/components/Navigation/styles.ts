import { styled } from '@/styles'
import Link from 'next/link'

export const LinkContainer = styled(Link, {
  color: '$gray-400',
  fontWeight: '$regular',
  fontSize: '$md',
  lineHeight: '$base',
  padding: '$2 0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$3',
  maxWidth: 'max-content',
  textDecoration: 'none',

  svg: {
    color: '$gray-400',
  },

  '&::before': {
    content: '.',
    color: 'transparent',
    display: 'block',
    width: '$1',
  },

  variants: {
    isActive: {
      true: {
        color: '$gray-100',
        fontWeight: '$bold',

        svg: {
          color: '$gray-100',
        },

        '&::before': {
          content: '.',
          color: 'transparent',
          display: 'block',
          width: '$1',
          background: '$gradient-vertical',
          borderRadius: '$lg',
          height: 'inherit',
        },
      },

      false: {
        '&:hover': {
          color: '$gray-100',
          fontWeight: '$medium',

          svg: {
            color: '$gray-100',
          },
        },
      },
    },
  },
})

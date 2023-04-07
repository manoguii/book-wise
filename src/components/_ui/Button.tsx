import { styled } from '@/styles'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$md',
  fontSize: '$md',
  fontWeight: '$medium',
  fontFamily: '$default',
  textAlign: 'center',
  boxSizing: 'border-box',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:focus': {
    boxShadow: '0 0 0 1px $colors$purple-100',
  },

  variants: {
    variant: {
      primary: {
        background: '$gray-600',
        padding: '$2',

        '&:not(:disabled):hover': {
          background: '$gray-500',
        },

        '&:disabled': {
          opacity: 0.5,
        },
      },

      secondary: {
        padding: '$1 $2',
        gap: '$3',
        background: 'transparent',
        fontWeight: '$bold',
        color: '$gray-200',

        '&:not(:disabled):hover': {
          background: 'rgba(230, 232, 242, 0.04)',
        },

        '&:disabled': {
          color: '$gray-300',
          opacity: 0.5,
        },
      },

      tertiary: {
        padding: '$1 $2',
        gap: '$3',
        background: 'transparent',
        fontWeight: '$bold',
        color: '$purple-100',

        '&:not(:disabled):hover': {
          background: 'rgba(131, 129, 217, 0.06)',
        },

        '&:disabled': {
          opacity: 0.5,
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

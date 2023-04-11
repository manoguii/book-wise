import { styled } from '../../styles'

export const TextInputContainer = styled('div', {
  backgroundColor: '$gray-800',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $gray-500',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',

  button: {
    all: 'unset',
    cursor: 'pointer',

    '&:focus': {
      boxShadow: '0 0 0 1px $colors$green-200',
    },
  },

  svg: {
    color: '$gray-500',
  },

  variants: {
    variant: {
      sm: {
        padding: '$2 $3',
      },

      md: {
        padding: '$3 $4',

        svg: {
          width: 20,
          height: 20,
        },
      },
    },
  },

  '&:focus-within': {
    borderColor: '$green-200',

    svg: {
      color: '$green-200',
    },
  },

  defaultVariants: {
    variant: 'md',
  },
})

export const Input = styled('input', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$gray-200',
  fontWeight: '$regular',
  background: 'transparent',
  border: 0,
  width: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray-400',
  },
})

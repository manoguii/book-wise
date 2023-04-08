import { styled } from '../styles'

export const TextArea = styled('textarea', {
  backgroundColor: '$gray-800',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $gray-500',
  boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  width: '100%',
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$gray-200',
  fontWeight: '$regular',
  resize: 'vertical',
  minHeight: 164,

  '&:focus': {
    outline: 0,
    borderColor: '$green-200',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray-400',
  },
})

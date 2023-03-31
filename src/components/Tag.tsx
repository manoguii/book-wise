import { styled } from '@/styles'

export const Tag = styled('div', {
  background: 'transparent',
  border: '1px solid $purple-100',
  borderRadius: '$full',
  width: 'max-content',
  padding: '$1 $4',
  color: '$purple-100',
  lineHeight: '$base',
  height: 34,

  '&:hover': {
    background: '$purple-200',
    color: '$gray-100',
  },
})

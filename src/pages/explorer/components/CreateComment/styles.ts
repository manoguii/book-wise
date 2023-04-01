import { styled } from '@/styles'

export const InfoUser = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '$4',

  '> div': {
    display: 'flex',
    gap: '$3',
    alignItems: 'center',
  },
})

export const TextAreaContainer = styled('div', {
  div: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '$2',
    marginTop: '$3',
  },

  textArea: {
    marginTop: '$6',
  },
})

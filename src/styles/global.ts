import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    height: '100vh',
    backgroundColor: '$gray-800',
    color: '$gray-100',
    fontFamily: '$default',
    '-webkit-font-smoothing': 'antialiased',
  },
})

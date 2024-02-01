import { cache } from 'react'
import { nextAuth } from './auth'

/**
 * A universal method to interact with NextAuth.js with react memoization
 * @returns Session object
 */
export const auth = cache(nextAuth)

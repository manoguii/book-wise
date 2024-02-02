'use server'

import { z } from 'zod'

import { signIn } from '@/auth'

const signInWithSchema = z.enum(['google', 'github'])

export async function signInWithProvider(
  prevState: unknown,
  provider: 'google' | 'github',
) {
  const result = signInWithSchema.safeParse(provider)

  if (!result.success) {
    return {
      error: 'Provider invalido',
    }
  }

  await signIn(provider, {
    redirectTo: '/',
  })
}

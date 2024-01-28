'use server'

import { signIn } from '@/auth'
import { z } from 'zod'

const providerSchema = z.enum(['google', 'github'])

export async function signInWithProvider(
  prevState: unknown,
  provider: 'google' | 'github',
) {
  const result = providerSchema.safeParse(provider)

  if (!result.success) {
    return {
      error: 'Provider invalido',
    }
  }

  await signIn(provider, {
    redirectTo: '/',
  })
}

const signInWithEmailSchema = z.object({
  email: z.string().email(),
})

export async function signInWithEmail(prevState: unknown, formData: FormData) {
  const input = {
    email: formData.get('email'),
  }

  const result = signInWithEmailSchema.safeParse(input)

  if (!result.success) {
    return {
      error: 'Email invalido',
    }
  }

  console.log('signInWithEmail', result)
}

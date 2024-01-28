'use server'

import { z } from 'zod'

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

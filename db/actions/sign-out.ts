'use server'

import { signOut as signOutAction } from '@/auth'

export async function signOut() {
  await signOutAction({
    redirectTo: '/sign-in',
  })
}

'use client'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { signInWithProvider } from '@/db/actions/sign-in-with-provider'

import { Icons } from '../icons'
import { Button } from '../ui/button'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="default"
      className="w-full"
      aria-label="Entrar com GitHub"
      aria-disabled={pending}
      disabled={pending}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Entrar com GitHub
    </Button>
  )
}

export function SignInWithGitHub() {
  const [message, formAction] = useFormState(signInWithProvider, null)
  const actionWithVariant = formAction.bind(null, 'github')

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message?.error}
      </p>
    </form>
  )
}

'use client'

import { Mail } from 'lucide-react'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { signInWithEmail } from '@/db/actions/sign-in-with-email'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="w-full"
      aria-label="Entrar com Email"
      aria-disabled={pending}
      disabled={pending}
    >
      <Mail className="mr-2 h-4 w-4" />
      Entrar com Email
    </Button>
  )
}

export function SignInWithEmail() {
  const [message, formAction] = useFormState(signInWithEmail, null)

  return (
    <form action={formAction}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoCorrect="off"
            autoComplete="email"
            autoCapitalize="none"
            placeholder="email@exemplo.com"
          />
          <p aria-live="polite" className="sr-only" role="status">
            {message?.error}
          </p>
        </div>

        <SubmitButton />
      </div>
    </form>
  )
}

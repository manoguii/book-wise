'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signOutAction } from '@/db/actions/sign-out'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      variant="destructive"
      aria-label="Sair"
      className="w-full"
      size="xs"
    >
      Sair
      <LogOut className="ml-2 h-4 w-4" />
    </Button>
  )
}

export function SignOut() {
  return (
    <form action={signOutAction}>
      <SubmitButton />
    </form>
  )
}

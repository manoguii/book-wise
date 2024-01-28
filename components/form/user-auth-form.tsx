'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  async function handleSignIn() {
    console.log('Sign in with email')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSignIn}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button variant="outline">Entrar com Email</Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <Button variant="default" type="button">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Entrar com GitHub
        </Button>
        <Button variant="secondary" type="button">
          <Icons.google className="mr-2 h-4 w-4" />
          Entrar com Google
        </Button>
      </div>
    </div>
  )
}

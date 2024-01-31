'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { LogOut } from 'lucide-react'
import { signOut } from '@/db/actions/sign-out'
import { cn } from '@/lib/utils'

function SubmitButton({ isCollapsed }: { isCollapsed: boolean }) {
  const { pending } = useFormStatus()

  return (
    <>
      {isCollapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              aria-disabled={pending}
              disabled={pending}
              size="icon"
              variant="destructive"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sair</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Sair
          </TooltipContent>
        </Tooltip>
      ) : (
        <Button
          aria-disabled={pending}
          disabled={pending}
          variant="destructive"
          aria-label="Sair"
          className="w-full"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      )}
    </>
  )
}

export function SignOut({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <form action={signOut} className={cn('w-full', isCollapsed && 'w-max')}>
      <SubmitButton isCollapsed={isCollapsed} />
    </form>
  )
}

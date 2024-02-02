import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { SignInWithGitHub } from './form/sign-in-with-github'
import { SignInWithGoogle } from './form/sign-in-with-google'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function SignInModal({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <Dialog>
      <Tooltip delayDuration={0}>
        <TooltipContent side="right" className="flex items-center gap-4">
          Entrar
        </TooltipContent>
        <DialogTrigger asChild>
          {isCollapsed ? (
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                aria-label="Abrir modal de login"
                size="icon"
              >
                <LogIn className="h-4 w-4" />
                <span className="sr-only">Abrir modal de login</span>
              </Button>
            </TooltipTrigger>
          ) : (
            <Button
              variant="secondary"
              aria-label="Abrir modal de login"
              className="w-full"
            >
              Fazer login
              <LogIn className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogTrigger>
      </Tooltip>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Faça login para continuar.</DialogTitle>
          <DialogDescription>
            Faça login para continuar lendo e descobrindo novos livros e
            avaliando seus favoritos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <SignInWithGitHub />
          <SignInWithGoogle />
        </div>
      </DialogContent>
    </Dialog>
  )
}

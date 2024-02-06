import { Metadata } from 'next'
import Link from 'next/link'

import { SignInWithEmail } from '@/components/form/sign-in-with-email'
import { SignInWithGitHub } from '@/components/form/sign-in-with-github'
import { SignInWithGoogle } from '@/components/form/sign-in-with-google'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entrar na sua conta',
}

export default function SignInPage() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-[40%_1fr] lg:px-0">
      <div className="relative hidden h-full p-10 lg:grid">
        <div className="absolute inset-0 m-4 rounded-xl bg-primary-foreground" />

        <div className="relative z-20 flex place-content-center items-center gap-3 text-4xl font-bold">
          <Icons.logo className="h-12 w-12" />
          Book wise
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Boas vindas ao Book Wise !
            </h1>
            <p className="text-muted-foreground">
              Faça login ou acesse como visitante.
            </p>
          </div>

          <div className="grid gap-6">
            <Link
              href="/"
              className={buttonVariants({
                variant: 'secondary',
              })}
            >
              Acessar como visitante
            </Link>

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
              <SignInWithEmail />
              <SignInWithGitHub />
              <SignInWithGoogle />
            </div>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

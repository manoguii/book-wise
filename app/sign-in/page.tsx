import { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from '@/components/form/user-auth-form'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entrar na sua conta',
}

export default function SignInPage() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-[40%_1fr] lg:px-0">
      <div className="relative hidden h-full p-10 lg:grid">
        <div className="absolute inset-0 m-4 rounded-xl bg-gray-900/60" />

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
              Faça seu login ou acesse como visitante.
            </p>
          </div>

          <UserAuthForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link
              href="/privacy"
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

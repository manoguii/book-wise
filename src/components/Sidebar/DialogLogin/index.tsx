import * as Dialog from '@radix-ui/react-dialog'
import Google from '../../../assets/google.svg'
import GitHub from '../../../assets/github.svg'
import { Button } from '@/components/_ui/Button'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from './styles'
import { signIn } from 'next-auth/react'

export function DialogLogin() {
  async function handleSignInWithGoogle() {
    await signIn('google', {
      callbackUrl: '/home',
    })
  }

  async function handleSignInWithGithub() {
    await signIn('github', {
      callbackUrl: '/home',
    })
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>

        <Button onClick={handleSignInWithGoogle}>
          <Image
            src={Google}
            alt="Imagem do botão para fazer login com google"
          />
          Entrar com Google
        </Button>

        <Button onClick={handleSignInWithGithub}>
          <Image
            src={GitHub}
            alt="Imagem do botão para fazer login com github"
          />
          Entrar com GitHub
        </Button>

        <DialogClose>
          <X size={24} color="#8D95AF" />
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  )
}

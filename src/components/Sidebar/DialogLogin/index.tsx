import * as Dialog from '@radix-ui/react-dialog'
import Google from '../../../assets/google.svg'
import GitHub from '../../../assets/github.svg'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { X } from '@phosphor-icons/react'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from './styles'

export function DialogLogin() {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>

        <Button>
          <Image
            src={Google}
            alt="Imagem do botão para fazer login com google"
          />
          Entrar com Google
        </Button>

        <Button>
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

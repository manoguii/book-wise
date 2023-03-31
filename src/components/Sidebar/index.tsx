import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { Navigation } from '../Navigation'
import { Binoculars, ChartLineUp, SignIn, User, X } from '@phosphor-icons/react'
import { Button } from '../Button'
import Google from '../../assets/google.svg'
import GitHub from '../../assets/github.svg'
import {
  Container,
  RadixClose,
  RadixContent,
  RadixOverlay,
  RadixTitle,
} from './styles'

export function Sidebar() {
  return (
    <Dialog.Root>
      <Container>
        <div>
          <Image src={Logo} alt="" />

          <Navigation href="/home" path="/home">
            <ChartLineUp size={24} color="#8D95AF" />
            Inicio
          </Navigation>

          <Navigation href="/explorer" path="/explorer">
            <Binoculars size={24} color="#8D95AF" />
            Explorar
          </Navigation>

          <Navigation href="/profile" path="/profile">
            <User size={24} color="#8D95AF" />
            Perfil
          </Navigation>
        </div>

        <Dialog.Trigger asChild>
          <Button variant="secondary">
            Fazer Login
            <SignIn size={24} color="#50B2C0" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <RadixOverlay />

          <RadixContent>
            <RadixTitle>Faça login para deixar sua avaliação</RadixTitle>

            <Button>
              <Image src={Google} alt="" />
              Entrar com Google
            </Button>

            <Button>
              <Image src={GitHub} alt="" />
              Entrar com GitHub
            </Button>

            <RadixClose>
              <X size={24} color="#8D95AF" />
            </RadixClose>
          </RadixContent>
        </Dialog.Portal>
      </Container>
    </Dialog.Root>
  )
}

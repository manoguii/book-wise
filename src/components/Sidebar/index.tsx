import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { Navigation } from '../Navigation'
import { Binoculars, ChartLineUp, SignIn, User } from '@phosphor-icons/react'
import { Button } from '../Button'
import { Container } from './styles'
import { Avatar } from '../Avatar'
import { DialogLogin } from './DialogLogin'

interface SidebarProps {
  isAuthenticated: 'loading' | 'authenticated' | 'unauthenticated'
  user?: {
    name: string | null | undefined
    avatar_url: string | null | undefined
  }
}

export function Sidebar({ isAuthenticated, user }: SidebarProps) {
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

          {isAuthenticated === 'authenticated' ? (
            <Navigation href="/profile" path="/profile">
              <User size={24} color="#8D95AF" />
              Perfil
            </Navigation>
          ) : null}
        </div>

        {isAuthenticated === 'authenticated' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Avatar size="sm" src={user?.avatar_url!} />
            <Button variant="secondary">
              {user?.name}
              <SignIn size={24} color="#F75A68" />
            </Button>
          </div>
        ) : (
          <>
            <Dialog.Trigger asChild>
              <Button variant="secondary">
                Fazer Login
                <SignIn size={24} color="#50B2C0" />
              </Button>
            </Dialog.Trigger>

            <DialogLogin />
          </>
        )}
      </Container>
    </Dialog.Root>
  )
}

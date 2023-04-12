import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { Navigation } from '../Navigation'
import { Binoculars, ChartLineUp, SignIn, User } from '@phosphor-icons/react'
import { Container } from './styles'
import { Avatar } from '../Avatar'
import { DialogLogin } from './DialogLogin'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '../_ui/Button'
import { Text } from '../_ui/Text'

export function Sidebar() {
  const session = useSession()

  const isAuthenticated = session.status

  const user = {
    name: session.data?.user?.name,
    avatar_url: session.data?.user?.image,
  }

  async function handleSignOut() {
    await signOut()
  }

  return (
    <Dialog.Root>
      <Container>
        <div>
          <Image src={Logo} alt="" />

          <Navigation href="/home">
            <ChartLineUp size={24} color="#8D95AF" />
            Inicio
          </Navigation>

          <Navigation href="/explorer">
            <Binoculars size={24} color="#8D95AF" />
            Explorar
          </Navigation>

          {isAuthenticated === 'authenticated' ? (
            <Navigation href="/profile">
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
              gap: 6,
            }}
          >
            <Avatar size="sm" src={user?.avatar_url!} />
            <Text>{user.name}</Text>
            <Button variant="secondary" onClick={handleSignOut}>
              logout
              <SignIn size={18} color="#F75A68" />
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

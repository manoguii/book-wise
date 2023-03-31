import Image from 'next/image'
import { Container } from './styles'
import Logo from '../../assets/logo.svg'
import { Navigation } from '../Navigation'
import { Binoculars, ChartLineUp, SignIn, User } from '@phosphor-icons/react'
import { Button } from '../Button'

export function Sidebar() {
  return (
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

      <Button variant="secondary">
        Fazer Login
        <SignIn size={24} color="#50B2C0" />
      </Button>
    </Container>
  )
}

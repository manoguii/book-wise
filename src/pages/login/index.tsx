import Image from 'next/image'
import { Container, ImageContainer, LoginMethod } from './styles'
import Logo from '../../assets/logo.svg'
import Google from '../../assets/google.svg'
import GitHub from '../../assets/github.svg'
import Rocket from '../../assets/rocket.svg'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()

  async function handleAsGuest() {
    await router.push('/home')
  }

  async function handleSignInWithGoogle() {
    await signIn('google')
    await router.push('/home')
  }

  async function handleSignInWithGithub() {
    await signIn('github')
    await router.push('/home')
  }

  return (
    <>
      <Container>
        <ImageContainer>
          <Image
            src={Logo}
            alt="Imagem com logo do site"
            width={222}
            quality={100}
          />
        </ImageContainer>

        <LoginMethod>
          <header>
            <Heading size="2xl">Boas vindas!</Heading>
            <Text as="span">Faça seu login ou acesse como visitante.</Text>
          </header>

          <div>
            <Button onClick={handleSignInWithGoogle}>
              <Image src={Google} alt="" />
              Entrar com Google
            </Button>
            <Button onClick={handleSignInWithGithub}>
              <Image src={GitHub} alt="" />
              Entrar com GitHub
            </Button>
            <Button onClick={handleAsGuest}>
              <Image src={Rocket} alt="" />
              Acessar como visitante
            </Button>
          </div>
        </LoginMethod>
      </Container>
    </>
  )
}

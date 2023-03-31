import Image from 'next/image'
import { Container, ImageContainer, LoginContainer } from './styles'
import Logo from '../../assets/logo.svg'
import Google from '../../assets/google.svg'
import GitHub from '../../assets/github.svg'
import Rocket from '../../assets/rocket.svg'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  async function handleNavigate() {
    await router.push('/home')
  }

  return (
    <Container>
      <ImageContainer>
        <Image
          src={Logo}
          alt="Imagem com logo do site"
          width={222}
          quality={100}
        />
      </ImageContainer>

      <LoginContainer>
        <header>
          <Heading size="2xl">Boas vindas!</Heading>
          <Text as="span">Faça seu login ou acesse como visitante.</Text>
        </header>

        <div>
          <Button>
            <Image src={Google} alt="" />
            Entrar com Google
          </Button>
          <Button>
            <Image src={GitHub} alt="" />
            Entrar com GitHub
          </Button>
          <Button onClick={handleNavigate}>
            <Image src={Rocket} alt="" />
            Acessar como visitante
          </Button>
        </div>
      </LoginContainer>
    </Container>
  )
}

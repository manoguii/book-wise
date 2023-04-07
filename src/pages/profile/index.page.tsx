import { Avatar } from '@/components/Avatar'
import { Heading } from '@/components/_ui/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/_ui/Text'
import { User } from '@phosphor-icons/react'
import { Container, ProfileContainer, UserInfo, UserRatings } from './styles'
import { UserMetrics } from './components/UserMetrics'
import { useSession } from 'next-auth/react'
import { TextInput } from '@/components/TextInput'
// import { EvaluationCard } from '../home/components/EvaluationCard'

interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const session = useSession()

  return (
    <Container>
      <Sidebar isAuthenticated={session.status} />

      <header>
        <User size={24} color="#50B2C0" weight="bold" />
        <Heading>Perfil</Heading>
      </header>

      <UserRatings>
        <div>
          <TextInput placeholder="Buscar livro avaliado" />
          <Text>Avaliações mais recentes</Text>
        </div>

        {/* <EvaluationCard /> */}
      </UserRatings>

      <ProfileContainer>
        <UserInfo>
          <Avatar size="md" />

          <Heading size="sm">Cristofer Rosser</Heading>

          <Text size="sm">membro desde 2019</Text>
        </UserInfo>

        <UserMetrics />
      </ProfileContainer>
    </Container>
  )
}

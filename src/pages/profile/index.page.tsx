import { Avatar } from '@/components/Avatar'
import { EvaluationCard } from '@/components/Cards/EvaluationCard'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { User } from '@phosphor-icons/react'
import { Container, ProfileContainer, UserInfo, UserRatings } from './styles'
import { UserMetrics } from './UserMetrics'

interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  return (
    <Container>
      <Sidebar />

      <header>
        <User size={24} color="#50B2C0" weight="bold" />
        <Heading>Perfil</Heading>
      </header>

      <UserRatings>
        <div>
          <TextInput placeholder="Buscar livro avaliado" />
          <Text>Avaliações mais recentes</Text>
        </div>

        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
      </UserRatings>

      <ProfileContainer>
        <UserInfo>
          <Avatar />

          <Heading size="sm">Cristofer Rosser</Heading>

          <Text size="sm">membro desde 2019</Text>
        </UserInfo>

        <UserMetrics />
      </ProfileContainer>
    </Container>
  )
}
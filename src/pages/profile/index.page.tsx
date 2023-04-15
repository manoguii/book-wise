import { Avatar } from '@/components/Avatar'
import { Heading } from '@/components/_ui/Heading'
import { Text } from '@/components/_ui/Text'
import { User } from '@phosphor-icons/react'
import { Container, ProfileContainer, UserInfo, UserRatings } from './styles'
import { UserMetrics } from './components/UserMetrics'
import { TextInput } from '@/components/TextInput'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { IBookRating } from '../@types/ratings'
import { EvaluationCard } from '@/components/EvaluationCard'
import { IMetrics } from '../@types/user'

interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const [ratings, setRatings] = useState<IBookRating[]>([])
  const [metrics, setMetrics] = useState<IMetrics>({} as IMetrics)
  const { data } = useSession()

  async function getUserRatings() {
    const { data } = await api.get('/user/seek-reviews')

    const ratings = data.ratings as IBookRating[]

    const metrics = data.metrics as IMetrics

    setRatings(ratings)
    setMetrics(metrics)
  }

  useEffect(() => {
    getUserRatings()
  }, [])

  return (
    <Container>
      <header>
        <User size={24} color="#50B2C0" weight="bold" />
        <Heading>Perfil</Heading>
      </header>

      <UserRatings>
        <div>
          <TextInput variant="sm" placeholder="Buscar livro avaliado" />
        </div>

        {ratings.map((rating) => {
          return <EvaluationCard key={rating.id} rating={rating} />
        })}
      </UserRatings>

      <ProfileContainer>
        <UserInfo>
          <Avatar src={data?.user?.image!} size="md" />

          <Heading size="sm">{data?.user?.name}</Heading>

          <Text size="sm">membro desde 2019</Text>
        </UserInfo>

        <UserMetrics metrics={metrics} />
      </ProfileContainer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

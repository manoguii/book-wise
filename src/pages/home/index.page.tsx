import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/Text'
import { ChartLineUp } from '@phosphor-icons/react'
import { BestRatedBooks } from './components/BestRatedBooks'
import { HomeContainer, HeaderHome, RecentReviews } from './styles'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { Rating } from '@prisma/client'
import { EvaluationCard } from './components/EvaluationCard'

interface IResponse {
  assessments: Array<
    Rating & {
      user: {
        image: string | null
        name: string
        avatar_url: string | null
      }
      book: {
        name: string
        author: string
        cover_url: string
      }
    }
  >
}

interface HomeProps {
  data: IResponse
}

export default function Home({ data }: HomeProps) {
  const session = useSession()

  const user = {
    name: session.data?.user?.name,
    avatar_url: session.data?.user?.image,
  }

  return (
    <HomeContainer>
      <Sidebar isAuthenticated={session.status} user={user} />

      <HeaderHome>
        <ChartLineUp size={24} color="#50B2C0" weight="bold" />
        <Heading>Inicio</Heading>
      </HeaderHome>

      <RecentReviews>
        <Text>Avaliações mais recentes</Text>

        {data.assessments.map((assessment) => {
          return <EvaluationCard key={assessment.id} assessment={assessment} />
        })}
      </RecentReviews>

      <BestRatedBooks />
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/assessments')

  return {
    props: {
      data: response.data,
    },
  }
}

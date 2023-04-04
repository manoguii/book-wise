import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/Text'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { Rating } from '@prisma/client'
import { EvaluationCard } from './components/EvaluationCard'
import { Button } from '@/components/Button'
import { BookCard } from '../explorer/components/BookCard'
import {
  Container,
  Header,
  RecentReviews,
  BestRatedBooks,
  BestRated,
} from './styles'

type Assessment = Rating & {
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

type IBestRated = {
  rate: number
  id: string
  book: {
    name: string
    author: string
    cover_url: string
  }
}

interface HomeProps {
  assessments: Assessment[]
  bestRated: IBestRated[]
}

export default function Home({ assessments, bestRated }: HomeProps) {
  const session = useSession()

  const user = {
    name: session.data?.user?.name,
    avatar_url: session.data?.user?.image,
  }

  return (
    <Container>
      <Sidebar isAuthenticated={session.status} user={user} />

      <Header>
        <ChartLineUp size={24} color="#50B2C0" weight="bold" />
        <Heading>Inicio</Heading>
      </Header>

      <RecentReviews>
        <Text>Avaliações mais recentes</Text>

        {assessments.map((assessment) => {
          return <EvaluationCard key={assessment.id} assessment={assessment} />
        })}
      </RecentReviews>

      <BestRated>
        <header>
          <Text>Livros populares</Text>
          <Button variant="tertiary">
            Ver todos <CaretRight size={16} color="#8381D9" />
          </Button>
        </header>

        <BestRatedBooks>
          {bestRated.map((book) => {
            return <BookCard key={book.id} bookInfo={book} />
          })}
        </BestRatedBooks>
      </BestRated>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/best-rating')

  return {
    props: {
      assessments: response.data.assessment,
      bestRated: response.data.book,
    },
  }
}

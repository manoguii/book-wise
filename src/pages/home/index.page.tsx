import * as Dialog from '@radix-ui/react-dialog'
import { IBook, IRating } from '@/pages/api/@types/ratings'
import { Text } from '@/components/_ui/Text'
import { Button } from '@/components/_ui/Button'
import { Heading } from '@/components/_ui/Heading'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { EvaluationCard } from '../../components/EvaluationCard'
import { BookCard } from '../../components/BookCard'
import { Container, Header, RecentReviews, BestRated } from './styles'
import { useRouter } from 'next/router'

interface HomeProps {
  ratings: IRating[]
  bestRatedBooks: IBook[]
}

export default function Home({ ratings, bestRatedBooks }: HomeProps) {
  const router = useRouter()

  async function handleNavigateToExplorer() {
    await router.push('/explorer')
  }

  return (
    <Container>
      <Header>
        <ChartLineUp size={24} color="#50B2C0" weight="bold" />
        <Heading>Inicio</Heading>
      </Header>

      <RecentReviews>
        <Text>Avaliações mais recentes</Text>

        {ratings.map((rating) => {
          return <EvaluationCard key={rating.id} rating={rating} />
        })}
      </RecentReviews>

      <BestRated>
        <header>
          <Text>Livros populares</Text>
          <Button variant="tertiary" onClick={handleNavigateToExplorer}>
            Ver todos <CaretRight size={16} color="#8381D9" />
          </Button>
        </header>

        <div>
          {bestRatedBooks.map((book) => {
            return (
              <Dialog.Root key={book.id}>
                <BookCard bookInfo={book} />
              </Dialog.Root>
            )
          })}
        </div>
      </BestRated>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/ratings')

  const ratings = data.ratings as IRating[]
  const bestRatedBooks = data.bestRatedBooks as IBook[]

  return {
    props: {
      ratings,
      bestRatedBooks,
    },
  }
}

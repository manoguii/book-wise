import * as Dialog from '@radix-ui/react-dialog'
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
import { IBookRating } from '../@types/ratings'
import { IBookInfo } from '../@types/books'

interface HomeProps {
  ratings: IBookRating[]
  bestRatedBooks: IBookInfo[]
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
  const response = await api.get('/ratings/get-all-ratings')
  const ratings = response.data.ratings as IBookRating[]

  const { data } = await api.get('/books/get-best-books')
  const bestRatedBooks = data.bestRatedBooks as IBookInfo[]

  return {
    props: {
      ratings,
      bestRatedBooks,
    },
  }
}

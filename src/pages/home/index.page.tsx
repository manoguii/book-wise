import { BookCard } from '@/components/BookCard'
import { Button } from '@/components/Button'
import { EvaluationCard } from '@/components/EvaluationCard'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/Text'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { BestRatedBooks, BestRatedBooksContent, Container } from './styles'

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <Container>
      <Sidebar />

      <header>
        <ChartLineUp size={24} color="#50B2C0" weight="bold" />
        <Heading>Inicio</Heading>
      </header>

      <main>
        <Text>Avaliações mais recentes</Text>

        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
      </main>

      <BestRatedBooks>
        <header>
          <Text>Livros populares</Text>
          <Button variant="tertiary">
            Ver todos <CaretRight size={16} color="#8381D9" />
          </Button>
        </header>

        <BestRatedBooksContent>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </BestRatedBooksContent>
      </BestRatedBooks>
    </Container>
  )
}

import { EvaluationCard } from '@/components/Cards/EvaluationCard'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Text } from '@/components/Text'
import { ChartLineUp } from '@phosphor-icons/react'
import { BestRatedBooks } from './BestRatedBooks'
import { Container, Header, RecentReviews } from './styles'

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <Container>
      <Sidebar />

      <Header>
        <ChartLineUp size={24} color="#50B2C0" weight="bold" />
        <Heading>Inicio</Heading>
      </Header>

      <RecentReviews>
        <Text>Avaliações mais recentes</Text>

        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
        <EvaluationCard />
      </RecentReviews>

      <BestRatedBooks />
    </Container>
  )
}

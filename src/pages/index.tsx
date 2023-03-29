import { BookCard } from '@/components/BookCard'
import { Card } from '@/components/Card'
import { EvaluationCard } from '@/components/EvaluationCard'

export default function Home() {
  return (
    <>
      <EvaluationCard />
      <Card />
      <BookCard />
    </>
  )
}

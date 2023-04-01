import { BookCard } from '@/components/Cards/BookCard'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { CaretRight } from '@phosphor-icons/react'
import { BestRatedBooksContainer, BestRatedBooksContent } from './styles'

export function BestRatedBooks() {
  return (
    <BestRatedBooksContainer>
      <header>
        <Text>Livros populares</Text>
        <Button variant="tertiary">
          Ver todos <CaretRight size={16} color="#8381D9" />
        </Button>
      </header>

      <BestRatedBooksContent>
        <BookCard />
      </BestRatedBooksContent>
    </BestRatedBooksContainer>
  )
}

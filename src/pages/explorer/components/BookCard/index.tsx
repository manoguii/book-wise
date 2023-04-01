import Image from 'next/image'
import { BookContainer, BookInfo, BookCardContainer } from './styles'
import Book from '../../../../../public/images/books/arquitetura-limpa.png'
import { MyRating } from '@/components/MyRating'
import { ReactNode } from 'react'
import { Text } from '@/components/Text'

interface BookCardProps {
  children?: ReactNode
}

export function BookCard({ children }: BookCardProps) {
  return (
    <BookCardContainer>
      <BookContainer>
        <Image src={Book} alt="Imagem do livro" width={80} height={112} />
      </BookContainer>

      <BookInfo>
        <div>
          <Text as="strong">A revolução dos bichos</Text>
          <Text as="span">George Orwell</Text>
        </div>

        <MyRating />

        {children}
      </BookInfo>
    </BookCardContainer>
  )
}

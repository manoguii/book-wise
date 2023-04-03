import Image from 'next/image'
import { BookContainer, BookInfo, BookCardContainer } from './styles'
import { MyRating } from '@/components/MyRating'
import { ReactNode } from 'react'
import { Text } from '@/components/Text'

interface BookCardProps {
  children?: ReactNode
  bookInfo: {
    rate: number
    book: {
      name: string
      author: string
      cover_url: string
    }
  }
}

export function BookCard({ children, bookInfo }: BookCardProps) {
  return (
    <BookCardContainer>
      <BookContainer>
        <Image
          src={bookInfo.book.cover_url}
          alt="Imagem do livro"
          width={80}
          height={112}
        />
      </BookContainer>

      <BookInfo>
        <div>
          <Text as="strong">{bookInfo.book.name}</Text>
          <Text as="span">{bookInfo.book.author}</Text>
        </div>

        <MyRating size={bookInfo.rate} />

        {children}
      </BookInfo>
    </BookCardContainer>
  )
}

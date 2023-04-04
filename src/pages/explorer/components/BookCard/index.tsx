import { MyRating } from '@/components/MyRating'
import { ReactNode } from 'react'
import { Text } from '@/components/Text'
import Image from 'next/image'
import {
  BookImage,
  BookInfo,
  BookCardContainer,
  BookInfoHeader,
} from './styles'

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
      <BookImage>
        <Image
          src={bookInfo.book.cover_url}
          alt="Imagem do livro"
          width={80}
          height={112}
        />
      </BookImage>

      <BookInfo>
        <BookInfoHeader>
          <Text as="strong">{bookInfo.book.name}</Text>
          <Text as="span">{bookInfo.book.author}</Text>
        </BookInfoHeader>

        <MyRating ratingAverage={bookInfo.rate} />

        {children}
      </BookInfo>
    </BookCardContainer>
  )
}

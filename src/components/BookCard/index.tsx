import { MyRating } from '@/components/MyRating'
import { ReactNode } from 'react'
import { Text } from '@/components/_ui/Text'
import Image from 'next/image'
import {
  BookImage,
  BookInfo,
  BookCardContainer,
  BookInfoHeader,
} from './styles'
import { IBook } from '@/pages/api/@types/ratings'

interface BookCardProps {
  children?: ReactNode
  bookInfo: IBook
}

export function BookCard({ children, bookInfo }: BookCardProps) {
  return (
    <BookCardContainer>
      <BookImage>
        <Image
          src={bookInfo.image}
          alt="Imagem do livro"
          width={80}
          height={112}
        />
      </BookImage>

      <BookInfo>
        <BookInfoHeader>
          <Text as="strong">{bookInfo.name}</Text>
          <Text as="span">{bookInfo.author}</Text>
        </BookInfoHeader>

        <MyRating ratingAverage={bookInfo.rate} />

        {children}
      </BookInfo>
    </BookCardContainer>
  )
}

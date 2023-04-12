import { Rating } from '@/components/Rating'
import { IBookInfo } from '@/pages/@types/books'
import { Text } from '@/components/_ui/Text'
import Image from 'next/image'
import {
  BookImage,
  BookInfo,
  BookCardContainer,
  RadixDialogTrigger,
} from './styles'

interface BookCardProps {
  bookInfo: IBookInfo
}

export function BookCard({ bookInfo }: BookCardProps) {
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
        <RadixDialogTrigger>
          <Text as="strong">{bookInfo.name}</Text>
          <Text as="span">{bookInfo.author}</Text>
        </RadixDialogTrigger>

        <Rating rating={bookInfo.ratingAverage} />
      </BookInfo>
    </BookCardContainer>
  )
}

import { Text } from '@/components/_ui/Text'
import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import { Rating } from '@/components/Rating'
import { RatedBook, EvaluationCardContainer, BookInfo } from './styles'
import { IBookRating } from '@/pages/@types/ratings'

interface EvaluationCardProps {
  rating: IBookRating
}

export function EvaluationCard({ rating }: EvaluationCardProps) {
  return (
    <div>
      <Text>{formatDate(rating.createdAt)}</Text>

      <EvaluationCardContainer>
        <RatedBook>
          <Image
            src={rating.bookImage}
            alt="Imagem do livro"
            width={108}
            height={152}
          />

          <BookInfo>
            <div>
              <Text size="xl" as="strong">
                {rating.bookName}
              </Text>
              <Text as="span" size="sm">
                {rating.bookAuthor}
              </Text>
            </div>

            <Rating rating={rating.rate} />
          </BookInfo>
        </RatedBook>

        <Text>{rating.description}</Text>
      </EvaluationCardContainer>
    </div>
  )
}

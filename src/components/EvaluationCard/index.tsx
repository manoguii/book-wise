import { Text } from '@/components/_ui/Text'
import { Avatar } from '@/components/Avatar'
import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import { Rating } from '@/components/Rating'
import {
  RatedBook,
  EvaluationCardContainer,
  UserInfo,
  BookInfo,
} from './styles'
import { IRating } from '@/pages/api/@types/ratings'

interface EvaluationCardProps {
  rating: IRating
}

export function EvaluationCard({ rating }: EvaluationCardProps) {
  return (
    <EvaluationCardContainer>
      <UserInfo>
        <div>
          <Avatar size="sm" src={rating.userAvatar!} />

          <div>
            <Text as="strong">{rating.userName}</Text>
            <Text as="time" size="sm">
              {formatDate(rating.createdAt)}
            </Text>
          </div>
        </div>

        <Rating rating={rating.rate} />
      </UserInfo>

      <RatedBook>
        <Image
          src={rating.bookImage}
          alt="Imagem do livro"
          width={108}
          height={152}
        />

        <BookInfo>
          <div>
            <Text as="strong">{rating.bookName}</Text>
            <Text as="span" size="sm">
              {rating.bookAuthor}
            </Text>
          </div>

          <Text size="sm">{rating.description}</Text>
        </BookInfo>
      </RatedBook>
    </EvaluationCardContainer>
  )
}

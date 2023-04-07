import { Text } from '@/components/_ui/Text'
import { Avatar } from '@/components/Avatar'
import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import { MyRating } from '@/components/MyRating'
import {
  RatedBook,
  EvaluationCardContainer,
  EvaluationUser,
  RatedBookImage,
  RatedBookInfo,
  EvaluationUserInfo,
} from './styles'
import { IRating } from '@/@types/best-rating'

interface EvaluationCardProps {
  rating: IRating
}

export function EvaluationCard({ rating }: EvaluationCardProps) {
  return (
    <EvaluationCardContainer>
      <EvaluationUser>
        <div>
          <Avatar size="sm" src={rating.userAvatar!} />

          <EvaluationUserInfo>
            <Text as="strong">{rating.userName}</Text>
            <Text as="time" size="sm">
              {formatDate(rating.createdAt)}
            </Text>
          </EvaluationUserInfo>
        </div>

        <MyRating ratingAverage={rating.rate} />
      </EvaluationUser>

      <RatedBook>
        <RatedBookImage>
          <Image
            src={rating.bookImage}
            alt="Imagem do livro"
            width={108}
            height={152}
          />
        </RatedBookImage>

        <RatedBookInfo>
          <div>
            <Text as="strong">{rating.bookName}</Text>
            <Text as="span" size="sm">
              {rating.bookAuthor}
            </Text>
          </div>

          <Text size="sm">{rating.description}</Text>
        </RatedBookInfo>
      </RatedBook>
    </EvaluationCardContainer>
  )
}

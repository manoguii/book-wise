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
import { Text } from '@/components/Text'
import { Avatar } from '@/components/Avatar'
import { formatDate } from '@/utils/format-date'

interface EvaluationCardProps {
  assessment: {
    rate: number
    description: string
    created_at: Date
    user: {
      image: string | null
      name: string
      avatar_url: string | null
    }
    book: {
      name: string
      author: string
      cover_url: string
    }
  }
}

export function EvaluationCard({ assessment }: EvaluationCardProps) {
  return (
    <EvaluationCardContainer>
      <EvaluationUser>
        <div>
          <Avatar size="sm" src={assessment.user.avatar_url!} />

          <EvaluationUserInfo>
            <Text as="strong">{assessment.user.name}</Text>
            <Text as="time" size="sm">
              {formatDate(assessment.created_at)}
            </Text>
          </EvaluationUserInfo>
        </div>

        <MyRating ratingAverage={assessment.rate} />
      </EvaluationUser>

      <RatedBook>
        <RatedBookImage>
          <Image
            src={assessment.book.cover_url}
            alt="Imagem do livro"
            width={108}
            height={152}
          />
        </RatedBookImage>

        <RatedBookInfo>
          <div>
            <Text as="strong">{assessment.book.name}</Text>
            <Text as="span" size="sm">
              {assessment.book.author}
            </Text>
          </div>

          <Text size="sm">{assessment.description}</Text>
        </RatedBookInfo>
      </RatedBook>
    </EvaluationCardContainer>
  )
}

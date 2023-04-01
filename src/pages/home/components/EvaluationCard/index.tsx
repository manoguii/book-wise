import Image from 'next/image'
import { MyRating } from '@/components/MyRating'
import {
  ContainerBook,
  EvaluationCardContainer,
  HeaderContainer,
  ImageBook,
  InfoBook,
  UserInfo,
} from './styles'
import { Text } from '@/components/Text'
import { Avatar } from '@/components/Avatar'

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
      <HeaderContainer>
        <div>
          <Avatar size="sm" src={assessment.user.avatar_url!} />

          <UserInfo>
            <Text as="strong">{assessment.user.name}</Text>
            <Text as="time" size="sm">
              Hoje
            </Text>
          </UserInfo>
        </div>

        <MyRating size={assessment.rate} />
      </HeaderContainer>

      <ContainerBook>
        <ImageBook>
          <Image
            src={assessment.book.cover_url}
            alt="Imagem do livro"
            width={108}
            height={152}
          />
        </ImageBook>

        <InfoBook>
          <div>
            <Text as="strong">{assessment.book.name}</Text>
            <Text as="span" size="sm">
              {assessment.book.author}
            </Text>
          </div>

          <Text size="sm">{assessment.description}</Text>
        </InfoBook>
      </ContainerBook>
    </EvaluationCardContainer>
  )
}

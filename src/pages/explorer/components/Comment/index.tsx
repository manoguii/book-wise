import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { CommentCardContainer, Header } from './styles'
import { MyRating } from '@/components/MyRating'
import { Rating, User } from '@prisma/client'
import { formatDate } from '@/utils/format-date'

interface CommentProps {
  rating: Rating & {
    user: User
  }
}

export function Comment({ rating }: CommentProps) {
  return (
    <CommentCardContainer>
      <Header>
        <div>
          <Avatar size="sm" src={rating.user.avatar_url!} />

          <div>
            <Text as="strong">{rating.user.name}</Text>
            <Text size="sm">{formatDate(rating.created_at)}</Text>
          </div>
        </div>

        <MyRating />
      </Header>

      <Text>{rating.description}</Text>
    </CommentCardContainer>
  )
}

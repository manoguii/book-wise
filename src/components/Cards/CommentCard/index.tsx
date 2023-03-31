import { Avatar } from '@/components/Avatar'
import BasicRating from '@/components/Rating'
import { Text } from '@/components/Text'
import { CommentCardContainer, Header } from './styles'

export function CommentCard() {
  return (
    <CommentCardContainer>
      <Header>
        <div>
          <Avatar size="sm" />

          <div>
            <Text as="strong">Brandon Botosh</Text>
            <Text size="sm">Há 2 dias</Text>
          </div>
        </div>

        <BasicRating />
      </Header>

      <Text>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </Text>
    </CommentCardContainer>
  )
}

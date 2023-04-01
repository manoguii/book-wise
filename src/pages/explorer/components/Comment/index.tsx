import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { CommentCardContainer, Header } from './styles'
import { MyRating } from '@/components/MyRating'

export function Comment() {
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

        <MyRating />
      </Header>

      <Text>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </Text>
    </CommentCardContainer>
  )
}

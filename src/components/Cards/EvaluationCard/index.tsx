import Image from 'next/image'
import { Avatar } from '../../Avatar'
import { Text } from '../../Text'
import Book from '../../../../public/images/books/domain-driven-design.png'
import {
  ContainerBook,
  EvaluationCardContainer,
  HeaderContainer,
  ImageBook,
  InfoBook,
  UserInfo,
} from './styles'
import { MyRating } from '@/components/MyRating'

export function EvaluationCard() {
  return (
    <EvaluationCardContainer>
      <HeaderContainer>
        <div>
          <Avatar size="sm" />

          <UserInfo>
            <Text as="strong">Jaxson Dias</Text>
            <Text as="time" size="sm">
              Hoje
            </Text>
          </UserInfo>
        </div>

        <MyRating />
      </HeaderContainer>

      <ContainerBook>
        <ImageBook>
          <Image src={Book} alt="Imagem do livro" width={108} height={152} />
        </ImageBook>

        <InfoBook>
          <div>
            <Text as="strong">O Hobbit</Text>
            <Text as="span" size="sm">
              J.R.R. Tolkien
            </Text>
          </div>

          <Text size="sm">
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et
            aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
            a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh... ver mais
          </Text>
        </InfoBook>
      </ContainerBook>
    </EvaluationCardContainer>
  )
}

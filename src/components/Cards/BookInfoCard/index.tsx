import Image from 'next/image'
import {
  BookDescription,
  BookInfo,
  BookInfoCardContainer,
  Metric,
} from './styles'
import Hábitos from '../../../../public/images/books/o-fim-da-eternidade.png'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import BasicRating from '@/components/Rating'
import { BookmarkSimple, BookOpen } from '@phosphor-icons/react'

export function BookInfoCard() {
  return (
    <BookInfoCardContainer>
      <BookDescription>
        <Image src={Hábitos} alt="" width={170} />

        <div>
          <div>
            <Heading size="sm">
              14 Hábitos de Desenvolvedores Altamente Produtivos
            </Heading>

            <Text>Zeno Rocha</Text>
          </div>

          <div>
            <BasicRating />
            <Text size="sm">3 Avaliações</Text>
          </div>
        </div>
      </BookDescription>

      <BookInfo>
        <Metric>
          <BookmarkSimple size={32} color="#50B2C0" />

          <div>
            <Text as="strong" size="lg">
              Computação
            </Text>
            <Text size="sm">Categoria</Text>
          </div>
        </Metric>

        <Metric>
          <BookOpen size={32} color="#50B2C0" />

          <div>
            <Text as="strong" size="lg">
              3852
            </Text>
            <Text size="sm">Páginas</Text>
          </div>
        </Metric>
      </BookInfo>
    </BookInfoCardContainer>
  )
}

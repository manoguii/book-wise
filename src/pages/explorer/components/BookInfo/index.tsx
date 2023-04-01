import Image from 'next/image'
import Book from '../../../../../public/images/books/o-fim-da-eternidade.png'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { BookmarkSimple, BookOpen } from '@phosphor-icons/react'
import { MyRating } from '@/components/MyRating'
import {
  BookDescription,
  BookInfoMetrics,
  BookInfoContainer,
  Metric,
} from './styles'

export function BookInfo() {
  return (
    <BookInfoContainer>
      <BookDescription>
        <Image src={Book} alt="" width={170} />

        <div>
          <div>
            <Heading size="sm">
              14 Hábitos de Desenvolvedores Altamente Produtivos
            </Heading>

            <Text>Zeno Rocha</Text>
          </div>

          <div>
            <MyRating />
            <Text size="sm">3 Avaliações</Text>
          </div>
        </div>
      </BookDescription>

      <BookInfoMetrics>
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
      </BookInfoMetrics>
    </BookInfoContainer>
  )
}

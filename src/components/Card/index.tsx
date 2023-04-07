import Image from 'next/image'
import Book from '../../../public/Book.svg'
import { ImageContainer, BookInfo, CardContainer } from './styles'
import { MyRating } from '@/components/MyRating'
import { Text } from '@/components/_ui/Text'
import { Heading } from '@/components/_ui/Heading'

export function Card() {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={Book} alt="Imagem do livro" width={112} height={156} />
      </ImageContainer>

      <BookInfo>
        <div>
          <header>
            <Text as="time" size="sm">
              hoje
            </Text>

            <MyRating />
          </header>

          <div>
            <Heading size="sm">A revolução dos bichos</Heading>
            <Text as="span" size="sm">
              George Orwell
            </Text>
          </div>
        </div>

        <Text>
          Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
          Penatibus id vestibulum imperdiet a at imperdiet lectu...
        </Text>
      </BookInfo>
    </CardContainer>
  )
}

import Image from 'next/image'
import { Heading } from '../Heading'
import BasicRating from '../Rating'
import { Text } from '../Text'
import Book from '../../../public/Book.svg'
import { BookContainer, BookInfo, CardContainer } from './styles'

export function Card() {
  return (
    <CardContainer>
      <BookContainer>
        <Image src={Book} alt="Imagem do livro" width={112} height={156} />
      </BookContainer>

      <BookInfo>
        <div>
          <header>
            <Text as="time" size="sm">
              hoje
            </Text>
            <BasicRating />
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

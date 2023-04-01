import Image from 'next/image'
import { BookContainer, BookInfo, BookCardContainer } from './styles'
import Book from '../../../../public/images/books/arquitetura-limpa.png'
import { Text } from '../../Text'
import BasicRating from '../../Rating'

export function BookCard() {
  return (
    <BookCardContainer>
      <BookContainer>
        <Image src={Book} alt="Imagem do livro" width={80} height={112} />
      </BookContainer>

      <BookInfo>
        <div>
          <Text as="strong">A revolução dos bichos</Text>
          <Text as="span">George Orwell</Text>
        </div>

        <BasicRating />
      </BookInfo>
    </BookCardContainer>
  )
}

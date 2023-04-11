import * as Dialog from '@radix-ui/react-dialog'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Heading } from '@/components/_ui/Heading'
import { Tag } from '@/components/Tag'
import { Binoculars } from '@phosphor-icons/react'
import { Books, Categories, Container, Header } from './styles'
import { DialogBook } from './components/DialogBook'
import { BookCard } from '../../components/BookCard'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'
import { Category } from '@prisma/client'
import { TextInput } from '@/components/TextInput'
import { IBookInfo } from '../api/@types/books'

interface ExplorerProps {
  books: IBookInfo[]
  categories: Category[]
}

export default function Explorer({ books, categories }: ExplorerProps) {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto' },
  })

  return (
    <Container>
      <Header>
        <div>
          <Binoculars size={24} color="#50B2C0" weight="bold" />
          <Heading>Explorar</Heading>
        </div>

        <TextInput variant="sm" placeholder="Buscar livro ou autor" />
      </Header>

      <Categories ref={sliderRef} className="keen-slider">
        {categories.map((category) => {
          return (
            <Tag
              className="keen-slider__slide"
              key={category.id}
              style={{ maxWidth: 'max-content', minWidth: 'max-content' }}
            >
              {category.name}
            </Tag>
          )
        })}
      </Categories>

      <Books>
        {books.map((book) => {
          return (
            <Dialog.Root key={book.id}>
              <BookCard bookInfo={book} />

              <DialogBook bookInfo={book} />
            </Dialog.Root>
          )
        })}
      </Books>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/books')

  const allBooks = data.books as IBookInfo[]
  const allCategories = data.categories as Category[]

  return {
    props: {
      books: allBooks,
      categories: allCategories,
    },
  }
}

import * as Dialog from '@radix-ui/react-dialog'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Heading } from '@/components/_ui/Heading'
import { Binoculars } from '@phosphor-icons/react'
import { DialogBook } from './components/DialogBook'
import { BookCard } from '../../components/BookCard'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'
import { Category } from '@prisma/client'
import { TextInput } from '@/components/TextInput'
import { IAllBookInfo } from '../@types/books'
import { useEffect, useState } from 'react'
import {
  Books,
  Categories,
  Container,
  Header,
  RadixToggleGroupItem,
  RadixToggleGroupRoot,
} from './styles'

interface ExplorerProps {
  categories: Category[]
}

export default function Explorer({ categories }: ExplorerProps) {
  const [books, setBooks] = useState<IAllBookInfo[]>([])
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: 'free-snap',
    renderMode: 'performance',
    slides: { perView: 'auto', origin: 0 },
  })

  async function handleFilterByCategory(category: string) {
    const { data } = await api.get(
      `/books/get-by-category?category=${category}`,
    )

    const books = data.books as IAllBookInfo[]

    setBooks(books)
  }

  useEffect(() => {
    handleFilterByCategory('Programação')
  }, [])

  return (
    <Container>
      <Header>
        <div>
          <Binoculars size={24} color="#50B2C0" weight="bold" />
          <Heading>Explorar</Heading>
        </div>

        <TextInput variant="sm" placeholder="Buscar livro ou autor" />
      </Header>

      <RadixToggleGroupRoot type="single" defaultValue="Programação" asChild>
        <Categories ref={sliderRef} className="keen-slider">
          {categories.map((category) => {
            return (
              <RadixToggleGroupItem
                className="keen-slider__slide"
                key={category.id}
                value={category.name}
                onClick={() => handleFilterByCategory(category.name)}
                style={{
                  maxWidth: 'max-content',
                  minWidth: 'max-content',
                }}
              >
                {category.name}
              </RadixToggleGroupItem>
            )
          })}
        </Categories>
      </RadixToggleGroupRoot>

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
  const { data } = await api.get('/books/get-all-categories')
  const allCategories = data.categories as Category[]

  return {
    props: {
      categories: allCategories,
    },
  }
}

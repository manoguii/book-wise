import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@/components/_ui/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Tag } from '@/components/Tag'
import { Binoculars } from '@phosphor-icons/react'
import { Books, Categories, Container, Header } from './styles'
import { DialogBook } from './components/DialogBook'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/_ui/Button'
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

export default function Explorer({ books }: ExplorerProps) {
  const session = useSession()

  const user = {
    name: session.data?.user?.name,
    avatar_url: session.data?.user?.image,
  }

  return (
    <Container>
      <Sidebar isAuthenticated={session.status} user={user} />

      <Header>
        <div>
          <Binoculars size={24} color="#50B2C0" weight="bold" />
          <Heading>Explorar</Heading>
        </div>

        <TextInput variant="sm" placeholder="Buscar livro ou autor" />
      </Header>

      <Categories>
        <Tag>Computação</Tag>
        <Tag>Educação</Tag>
        <Tag>Terror</Tag>
        <Tag>Hqs</Tag>
      </Categories>

      <Books>
        {books.map((book) => {
          return (
            <Dialog.Root key={book.id}>
              <BookCard bookInfo={book}>
                <Dialog.Trigger asChild>
                  <Button variant="tertiary">ver mais</Button>
                </Dialog.Trigger>
              </BookCard>

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

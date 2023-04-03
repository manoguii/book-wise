import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Tag } from '@/components/Tag'
import { TextInput } from '@/components/TextInput'
import { Binoculars } from '@phosphor-icons/react'
import { Books, Categories, Container, Header } from './styles'
import { DialogBook } from './components/DialogBook'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/Button'
import { BookCard } from './components/BookCard'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'
import { Book, Rating, User } from '@prisma/client'

type Ratings = Rating & {
  user: User
}

export type IBook = Book & {
  ratings: Ratings[]
}

interface ExplorerProps {
  books: IBook[]
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
          const rate = book.ratings[0].rate

          const bookInfo = {
            rate,
            book: {
              name: book.name,
              author: book.author,
              cover_url: book.cover_url,
            },
          }

          const assessments = book.ratings.length

          return (
            <Dialog.Root key={book.id}>
              <BookCard bookInfo={bookInfo}>
                <Dialog.Trigger asChild>
                  <Button variant="tertiary">ver mais</Button>
                </Dialog.Trigger>
              </BookCard>

              <DialogBook book={book} assessments={assessments} rate={rate} />
            </Dialog.Root>
          )
        })}
      </Books>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/books')

  return {
    props: {
      books: response.data.books,
    },
  }
}

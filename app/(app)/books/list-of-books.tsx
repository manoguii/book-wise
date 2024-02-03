import { BookCard } from '@/components/book-card'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { Grid } from '@/components/grid'
import { Pagination } from '@/components/pagination'
import fetchBooks from '@/db/query/fetch-all-books'
import fetchBooksByQuery from '@/db/query/fetch-books-by-query'

interface Items {
  books: {
    id: string
    name: string
    author: string
    coverUrl: string
    summary: string
    totalPages: number
    createdAt: Date | null
    averageRating: string | null
  }[]
  totalPages: number
}

interface ListOfBooksProps {
  mode: 'search' | 'explore'
  currentPage: number
  query: string
}

export async function ListOfBooks({
  currentPage,
  mode,
  query,
}: ListOfBooksProps) {
  let items: Items = {
    books: [],
    totalPages: 0,
  }

  switch (mode) {
    case 'search':
      items = await fetchBooksByQuery({
        page: currentPage,
        search: query,
      })

      break
    case 'explore':
      items = await fetchBooks({
        page: currentPage,
      })
      break
    default:
      break
  }

  return (
    <div className="grid items-center gap-4">
      <Grid className="mb-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {items.books.length > 0 ? (
          items.books.map((book) => (
            <Grid.Item key={book.id} className="animate-fadeIn">
              <BookCard book={book} />
            </Grid.Item>
          ))
        ) : (
          <EmptyPlaceholder className="col-span-6">
            <EmptyPlaceholder.Icon name="logo" />
            <EmptyPlaceholder.Title>
              Nenhuma prato encontrado
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Nenhum resultado encontrado para{' '}
              <span className="text-primary">{`"${query}"`}</span>.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </Grid>

      {items.books.length > 0 && <Pagination totalPages={items.totalPages} />}
    </div>
  )
}

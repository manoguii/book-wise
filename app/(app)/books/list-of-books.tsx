import { BookCard } from '@/components/book-card'
import { Grid } from '@/components/grid'
import fetchAllBooks from '@/db/query/fetch-all-books'

export async function ListOfBooks() {
  const books = await fetchAllBooks()

  return (
    <Grid className="mb-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <Grid.Item key={book.id} className="animate-fadeIn">
          <BookCard book={book} />
        </Grid.Item>
      ))}
    </Grid>
  )
}

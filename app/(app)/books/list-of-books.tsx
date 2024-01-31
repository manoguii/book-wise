import { BookCard } from '@/components/book-card'
import { Grid } from '@/components/grid'
import { fetchAllBooks } from '@/db/query/fetch-all-books'

export async function ListOfBooks() {
  const books = await fetchAllBooks()

  return books.map((book) => (
    <Grid.Item key={book.id} className="animate-fadeIn">
      <BookCard book={book} />
    </Grid.Item>
  ))
}

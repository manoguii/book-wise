import { BookCard } from '@/components/book-card'
import { Grid } from '@/components/grid'
import { Icons } from '@/components/icons'
import { SearchInput } from '@/components/search-input'
import { fetchAllBooks } from '@/db/query/fetch-all-books'

export default async function BooksPage() {
  const books = await fetchAllBooks()

  return (
    <main className="m-2 space-y-10">
      <h1 className="text-2xl font-bold">
        <Icons.binoculars className="mr-2 inline-block h-8 w-8" />
        Explorar
      </h1>
      <SearchInput />
      <Grid className="mb-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <Grid.Item key={book.id} className="animate-fadeIn">
            <BookCard book={book} />
          </Grid.Item>
        ))}
      </Grid>
    </main>
  )
}

import { BookCardSkeleton } from '@/components/book-card'
import { Grid } from '@/components/grid'
import { Icons } from '@/components/icons'
import { SearchInput } from '@/components/search-input'
import { ListOfBooks } from './list-of-books'
import { Suspense } from 'react'

export default async function BooksPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">
        <Icons.binoculars className="mr-2 inline-block h-8 w-8" />
        Explorar
      </h1>
      <SearchInput />

      <Suspense
        fallback={
          <Grid className="mb-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </Grid>
        }
      >
        <ListOfBooks />
      </Suspense>
    </>
  )
}

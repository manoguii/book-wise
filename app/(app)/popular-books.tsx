import { BookCard } from '@/components/book-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import fetchPopularBooks from '@/db/query/fetch-popular-books'

export async function PopularBooks() {
  const popularBooks = await fetchPopularBooks()

  return (
    <Carousel>
      <CarouselContent>
        {popularBooks.map((book) => (
          <CarouselItem className="md:basis-1/2" key={book.id}>
            <BookCard book={book} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

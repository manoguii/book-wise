import { BookCard } from '@/components/book-card'
import { fetchRecommendedBooks } from '@/db/query/fetch-recommended-books'

export async function PopularBooks() {
  const recommendedBooks = await fetchRecommendedBooks()

  return recommendedBooks.map((book) => <BookCard key={book.id} book={book} />)
}

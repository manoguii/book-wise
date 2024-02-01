import { BookCard } from '@/components/book-card'
import { buttonVariants } from '@/components/ui/button'
import fetchRecommendedBooks from '@/db/query/fetch-recommended-books'
import Link from 'next/link'

export async function PopularBooks() {
  const recommendedBooks = await fetchRecommendedBooks()

  return (
    <div className="basis-2/6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">Livros populares</p>
        <Link
          href="/books"
          className={buttonVariants({
            variant: 'link',
            size: 'sm',
          })}
        >
          Ver todos
        </Link>
      </div>
      {recommendedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

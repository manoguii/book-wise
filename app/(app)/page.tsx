import { BookCard } from '@/components/book-card'
import {
  RatingCard,
  RatingCardContent,
  RatingCardHeader,
} from '@/components/rating-card'
import { fetchRecentReviews } from '@/db/query/fetch-recent-reviews'
import { fetchRecommendedBooks } from '@/db/query/fetch-recommended-books'
import { LineChart } from 'lucide-react'

export default async function Home() {
  const recentReviews = await fetchRecentReviews()
  const recommendedBooks = await fetchRecommendedBooks()

  return (
    <main className="m-2 space-y-10">
      <h1 className="text-2xl font-bold">
        <LineChart className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Inicio
      </h1>

      <div className="flex gap-5">
        <div className="basis-4/6 space-y-4">
          {recentReviews.map(({ book, rating, user }) => {
            if (!book || !user) throw new Error('Book or user not found')

            return (
              <RatingCard key={rating.id}>
                <RatingCardHeader
                  user={{
                    id: user.id,
                    name: user.name || '',
                    image: user.image || '',
                    rating: rating.rate,
                    ratedIn: rating.createdAt || new Date(),
                  }}
                />

                <RatingCardContent
                  book={{
                    title: book.name,
                    author: book.author,
                    description: rating.description,
                    image: book.coverUrl,
                  }}
                />
              </RatingCard>
            )
          })}
        </div>

        <div className="basis-2/6 space-y-4">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  )
}

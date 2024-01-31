import { LineChart } from 'lucide-react'
import { MostRecentReviews } from './most-recent-reviews'
import { PopularBooks } from './popular-books'
import { Suspense } from 'react'
import { RatingCardSkeleton } from '@/components/rating-card'
import { BookCardSkeleton } from '@/components/book-card'

export default async function Home() {
  return (
    <main className="m-2 space-y-10">
      <h1 className="text-2xl font-bold">
        <LineChart className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Inicio
      </h1>
      <div className="flex gap-5">
        <div className="basis-4/6 space-y-4">
          <Suspense
            fallback={Array.from({ length: 5 }).map((_, i) => (
              <RatingCardSkeleton key={i} />
            ))}
          >
            <MostRecentReviews />
          </Suspense>
        </div>
        <div className="basis-2/6 space-y-4">
          <Suspense
            fallback={Array.from({ length: 5 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          >
            <PopularBooks />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

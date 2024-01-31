import { Suspense } from 'react'
import { BookDetails, BookDetailsSkeleton } from './book-details'
import { BookReviews, BookReviewsSkeleton } from './book-reviews'
import { BookMetrics, BookMetricsSkeleton } from './book-metrics'

export default async function BookPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  return (
    <main className="m-2 space-y-10">
      <div className="flex flex-col gap-4">
        <Suspense fallback={<BookDetailsSkeleton />}>
          <BookDetails bookId={params.id} />
        </Suspense>
        <Suspense fallback={<BookMetricsSkeleton />}>
          <BookMetrics bookId={params.id} />
        </Suspense>
      </div>

      <div className="space-y-5">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <BookReviewsSkeleton key={i} />
          ))}
        >
          <BookReviews bookId={params.id} />
        </Suspense>
      </div>
    </main>
  )
}

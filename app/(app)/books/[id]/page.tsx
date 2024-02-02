import { Suspense } from 'react'

import { auth } from '@/auth-config'
import { EvaluateBookForm } from '@/components/form/evaluate-book'

import { BookDetails, BookDetailsSkeleton } from './book-details'
import { BookMetrics, BookMetricsSkeleton } from './book-metrics'
import { BookReviews, BookReviewsSkeleton } from './book-reviews'

export default async function BookPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const session = await auth()

  return (
    <>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<BookDetailsSkeleton />}>
          <BookDetails bookId={params.id} />
        </Suspense>
        <Suspense fallback={<BookMetricsSkeleton />}>
          <BookMetrics bookId={params.id} />
        </Suspense>
      </div>

      <div className="space-y-5">
        {session && (
          <EvaluateBookForm bookId={params.id} user={session?.user} />
        )}
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <BookReviewsSkeleton key={i} />
          ))}
        >
          <BookReviews bookId={params.id} />
        </Suspense>
      </div>
    </>
  )
}

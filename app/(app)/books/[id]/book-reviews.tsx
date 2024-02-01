import fetchBookReviews from '@/db/query/fetch-book-reviews'
import {
  RatingCard,
  RatingCardDescription,
  RatingCardHeader,
} from '@/components/rating-card'
import { Skeleton } from '@/components/ui/skeleton'

export async function BookReviews({ bookId }: { bookId: string }) {
  const bookReviews = await fetchBookReviews(bookId)

  return bookReviews.map((review) => {
    if (!review.user) throw new Error('User not found')

    return (
      <RatingCard className="space-y-4" key={review.id}>
        <RatingCardHeader
          data={{
            id: review.user.id,
            name: review.user.name || '',
            image: review.user.image || '',
            ratedIn: review.createdAt || new Date(),
            rating: review.rate,
          }}
        />

        <RatingCardDescription description={review.description} />
      </RatingCard>
    )
  })
}

export const BookReviewsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-4 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  )
}

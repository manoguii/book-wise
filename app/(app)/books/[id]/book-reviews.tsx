import {
  RatingCard,
  RatingCardDescription,
  RatingCardHeader,
} from '@/components/rating-card'
import { Skeleton } from '@/components/ui/skeleton'
import fetchBookReviews from '@/db/query/fetch-book-reviews'

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
    <RatingCard.Skeleton>
      <RatingCardHeader.Skeleton />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </RatingCard.Skeleton>
  )
}

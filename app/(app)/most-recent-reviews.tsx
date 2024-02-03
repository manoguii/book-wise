import { Pagination } from '@/components/pagination'
import {
  RatingCard,
  RatingCardContent,
  RatingCardHeader,
} from '@/components/rating-card'
import fetchRecentReviews from '@/db/query/fetch-recent-reviews'

export async function MostRecentReviews({
  currentPage,
}: {
  currentPage: number
}) {
  const recentReviews = await fetchRecentReviews({
    page: currentPage,
  })

  return (
    <div className="space-y-4">
      {recentReviews.ratings.map((rating) => {
        if (!rating.book || !rating.user)
          throw new Error('Book or user not found')

        return (
          <RatingCard key={rating.id}>
            <RatingCardHeader
              data={{
                id: rating.user.id,
                name: rating.user.name || '',
                image: rating.user.image || '',
                rating: rating.rate,
                ratedIn: rating.createdAt || new Date(),
              }}
            />

            <RatingCardContent
              book={{
                title: rating.book.name,
                author: rating.book.author,
                description: rating.description,
                image: rating.book.coverUrl,
              }}
            />
          </RatingCard>
        )
      })}

      {recentReviews.ratings.length > 0 && (
        <Pagination totalPages={recentReviews.totalPages} />
      )}
    </div>
  )
}

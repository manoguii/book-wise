import { Rating } from '@smastrom/react-rating'

import { Pagination } from '@/components/pagination'
import { RatingCard, RatingCardContent } from '@/components/rating-card'
import fetchRecentReviews from '@/db/query/fetch-recent-reviews'

export async function UserReviews({ currentPage }: { currentPage: number }) {
  const recentReviews = await fetchRecentReviews({
    page: currentPage,
  })

  return (
    <div className="space-y-8">
      {recentReviews.ratings.map(({ book, rating, user }) => {
        if (!book || !user) throw new Error('Book or user not found')
        const createdAt = new Date(rating.createdAt!)

        return (
          <RatingCard key={rating.id}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {createdAt.toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <Rating
                value={rating.rate}
                readOnly
                style={{ maxWidth: 80, color: 'yellow' }}
              />
            </div>
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

      {recentReviews.ratings.length > 0 && (
        <Pagination totalPages={recentReviews.totalPages} />
      )}
    </div>
  )
}

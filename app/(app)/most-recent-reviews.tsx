import {
  RatingCard,
  RatingCardContent,
  RatingCardHeader,
} from '@/components/rating-card'
import fetchRecentReviews from '@/db/query/fetch-recent-reviews'

export async function MostRecentReviews() {
  const recentReviews = await fetchRecentReviews()

  return (
    <div className="basis-4/6 space-y-4">
      <div className="flex h-9 items-center justify-between gap-2">
        <p className="font-medium">Avaliações mais recentes</p>
      </div>
      {recentReviews.map(({ book, rating, user }) => {
        if (!book || !user) throw new Error('Book or user not found')

        return (
          <RatingCard key={rating.id}>
            <RatingCardHeader
              data={{
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
  )
}

import { Rating } from '@smastrom/react-rating'

import { auth } from '@/auth-config'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { Pagination } from '@/components/pagination'
import { RatingCard, RatingCardContent } from '@/components/rating-card'
import fetchUserReviews from '@/db/query/fetch-user-reviews'

export async function UserReviews({ currentPage }: { currentPage: number }) {
  const session = await auth()
  if (!session) throw new Error('User not found')
  const { user } = session
  const userReviews = await fetchUserReviews(user.id, {
    page: currentPage,
  })

  return (
    <div className="space-y-8">
      {userReviews.ratings.length > 0 ? (
        userReviews.ratings.map((rating) => {
          if (!rating.book) throw new Error('Book or user not found')
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
                  title: rating.book.name,
                  author: rating.book.author,
                  image: rating.book.coverUrl,
                  description: rating.description,
                }}
              />
            </RatingCard>
          )
        })
      ) : (
        <EmptyPlaceholder className="col-span-6">
          <EmptyPlaceholder.Icon name="logo" />
          <EmptyPlaceholder.Title>
            Nenhuma avaliação encontrada
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Você ainda não avaliou nenhum livro.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}

      {userReviews.ratings.length > 0 && (
        <Pagination totalPages={userReviews.totalPages} />
      )}
    </div>
  )
}

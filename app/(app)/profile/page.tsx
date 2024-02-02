import { User2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { auth } from '@/auth-config'
import { MetricCard } from '@/components/metric-card'
import { RatingCard, RatingCardContent } from '@/components/rating-card'
import { SearchInput } from '@/components/search-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { getInitials } from '@/lib/utils'

import { UserMetrics } from './user-metrics'
import { UserReviews } from './user-reviews'

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: {
    page?: number
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  const session = await auth()

  if (!session) {
    notFound()
  }

  const { user } = session
  return (
    <>
      <h1 className="text-2xl font-bold">
        <User2 className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Perfil
      </h1>
      <div className="flex gap-10">
        <div className="basis-full space-y-8 lg:basis-4/6">
          <SearchInput />

          <Suspense
            key={currentPage}
            fallback={Array.from({ length: 5 }).map((_, i) => (
              <RatingCard.Skeleton key={i}>
                <div className="mb-3 flex items-center justify-between">
                  <Skeleton className="mt-2 h-3 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <RatingCardContent.Skeleton />
              </RatingCard.Skeleton>
            ))}
          >
            <UserReviews currentPage={currentPage} />
          </Suspense>
        </div>

        <div className="hidden basis-2/6 flex-col items-center gap-8 rounded-lg lg:flex">
          <div className="grid gap-5">
            <Avatar className="h-20 w-20 place-self-center">
              <AvatarImage src={user.image || ''} alt={user.name || ''} />
              <AvatarFallback>{getInitials(user.name || '')}</AvatarFallback>
            </Avatar>
            <div className="grid place-items-center space-y-2">
              <p className="truncate text-center text-xl font-semibold leading-none">
                {user.name || ''}
              </p>
              <p className="truncate text-center text-base text-muted-foreground">
                {user.email || ''}
              </p>
            </div>
          </div>

          <div className="h-1 w-8 rounded-full bg-cyan-500" />

          <Suspense
            fallback={
              <div className="grid w-full gap-4">
                <MetricCard.Skeleton />
                <MetricCard.Skeleton />
                <MetricCard.Skeleton />
                <MetricCard.Skeleton />
              </div>
            }
          >
            <UserMetrics />
          </Suspense>
        </div>
      </div>
    </>
  )
}

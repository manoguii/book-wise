import { User2 } from 'lucide-react'
import { Suspense } from 'react'
import { UserReviews } from './user-reviews'
import { RatingCard, RatingCardContent } from '@/components/rating-card'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchInput } from '@/components/search-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { auth } from '@/auth-config'
import { notFound } from 'next/navigation'
import { MetricCard } from '@/components/metric-card'

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

          <div className="grid w-full gap-4">
            <MetricCard title="Páginas lidas" value="3920" icon="bookOpen" />
            <MetricCard title="Livros avaliados" value="15" icon="library" />
            <MetricCard title="Autores lidos" value="8" icon="bookUser" />
            <MetricCard
              title="Categoria mais lida"
              value="Computação"
              icon="bookmark"
            />
          </div>
        </div>
      </div>
    </>
  )
}

import { LineChart } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { BookCardSkeleton } from '@/components/book-card'
import {
  RatingCard,
  RatingCardContent,
  RatingCardHeader,
} from '@/components/rating-card'
import { buttonVariants } from '@/components/ui/button'

import { MostRecentReviews } from './most-recent-reviews'
import { PopularBooks } from './popular-books'

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: number
  }
}) {
  const currentPage = Number(searchParams?.page) || 1

  return (
    <>
      <h1 className="text-2xl font-bold">
        <LineChart className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Inicio
      </h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">Livros populares</p>
          <Link
            href="/books"
            className={buttonVariants({
              variant: 'link',
              size: 'sm',
            })}
          >
            Ver todos
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="hidden md:block">
                <BookCardSkeleton key={0} />
              </div>
              <BookCardSkeleton key={1} />
            </div>
          }
        >
          <PopularBooks />
        </Suspense>
      </div>

      <div className="flex gap-5">
        <div className="basis-full space-y-4 lg:basis-4/6">
          <div className="flex h-9 items-center justify-between gap-2">
            <p className="font-medium">Avaliações mais recentes</p>
          </div>
          <Suspense
            key={currentPage}
            fallback={Array.from({ length: 5 }).map((_, i) => (
              <RatingCard.Skeleton key={i}>
                <RatingCardHeader.Skeleton />
                <RatingCardContent.Skeleton />
              </RatingCard.Skeleton>
            ))}
          >
            <MostRecentReviews currentPage={currentPage} />
          </Suspense>
        </div>

        <div className="hidden lg:block">{/* Aside content */}</div>
      </div>
    </>
  )
}

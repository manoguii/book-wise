import { LineChart } from 'lucide-react'
import { MostRecentReviews } from './most-recent-reviews'
import { PopularBooks } from './popular-books'
import { Suspense } from 'react'
import { RatingCardSkeleton } from '@/components/rating-card'
import { BookCardSkeleton } from '@/components/book-card'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

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

      <div className="flex gap-5">
        <Suspense
          fallback={
            <div className="basis-4/6 space-y-4">
              <div className="flex h-9 items-center justify-between gap-2">
                <p className="font-medium">Avaliações mais recentes</p>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <MostRecentReviews currentPage={currentPage} />
        </Suspense>
        <Suspense
          fallback={
            <div className="basis-2/6 space-y-4">
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
              {Array.from({ length: 5 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PopularBooks />
        </Suspense>
      </div>
    </>
  )
}

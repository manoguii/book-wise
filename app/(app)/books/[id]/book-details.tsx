import getBookById from '@/db/query/get-book-by-id'
import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export async function BookDetails({ bookId }: { bookId: string }) {
  const book = await getBookById(bookId)

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg border bg-card p-10 md:flex-row md:items-start">
      <div className="basis-2/6">
        <Image
          src={book.coverUrl.replace('public', '').replace('.jpg', '.png')}
          alt={book.name}
          width={240}
          height={360}
          quality={100}
          priority
          className="mr-auto max-h-80 max-w-60 rounded-lg"
        />
      </div>

      <div className="flex basis-4/6 flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="space-y-2 sm:min-w-72">
            <h2 className="text-2xl font-bold md:text-3xl">{book.name}</h2>
            <p className="text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex min-w-24 flex-col gap-2">
            <Rating
              value={Number(book.averageRating)}
              readOnly
              style={{ maxWidth: 120, color: 'yellow' }}
            />
            <p className="text-muted-foreground">
              {book.ratingCount === '1'
                ? `${book.ratingCount} avaliação`
                : `${book.ratingCount} avaliações`}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground">{book.summary}</p>
      </div>
    </div>
  )
}

export function BookDetailsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 rounded-lg border bg-card p-10 md:flex-row md:items-start">
      <div className="basis-2/6">
        <Skeleton className="mr-auto h-80 w-60 rounded-lg" />
      </div>

      <div className="flex w-full basis-4/6 flex-col gap-4">
        <div className="mt-2 flex flex-wrap justify-between gap-3">
          <div className="space-y-2 sm:min-w-72">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex min-w-24 flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
        </div>
      </div>
    </div>
  )
}

import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import Link from 'next/link'

import { Book } from '@/types/definitions'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Skeleton } from './ui/skeleton'

export function BookCard({ book }: { book: Book & { rate: string } }) {
  return (
    <Link href={`/books/${book.id}`} className="block">
      <Card className="flex">
        <div className="py-6 pl-6">
          <Image
            src={book.coverUrl.replace('public', '').replace('.jpg', '.png')}
            alt={book.name}
            width={80}
            height={112}
            className="max-h-28 max-w-20 object-cover"
          />
        </div>

        <div className="grid">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-lg">{book.name}</CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {book.author}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Rating
              readOnly
              value={Number(book.rate)}
              style={{ maxWidth: 80 }}
            />
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export function BookCardSkeleton() {
  return (
    <Card className="flex">
      <div className="py-6 pl-6">
        <Skeleton className="h-28 w-20" />
      </div>

      <div className="grid">
        <CardHeader>
          <CardTitle className="line-clamp-1">
            <Skeleton className="h-4 w-40" />
          </CardTitle>
          <CardDescription className="line-clamp-2">
            <Skeleton className="h-3 w-20" />
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <Skeleton className="h-4 w-16" />
        </CardContent>
      </div>
    </Card>
  )
}

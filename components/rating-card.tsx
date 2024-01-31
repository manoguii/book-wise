import * as React from 'react'

import { cn, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'
import { Rating } from '@smastrom/react-rating'
import { Skeleton } from './ui/skeleton'

interface RatingCardHeaderProps {
  data: {
    id: string
    name: string
    image: string
    rating: number
    ratedIn: Date
  }
}

interface RatingCardContentProps {
  book: {
    title: string
    author: string
    description: string
    image: string
  }
}

const RatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}
    {...props}
  />
))
RatingCard.displayName = 'RatingCard'

const RatingCardHeader = ({ data }: RatingCardHeaderProps) => {
  const createdAt = new Date(data.ratedIn)

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={data.image} alt={data.name} />
          <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
        </Avatar>

        <div className="ml-4 space-y-1">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {data.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {createdAt.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <Rating
        value={data.rating}
        readOnly
        style={{ maxWidth: 80, color: 'yellow' }}
      />
    </div>
  )
}

const RatingCardDescription = ({ description }: { description: string }) => (
  <p className="mt-auto line-clamp-3 text-base text-muted-foreground">
    {description}
  </p>
)

const RatingCardContent = ({ book }: RatingCardContentProps) => (
  <div className="flex pt-6">
    <Image
      src={book.image.replace('public', '').replace('.jpg', '.png')}
      alt={book.title}
      width={112}
      height={160}
      className="h-40 w-28 rounded-md object-cover"
    />

    <div className="ml-4 grid">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </div>

      <RatingCardDescription description={book.description} />
    </div>
  </div>
)

/**
 * Skeletons
 */

function RatingCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-4 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex pt-6">
        <Skeleton className="h-40 w-28 rounded-md" />
        <div className="ml-4 grid">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="mt-auto space-y-2">
            <Skeleton className="h-3 w-80" />
            <Skeleton className="h-3 w-80" />
            <Skeleton className="h-3 w-80" />
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  RatingCard,
  RatingCardHeader,
  RatingCardDescription,
  RatingCardContent,
  RatingCardSkeleton,
}

import * as React from 'react'

import { cn, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'
import { Rating } from '@smastrom/react-rating'

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

const RatingCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    user: {
      name: string
      image: string
      rating: number
      ratedIn: string
    }
  }
>(({ user, className, ...props }, ref) => (
  <div ref={ref} className={cn('flex justify-between', className)} {...props}>
    <div className="flex items-center">
      <Avatar>
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>

      <div className="ml-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground">{user.ratedIn}</p>
      </div>
    </div>

    <Rating
      value={user.rating}
      readOnly
      style={{ maxWidth: 80, color: 'yellow' }}
    />
  </div>
))
RatingCardHeader.displayName = 'RatingCardHeader'

const RatingCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-auto line-clamp-3 text-base text-muted-foreground',
      className,
    )}
    {...props}
  />
))
RatingCardDescription.displayName = 'RatingCardDescription'

const RatingCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    book: {
      title: string
      author: string
      description: string
      image: string
    }
  }
>(({ book, className, ...props }, ref) => (
  <div ref={ref} className={cn('flex pt-6', className)} {...props}>
    <Image
      src={book.image}
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

      <RatingCardDescription>{book.description}</RatingCardDescription>
    </div>
  </div>
))
RatingCardContent.displayName = 'RatingCardContent'

export {
  RatingCard,
  RatingCardHeader,
  RatingCardDescription,
  RatingCardContent,
}

import { BookCard } from '@/components/book-card'
import {
  RatingCard,
  RatingCardContent,
  RatingCardHeader,
} from '@/components/rating-card'
import { LineChart } from 'lucide-react'

export default function Home() {
  return (
    <main className="m-2 space-y-10">
      <h1 className="text-2xl font-bold">
        <LineChart className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Inicio
      </h1>

      <div className="flex gap-5">
        <div className="basis-4/6 space-y-4">
          <RatingCard>
            <RatingCardHeader
              user={{
                name: 'John Doe',
                ratedIn: 'ha 3 dias',
                rating: 5,
                image: 'https://avatars.githubusercontent.com/u/60052506?v=4',
              }}
            />

            <RatingCardContent
              book={{
                title: 'Book TitleBook TitleBook TitleBook Title',
                author: 'John Doe',
                image: 'https://avatars.githubusercontent.com/u/60052506?v=4',
                description:
                  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sint corrupti Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum adipisci, ullam impedit consequatur tenetur recusandae architecto aliquid voluptas! Expedita facilis tenetur corporis numquam deserunt quos incidunt libero consectetur temporibus nostrum?',
              }}
            />
          </RatingCard>
        </div>

        <div className="basis-2/6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <BookCard key={i * 4} />
          ))}
        </div>
      </div>
    </main>
  )
}

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rating } from '@smastrom/react-rating'
import { BookOpen, Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
// import {
//   RatingCard,
//   RatingCardDescription,
//   RatingCardHeader,
// } from '@/components/rating-card'
import { getBookById } from '@/db/query/get-book-by-id'

export default async function BookPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const book = await getBookById(params.id)

  return (
    <main className="m-2 space-y-10">
      <div className="flex rounded-r-lg border p-10">
        <div className="basis-2/6">
          <Image
            src={book.coverUrl.replace('public', '').replace('.jpg', '.png')}
            alt={book.name}
            width={240}
            height={360}
            quality={100}
            priority
          />
        </div>

        <div className="grid basis-4/6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl font-bold">{book.name}</h2>
              <p className="text-muted-foreground">{book.author}</p>
            </div>

            <div className="flex flex-col gap-1">
              <Rating
                value={Number(book.averageRating)}
                readOnly
                style={{ maxWidth: 120, color: 'yellow' }}
              />
              <p className="text-muted-foreground">
                {book.ratingCount} avaliações
              </p>
            </div>
          </div>

          <p className="text-muted-foreground">{book.summary}</p>

          <div className="mt-auto flex gap-5">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Categorias
                </CardTitle>
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {book.categories.map((category) => (
                    <Badge key={category.id} className="mr-2">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Paginas</CardTitle>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{book.totalPages}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <div className="space-y-5">
        <RatingCard>
          <RatingCardHeader
            user={{
              name: 'John Doe',
              ratedIn: 'ha 3 dias',
              rating: 5,
              image: 'https://avatars.githubusercontent.com/u/60052506?v=4',
            }}
          />

          <RatingCardDescription className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sint
            corrupti Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum adipisci, ullam impedit consequatur tenetur recusandae
            architecto aliquid voluptas! Expedita facilis tenetur corporis
            numquam deserunt quos incidunt libero consectetur temporibus
            nostrum?
          </RatingCardDescription>
        </RatingCard>
        <RatingCard>
          <RatingCardHeader
            user={{
              name: 'John Doe',
              ratedIn: 'ha 3 dias',
              rating: 5,
              image: 'https://avatars.githubusercontent.com/u/60052506?v=4',
            }}
          />

          <RatingCardDescription className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sint
            corrupti Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum adipisci, ullam impedit consequatur tenetur recusandae
            architecto aliquid voluptas! Expedita facilis tenetur corporis
            numquam deserunt quos incidunt libero consectetur temporibus
            nostrum?
          </RatingCardDescription>
        </RatingCard>
        <RatingCard>
          <RatingCardHeader
            user={{
              name: 'John Doe',
              ratedIn: 'ha 3 dias',
              rating: 5,
              image: 'https://avatars.githubusercontent.com/u/60052506?v=4',
            }}
          />

          <RatingCardDescription className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sint
            corrupti Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum adipisci, ullam impedit consequatur tenetur recusandae
            architecto aliquid voluptas! Expedita facilis tenetur corporis
            numquam deserunt quos incidunt libero consectetur temporibus
            nostrum?
          </RatingCardDescription>
        </RatingCard>
      </div> */}
    </main>
  )
}

import { getBookById } from '@/db/query/get-book-by-id'
import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export async function BookDetails({ bookId }: { bookId: string }) {
  const book = await getBookById(bookId)

  return (
    <div className="flex rounded-lg border p-10">
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

      <div className="grid basis-4/6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{book.name}</h2>
            <p className="text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex flex-col gap-2">
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
              <CardTitle className="text-lg font-medium">Categorias</CardTitle>
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
  )
}

export function BookDetailsSkeleton() {
  return (
    <div className="flex rounded-lg border p-10">
      <div className="basis-2/6">
        <Skeleton className="mr-auto h-80 w-60 rounded-lg" />
      </div>

      <div className="grid basis-4/6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
        </div>

        <div className="mt-auto flex gap-5">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                <Skeleton className="h-4 w-20" />
              </CardTitle>
              <Skeleton className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                <Skeleton className="h-4 w-20" />
              </CardTitle>
              <Skeleton className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

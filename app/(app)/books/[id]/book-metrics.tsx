import { getBookById } from '@/db/query/get-book-by-id'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpenText, Bookmark, Library } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export async function BookMetrics({ bookId }: { bookId: string }) {
  const book = await getBookById(bookId)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">
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
          <CardTitle className="text-lg text-muted-foreground">
            Paginas
          </CardTitle>
          <BookOpenText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{book.totalPages}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">Autor</CardTitle>
          <Library className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{book.author}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">
            Paginas
          </CardTitle>
          <BookOpenText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{book.totalPages}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export function BookMetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">
            Categorias
          </CardTitle>
          <Bookmark className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="mt-3 h-5 w-20" />
          </div>
        </CardContent>
      </Card>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">
            Paginas
          </CardTitle>
          <BookOpenText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="mt-3 h-5 w-20" />
          </div>
        </CardContent>
      </Card>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">Autor</CardTitle>
          <Library className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="mt-3 h-5 w-20" />
          </div>
        </CardContent>
      </Card>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-muted-foreground">
            Paginas
          </CardTitle>
          <BookOpenText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="mt-3 h-5 w-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

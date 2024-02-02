import getBookById from '@/db/query/get-book-by-id'
import { MetricCard } from '@/components/metric-card'

export async function BookMetrics({ bookId }: { bookId: string }) {
  const book = await getBookById(bookId)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total de páginas"
        value={book.totalPages}
        icon="bookOpenText"
      />
      <MetricCard
        title="Avaliação média"
        value={Number(book.averageRating).toFixed(2)}
        icon="star"
      />
      <MetricCard
        title="Total de avaliações"
        value={book.ratingCount}
        icon="activity"
      />
      <MetricCard
        title="Categorias"
        value={book.categories[0].name}
        badge={
          book.categories.length > 1
            ? `+${book.categories.length - 1}`
            : undefined
        }
        icon="bookmark"
      />
    </div>
  )
}

export function BookMetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard.Skeleton />
      <MetricCard.Skeleton />
      <MetricCard.Skeleton />
      <MetricCard.Skeleton />
    </div>
  )
}

import { auth } from '@/auth-config'
import { MetricCard } from '@/components/metric-card'
import fetchUserMetrics from '@/db/query/fetch-user-metrics'

export async function UserMetrics() {
  const session = await auth()
  if (!session) throw new Error('User not found')
  const { user } = session
  const userMetrics = await fetchUserMetrics(user.id)

  return (
    <div className="grid w-full gap-4">
      <MetricCard
        value={userMetrics.pagesRead.value || 0}
        title="Páginas lidas"
        icon="bookOpen"
      />
      <MetricCard
        value={userMetrics.booksRated.value}
        title="Livros avaliados"
        icon="library"
      />
      <MetricCard
        value={userMetrics.authorsRead.value}
        title="Autores lidos"
        icon="bookUser"
      />
      <MetricCard
        value={userMetrics.mostReadCategory.category}
        title="Categoria mais lida"
        icon="bookmark"
      />
    </div>
  )
}

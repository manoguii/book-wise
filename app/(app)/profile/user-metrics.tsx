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
      <MetricCard title="Páginas lidas" value="3920" icon="bookOpen" />
      <MetricCard title="Livros avaliados" value="15" icon="library" />
      <MetricCard
        value={userMetrics.booksRated.value}
        title="Autores lidos"
        icon="bookUser"
      />
      <MetricCard
        title="Categoria mais lida"
        value={userMetrics.mostReadCategory.category}
        icon="bookmark"
      />
    </div>
  )
}

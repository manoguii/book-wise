import { Metric, UserMetricsContainer } from './styles'
import { Text } from '@/components/_ui/Text'
import { IMetrics } from '@/pages/@types/user'
import {
  // BookmarkSimple,
  BookOpen,
  Books,
  UserList,
} from '@phosphor-icons/react'

interface UserMetricsProps {
  metrics: IMetrics
}

export function UserMetrics({ metrics }: UserMetricsProps) {
  return (
    <UserMetricsContainer>
      <Metric>
        <BookOpen size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            {metrics.pagesRead}
          </Text>
          <Text size="sm">Páginas lidas</Text>
        </div>
      </Metric>

      <Metric>
        <Books size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            {metrics.ratedBooks}
          </Text>
          <Text size="sm">Livros avaliados</Text>
        </div>
      </Metric>

      <Metric>
        <UserList size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            {metrics.authorsRead}
          </Text>
          <Text size="sm">Autores lidos</Text>
        </div>
      </Metric>

      {/* <Metric>
        <BookmarkSimple size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            Computação
          </Text>
          <Text size="sm">Categoria mais lida</Text>
        </div>
      </Metric> */}
    </UserMetricsContainer>
  )
}

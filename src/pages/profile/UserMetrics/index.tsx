import { Text } from '@/components/Text'
import {
  BookmarkSimple,
  BookOpen,
  Books,
  UserList,
} from '@phosphor-icons/react'
import { Metric, UserMetricsContainer } from './styles'

export function UserMetrics() {
  return (
    <UserMetricsContainer>
      <Metric>
        <BookOpen size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            3852
          </Text>
          <Text size="sm">Páginas lidas</Text>
        </div>
      </Metric>

      <Metric>
        <Books size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            10
          </Text>
          <Text size="sm">Livros avaliados</Text>
        </div>
      </Metric>

      <Metric>
        <UserList size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            8
          </Text>
          <Text size="sm">Autores lidos</Text>
        </div>
      </Metric>

      <Metric>
        <BookmarkSimple size={32} color="#50B2C0" />

        <div>
          <Text as="strong" size="lg">
            Computação
          </Text>
          <Text size="sm">Categoria mais lida</Text>
        </div>
      </Metric>
    </UserMetricsContainer>
  )
}

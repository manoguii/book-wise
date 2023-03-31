import { BookCard } from '@/components/BookCard'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Tag } from '@/components/Tag'
import { TextInput } from '@/components/TextInput'
import { Binoculars } from '@phosphor-icons/react'
import { Books, Categories, Container, Header } from './styles'

export default function Explorer() {
  return (
    <Container>
      <Sidebar />

      <Header>
        <div>
          <Binoculars size={24} color="#50B2C0" weight="bold" />
          <Heading>Explorar</Heading>
        </div>

        <TextInput variant="sm" placeholder="Buscar livro ou autor" />
      </Header>

      <Categories>
        <Tag>Computação</Tag>
        <Tag>Educação</Tag>
        <Tag>Terror</Tag>
        <Tag>Hqs</Tag>
      </Categories>

      <Books>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </Books>
    </Container>
  )
}

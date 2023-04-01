import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@/components/Heading'
import { Sidebar } from '@/components/Sidebar'
import { Tag } from '@/components/Tag'
import { TextInput } from '@/components/TextInput'
import { Binoculars } from '@phosphor-icons/react'
import { Books, Categories, Container, Header } from './styles'
import { DialogBook } from './components/DialogBook'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/Button'
import { BookCard } from './components/BookCard'

export default function Explorer() {
  const session = useSession()

  const user = {
    name: session.data?.user?.name,
    avatar_url: session.data?.user?.image,
  }

  return (
    <Container>
      <Sidebar isAuthenticated={session.status} user={user} />

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
        <Dialog.Root>
          <BookCard>
            <Dialog.Trigger asChild>
              <Button variant="tertiary">ver mais</Button>
            </Dialog.Trigger>
          </BookCard>

          <DialogBook />
        </Dialog.Root>
      </Books>
    </Container>
  )
}

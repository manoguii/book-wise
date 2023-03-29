import { Avatar } from '@/components/Avatar'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { Navigation } from '@/components/Navigation'
import BasicRating from '@/components/Rating'
import { Tag } from '@/components/Tag'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { TextInput } from '@/components/TextInput'
import { ChartLine, X } from '@phosphor-icons/react'

export default function Home() {
  return (
    <>
      <Box>
        <BasicRating />

        <Navigation path="/" href={'/'}>
          <ChartLine />
          Inicio
        </Navigation>

        <Navigation path="seed" href={'#'}>
          <ChartLine />
          Inicio
        </Navigation>

        <Tag>Computação</Tag>

        <TextArea />

        <TextInput />

        <Heading>Hello</Heading>

        <Text>Book wise</Text>

        <Button>
          <X />
        </Button>

        <Avatar />
      </Box>
    </>
  )
}

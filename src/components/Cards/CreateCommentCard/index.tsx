import { Avatar } from '@/components/Avatar'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { Check, X } from '@phosphor-icons/react'
import { InfoUser, TextAreaContainer } from './styles'
import { MyRating } from '@/components/MyRating'

export function CreateCommentCard() {
  return (
    <Box>
      <InfoUser>
        <div>
          <Avatar size="sm" />
          <Text as="strong">Cristofer Rosser</Text>
        </div>

        <MyRating />
      </InfoUser>

      <TextAreaContainer>
        <TextArea />

        <div>
          <Button>
            <X color="#8381D9" size={24} />
          </Button>
          <Button>
            <Check color="#50B2C0" size={24} />
          </Button>
        </div>
      </TextAreaContainer>
    </Box>
  )
}

import { Button } from '@/components/Button'
import { Comment } from '@/pages/explorer/components/Comment'
import { CreateComment } from '@/pages/explorer/components/CreateComment'
import { Text } from '@/components/Text'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogClose, DialogContent, DialogOverlay, ToAssess } from './styles'
import { BookInfo } from '../BookInfo'

export function DialogBook() {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <BookInfo />

        <ToAssess>
          <Text>Avaliações</Text>
          <Button variant="tertiary">Avaliar</Button>
        </ToAssess>

        <CreateComment />

        <Comment />
        <Comment />
        <Comment />

        <DialogClose>
          <X size={24} color="#8D95AF" />
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  )
}

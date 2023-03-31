import { Button } from '@/components/Button'
import { BookInfoCard } from '@/components/Cards/BookInfoCard'
import { CommentCard } from '@/components/Cards/CommentCard'
import { CreateCommentCard } from '@/components/Cards/CreateCommentCard'
import { Text } from '@/components/Text'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogClose, DialogContent, DialogOverlay, ToAssess } from './styles'

export function DialogBook() {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <BookInfoCard />

        <ToAssess>
          <Text>Avaliações</Text>
          <Button variant="tertiary">Avaliar</Button>
        </ToAssess>

        <CreateCommentCard />

        <CommentCard />
        <CommentCard />
        <CommentCard />

        <DialogClose>
          <X size={24} color="#8D95AF" />
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  )
}

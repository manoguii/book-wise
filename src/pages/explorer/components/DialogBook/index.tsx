import { Button } from '@/components/Button'
import { Comment } from '@/pages/explorer/components/Comment'
import { CreateComment } from '@/pages/explorer/components/CreateComment'
import { Text } from '@/components/Text'
import { BookOpen, BookmarkSimple, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { IBook } from '../../index.page'
import Image from 'next/image'
import { Heading } from '@/components/Heading'
import { MyRating } from '@/components/MyRating'
import {
  BookDescription,
  BookInfoContainer,
  BookInfoMetrics,
  DialogClose,
  DialogContent,
  DialogOverlay,
  Metric,
  ToAssess,
} from './styles'

interface DialogBookProps {
  book: IBook
  assessments: number
  rate: number
}

export function DialogBook({ book, assessments, rate }: DialogBookProps) {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <BookInfoContainer>
          <BookDescription>
            <Image src={book.cover_url} alt="" width={170} height={242} />

            <div>
              <div>
                <Heading size="sm">{book.name}</Heading>

                <Text>{book.author}</Text>
              </div>

              <div>
                <MyRating size={rate} />

                <Text size="sm">{assessments} Avaliações</Text>
              </div>
            </div>
          </BookDescription>

          <BookInfoMetrics>
            <Metric>
              <BookmarkSimple size={32} color="#50B2C0" />

              <div>
                <Text as="strong" size="lg">
                  Computação
                </Text>
                <Text size="sm">Categoria</Text>
              </div>
            </Metric>

            <Metric>
              <BookOpen size={32} color="#50B2C0" />

              <div>
                <Text as="strong" size="lg">
                  {book.total_pages}
                </Text>
                <Text size="sm">Páginas</Text>
              </div>
            </Metric>
          </BookInfoMetrics>
        </BookInfoContainer>

        <ToAssess>
          <Text>Avaliações</Text>
          <Button variant="tertiary">Avaliar</Button>
        </ToAssess>

        <CreateComment />

        {book.ratings.map((rating) => {
          return <Comment key={rating.id} rating={rating} />
        })}

        <DialogClose>
          <X size={24} color="#8D95AF" />
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  )
}

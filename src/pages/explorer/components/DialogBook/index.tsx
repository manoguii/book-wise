import { memo, useState } from 'react'
import { IBookInfo } from '@/pages/api/@types/books'
import { Button } from '@/components/_ui/Button'
import { Text } from '@/components/_ui/Text'
import { BookOpen, BookmarkSimple, Check, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { Heading } from '@/components/_ui/Heading'
import { Rating } from '@/components/Rating'
import { useSession } from 'next-auth/react'
import { Avatar } from '@/components/Avatar'
import { formatDate } from '@/utils/format-date'
import { TextArea } from '@/components/TextArea'
import {
  Book,
  BookInfo,
  BookAdditionalInformation,
  RadixDialogClose,
  RadixDialogContent,
  RadixDialogOverlay,
  BookInformation,
  RadixDialogPortal,
  Action,
  Comment,
  CommentHeader,
  CreateComment,
  CreateCommentUserInfo,
  CreateCommentData,
} from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface DialogBookProps {
  bookInfo: IBookInfo
}

const createCommentFormData = z.object({
  description: z.string(),
})

type CreateCommentFormType = z.infer<typeof createCommentFormData>

function DialogBookComponent({ bookInfo }: DialogBookProps) {
  const [rating, setRating] = useState(1)

  const { register, handleSubmit } = useForm<CreateCommentFormType>({
    resolver: zodResolver(createCommentFormData),
  })

  function handleCreateComment(data: CreateCommentFormType) {
    console.log(data, rating)
    console.log(bookInfo.name)
  }

  const session = useSession()

  return (
    <RadixDialogPortal>
      <RadixDialogOverlay />

      <RadixDialogContent>
        <RadixDialogClose>
          <X size={24} color="#8D95AF" />
        </RadixDialogClose>

        <Book>
          <BookInfo>
            <Image src={bookInfo.image!} alt="" width={170} height={242} />

            <div>
              <div>
                <Heading size="sm">{bookInfo.name}</Heading>

                <Text>{bookInfo.author}</Text>
              </div>

              <div>
                <Rating rating={bookInfo.rate} />

                <Text size="sm">{bookInfo.numberOfRatings} Avaliações</Text>
              </div>
            </div>
          </BookInfo>

          <BookAdditionalInformation>
            {bookInfo.categories.map((category) => {
              return (
                <BookInformation key={category.id}>
                  <BookmarkSimple size={32} color="#50B2C0" />

                  <div>
                    <Text as="strong" size="lg">
                      {category.name}
                    </Text>
                    <Text size="sm">Categoria</Text>
                  </div>
                </BookInformation>
              )
            })}

            <BookInformation>
              <BookOpen size={32} color="#50B2C0" />

              <div>
                <Text as="strong" size="lg">
                  {bookInfo.pages}
                </Text>
                <Text size="sm">Páginas</Text>
              </div>
            </BookInformation>
          </BookAdditionalInformation>
        </Book>

        <Action>
          <Text>Avaliações</Text>
        </Action>

        {session.status === 'authenticated' ? (
          <CreateComment onSubmit={handleSubmit(handleCreateComment)}>
            <CreateCommentUserInfo>
              <div>
                <Avatar size="sm" src={session.data.user?.image!} />
                <Text as="strong">{session.data.user?.name}</Text>
              </div>

              <Rating toAssess={true} setRating={setRating} />
            </CreateCommentUserInfo>

            <CreateCommentData>
              <TextArea
                placeholder="Escreva sua avaliação"
                {...register('description')}
              />

              <div>
                <Button type="button">
                  <X color="#8381D9" size={24} />
                </Button>

                <Button type="submit">
                  <Check color="#50B2C0" size={24} />
                </Button>
              </div>
            </CreateCommentData>
          </CreateComment>
        ) : null}

        {bookInfo.ratings.map((rating) => {
          return (
            <Comment key={rating.id}>
              <CommentHeader>
                <div>
                  <Avatar size="sm" src={rating.userAvatarUrl!} />

                  <div>
                    <Text as="strong">{rating.userName}</Text>
                    <Text size="sm">{formatDate(rating.createdAt)}</Text>
                  </div>
                </div>

                <Rating rating={rating.rate} />
              </CommentHeader>

              <Text>{rating.description}</Text>
            </Comment>
          )
        })}
      </RadixDialogContent>
    </RadixDialogPortal>
  )
}

export const DialogBook = memo(DialogBookComponent)

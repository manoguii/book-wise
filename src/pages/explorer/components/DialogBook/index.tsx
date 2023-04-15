import { memo, useState } from 'react'
import { IAllBookInfo, IUserRating } from '@/pages/@types/books'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
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
  UserInfo,
  CreateComment,
  CreateCommentData,
  RadixCollapsibleRoot,
  RadixCollapsibleTrigger,
  RadixCollapsibleContent,
} from './styles'

interface DialogBookProps {
  bookInfo: IAllBookInfo
  updatesBookWithNewComment: (bookId: string, newComment: IUserRating) => void
}

const createCommentFormData = z.object({
  description: z.string().min(3),
})

type CreateCommentFormType = z.infer<typeof createCommentFormData>

function DialogBookComponent({
  bookInfo,
  updatesBookWithNewComment,
}: DialogBookProps) {
  const [rate, setRate] = useState(1)

  const { register, handleSubmit, reset } = useForm<CreateCommentFormType>({
    resolver: zodResolver(createCommentFormData),
  })

  async function handleCreateComment({ description }: CreateCommentFormType) {
    const { data } = await api.post(`/ratings/create/${bookInfo.id}`, {
      description,
      rate,
    })

    const rating = data.rating as IUserRating

    reset()

    updatesBookWithNewComment(bookInfo.id, rating)
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
                <Rating rating={bookInfo.ratingAverage} />

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
                    <Text size="sm">Categoria</Text>
                    <Text as="strong" size="lg">
                      {category.name}
                    </Text>
                  </div>
                </BookInformation>
              )
            })}

            <BookInformation>
              <BookOpen size={32} color="#50B2C0" />

              <div>
                <Text size="sm">Páginas</Text>
                <Text as="strong" size="lg">
                  {bookInfo.pages}
                </Text>
              </div>
            </BookInformation>
          </BookAdditionalInformation>
        </Book>

        {session.status === 'authenticated' ? (
          <RadixCollapsibleRoot>
            <Action>
              <Text>Avaliações</Text>
              <RadixCollapsibleTrigger asChild>
                <Button variant="tertiary">Avaliar</Button>
              </RadixCollapsibleTrigger>
            </Action>

            <RadixCollapsibleContent>
              <CreateComment onSubmit={handleSubmit(handleCreateComment)}>
                <UserInfo>
                  <div>
                    <Avatar size="sm" src={session.data.user?.image!} />
                    <Text as="strong">{session.data.user?.name}</Text>
                  </div>

                  <Rating toAssess={true} setRating={setRate} />
                </UserInfo>

                <CreateCommentData>
                  <TextArea
                    placeholder="Escreva sua avaliação"
                    {...register('description')}
                  />

                  <div>
                    <RadixCollapsibleTrigger asChild>
                      <Button>
                        <X color="#8381D9" size={24} />
                      </Button>
                    </RadixCollapsibleTrigger>

                    <Button type="submit">
                      <Check color="#50B2C0" size={24} />
                    </Button>
                  </div>
                </CreateCommentData>
              </CreateComment>
            </RadixCollapsibleContent>
          </RadixCollapsibleRoot>
        ) : (
          <Action>
            <Text>Avaliações</Text>
          </Action>
        )}

        {bookInfo.ratings.map((rating) => {
          return (
            <Comment key={rating.id}>
              <UserInfo>
                <div>
                  <Avatar size="sm" src={rating.userAvatarUrl!} />

                  <div>
                    <Text as="strong">{rating.userName}</Text>
                    <Text size="sm">{formatDate(rating.createdAt)}</Text>
                  </div>
                </div>

                <Rating rating={rating.rate} />
              </UserInfo>

              <Text>{rating.description}</Text>
            </Comment>
          )
        })}
      </RadixDialogContent>
    </RadixDialogPortal>
  )
}

export const DialogBook = memo(DialogBookComponent)

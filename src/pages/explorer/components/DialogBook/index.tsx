import { memo } from 'react'
import { IBookInfo } from '@/pages/api/@types/books'
import { Button } from '@/components/_ui/Button'
import { Text } from '@/components/_ui/Text'
import { BookOpen, BookmarkSimple, Check, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { Heading } from '@/components/_ui/Heading'
import { MyRating } from '@/components/MyRating'
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

interface DialogBookProps {
  bookInfo: IBookInfo
}

function DialogBookComponent({ bookInfo }: DialogBookProps) {
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
                <MyRating ratingAverage={bookInfo.rate} />

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
          {session.status === 'authenticated' ? (
            <Button variant="tertiary">Avaliar</Button>
          ) : null}
        </Action>

        {session.status === 'authenticated' ? (
          <CreateComment>
            <CreateCommentUserInfo>
              <div>
                <Avatar size="sm" src={session.data.user?.image!} />
                <Text as="strong">{session.data.user?.name}</Text>
              </div>

              <MyRating toAssess={true} />
            </CreateCommentUserInfo>

            <CreateCommentData>
              <TextArea />

              <div>
                <Button>
                  <X color="#8381D9" size={24} />
                </Button>
                <Button>
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

                <MyRating ratingAverage={rating.rate} />
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

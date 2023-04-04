import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { BookOpen, BookmarkSimple, Check, X } from '@phosphor-icons/react'
import { IBook } from '../../index.page'
import Image from 'next/image'
import { Heading } from '@/components/Heading'
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
  book: IBook
  assessments: number
  rate: number
}

export function DialogBook({ book, assessments, rate }: DialogBookProps) {
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
            <Image src={book.cover_url} alt="" width={170} height={242} />

            <div>
              <div>
                <Heading size="sm">{book.name}</Heading>

                <Text>{book.author}</Text>
              </div>

              <div>
                <MyRating ratingAverage={rate} />

                <Text size="sm">{assessments} Avaliações</Text>
              </div>
            </div>
          </BookInfo>

          <BookAdditionalInformation>
            {book.categories.map((categoryObj) => {
              return (
                <BookInformation key={categoryObj.category.id}>
                  <BookmarkSimple size={32} color="#50B2C0" />

                  <div>
                    <Text as="strong" size="lg">
                      {categoryObj.category.name}
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
                  {book.total_pages}
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

        {book.ratings.map((rating) => {
          return (
            <Comment key={rating.id}>
              <CommentHeader>
                <div>
                  <Avatar size="sm" src={rating.user.avatar_url!} />

                  <div>
                    <Text as="strong">{rating.user.name}</Text>
                    <Text size="sm">{formatDate(rating.created_at)}</Text>
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

import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import book from '@/public/books/Book.png'
import Link from 'next/link'

export function BookCard() {
  return (
    <Link href={`/books/${1}`} className="flex">
      <Card className="flex">
        <div className="py-6 pl-6">
          <Image src={book} alt="book" className="max-w-20 object-cover" />
        </div>

        <div className="grid">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-lg">
              Book TitleBook TitleBook TitleBook Title
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui sint
              corrupti Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ipsum adipisci, ullam impedit consequatur tenetur recusandae
              architecto aliquid voluptas! Expedita facilis tenetur corporis
              numquam deserunt quos incidunt libero consectetur temporibus
              nostrum?
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Rating value={5} readOnly style={{ maxWidth: 80 }} />
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

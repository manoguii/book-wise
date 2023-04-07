export type IRating = {
  id: string
  rate: number
  description: string
  createdAt: Date
  userAvatar: string | null
  userName: string
  bookImage: string
  bookName: string
  bookAuthor: string
}

export type IBook = {
  id: string
  image: string
  name: string
  author: string
  rate: number
}

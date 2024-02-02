import chalk from 'chalk'

import { db } from '@/db'
import { book, category, categoryOnBook, rating, user } from '@/db/schema'

import { books as booksData } from './constants/books'
import { categories as categoriesData } from './constants/categories'
import { ratings as ratingsData } from './constants/ratings'
import { users as usersData } from './constants/users'

type NewUser = typeof user.$inferInsert
type NewRating = typeof rating.$inferInsert
type NewCategoryOnBook = typeof categoryOnBook.$inferInsert
type NewCategory = typeof category.$inferInsert
type NewBook = typeof book.$inferInsert

async function insertUser(newUser: NewUser) {
  return db.insert(user).values(newUser)
}

async function insertCategoryOnBook(newCategoryOnBook: NewCategoryOnBook) {
  return db.insert(categoryOnBook).values(newCategoryOnBook)
}

async function insertCategory(newCategory: NewCategory) {
  return db.insert(category).values(newCategory)
}

async function insertBook(newBook: NewBook) {
  return db.insert(book).values(newBook)
}

async function insertRating(newRating: NewRating) {
  return db.insert(rating).values(newRating)
}

async function main() {
  await db.delete(rating)
  await db.delete(user)
  await db.delete(categoryOnBook)
  await db.delete(category)
  await db.delete(book)

  for (const user of usersData) {
    await insertUser({
      id: user.id,
      name: user.name,
      email: `${user.name.toLowerCase().trim().replace(/\s/g, '')}@gmail.com`,
      image: user.avatar_url,
    })
  }

  for (const category of categoriesData) {
    await insertCategory({
      id: category.id,
      name: category.name,
    })
  }

  for (const book of booksData) {
    await insertBook({
      id: book.id,
      name: book.name,
      author: book.author,
      coverUrl: book.cover_url,
      summary: book.summary,
      totalPages: book.total_pages,
    })
  }

  for (const book of booksData) {
    const categories = book.categories

    for (const category of categories) {
      await insertCategoryOnBook({
        bookId: book.id,
        categoryId: category.id,
      })
    }
  }

  for (const rating of ratingsData) {
    await insertRating({
      id: rating.id,
      rate: rating.rate,
      description: rating.description,
      userId: rating.user_id,
      bookId: rating.book_id,
    })
  }
}

main()
  .then(async () => {
    console.log(chalk.yellow('Seeding completed. ✔️'))
  })
  .catch(async (e) => {
    console.log(chalk.red('Seeding failed. ✖️'))
    console.error(e)
    process.exit(1)
  })

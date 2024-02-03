import chalk from 'chalk'

import { db } from '@/db'
import {
  books,
  categories,
  categoriesOnBooks,
  ratings,
  users,
} from '@/db/schema'

import { books as booksData } from './constants/books'
import { categories as categoriesData } from './constants/categories'
import { ratings as ratingsData } from './constants/ratings'
import { users as usersData } from './constants/users'

type NewUser = typeof users.$inferInsert
type NewRating = typeof ratings.$inferInsert
type NewCategoryOnBook = typeof categoriesOnBooks.$inferInsert
type NewCategory = typeof categories.$inferInsert
type NewBook = typeof books.$inferInsert

async function insertUser(newUser: NewUser) {
  return db.insert(users).values(newUser)
}

async function insertCategoryOnBook(newCategoryOnBook: NewCategoryOnBook) {
  return db.insert(categoriesOnBooks).values(newCategoryOnBook)
}

async function insertCategory(newCategory: NewCategory) {
  return db.insert(categories).values(newCategory)
}

async function insertBook(newBook: NewBook) {
  return db.insert(books).values(newBook)
}

async function insertRating(newRating: NewRating) {
  return db.insert(ratings).values(newRating)
}

async function main() {
  await db.delete(ratings)
  await db.delete(users)
  await db.delete(categoriesOnBooks)
  await db.delete(categories)
  await db.delete(books)

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
    const bookCategories = book.categories

    for (const category of bookCategories) {
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

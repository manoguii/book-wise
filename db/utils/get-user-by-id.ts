import { eq } from 'drizzle-orm'

import { db } from '..'
import { users } from '../schema'

export async function getUserById(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId))

  if (user.length === 0) {
    return null
  }

  return user[0]
}

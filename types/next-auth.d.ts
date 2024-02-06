/* eslint-disable @typescript-eslint/no-unused-vars */
import 'next-auth/jwt'

import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      createdAt: Date | null
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userCreation: Date | null
  }
}

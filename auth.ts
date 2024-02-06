import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { db } from '@/db'

import { getUserById } from './db/utils/get-user-by-id'

export const authConfig = {
  providers: [GitHub, Google],
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.user.id = token.sub
      session.user.createdAt = token.userCreation

      return session
    },
    async jwt({ token }) {
      const user = await getUserById(token.sub || '')

      if (user) {
        token.userCreation = user.createdAt
      }

      return token
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const protectedRoutes = ['/profile']
      const isProtected = protectedRoutes.some((path) =>
        nextUrl.pathname.startsWith(path),
      )

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/sign-in', nextUrl)
        return Response.redirect(redirectUrl)
      }

      return true
    },
  },
} satisfies NextAuthConfig

export const {
  handlers,
  auth: nextAuth,
  signOut,
  signIn,
} = NextAuth(authConfig)

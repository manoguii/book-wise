import NextAuth, { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db'

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: any) {
      session.user.id = user.id
      return session
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

import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'moment/locale/pt-br'
import moment from 'moment'

globalStyles()
moment.locale('pt-br')

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

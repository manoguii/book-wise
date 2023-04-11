import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'moment/locale/pt-br'
import moment from 'moment'
import { Sidebar } from '@/components/Sidebar'
import { useRouter } from 'next/router'

globalStyles()
moment.locale('pt-br')

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
        }}
      >
        {router.asPath !== '/' && <Sidebar />}

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

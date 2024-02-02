import '@smastrom/react-rating/style.css'

import { cookies } from 'next/headers'

import { auth } from '@/auth-config'
import { Sidebar } from '@/components/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="ml-auto mt-4 w-full max-w-screen-2xl"
      >
        <Sidebar
          defaultLayout={defaultLayout ? defaultLayout[0] : 20}
          defaultCollapsed={defaultCollapsed}
          user={session?.user}
        />
        <ResizableHandle
          withHandle
          className="max-h-[calc(100vh-40px)] bg-transparent"
        />
        <ResizablePanel
          defaultSize={defaultLayout ? defaultLayout[1] : 80}
          minSize={30}
          className="!min-h-screen rounded-tl-3xl border-l border-t bg-muted/40 dark:bg-muted/20"
        >
          <main className="m-8 space-y-10">{children}</main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

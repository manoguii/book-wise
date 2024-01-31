import '@smastrom/react-rating/style.css'
import { Sidebar } from '@/components/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cookies } from 'next/headers'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" className="mt-4 px-4">
        <Sidebar
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
        />
        <ResizableHandle withHandle className="max-h-[calc(100vh-40px)]" />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
          className="mx-4 !min-h-screen"
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

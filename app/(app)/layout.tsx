import '@smastrom/react-rating/style.css'
import { Sidebar } from '@/components/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" className="mt-4 px-4">
        <Sidebar />
        <ResizableHandle withHandle className="my-2 max-h-[calc(100vh-40px)]" />
        <ResizablePanel
          defaultSize={80}
          minSize={30}
          className="mx-4 !min-h-screen"
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

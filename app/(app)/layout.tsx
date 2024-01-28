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
      <div className="m-5">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch"
        >
          <Sidebar />
          <ResizableHandle withHandle className="max-h-[calc(100vh-40px)]" />
          <ResizablePanel defaultSize={80} minSize={30} className="ml-10">
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  )
}

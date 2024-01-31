'use client'

import React from 'react'
import { ResizablePanel } from './ui/resizable'
import { cn } from '@/lib/utils'
import { Nav } from './nav'
import { LineChart, Popcorn, User2 } from 'lucide-react'
import { SignOut } from './form/sign-out'

export function Sidebar({
  defaultLayout = [20, 80],
  defaultCollapsed = false,
}: {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <ResizablePanel
      defaultSize={defaultLayout[0]}
      collapsedSize={5}
      collapsible={true}
      minSize={12}
      maxSize={23}
      onCollapse={() => {
        setIsCollapsed(true)
        setCollapsed(true)
      }}
      onExpand={() => {
        setIsCollapsed(false)
        setCollapsed(false)
      }}
      className={cn(
        'flex max-h-[calc(100vh-40px)] min-w-36 flex-col items-center justify-between rounded-l-lg border-y border-l p-3',
        isCollapsed &&
          'min-w-[50px] px-1 py-3 transition-all duration-300 ease-in-out',
      )}
    >
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Inicio',
            icon: LineChart,
            path: '/',
          },
          {
            title: 'Explorar',
            icon: Popcorn,
            path: '/books',
          },
          {
            title: 'Perfil',
            icon: User2,
            path: '/profile',
          },
        ]}
      />

      <SignOut isCollapsed={isCollapsed} />
    </ResizablePanel>
  )
}

function setCollapsed(value: boolean) {
  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(value)}`
}

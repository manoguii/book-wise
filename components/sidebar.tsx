'use client'

import React from 'react'
import { ResizablePanel } from './ui/resizable'
import { cn } from '@/lib/utils'
import { Nav } from './nav'
import { LineChart, Popcorn, User2 } from 'lucide-react'
import { Icons } from './icons'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <ResizablePanel
      defaultSize={20}
      collapsedSize={5}
      collapsible={true}
      minSize={12}
      maxSize={23}
      onCollapse={() => setIsCollapsed(true)}
      onExpand={() => setIsCollapsed(false)}
      className={cn(
        'my-2 flex max-h-[calc(100vh-40px)] min-w-36 flex-col rounded-l-lg border-y border-l',
        isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
      )}
    >
      <div
        className={cn(
          'flex h-[52px] items-center justify-center py-8',
          isCollapsed ? 'h-[52px]' : 'px-2',
        )}
      >
        <Icons.logo className={cn('h-8 w-8', !isCollapsed && 'mr-2')} />
        {!isCollapsed && <h2 className="text-md font-bold">Book Wise</h2>}
      </div>

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
    </ResizablePanel>
  )
}

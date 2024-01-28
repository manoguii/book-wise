'use client'

import React from 'react'
import { ResizablePanel } from './ui/resizable'
import { cn } from '@/lib/utils'
import { Nav } from './nav'
import { LineChart, Popcorn, User2 } from 'lucide-react'
import { Icons } from './icons'
import { SignOut } from './form/sign-out'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <ResizablePanel
      defaultSize={20}
      collapsedSize={4}
      collapsible={true}
      minSize={15}
      maxSize={20}
      onCollapse={() => setIsCollapsed(true)}
      onExpand={() => setIsCollapsed(false)}
      className={cn(
        'flex max-h-[calc(100vh-40px)] min-w-36 flex-col justify-between rounded-l-md border-y border-l',
        isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out',
      )}
    >
      <div>
        <div
          className={cn(
            'flex h-[52px] items-center justify-center py-8',
            isCollapsed ? 'h-[52px]' : 'px-2',
          )}
        >
          <Icons.logo className={cn('h-6 w-6', !isCollapsed && 'mr-2')} />
          {!isCollapsed && <h1 className="text-base font-bold">Book Wise</h1>}
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
              path: '/explorer',
            },
            {
              title: 'Perfil',
              icon: User2,
              path: '/profile',
            },
          ]}
        />
      </div>

      <div className="flex items-center justify-center p-2">
        <SignOut isCollapsed={isCollapsed} />
      </div>
    </ResizablePanel>
  )
}

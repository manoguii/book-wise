'use client'

import React from 'react'
import { ResizablePanel } from './ui/resizable'
import { cn } from '@/lib/utils'
import { Nav } from './nav'
import { LineChart, Popcorn, User2 } from 'lucide-react'
import { SignInModal } from './sign-in-modal'
import { Icons } from './icons'
import { UserNav } from './user-nav'
import { User } from 'next-auth'

export function Sidebar({
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  user,
}: {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  user?: User
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <ResizablePanel
      defaultSize={defaultLayout[0]}
      collapsedSize={5}
      collapsible={true}
      minSize={12}
      maxSize={20}
      onCollapse={() => {
        setIsCollapsed(true)
        setCollapsed(true)
      }}
      onExpand={() => {
        setIsCollapsed(false)
        setCollapsed(false)
      }}
      className={cn(
        'flex max-h-[calc(100vh-40px)] min-w-36 flex-col items-center justify-between px-3 py-3',
        isCollapsed &&
          'min-w-[50px] px-1 transition-all duration-300 ease-in-out',
      )}
    >
      <div className="grid w-full gap-6 pb-2">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <Icons.logo className="h-6 w-6" />
          </div>
        ) : (
          <div className="flex items-start gap-2 px-2">
            <Icons.logo className="h-6 w-6" />
            <h1 className="text-lg font-bold tracking-tight">Book Wise</h1>
          </div>
        )}

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
      </div>

      {user ? (
        <div
          className={cn(
            'flex w-full items-center justify-start gap-2 p-2',
            isCollapsed && 'justify-center',
          )}
        >
          <UserNav user={user} />
          {!isCollapsed && (
            <div className="grid space-y-1">
              <p className="truncate text-base font-medium leading-none">
                {user.name || ''}
              </p>
              <p className="truncate text-sm leading-none text-muted-foreground">
                {user.email || ''}
              </p>
            </div>
          )}
        </div>
      ) : (
        <SignInModal isCollapsed={isCollapsed} />
      )}
    </ResizablePanel>
  )
}

function setCollapsed(value: boolean) {
  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(value)}`
}

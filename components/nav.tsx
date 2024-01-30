'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'
import { SignOut } from './form/sign-out'

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    path: string
    icon: LucideIcon
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname()

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex h-full flex-col justify-between gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const variant = link.path === pathname ? 'default' : 'ghost'

          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.path}
                  className={cn(
                    buttonVariants({ variant, size: 'icon' }),
                    variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.path}
              className={cn(
                buttonVariants({ variant, size: 'default' }),
                variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
            </Link>
          )
        })}
      </nav>

      <div className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <SignOut isCollapsed={isCollapsed} />
      </div>
    </div>
  )
}

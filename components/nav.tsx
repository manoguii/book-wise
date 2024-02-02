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

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    path: string
    icon: LucideIcon
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  let pathname = usePathname()
  if (pathname?.includes('/books/')) {
    pathname = '/books'
  }

  return (
    <div data-collapsed={isCollapsed} className="group h-full w-full">
      <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center">
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
    </div>
  )
}

import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LinkContainer } from './styles'

interface NavigationProps extends LinkProps {
  children: ReactNode
  path: string
}

export function Navigation({ children, path, ...props }: NavigationProps) {
  const route = useRouter()

  const isActive = route.asPath === path
  return (
    <LinkContainer isActive={isActive} {...props}>
      {children}
    </LinkContainer>
  )
}

import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LinkContainer } from './styles'

interface NavigationProps extends LinkProps {
  children: ReactNode
}

export function Navigation({ children, ...props }: NavigationProps) {
  const route = useRouter()

  const isActive = route.pathname === props.href

  return (
    <LinkContainer isActive={isActive} {...props}>
      {children}
    </LinkContainer>
  )
}

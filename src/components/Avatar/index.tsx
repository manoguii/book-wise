import { AvatarContainer, AvatarFallback, AvatarImage } from './styles'
import { User } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

export interface AvatarProps extends ComponentProps<typeof AvatarImage> {
  size: 'sm' | 'md'
}

// delayMs -> faz com que o Fallback demore 0.6seg para ser exibido

export function Avatar({ size, ...rest }: AvatarProps) {
  return (
    <AvatarContainer size={size}>
      <AvatarImage {...rest} />

      <AvatarFallback delayMs={600}>
        <User />
      </AvatarFallback>
    </AvatarContainer>
  )
}

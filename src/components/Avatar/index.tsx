import { AvatarContainer, AvatarFallback, AvatarImage } from './styles'
import { User } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

export interface AvatarProps extends ComponentProps<typeof AvatarImage> {}

// delayMs -> faz com que o Fallback demore 0.6seg para ser exibido

export function Avatar(props: AvatarProps) {
  return (
    <AvatarContainer>
      <AvatarImage {...props} />

      <AvatarFallback delayMs={600}>
        <User />
      </AvatarFallback>
    </AvatarContainer>
  )
}

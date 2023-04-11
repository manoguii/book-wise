import { MagnifyingGlass } from '@phosphor-icons/react'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { Input, TextInputContainer } from './styles'

export interface TextInputProps extends ComponentProps<typeof Input> {
  variant?: 'sm' | 'md'
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  ({ variant, ...props }: TextInputProps, ref) => {
    return (
      <TextInputContainer variant={variant}>
        <Input ref={ref} {...props} />

        <button>
          <MagnifyingGlass weight="bold" size={14} />
        </button>
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'

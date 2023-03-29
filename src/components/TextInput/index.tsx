import { MagnifyingGlass } from '@phosphor-icons/react'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { Input, Prefix, TextInputContainer } from './styles'

export interface TextInputProps extends ComponentProps<typeof Input> {
  prefix?: string
  variant?: 'sm' | 'md'
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  ({ prefix, variant, ...props }: TextInputProps, ref) => {
    return (
      <TextInputContainer variant={variant}>
        {!!prefix && <Prefix>{prefix}</Prefix>}
        <Input ref={ref} {...props} />
        <button>
          <MagnifyingGlass weight="bold" size={14} />
        </button>
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'

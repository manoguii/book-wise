'use client'

import { Rating } from '@smastrom/react-rating'
import { User } from 'next-auth'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { evaluateBook } from '@/db/actions/evaluate-book'
import { getInitials } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface EvaluateBookFormProps {
  bookId: string
  user?: User
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      aria-label="Criar avaliação"
      aria-disabled={pending}
      disabled={pending}
    >
      Avaliar
    </Button>
  )
}

export function EvaluateBookForm({ bookId, user }: EvaluateBookFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [rate, setRate] = React.useState(0)
  const [message, formAction] = useFormState(evaluateBook, null)

  return (
    <form
      className="grid gap-5 shadow-sm"
      ref={formRef}
      action={async (formData) => {
        await formAction(formData)
        formRef.current?.reset()
        setRate(0)
      }}
    >
      <div className="flex justify-between gap-5">
        {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image || ''} alt={user.name || ''} />
              <AvatarFallback>{getInitials(user.name || '')}</AvatarFallback>
            </Avatar>
            <p className="truncate text-base font-semibold">
              {user.name || ''}
            </p>
          </div>
        )}
        <Rating
          onChange={setRate}
          value={rate}
          style={{ maxWidth: 120, color: 'yellow', marginLeft: 'auto' }}
        />
      </div>

      <div className="grid">
        <Label className="sr-only" htmlFor="review">
          Escreva sua avaliação
        </Label>
        <Textarea
          id="review"
          name="review"
          placeholder="Descreva sua avaliação do livro..."
          required
          minLength={10}
          maxLength={500}
          rows={4}
        />
        {message?.error && (
          <p
            aria-live="polite"
            className="mt-2 text-sm text-destructive"
            role="status"
          >
            {message.error}
          </p>
        )}
      </div>
      <Input id="rate" name="rate" type="hidden" value={rate} />
      <Input id="bookId" name="bookId" type="hidden" value={bookId} />

      <div className="flex justify-end gap-2">
        <SubmitButton />
      </div>
    </form>
  )
}

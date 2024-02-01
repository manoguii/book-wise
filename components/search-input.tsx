'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

import { Input } from './ui/input'
import { Label } from './ui/label'
import { useDebouncedCallback } from 'use-debounce'

export function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)

    params.delete('page')

    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  return (
    <form
      className="flex flex-1 items-center"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      }}
    >
      <Label htmlFor="search" className="sr-only">
        Buscar livros
      </Label>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4" />
        </div>

        <Input
          placeholder="Busque por livros e autores"
          className="pl-10"
          id="search"
          type="search"
          defaultValue={searchParams.get('q')?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
      </div>
    </form>
  )
}

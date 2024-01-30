import { User2 } from 'lucide-react'

export default async function ProfilePage() {
  return (
    <main className="m-2 space-y-10">
      <h1 className="text-2xl font-bold">
        <User2 className="mr-2 inline-block h-7 w-7 text-cyan-500" />
        Perfil
      </h1>
    </main>
  )
}

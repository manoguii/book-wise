import { auth } from '@/auth'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the user profile page.</p>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  )
}

import { prisma } from '@repo/database'
import { Button } from '@repo/ui/components/button'

export default async function IndexPage() {
  const users = await prisma.user.findMany()

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">Hello World</h1>
      <Button className="w-30">Hi!</Button>
      <div>
        {users.map((user, index) => (
          <p key={user.id}>
            {index + 1}. {user.email}
          </p>
        ))}
      </div>
    </div>
  )
}

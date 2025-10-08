import { ButtonCreateUser } from '@/components/ButtonCreateUser'
import { ButtonDeleteAllUsers } from '@/components/ButtonDeleteAllUsers'
import { prisma } from '@repo/database'
import { Button } from '@repo/ui/components/button'
import { tryCatch } from '@repo/utils/tryCatch'

const getUsers = async () => {
  const { data: users, error } = await tryCatch(prisma.user.findMany())
  if (error) {
    console.error('Error getting users', error.message)
    return []
  }

  return users
}

export default async function IndexPage() {
  const users = await getUsers()
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">Hello Admin</h1>
      <Button className="w-30">Hi!</Button>
      <ButtonCreateUser />
      <ButtonDeleteAllUsers />
      <div>
        {users.length < 1 ? (
          <p>No users found</p>
        ) : (
          users.map((user, index) => (
            <p key={user.id}>
              {index + 1}. {user.email}
            </p>
          ))
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-static'

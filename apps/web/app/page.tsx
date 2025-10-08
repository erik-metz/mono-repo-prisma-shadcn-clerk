import { prisma } from '@repo/database'

export default async function IndexPage() {
  const users = await prisma.user.findMany()

  return (
    <div>
      <h1 className="border-5 border-green-500 text-3xl font-semibold">
        Hello World
      </h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

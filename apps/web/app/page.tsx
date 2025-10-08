import { prisma } from "@repo/database";

export default async function IndexPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        {users.map((user: { id: string; name: string }) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}

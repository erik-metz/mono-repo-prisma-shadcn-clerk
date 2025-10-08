'use server'

import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'

export const deleteAllUsers = async () => {
  await prisma.user.deleteMany()
  revalidatePath('/')
}

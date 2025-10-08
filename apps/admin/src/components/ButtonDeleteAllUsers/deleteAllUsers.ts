'use server'

import { prisma } from '@repo/database'
import { logger } from '@repo/utils/logger'
import { revalidatePath } from 'next/cache'

export const deleteAllUsers = async () => {
  logger.log('in deleteAllUsers')
  await prisma.user.deleteMany()
  revalidatePath('/')
}

'use server'
import { prisma } from '@repo/database'
import { logger } from '@repo/utils/logger'

export const createUser = async (): Promise<void> => {
  logger.log('in createUser')
  await prisma.user.create({
    data: { email: `asdf${Math.random()}@asdf.asdf` },
  })
}

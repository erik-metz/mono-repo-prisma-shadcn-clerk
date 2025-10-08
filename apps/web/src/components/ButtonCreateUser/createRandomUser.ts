'use server'

import { createUser } from '@repo/database/actions/user/createUser'
import { revalidatePath } from 'next/cache'

export const createRandomUser = async () => {
  await createUser()
  revalidatePath('/')
}

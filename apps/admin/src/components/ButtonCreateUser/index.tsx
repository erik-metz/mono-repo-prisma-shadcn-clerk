'use client'
import { createRandomUser } from '@/components/ButtonCreateUser/createRandomUser'
import { Button } from '@repo/ui/components/button'

export const ButtonCreateUser = () => {
  return (
    <Button className="w-50" onMouseDown={() => createRandomUser()}>
      Create Random User
    </Button>
  )
}

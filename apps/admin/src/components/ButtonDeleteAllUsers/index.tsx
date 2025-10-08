'use client'
import { Button } from '@repo/ui/components/button'
import { deleteAllUsers } from './deleteAllUsers'

export const ButtonDeleteAllUsers = () => {
  return (
    <Button
      className="w-50"
      onMouseDown={async () => {
        await deleteAllUsers()
      }}
    >
      Delete All Users
    </Button>
  )
}

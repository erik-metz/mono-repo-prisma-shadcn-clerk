'use client'
import { deleteAllUsers } from '@/components/ButtonDeleteAllUsers/deleteAllUsers'
import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'

export const ButtonDeleteAllUsers = () => {
  return (
    <Button
      className="w-50"
      onMouseDown={async () => {
        await deleteAllUsers()
        toast.success('Success deleting all users')
      }}
    >
      Delete All Users
    </Button>
  )
}

import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'
import { Prisma } from '@prisma/client'

type PrismaUser = Prisma.UserGetPayload<{}>

type Users = {
  users: PrismaUser[]
  userAlreadyUse: boolean
}

async function toggleUsedBy(slug: string) {
  const response = await fetch(`/api/usedby`, {
    method: 'POST',
    body: JSON.stringify({ slug })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export default function useUsedByMutation() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  return useMutation(toggleUsedBy, {
    onMutate: (slug) => {
      queryClient.setQueryData<Users>(
        [{ scope: 'stack', type: 'users', identifier: slug }],
        (old) =>
          ({
            userAlreadyUse: !old?.userAlreadyUse,
            users: old?.userAlreadyUse
              ? old.users.filter((user) => user.email !== session?.user.email)
              : [
                  ...(old?.users as PrismaUser[]),
                  {
                    name: session?.user.name,
                    email: session?.user.email,
                    image: session?.user.image
                  }
                ]
          } as Users)
      )
    }
  })
}

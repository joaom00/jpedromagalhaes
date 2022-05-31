import { useMutation, useQueryClient } from 'react-query'
import type { Scope } from '@/shared/types'

type ToggleReactionData = {
  entity: Scope
  identifier: string
}

type Data = {
  userHasReacted: boolean
  _count: {
    reactions: number
  }
}

async function toggleReaction({ entity, identifier }: ToggleReactionData) {
  const response = await fetch(`/api/${entity}/like`, {
    method: 'POST',
    body: JSON.stringify({ identifier })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useReactionMutation() {
  const queryClient = useQueryClient()

  return useMutation(toggleReaction, {
    onMutate: ({ entity, identifier }) => {
      queryClient.setQueryData<Data>([{ entity, scope: 'detail', identifier }], (old) => {
        return {
          ...old,
          _count: {
            reactions: old?.userHasReacted
              ? old?._count?.reactions - 1
              : (old?._count?.reactions as number) + 1
          },
          userHasReacted: !old?.userHasReacted
        }
      })
    }
  })
}

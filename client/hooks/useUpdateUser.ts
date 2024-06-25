import request from 'superagent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Users } from '../../models/flightplan'

interface UpdateUserValues {
  email?: string
  phoneNumber?: string
  username?: string
  firstName?: string
  lastName?: string
  profilePicture?: string
}

export function useUpdateUser(userId: number) {
  const qc = useQueryClient()

  return useMutation<Users, Error, UpdateUserValues>({
    mutationFn: async (values: UpdateUserValues) => {
      const res = await request.patch(`/api/v1/users/${userId}`).send(values)
      return res.body as Users
    },
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['users', userId] })
    },
  })
}

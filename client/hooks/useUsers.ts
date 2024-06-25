import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Users } from '../../models/flightplan.ts'

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/users/${id}`)
      return res.body as Users
    },
  })
}

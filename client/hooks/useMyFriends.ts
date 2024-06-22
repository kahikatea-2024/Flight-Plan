import { useQuery } from '@tanstack/react-query'
// import { getUsers } from '../apis/users'
import { Users } from '../../models/flightplan'
import request from 'superagent'

export function useMyFriends() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const res = await request.get('/api/v1/users')
      console.log(res.body)
      return res.body as Users
    },
  })
  return { data, isLoading, isError }
}

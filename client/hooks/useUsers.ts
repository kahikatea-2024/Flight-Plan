import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Users } from '../../models/flightplan.ts'
import { updateUser } from '../apis/users.ts'

export function useUser(id: number) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/users/${id}`)
      return res.body as Users
    },
  })
  const mutation = useMutation({
    mutationFn: async (form: Users) => {
      const res = await updateUser(form) // Ensure to await addEvent
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return { data, mutation, isLoading }
  // return { data, isLoading }
  // Extra queries go here e.g. addFruit: useAddFruit()
}

// export function useUsersMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] })
//     },
//   })

//   return mutation
// }

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useUsersMutation(addFruit)
} */

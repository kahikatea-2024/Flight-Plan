import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTrip, getTrips } from '../apis/trips'

export function useTrips(userId: number) {
  // const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trips', userId],
    queryFn: async () => {
      const res = await getTrips(userId)
      console.log('hook', res)
      return res
    },
  })
  // const mutation = useMutation({
  //   mutationFn: (data) => addTrip(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['trips'] })
  //   },
  // })
  // return { data, mutation, isLoading }
  return { data, isLoading, isError }
}

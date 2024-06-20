import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTrip, getTrips } from '../apis/trips'

export function useTrips(userId: number) {
  // const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['trips', userId],
    queryFn: async () => {
      const res = getTrips(userId)
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
  return { data, isLoading }
}

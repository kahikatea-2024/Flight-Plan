import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getEvents } from '../apis/events'

export function useEvents(tripId: number) {
  // const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', tripId],
    queryFn: async () => {
      const res = getEvents(tripId)
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

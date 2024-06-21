import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addEvent, getEvents } from '../apis/events.ts'

//TODO change tripId to date
export function useEvents(tripId: number) {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', tripId],
    queryFn: async () => {
      const res = getEvents(tripId)
      return res
    },
  })
  const mutation = useMutation({
    mutationFn: (data) => addEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
  return { data, mutation, isLoading, isError }
  // return { data, isLoading, isError }
}

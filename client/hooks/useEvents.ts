import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editEvent, getEvents } from '../apis/events.ts'
import { Events } from '../../models/flightplan.ts'

export function UseEvents(tripId: string, date: string) {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', tripId, date],
    queryFn: async () => {
      const res = getEvents(tripId, date)

      return res
    },
  })
  const mutation = useMutation({
    mutationFn: async (eventData: Events) => {
      const res = await editEvent(eventData)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
  return { data, mutation, isLoading, isError }
}

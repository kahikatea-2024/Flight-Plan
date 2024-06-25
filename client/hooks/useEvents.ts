import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addEvent, getEvents } from '../apis/events.ts'
import { EventData } from '../../models/flightplan.ts'

export function useEvents(id: string, date: string) {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events', id, date],
    queryFn: async () => {
      const res = getEvents(id, date)

      return res
    },
  })
  const mutation = useMutation({
    mutationFn: async (eventData: EventData) => {
      const res = await addEvent(eventData)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
  return { data, mutation, isLoading, isError }
}

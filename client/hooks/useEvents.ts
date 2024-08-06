import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editEvent, getEvents } from '../apis/events.ts'
import { Events } from '../../models/flightplan.ts'

export function useEvents(
  tripId: string,
  date: string,
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (eventData: Events) => await editEvent(eventData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
      const events = await getEvents(tripId, date)
      setEvents(events)
    },
  })
}

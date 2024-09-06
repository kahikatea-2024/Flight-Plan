import { EventData, Events } from '../../models/flightplan'
import { useEvents } from '../hooks/useEvents'
import * as form from '../utilities/eventFunctions'
import { EventForm } from './EventForm'
interface EditEventProps {
  date: string
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
  handleEditClick: (id: number) => void
  event: Events
}

export function EditEvent({
  date,
  event,
  setEvents,
  handleEditClick,
}: EditEventProps) {
  const userId = 1

  const startTime = form.splitTime(event.startTime)
  const endTime = form.splitTime(event.endTime)

  const { id, ...rest } = event

  const eventData = {
    ...rest,
    startHour: startTime.hour,
    startMinutes: startTime.minutes,
    startAMPM: startTime.timeOfDay,
    endHour: endTime.hour,
    endMinutes: endTime.minutes,
    endAMPM: endTime.timeOfDay,
  }

  const editEventMutation = useEvents(event.tripId.toString(), date, setEvents)

  const handleEditSubmit = async (data: EventData) => {
    const updatedEvent = { ...data, id: id }
    try {
      editEventMutation.mutate(updatedEvent, {
        onSuccess: async () => {
          handleEditClick(id)
        },
      })
    } catch (error) {
      console.error('Failed to edit event:', error)
    }
  }

  return (
    <section>
      <div className="card edit-event-container is-fluid is-centered ">
        <div className="columns is-fluid">
          <div className="column">
            <h2 className="is-size-2 has-text-centered has-text-primary">
              Edit Event
            </h2>
            <EventForm
              date={date}
              tripId={event.tripId}
              userId={userId}
              initialFormData={eventData}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

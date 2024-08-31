import { useState } from 'react'
import { EventData, Events } from '../../models/flightplan'
import { addEvent, getEvents } from '../apis/events'
import { EventForm } from './EventForm'

interface AddEventProps {
  date: string
  tripId: string
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
}

export function AddEvent({ date, tripId, setEvents }: AddEventProps) {
  const userId = 1

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const initialFormData = {
    description: '',
    location: '',
    type: 'Event',
    startHour: '',
    startMinutes: '',
    startAMPM: '',
    endHour: '',
    endMinutes: '',
    endAMPM: '',
    note: '',
  }

  const handleAddSubmit = async (data: EventData) => {
    try {
      await addEvent(data)
      const events = await getEvents(tripId.toString(), date as string)
      setEvents(events)
      setIsFormOpen(false)
    } catch (error) {
      console.error('Failed to add event:', error)
    }
  }

  const openForm = () => setIsFormOpen((open) => !open)

  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className=" ">
          <h2 className="is-size-2 has-text-centered has-text-primary">
            Add An Event
          </h2>

          {isFormOpen ? (
            <div className="container">
              <EventForm
                date={date}
                tripId={tripId}
                userId={userId}
                initialFormData={initialFormData}
                onSubmit={handleAddSubmit}
              />
            </div>
          ) : (
            <div className="field is-grouped is-grouped-centered mt-4">
              <button className="button is-primary" onClick={openForm}>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import { Events } from '../../models/flightplan'
import { useState } from 'react'
import { EventItem } from './EventItem'
import { EditEvent } from './EditEventForm'

interface EventsByDayProps {
  events: Events[]
  date: string
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
}

export function EventsByDay({ events, setEvents, date }: EventsByDayProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const handleEditClick = (id: number) => {
    setEditId((prevId) => (prevId === id ? null : id))
    console.log(`Current editId: ${editId}, Clicked ID: ${id}`)
  }

  if (!events || events.length === 0) {
    return (
      <section className="mb-6">
        <div className="container is-fluid">
          <h1 className="is-size-2 has-text-centered has-text-primary">
            Events
          </h1>
          <h2 className="has-text-centered mb-5">No events yet...</h2>
          <p className="has-text-centered mb-5">
            Add an event to start planning
          </p>
        </div>
      </section>
    )
  }

  // Sort the events by start time
  events.sort((a, b) => {
    const parseTime = (time: string) => {
      const [hour, minute] = time.split(':')
      const isPM = time.toLowerCase().includes('pm')
      return { hour: parseInt(hour), minute: parseInt(minute), isPM }
    }

    const timeA = parseTime(a.startTime)
    const timeB = parseTime(b.startTime)

    if (timeA.isPM && !timeB.isPM) return 1
    if (!timeA.isPM && timeB.isPM) return -1
    if (timeA.hour !== timeB.hour) return timeA.hour - timeB.hour
    return timeA.minute - timeB.minute
  })

  return (
    <section className="m-6">
      <div className="container">
        <h1 className="is-size-2 has-text-centered has-text-primary mb-4">
          Events
        </h1>
        {events.map((event, index) => (
          <div key={event.id}>
            {editId === event.id ? (
              <EditEvent
                date={date}
                tripId={event.tripId}
                id={event.id}
                event={event}
                setEvents={setEvents}
              />
            ) : (
              <>
                <EventItem
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  type={event.type}
                  location={event.location}
                  note={event.note}
                  isOpen={activeIndex === index}
                  onClick={() => handleItemClick(index)}
                />
              </>
            )}
            <button onClick={() => handleEditClick(event.id)}>
              {editId === event.id ? 'Close' : 'Edit'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

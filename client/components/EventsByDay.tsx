import { Events } from '../../models/flightplan'
import { useState } from 'react'
import { EventItem } from './EventItem'

interface EventsByDayProps {
  events: Events[]
}

export function EventsByDay({ events }: EventsByDayProps) {
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
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

        {events.map(
          ({
            index,
            id,
            description,
            startTime,
            endTime,
            note,
            location,
            type,
          }) => (
            <EventItem
              key={id}
              startTime={startTime}
              endTime={endTime}
              description={description}
              type={type}
              location={location}
              note={note}
              isOpen={activeIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ),
        )}
      </div>
    </section>
  )
}

// key={id} className="card is-primary is-outlined">
// <p className="card-content has-text-left is-size-5 pb-1 has-background-primary-light">
//   <span> Start Time: {startTime} </span>
//   <span className="ml-6">End Time: {endTime}</span>
// </p>
// <p className="card-content is-size-5 pb-1">{description}</p>
// <p className="card-content is-size-5 pb-1">
//   Event Type: {type}
// </p>
// <p className="card-content is-size-5 pb-1">
//   Location: {location}
// </p>

// <div>
//   <p className="card-content is-size-5">Note: {note}</p>
// </div>
// </li>

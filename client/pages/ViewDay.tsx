import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { AddEvent } from '../components/AddEventForm'
import { EventsByDay } from '../components/EventsByDay'
import { Notes } from '../components/Notes'
import { useParams } from 'react-router-dom'
import { getEvents } from '../apis/events' // Import the getEvents function
import { Events } from '../../models/flightplan'

export default function ViewDay() {
  const { date, id } = useParams()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents(id as string, date as string)
        setEvents(eventsData)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }

    fetchEvents()
  }, [date, id])

  return (
    <>
      <div className="container">
        <div className="title has-text-primary">
          {format(date as string, 'EEE dd MMM')}
        </div>
        <div className="columns">
          <div className="column is-half ">
            <Notes />
          </div>
          <div className="column ">
            <AddEvent date={date} tripId={id} setEvents={setEvents} />
          </div>
        </div>
        <EventsByDay events={events} />
      </div>
    </>
  )
}

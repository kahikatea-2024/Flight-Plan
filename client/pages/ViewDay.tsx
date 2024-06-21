import { format } from 'date-fns'
import { AddEvent } from '../components/AddEventForm'
import { DayView } from '../components/DayView'
import { EventsByDay } from '../components/EventsByDay'
import { Notes } from '../components/Notes'
import { useParams } from 'react-router-dom'

export function ViewDay() {
  const day = useParams()
  const date = day.date
  return (
    <>
      {/* <DayView /> */}
      <div className="container">
        <div className="title has-text-primary">
          {format(date, 'EEE dd MMM')}
        </div>
        <div className="columns">
          <div className="column is-half ">
            <Notes />
          </div>
          <div className="column ">
            <AddEvent />
          </div>
        </div>
        <EventsByDay />
      </div>
    </>
  )
}

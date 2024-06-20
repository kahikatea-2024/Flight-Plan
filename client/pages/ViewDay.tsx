import { AddEvent } from '../components/AddEventForm'
import { DayView } from '../components/DayView'
import { EventsByDay } from '../components/EventsByDay'
import { Notes } from '../components/Notes'

export function ViewDay() {
  return (
    <>
      {/* <DayView /> */}
      <div className="container">
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

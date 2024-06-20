import { AddEvent } from '../components/AddEventForm'
import { EventsByDay } from '../components/EventsByDay'
import { Notes } from '../components/Notes'

export function ViewDay() {
  return (
    <>
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

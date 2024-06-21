import { useState } from 'react'
import { EventData } from '../../models/flightplan'
import { addEvent } from '../apis/events'

// { tripId, selectedDate, userId }
export function AddEvent() {
  //use params for date
  const selectedDate = '1/07/2024'
  const tripId = 1
  const userId = 2

  const [title, setTitle] = useState('')
  // const [startDate, setStartDate] = useState(selectedDate)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [startTimeOfDay, setStartTimeOfDay] = useState('')
  const [endTimeOfDay, setEndTimeOfDay] = useState('')
  const [note, setNote] = useState('')

  //TODO - fix state for AM/PM
  function combineTimeAndDay(
    startTime: string,
    startTimeOfDay: string,
  ): string {
    // Combine time and day using template literals
    return `${startTime}${startTimeOfDay.toLowerCase()}` // Convert AM/PM to lowercase
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log('time', startTime, startTimeOfDay)
    const startTimeCombined = combineTimeAndDay(startTime, startTimeOfDay)
    // console.log('com', startTimeCombined)
    const eventData: EventData = {
      tripId: tripId,
      description: title,
      date: selectedDate,
      startTime: startTimeCombined,
      endTime: endTime,
      note: note,
      createdBy: userId,
    }

    try {
      await addEvent(eventData)
    } catch (error) {
      console.error('Failed to add event:', error)
    }
    console.log(eventData)
  }

  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className="columns is-fluid">
          <div className="column  ">
            <h2 className="title has-text-centered has-text-primary">
              Add An Event
            </h2>
            <form
              onSubmit={handleSubmit}
              className="field-is-horizontal is-centered"
            >
              <div className="field">
                <label className="label">Event Title</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="event-time">
                <div className="time-wrapper">
                  <div className="field has-addons">
                    <label className="label">Start</label>
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </p>
                    <p className="control">
                      <span className="select">
                        <select
                          value={startTimeOfDay}
                          onChange={(e) => setStartTimeOfDay(e.target.value)}
                        >
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="field has-addons ml-4">
                  <label className="label"> End</label>
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="End Time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </p>
                  <p className="control">
                    <span className="select">
                      <select
                        value={endTimeOfDay}
                        onChange={(e) => setEndTimeOfDay(e.target.value)}
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </span>
                  </p>
                </div>
              </div>
              <div className="field">
                <label className="label">Event Note</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Note"
                    // rows="4"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered mt-4">
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

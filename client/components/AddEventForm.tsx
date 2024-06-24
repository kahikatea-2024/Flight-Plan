import { useState } from 'react'
import { EventData, Events } from '../../models/flightplan'
import { addEvent, getEvents } from '../apis/events'

interface AddEventProps {
  date: string
  tripId: string
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
}

export function AddEvent({ date, tripId, setEvents }: AddEventProps) {
  const userId = 1

  const [formData, setFormData] = useState({
    title: ' ',
    startHour: ' ',
    startMinutes: ' ',
    startAMPM: ' ',
    endHour: ' ',
    endMinutes: ' ',
    endAMPM: ' ',
    note: ' ',
  })

  const [formErrors, setFormErrors] = useState({
    title: ' ',
    startHour: ' ',
    startMinutes: ' ',
    startAMPM: ' ',
    endHour: ' ',
    endMinutes: ' ',
    endAMPM: ' ',
    note: ' ',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // Perform validation checks and update the error state
    if (name === 'title' && value.length < 5) {
      setFormErrors((prevState) => ({
        ...prevState,
        title: 'Please enter a descriptive title.',
      }))
    } else if (name === 'startHour' && (value > 12 || isNaN(value))) {
      setFormErrors((prevState) => ({
        ...prevState,
        startHour: 'Please enter a valid hour between 0 - 12.',
      }))
    } else if (name === 'startMinutes' && (value > 60 || isNaN(value))) {
      setFormErrors((prevState) => ({
        ...prevState,
        startMinutes: 'Please choose a valid time between 0 - 60 minutes.',
      }))
    } else if (name === 'startAMPM' && !['AM', 'PM'].includes(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        startAMPM: 'Please choose AM or PM.',
      }))
    } else if (name === 'endHour' && (value > 12 || isNaN(value))) {
      setFormErrors((prevState) => ({
        ...prevState,
        endHour: 'Please enter a valid hour between 0 - 12.',
      }))
    } else if (name === 'endMinutes' && (value > 60 || isNaN(value))) {
      setFormErrors((prevState) => ({
        ...prevState,
        endMinutes: 'Please choose a valid time between 0 - 60 minutes.',
      }))
    } else if (name === 'endAMPM' && !['AM', 'PM'].includes(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        endAMPM: 'Please choose AM or PM.',
      }))
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: ' ', // Reset error message
      }))
    }
  }

  function combineTimeAndDay(
    hour: string,
    minutes: string,
    timeOfDay: string,
  ): string {
    return `${hour}:${minutes}${timeOfDay.toLowerCase()}` // Convert AM/PM to lowercase
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const startTimeCombined = combineTimeAndDay(
      formData.startHour,
      formData.startMinutes,
      formData.startAMPM,
    )
    const endTimeCombined = combineTimeAndDay(
      formData.endHour,
      formData.endMinutes,
      formData.endAMPM,
    )

    const eventData: EventData = {
      tripId: tripId,
      description: formData.title,
      date: date as string,
      startTime: startTimeCombined,
      endTime: endTimeCombined,
      note: formData.note,
      createdBy: userId,
    }

    const isFormValid = Object.values(formErrors).every(
      (error) => error === ' ',
    )

    if (isFormValid) {
      try {
        await addEvent(eventData)
        const events = await getEvents(tripId.toString(), date as string)
        setEvents(events) // Update the events state
        console.log('get events', events)
      } catch (error) {
        console.error('Failed to add event:', error)
      }
    }
  }

  return (
    <section>
      <div className="container is-fluid is-centered">
        <div className="columns is-fluid">
          <div className="column">
            <h2 className="is-size-2 has-text-centered has-text-primary">
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
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {formErrors.title && (
                    <div className="error">{formErrors.title}</div>
                  )}
                </div>
              </div>
              <div className="event-time">
                <div className="time-wrapper">
                  <div className="field has-addons">
                    <label className="label">Event Time</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="00"
                        name="startHour"
                        value={formData.startHour}
                        onChange={handleChange}
                      />
                      {formErrors.startHour && (
                        <div className="error">{formErrors.startHour}</div>
                      )}
                    </div>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="00"
                        name="startMinutes"
                        value={formData.startMinutes}
                        onChange={handleChange}
                      />
                      {formErrors.startMinutes && (
                        <div className="error">{formErrors.startMinutes}</div>
                      )}
                    </div>
                    <div className="control">
                      <span className="select">
                        {formErrors.startAMPM && (
                          <span className="error">{formErrors.startAMPM}</span>
                        )}
                        <select
                          name="startAMPM"
                          value={formData.startAMPM}
                          onChange={handleChange}
                        >
                          <option>Select</option>
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="field has-addons ml-4">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="00"
                      name="endHour"
                      value={formData.endHour}
                      onChange={handleChange}
                    />
                    {formErrors.endHour && (
                      <div className="error">{formErrors.endHour}</div>
                    )}
                  </div>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="endMinutes"
                      placeholder="00"
                      value={formData.endMinutes}
                      onChange={handleChange}
                    />
                    {formErrors.endMinutes && (
                      <div className="error">{formErrors.endMinutes}</div>
                    )}
                  </div>
                  <div className="control">
                    <span className="select">
                      {formErrors.endAMPM && (
                        <span className="error">{formErrors.endAMPM}</span>
                      )}
                      <select
                        name="endAMPM"
                        value={formData.endAMPM}
                        onChange={handleChange}
                      >
                        <option>Select</option>
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Event Note</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                  />
                  {formErrors.note && (
                    <div className="error">{formErrors.note}</div>
                  )}
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

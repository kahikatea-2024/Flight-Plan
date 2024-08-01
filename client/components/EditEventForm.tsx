import { useState } from 'react'
import { Events } from '../../models/flightplan'
import { getEvents } from '../apis/events'
import { UseEvents } from '../hooks/useEvents'

interface EditEventProps {
  date: string
  tripId: number
  id: number
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
  events: Events[]
}

export function EditEvent({
  date,
  tripId,
  id,
  setEvents,
  events,
}: EditEventProps) {
  const userId = 1

  const [formData, setFormData] = useState({
    ...events,
  })

  const [formErrors, setFormErrors] = useState({
    title: ' ',
    location: ' ',
    type: ' ',
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
    console.log(formData.type)

    // Perform validation checks and update the error state
    if (name === 'title' && value.length < 5) {
      setFormErrors((prevState) => ({
        ...prevState,
        title: 'Please enter a descriptive title.',
      }))
    } else if (name === 'location' && value.length < 5) {
      setFormErrors((prevState) => ({
        ...prevState,
        location: 'Please enter a location.',
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

    const eventData: Events = {
      id: id,
      tripId: Number(tripId),
      description: formData.title,
      location: formData.location,
      type: formData.type,
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
        await UseEvents(date, tripId)
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
              Edit Event
            </h2>
            <form
              onSubmit={handleSubmit}
              className="field-is-horizontal is-centered"
            >
              <div className="field level">
                <label className="label level-left" htmlFor="title">
                  Event Title
                </label>
                <div className="control level-item">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Title"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {formErrors.title && (
                    <div className="error">{formErrors.title}</div>
                  )}
                </div>
              </div>
              <div className="field level">
                <label className="label level-left" htmlFor="location">
                  Event Location
                </label>
                <div className="control level-item">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Location"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {formErrors.location && (
                    <div className="error">{formErrors.location}</div>
                  )}
                </div>
              </div>

              <div className="control level field is-horizontal">
                <div className="level-left">
                  <div className="field-label level field is-horizontal">
                    Event Type
                  </div>
                  <span className="radio level-item pr-4 pl-4">
                    <label
                      className="radio field is-horizontal"
                      htmlFor="Event"
                    >
                      <input
                        type="radio"
                        name="type"
                        id="Event"
                        value="Event"
                        checked={formData.type === 'Event'}
                        onChange={handleChange}
                      />
                      Event
                    </label>
                    <label
                      className="radio field is-horizontal"
                      htmlFor="Flight"
                    >
                      <input
                        type="radio"
                        name="type"
                        id="Flight"
                        value="Flight"
                        checked={formData.type === 'Flight'}
                        onChange={handleChange}
                      />
                      Flight
                    </label>
                    <label
                      className="radio field is-horizontal"
                      htmlFor="Accommodation"
                    >
                      <input
                        type="radio"
                        name="type"
                        id="Accommodation"
                        value="Accommodation"
                        checked={formData.type === 'Accommodation'}
                        onChange={handleChange}
                      />
                      Accommodation
                    </label>

                    {formErrors.type && (
                      <span className="error">{formErrors.type}</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="field is-horizontal ">
                <label className="field-label level-left " htmlFor="startHour">
                  Event Start
                </label>
                <div className="field-body is-flex">
                  <div className="grouped-wrapper">
                    <input
                      className="input"
                      type="text"
                      placeholder="00"
                      name="startHour"
                      id="startHour"
                      value={formData.startHour}
                      onChange={handleChange}
                    />
                    {formErrors.startHour && (
                      <div className="error">{formErrors.startHour}</div>
                    )}
                  </div>
                  <div className="grouped-wrapper">
                    <label className="label " htmlFor="startMinutes">
                      <input
                        className="input"
                        type="text"
                        placeholder="00"
                        name="startMinutes"
                        id="startMinutes"
                        value={formData.startMinutes}
                        onChange={handleChange}
                      />
                      {formErrors.startMinutes && (
                        <div className="error">{formErrors.startMinutes}</div>
                      )}
                    </label>
                  </div>
                  <div className=" grouped-wrapper">
                    <span className="select">
                      <label className="label " htmlFor="startAMPM">
                        <select
                          name="startAMPM"
                          id="startAMPM"
                          value={formData.startAMPM}
                          onChange={handleChange}
                        >
                          <option>Select</option>
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                        {formErrors.startAMPM && (
                          <span className="error">{formErrors.startAMPM}</span>
                        )}
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <label className="field-label level-left" htmlFor="endHour">
                  Event End
                </label>
                <div className="field-body is-flex">
                  <div className="grouped-wrapper">
                    <input
                      className="input"
                      type="text"
                      placeholder="00"
                      name="endHour"
                      id="endHour"
                      value={formData.endHour}
                      onChange={handleChange}
                    />
                    {formErrors.endHour && (
                      <div className="error">{formErrors.endHour}</div>
                    )}
                  </div>
                  <div className="grouped-wrapper">
                    <label className="label " htmlFor="endMinutes">
                      <input
                        className="input"
                        type="text"
                        placeholder="00"
                        name="endMinutes"
                        id="endMinutes"
                        value={formData.endMinutes}
                        onChange={handleChange}
                      />
                      {formErrors.endMinutes && (
                        <div className="error">{formErrors.endMinutes}</div>
                      )}
                    </label>
                  </div>
                  <div className=" grouped-wrapper">
                    <span className="select">
                      <label className="label " htmlFor="endAMPM">
                        <select
                          name="endAMPM"
                          id="endAMPM"
                          value={formData.endAMPM}
                          onChange={handleChange}
                        >
                          <option>Select</option>
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                        {formErrors.endAMPM && (
                          <span className="error">{formErrors.endAMPM}</span>
                        )}
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              <div className="field level">
                <label className="label level-left" htmlFor="note">
                  Event Note
                </label>
                <div className="control level-item">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Note"
                    name="note"
                    id="note"
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

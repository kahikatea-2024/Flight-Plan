import { useState } from 'react'
import { EventData, Events } from '../../models/flightplan'
import { addEvent, getEvents } from '../apis/events'
import { combineTimeAndDay, eventFormValidation } from '../utilities/eventTimes'

interface AddEventProps {
  date: string
  tripId: string
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
}

interface FormData {
  description: string
  location: string
  type: string
  startHour: string
  startMinutes: string
  startAMPM: string
  endHour: string
  endMinutes: string
  endAMPM: string
  note: string
}

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

const initialFormErrors = {
  description: '',
  location: '',
  type: '',
  startHour: '',
  startMinutes: '',
  startAMPM: '',
  endHour: '',
  endMinutes: '',
  endAMPM: '',
  note: '',
}

export function AddEvent({ date, tripId, setEvents }: AddEventProps) {
  const userId = 1

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<FormData>(initialFormErrors)

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    eventFormValidation(name, value, setFormErrors)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      tripId: Number(tripId),
      description: formData.description,
      location: formData.location,
      type: formData.type,
      date: date as string,
      startTime: startTimeCombined,
      endTime: endTimeCombined,
      note: formData.note,
      createdBy: userId,
    }

    if (Object.values(formErrors).every((error) => error === '')) {
      try {
        await addEvent(eventData)
        setFormData(initialFormData)
        const events = await getEvents(tripId.toString(), date as string)
        setEvents(events) // Update the events state
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
              <div className="field level">
                <label className="label level-left" htmlFor="description">
                  Event Name
                </label>
                <div className="control level-item">
                  <input
                    type="text"
                    className="input"
                    placeholder="Event Name"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {formErrors.description && (
                    <div className="error">{formErrors.description}</div>
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
                      type="number"
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
                        type="number"
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
                      type="number"
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
                        type="number"
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

import { useState } from 'react'
import { EventData, Events } from '../../models/flightplan'
import { addEvent, getEvents } from '../apis/events'
import { combineTimeAndDay, eventFormValidation } from '../utilities/eventTimes'
import { FormText } from './FormText'
import { FormLabel } from './formComponents/FormLabel'
import { FormRadio } from './formComponents/FormRadio'
import { FormSelect } from './formComponents/FormSelect'
import { FormTime } from './formComponents/FormTime'

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
          {/* <div className="column"> */}
          <h2 className="is-size-2 has-text-centered has-text-primary">
            Add An Event
          </h2>
          <div>
            <form
              onSubmit={handleSubmit}
              className="field-is-horizontal is-centered"
            >
              <div className="field is-horizontal">
                <FormLabel label="Title" id={'description'} />
                <FormText
                  placeholder="Event Title"
                  name={'description'}
                  id={'description'}
                  value={formData.description}
                  handleChange={handleChange}
                  formErrors={formErrors.description}
                />
              </div>
              <div className="field is-horizontal">
                <FormLabel label="Location" id={'location'} />
                <FormText
                  placeholder="Event Location"
                  name={'location'}
                  id={'location'}
                  value={formData.location}
                  handleChange={handleChange}
                  formErrors={formErrors.location}
                />
              </div>

              <div className="field is-horizontal">
                <div className="field-label">
                  <p className="label">Event Type</p>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control">
                      <FormRadio
                        name={'type'}
                        id={'Event'}
                        value={'Event'}
                        check={formData.type}
                        handleChange={handleChange}
                      />
                      <FormRadio
                        name={'type'}
                        id={'Flight'}
                        value={'Flight'}
                        check={formData.type}
                        handleChange={handleChange}
                      />
                      <FormRadio
                        name={'type'}
                        id={'Accommodation'}
                        value={'Accommodation'}
                        check={formData.type}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <FormLabel label="Start Time" id={'startTime'} />
                <div className="field-body is-horizontal">
                  <FormTime
                    placeholder="00"
                    name={'startHour'}
                    id={'startHour'}
                    value={formData.startHour}
                    handleChange={handleChange}
                    formErrors={formErrors.startHour}
                  />
                  <FormTime
                    placeholder="00"
                    name={'startMinutes'}
                    id={'startMinutes'}
                    value={formData.startMinutes}
                    handleChange={handleChange}
                    formErrors={formErrors.startMinutes}
                  />
                  <FormSelect
                    name={'startAMPM'}
                    id={'startAMPM'}
                    value={formData.startAMPM}
                    handleChange={handleChange}
                    formErrors={formErrors.startAMPM}
                  />
                </div>
              </div>

              <div className="field is-horizontal">
                <FormLabel label="End Time" id={'endTime'} />
                <div className="field-body is-horizontal">
                  <FormTime
                    placeholder="00"
                    name={'endHour'}
                    id={'endHour'}
                    value={formData.endHour}
                    handleChange={handleChange}
                    formErrors={formErrors.endHour}
                  />
                  <FormTime
                    placeholder="00"
                    name={'endMinutes'}
                    id={'endMinutes'}
                    value={formData.endMinutes}
                    handleChange={handleChange}
                    formErrors={formErrors.endMinutes}
                  />
                  <FormSelect
                    name={'endAMPM'}
                    id={'endAMPM'}
                    value={formData.endAMPM}
                    handleChange={handleChange}
                    formErrors={formErrors.endAMPM}
                  />
                </div>
              </div>

              <div className="field is-horizontal">
                <FormLabel label="Note" id={'note'} />
                <FormText
                  placeholder="Event note"
                  name={'note'}
                  id={'note'}
                  value={formData.note}
                  handleChange={handleChange}
                  formErrors={formErrors.note}
                />
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

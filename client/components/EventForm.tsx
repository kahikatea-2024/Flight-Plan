import { useState } from 'react'
import { FormLabel } from './formComponents/FormLabel'
import { FormRadio } from './formComponents/FormRadio'
import { FormSelect } from './formComponents/FormSelect'
import { FormTime } from './formComponents/FormTime'
import { FormText } from './formComponents/FormText'
import {
  combineTimeAndDay,
  eventFormValidation,
  submitValidation,
} from '../utilities/eventTimes'
import { EventData, FormErrors, FormInputData } from '../../models/flightplan'

interface Props {
  date: string
  tripId: string | number
  userId: number
  initialFormData: FormInputData
  onSubmit: (data: EventData) => Promise<void>
}

export function EventForm(props: Props) {
  const { date, tripId, userId, initialFormData, onSubmit } = props

  const initialFormErrors = {
    description: '',
    location: '',
    type: '',
    startTime: '',
    startHour: '',
    startMinutes: '',
    startAMPM: '',
    endTime: '',
    endHour: '',
    endMinutes: '',
    endAMPM: '',
    note: '',
  }

  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors)
  const [formData, setFormData] = useState<FormInputData>(initialFormData)

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Call async validation, check against validation from handlechange as well
      const validationErrors = await submitValidation(formData)

      if (
        Object.values(formErrors).every((error) => error !== '') ||
        Object.keys(validationErrors).length > 0
      ) {
        setFormErrors(validationErrors)
        alert('Please complete all required fields.')
        return
      }

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

      onSubmit(eventData)
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred while submitting the form.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="field-is-horizontal is-centered">
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
          {formErrors.startTime}
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
          {formErrors.endTime}
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
  )
}

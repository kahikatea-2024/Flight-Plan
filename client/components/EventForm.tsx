import { useState } from 'react'
import { FormLabel } from './formComponents/FormLabel'
import { FormRadio } from './formComponents/FormRadio'
import { FormSelect } from './formComponents/FormSelect'
import { FormText } from './formComponents/FormText'
import * as form from '../utilities/eventFunctions'
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

  const [formErrors, setFormErrors] = useState<FormErrors>({})
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

    form.validateInputs(name, value, setFormErrors)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Call async validation, check against validation from handlechange as well
      const validationErrors = await form.validateSubmit(formData)

      if (
        Object.values(formErrors).every((error) => error !== '') ||
        Object.keys(validationErrors).length > 0
      ) {
        setFormErrors(validationErrors)
        alert('Please complete all required fields.')
        return
      }

      const startTimeCombined = form.mergeTime(
        formData.startHour,
        formData.startMinutes,
        formData.startAMPM,
      )

      const endTimeCombined = form.mergeTime(
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

  const selectTime: { [key: string]: string[] } = {
    Hour: [
      'Select',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
    Minutes: [
      'Select',
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
    ],
    AMPM: ['Select', 'AM', 'PM'],
  }

  type SelectTimeKeys = keyof typeof selectTime

  const timeInputs: SelectTimeKeys[] = ['Hour', 'Minutes', 'AMPM']

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
            {timeInputs.map((time) => (
              <div key={time}>
                <FormSelect
                  name={`start${time}`}
                  id={`start${time}`}
                  value={formData[`start${time}` as keyof FormInputData]}
                  selectOption={selectTime[`${time}`]}
                  handleChange={handleChange}
                  formErrors={formErrors[`start${time}`]}
                />
              </div>
            ))}
            {formErrors.startTime}
          </div>
        </div>

        <div className="field is-horizontal">
          <FormLabel label="End Time" id={'endTime'} />
          <div className="field-body is-horizontal">
            {timeInputs.map((time) => (
              <div key={time}>
                <FormSelect
                  name={`end${time}`}
                  id={`end${time}`}
                  value={formData[`end${time}` as keyof FormInputData]}
                  selectOption={selectTime[`${time}`]}
                  handleChange={handleChange}
                  formErrors={formErrors[`end${time}`]}
                />
              </div>
            ))}
            {formErrors.endTime}
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
  )
}

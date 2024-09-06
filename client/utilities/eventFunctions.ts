import { FormErrors, FormInputData } from '../../models/flightplan'

export function mergeTime(hour: string, minutes: string, timeOfDay: string) {
  // trim then leading zeros if needed
  const formattedHour = hour.trim().padStart(2, '0')
  const formattedMinutes = minutes.trim().padStart(2, '0')

  return `${formattedHour}:${formattedMinutes}${timeOfDay.toLowerCase()}` // Convert AM/PM to lowercase
}

export function splitTime(timeInput: string): {
  hour: string
  minutes: string
  timeOfDay: string
} {
  const match = timeInput.match(/^(\d{2}):(\d{2})(am|pm)$/i)

  if (match) {
    return {
      hour: match[1],
      minutes: match[2],
      timeOfDay: match[3].toUpperCase(),
    }
  } else {
    throw new Error('Invalid time string format')
  }
}

export function validateInputs(
  name: string,
  value: string,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
  formErrors: FormErrors,
) {
  // Define key groups with a map to group key
  const keyToGroupMap: { [key: string]: string } = {
    endHour: 'endTime',
    endMinutes: 'endTime',
    endAMPM: 'endTime',
    startHour: 'startTime',
    startMinutes: 'startTime',
    startAMPM: 'startTime',
  }

  // Define error messages for each group
  const validationMessages: { [key: string]: string } = {
    endTime: 'Please enter an end time.',
    startTime: 'Please enter a start time.',
  }
  const groupKey = keyToGroupMap[name]

  // Perform validation checks and update the error state
  if ((name === 'description' || name === 'location') && value.length < 5) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: `Please enter a ${name}.`,
    }))
  } else if (groupKey && (value.trim() === '' || value === 'Select')) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: validationMessages[groupKey],
      [groupKey]: validationMessages[groupKey],
    }))
  } else {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '', // Reset error message
    }))

    const groupFields = Object.keys(keyToGroupMap).filter(
      (key) => keyToGroupMap[key] === groupKey,
    )

    const allFieldsValid = groupFields.every(
      (field) => formErrors[field] === '' || formErrors[field] === undefined,
    )

    setFormErrors((prevState) => ({
      ...prevState,
      [groupKey]: allFieldsValid ? '' : validationMessages[groupKey],
    }))
  }

  return setFormErrors
}

//Validation for empty fields on submit
//note is not a required field

export async function validateSubmit(
  formData: FormInputData,
): Promise<FormErrors> {
  const emptyInput: FormErrors = {}

  Object.keys(formData).forEach((key) => {
    const value = formData[key as keyof FormInputData]

    if (typeof value === 'string') {
      // Handle time values
      if (key == 'startHour' || key == 'startMinutes' || key == 'startAMPM') {
        if (value.trim() === '') {
          emptyInput['startTime'] = `Please enter a start time submit.`
        }
      }

      if (key == 'endTime' || key == 'endMinutes' || key == 'endAMPM') {
        if (value.trim() === '' || value === 'Select') {
          emptyInput['endTime'] = `Please enter an end time.`
        }
      }

      // Handle other values
      else if (key == 'description' || key == 'location') {
        if (value.trim() === '') {
          emptyInput[key] = `Please enter a ${key} for the event.`
        }
      }
    }
  })
  return emptyInput
}

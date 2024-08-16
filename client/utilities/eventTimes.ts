export function combineTimeAndDay(
  hour: string,
  minutes: string,
  timeOfDay: string,
) {
  // trim then leading zeros if needed
  const formattedHour = hour.trim().padStart(2, '0')
  const formattedMinutes = minutes.trim().padStart(2, '0')

  return `${formattedHour}:${formattedMinutes}${timeOfDay.toLowerCase()}` // Convert AM/PM to lowercase
}

export function splitTimeAndDay(timeInput: string): {
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

export function eventFormValidation(
  name: string,
  value: string,
  setFormErrors: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >,
) {
  const numberValue = Number(value)

  // Perform validation checks and update the error state
  if (name === 'description' && value.length < 5) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: 'Please enter a descriptive title.',
    }))
  } else if (name === 'location' && value.length < 5) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: 'Please enter a location.',
    }))
  } else if (
    (name === 'startHour' || name === 'endHour') &&
    (isNaN(numberValue) || numberValue > 12 || numberValue < 0)
  ) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: 'Please enter a valid hour between 0 - 12.',
    }))
  } else if (
    (name === 'startMinutes' || name === 'endMinutes') &&
    (isNaN(numberValue) || numberValue > 60 || numberValue < 0)
  ) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: 'Please choose a valid time between 0 - 59 minutes.',
    }))
  } else if (
    (name === 'startAMPM' || name === 'endAMPM') &&
    !['AM', 'PM'].includes(value)
  ) {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: 'Please choose AM or PM.',
    }))
  } else {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '', // Reset error message
    }))
  }
  return setFormErrors
}

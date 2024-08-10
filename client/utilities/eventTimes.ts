export function combineTimeAndDay(
  hour: string,
  minutes: string,
  timeOfDay: string,
) {
  return `${hour}:${minutes}${timeOfDay.toLowerCase()}` // Convert AM/PM to lowercase
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

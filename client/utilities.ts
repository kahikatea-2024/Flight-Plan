import { format } from 'date-fns'

//CONVERT DATE TO YYYY-MM-DD
export function formatDateYMD(date: string) {
  return format(date, 'yyyy-MM-dd')
}

// export function formatDateYMD(date: string): string {
//   return format(new Date(date), 'yyyy-MM-dd')
// }

// CONVERT TIME TO 24HR
// export function formatTimeToHHHH(time: string) {
//   if (time.charAt(5) === 'a') {
//     const convertedTime = time.slice(0, 2) + time.slice(3, 5)
//     return convertedTime
//   } else if (time.charAt(5) === 'p') {
//     const convertedTime = time.slice(0, 2) + time.slice(3, 5)
//     const numTime = parseInt(convertedTime) + 1200
//     if (numTime < 2401) {
//       return JSON.stringify(numTime)
//     } else {
//       return 'error'
//     }
//   }
// }

export function formatTimeToHHHH(time: string): string {
  const hours = parseInt(time.slice(0, 2), 10) // Parse hours efficiently
  const minutes = time.slice(3, 5)
  const amPm = time.charAt(5).toLowerCase() // Lowercase AM/PM for case-insensitivity

  let convertedHours = hours
  if (hours > 12) {
    return 'error'
  } else if (amPm === 'p') {
    convertedHours += 12
  } else if (amPm === 'a') {
    convertedHours
  } else {
    return 'error'
  }

  const formattedTime = `${convertedHours.toString().padStart(2, '0')}:${minutes}`
  return formattedTime
}

//STRING TOGETHER

export function combineToISODate(date: string, time: string): string {
  const formattedDate = formatDateYMD(date)
  const formattedTime = formatTimeToHHHH(time)

  // console.log('date', formattedDate, 'time', formattedTime)
  if (!formattedDate || !formattedTime) {
    // Handle invalid input gracefully (e.g., return an error message)
    return 'Invalid date or time format.'
  }

  return `${formattedDate}T${formattedTime}:00Z` // Include seconds and UTC offset
}

//Example usage
const date = '2024-07-12' // Assuming valid date format
const time = '10:30pm'
const isoDate = combineToISODate(date, time)
console.log(isoDate) // Output: 2024-07-12T20:15:00Z

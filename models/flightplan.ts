export interface Trips {
  id: number
  createdBy: number
  tripName: string
  startDate: string
  endDate: string
}

export type TripsData = Omit<Trips, 'id'>

export interface Events {
  id: number
  tripId: number
  description: string
  location: string
  date: string
  startTime: string
  endTime: string
  note: string
  createdBy: number
  type: string
}
export type EventWithoutDate = Omit<Events, 'date'>
export type EventData = Omit<Events, 'id'>

export interface Users {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  profilePicture: string
}

export interface SanitizedUser {
  id: number | undefined
  username: string
  firstName: string
  lastName: string
  profilePicture: string
}

export type UserData = Omit<Users, 'id'>

export interface NewUser {
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface Trip_users {
  id: number
  tripId: number
  userId: number
}

export interface Friends {
  friendId: number
  userId: number
}
export interface User {
  id: number
  username: string
  email: string
  auth0id: string
  first_name: string
  last_name: string
  phone_number: string
  profile_picture: string
}

export interface Friend {
  id: number
  first_name: string
  last_name: string
  username: string
  profile_picture: string
}

export interface FormInputData {
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

export interface FormErrors {
  [key: string]: string
}

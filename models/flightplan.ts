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
  date: string
  startTime: string
  endTime: string
  note: string
  createdBy: string
}
export type EventWithoutDate = Omit<Events, 'date'>
export type EventData = Omit<Events, 'id'>

export interface Users {
  find(arg0: (user: any) => boolean): unknown
  id: number | undefined
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

export interface Trip_users {
  id: number
  tripId: number
  userId: number
}

export interface Friends {
  friendId: number
  userId: number
}

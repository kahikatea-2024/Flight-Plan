export interface Trips {
  id: number
  createdBy: string
  tripName: string
  startDate: string
  endDate: string
}

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

export interface Users {
  id: number | undefined
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: number
  profilePicture: string
}

export interface Trip_users {
  id: number
  tripId: number
  userId: number
}

export interface Friends {
  id: number
  firstName: string
  username: string
}

export interface EventData {
  trip_id: number
  date: string
  start_time: string
  end_time: string
  description: string
  notes: string
  created_by: number
}

export interface Trips {
  id: number
  created_by: string
  trip_name: string
  start_date: string
  end_date: string
}

export interface Events {
  id: number
  trip_id: number
  description: string
  date: string
  start_time: string
  end_time: string
  note: string
}

export interface Users {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone_number: number
  profile_picture: string
}

export interface Trip_users {
  id: number
  trip_id: number
  user_id: number
}

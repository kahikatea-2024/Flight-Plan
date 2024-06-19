import db from './connection.ts'
import { Events, Trips, Users } from '../../models/flightplan.ts'

//USERS
// Get all Users
export async function getAllUsers() {
  const users = await db('users').select()
  return users as Users[]
}
// Get user by ID
export async function getUserById(id: number) {
  const user = await db('users').select().first().where({ id })
  return user as Users
}

// Get Trip by User ID
export async function getTripsByUserId(id: number) {
  const trip = await db('users')
    .join('trip_users', 'users.id', 'trip_users.user_id')
    .join('trips', 'trip_users.trip_id', 'trips.id')
    .where('users.id', id)
    .select('first_name', 'last_name', 'trip_name', 'start_date', 'end_date')
  return trip as Trips[]
}

//EVENTS

// Get all Events
export async function getAllEvents() {
  const events = await db('events').select()
  return events as Events[]
}
// Get event by ID
export async function getEventById(id: number) {
  const event = await db('events').select().first().where({ id })
  return event as Events
}

//Trips

// Get all Trips
export async function getAllTrips() {
  const trips = await db('trips').select()
  return trips as Trips[]
}
// Get Trip by ID
export async function getTripById(id: number) {
  const trip = await db('trips').select().first().where({ id })
  return trip as Trips
}
// Get Users going on Trip
export async function geUsersByTripId(id: number) {
  const trip = await db('trips')
    .join('trip_users', 'trips.id', 'trip_users.trip_id')
    .join('users', 'trip_users.user_id', 'users.id')
    .where('trips.id', id)
    .select('first_name', 'last_name', 'trip_name', 'email', 'phone_number')
  return trip as Trips[]
}

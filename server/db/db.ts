import db from './connection.ts'
import {
  Events,
  Friends,
  Trips,
  TripsData,
  Users,
} from '../../models/flightplan.ts'

//
//USERS
//

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
    .select(
      'first_name as firstName',
      'last_name as lastName',
      'trip_name as tripName',
      'start_date as startDate',
      'end_date as endDate',
    )
  return trip as Trips[]
}

// Get Following by User ID
export async function getFollowingByUserId(id: number) {
  const follow = await db('users')
    .join('following_list', 'users.id', 'following_list.user_id')
    .where('users.id', id)
    .select('users.id as id', 'first_name as firstName', 'username')
  return follow as Friends[]
}

//
//EVENTS
//

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

//
//TRIPS
//

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

// Get Users by Trip ID
export async function geUsersByTripId(id: number) {
  const trip = await db('trips')
    .join('trip_users', 'trips.id', 'trip_users.trip_id')
    .join('users', 'trip_users.user_id', 'users.id')
    .where('trips.id', id)
    .select(
      'first_name as firstName',
      'last_name as lastName',
      'trip_name as tripName',
      'email',
      'phone_number as phoneNumber',
    )
  return trip as Trips[]
}

// Get Events by Trip ID
export async function getEventsByTripId(id: number) {
  const events = await db('trips')
    .join('events', 'events.trip_id', 'trips.id')
    .where('trips.id', id)
    .select(
      'date',
      'start_time as startTime',
      'end_time as endTime',
      'description',
      'notes',
    )
  return events as Events[]
}

// Add a Trip
export async function addTrip(data: Trips) {
  const { id, createdBy, tripName, startDate, endDate } = data
  await db('trips').insert({
    id,
    created_by: createdBy,
    trip_name: tripName,
    start_date: startDate,
    end_date: endDate,
  })
}

// Delete a Trip
export async function deleteTrip(id: number) {
  await db('trips').where({ id }).del()
}

// Edit a Trip
export async function updateTrip(id: number, updatedTrip: TripsData) {
  const { createdBy, tripName, startDate, endDate } = updatedTrip

  const newTrip = await db('trips').where({ id }).update({
    created_by: createdBy,
    trip_name: tripName,
    start_date: startDate,
    end_date: endDate,
  })
  return newTrip
}

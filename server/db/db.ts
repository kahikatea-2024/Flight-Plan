import db from './connection.ts'
import { EventData, Events, Users } from '../../models/flightplan.ts'
// Get all users
export async function getAllUsers() {
  const users = await db('users').select()
  return users as Users[]
}
// Get user by id
export async function getUserById(id: number) {
  const user = await db('users').select().first().where({ id })
  return user as Users
}

// Get all events
export async function getAllEvents() {
  const events = await db('events').select()
  return events as Events[]
}
// Get event by Id
export async function getEventById(id: number) {
  const event = await db('events').select().first().where({ id })
  return event as Events
}

//Add New Event
export async function addNewEvent(newEvent: Events) {
  return await db('events').insert(newEvent)
}

//Add New Event by Trip Id
export async function addNewEventByTripId(newEvent: EventData) {
  const { tripId, date, startTime, endTime, description, note } = newEvent
  if (isNaN(tripId)) {
    throw new Error('invaild tripId')
  }
  const [newEventId] = await db('events')
    .select(
      'trip_id as tripId',
      'date',
      'start_time as startTime',
      'end_time as endTime',
      'description',
      'notes as note',
    )
    .insert({
      tripId,
      date,
      startTime,
      endTime,
      description,
      note,
    })
    .returning('id')
  return newEventId
}

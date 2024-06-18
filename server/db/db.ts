import db from './connection.ts'
import { Events, Users } from '../../models/flightplan.ts'
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
export async function getAllEvents() {
  const events = await db('events').select()
  return events as Events[]
}

export async function getEventById(id: number) {
  const event = await db('events').select().first().where({ id })
  return event as Events
}

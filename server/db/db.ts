import db from './connection.ts'
import { Users } from '../../models/flightplan.ts'
// Get all users
export async function getAllUsers() {
  const users = await db('users').select()
  return users as Users[]
}
// Get user by id
export async function getUsersById(id: number) {
  const user = await db('users').select().first().where({ id })
  return user as Users
}
export async function getEventsByUserId() {
  const users = await db('users').join
  return users as Users[]
}

export async function addFruit(data: FruitData) {
  const [id] = await db('fruit').insert(data)
  return id
}

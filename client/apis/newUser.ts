import request from 'superagent'
import { NewUser } from '../../models/flightplan'

export async function addNewUser(newUser: NewUser) {
  try {
    await request
      .post('/api/v1/users')
      .set('Content-Type', 'application/json')
      .send(newUser)
  } catch (error) {
    console.error('Error adding trip:', error)
    throw error
  }
}

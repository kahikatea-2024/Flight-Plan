import request from 'superagent'
import { Trips } from '../../models/flightplan'

const rootUrl = '/api/v1'

export function getTrips(userId: number) {
  // return request.get('/api/v1/users/1/trips').then((res) => {
  return request.get(rootUrl + `/users/${userId}/trips`).then((res) => {
    console.log(res)

    return res.body as Trips[]
  })
}

//TODO Do we need to send userId through here?
export async function addTrip(tripData: Trips): Promise<void> {
  try {
    await request
      .post(`/api/v1/trips`)
      .set('Content-Type', 'application/json')
      .send(tripData)
  } catch (error) {
    console.error('Error adding trip:', error)
    throw error
  }
}

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

export async function addTrips(tripData: Trips): Promise<number> {
  try {
    console.log('Adding trip with data:', tripData)
    const response = await request
      .post(`/api/v1/trips`)
      .set('Content-Type', 'application/json')
      .send(tripData)

    console.log('Trip added successfully. Response:', response.body)
    return response.body.id // Assuming your API returns the newly created trip ID
  } catch (error) {
    console.error('Error adding trip:', error)
    throw error
  }
}

export async function addUserToTrip(
  id: number,
  username: string,
): Promise<void> {
  try {
    console.log('Adding user to trip with ID:', id, 'Username:', username)
    const response = await request
      .post(`/api/v1/trips/${id}`)
      .set('Content-Type', 'application/json')
      .send({ username })

    console.log('User added to trip successfully. Response:', response.body)
  } catch (error) {
    console.error('Error adding user to trip:', error)
    throw error
  }
}

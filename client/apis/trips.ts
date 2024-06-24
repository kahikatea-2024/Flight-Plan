import request from 'superagent'
import { Trips } from '../../models/flightplan'

const rootUrl = '/api/v1'

export async function getTrips(userId: number) {
  // return request.get('/api/v1/users/1/trips').then((res) => {
  const res = await request.get(rootUrl + `/users/${userId}/trips`)
  console.log(res)
  return res.body as Trips[]
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

export async function addUserToTrip(tripId: number, username: string) {
  try {
    console.log('Sending request to add user to trip:', { tripId, username }) // Log the data being sent
    const response = await request
      .post(`/api/v1/trips/${tripId}/users`) // Ensure this matches your backend route
      .send({ username }) // Ensure 'username' is sent as per backend expectation
      .set('Content-Type', 'application/json')

    console.log('User added to trip successfully. Response:', response.body)
    return response.body // Return if needed
  } catch (error) {
    console.error('Error adding user to trip:', error)
    throw error
  }
}

export async function fetchTravelers(tripId: number) {
  try {
    const response = await request.get(`/api/v1/trips/${tripId}/users`)
    return response.body
  } catch (error) {
    console.error('Error fetching travelers:', error)
    throw error
  }
}

export async function removeTraveler(tripId: number, userId: number) {
  try {
    const response = await request
      .delete(`/api/v1/trips/${tripId}/users/${userId}`)
      .set('Content-Type', 'application/json') // Set headers if required by your backend

    console.log('User removed from trip successfully.', response.body)
    return response.body // Optionally return response if needed
  } catch (error) {
    console.error('Error removing traveler:', error)
    throw error
  }
}

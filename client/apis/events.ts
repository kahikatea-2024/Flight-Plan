import request from 'superagent'
import { Events } from '../../models/flightplan'

const rootUrl = '/api/v1/trips'

export function getEvents(tripId: number) {
  // return request.get('users/1/trips').then((res) => {
  return request.get(rootUrl + `/${tripId}/events`).then((res) => {
    console.log('event', res.body)
    return res.body as Events[]
  })
}

// export async function addTrip(tripData: Trips) {
//   const { id, data } = tripData
//   await request
//     .post(`/api/v1/trips/${id}`)
//     .set('Content-Type', 'application/json')
//     .send({ data })
// }

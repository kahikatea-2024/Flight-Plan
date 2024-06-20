import request from 'superagent'
import { Trips } from '../../models/flightplan'

const rootUrl = '/api/v1'

export function getTrips(userId: number) {
  // return request.get('/api/v1/users/1/trips').then((res) => {
  return request.get(rootUrl + `/users/${userId}/trips`).then((res) => {
    // console.log(res)
    // console.log(rootUrl + `/users/:${userId}/trips`)
    return res.body as Trips[]
  })
}

// export async function addTrip(tripData: Trips) {
//   const { id, data } = tripData
//   await request
//     .post(`/api/v1/trips/${id}`)
//     .set('Content-Type', 'application/json')
//     .send({ data })
// }

import request from 'superagent'
import { EventData, Events } from '../../models/flightplan'

const rootUrl = '/api/v1/'

export function getEvents(tripId: number) {
  // return request.get('users/1/trips').then((res) => {
  return request.get(rootUrl + `trips/${tripId}/events`).then((res) => {
    console.log('event', res.body)
    return res.body as Events[]
  })
}
//TODO check the route on server side
export async function addEvent(eventData: EventData) {
  const { tripId, ...rest } = eventData
  await request
    .post(`/api/v1/events/${tripId}`)
    .set('Content-Type', 'application/json')
    .send({ rest })
}

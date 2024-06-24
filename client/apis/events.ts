import request from 'superagent'
import { EventData, Events } from '../../models/flightplan'

const rootUrl = '/api/v1/'

export function getEvents(id: string, date: string) {
  // return request.get('users/1/trips').then((res) => {
  return request.get(rootUrl + `events/date/${id}/${date}`).then((res) => {
    console.log('get event', id, date)
    return res.body as Events[]
  })
}
// http://localhost:3000/api/v1/events/date/21-06-2024

export async function addEvent(eventData: EventData) {
  const { date, ...rest } = eventData
  await request
    .post(`/api/v1/events/date/${date}`)
    .set('Content-Type', 'application/json')
    .send(rest)
}

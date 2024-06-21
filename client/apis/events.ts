import request from 'superagent'
import { EventData, Events } from '../../models/flightplan'

const rootUrl = '/api/v1/'

export function getEvents(date: string) {
  // return request.get('users/1/trips').then((res) => {
  return request.get(rootUrl + `events/date/${date}`).then((res) => {
    console.log('get event', res.body)
    return res.body as Events[]
  })
}
// http://localhost:3000/api/v1/events/date/21-06-2024

export async function addEvent(eventData: EventData) {
  const { date, ...rest } = eventData
  console.log('api', date, rest)
  await request
    .post(`/api/v1/events/date/${date}`)
    .set('Content-Type', 'application/json')
    .send(rest)
}

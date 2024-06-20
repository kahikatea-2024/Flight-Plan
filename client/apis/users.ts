import { User } from '@auth0/auth0-react'
import request from 'superagent'

const rootUrl = '/api/v1'

export function getUsers(): Promise<string[]> {
  return request.get(rootUrl + '/users').then((res) => {
    return res.body
  })
}

export async function updateUser(formData: User) {
  const { id, form } = formData
  await request
    .patch(`/api/v1/users/${id}`)
    .set('Content-Type', 'application/json')
    .send(form)
}

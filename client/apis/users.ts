import { User } from '@auth0/auth0-react'
import request from 'superagent'

const rootUrl = '/api/v1'

export async function getUsers(): Promise<string[]> {
  const res = await request.get(rootUrl + '/users')
  return res.body
}

export async function updateUser(formData: User) {
  const { id, form } = formData
  await request
    .patch(`/api/v1/users/${id}`)
    .set('Content-Type', 'application/json')
    .send(form)
}

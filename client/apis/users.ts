import request from 'superagent'

const rootUrl = '/api/v1'

export function getUsers(): Promise<string[]> {
  return request.get(rootUrl + '/users').then((res) => {
    return res.body
  })
}

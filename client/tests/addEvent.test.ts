// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest'
import { setupApp } from './setup.tsx'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

//nock other username calls first

describe('The days events list', () => {
  it('shows some events', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/events/date/04-08-2024')
      .reply(200, [
        {
          id: 1,
          date: '04-08-2024',
          description: 'surf some waves',
          endTime: '10am',
          notes: 'wetsuit',
          startTime: '5am',
        },
        {
          id: 2,
          date: '04-08-2024',
          description: 'eat',
          endTime: '6pm',
          notes: 'bami goreng',
          startTime: '5pm',
        },
        {
          id: 3,
          date: '04-08-2024',
          description: 'swim',
          endTime: '12pm',
          notes: 'sunblock',
          startTime: '7am',
        },
      ])

    const screen = setupApp('/date/04-08-2024') //front end route

    const description = await screen.findByText('surf some waves')
    expect(description.textContent).toBe('surf some waves')
    expect(scope.isDone()).toBe(true)
  })
})

// describe('Add Event to date', () => {
//   it('should add a new event', () => {
//     //arrange
//     const newEvent = {
//       date: '04-08-2024',
//       description: 'surf',
//       endTime: '10am',
//       notes: 'wetsuit',
//       startTime: '5am',
//     }
//     //assert

//     //expect
//   })
// })

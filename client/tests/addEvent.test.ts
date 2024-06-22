// /* eslint-env jest */
// import { beforeAll, describe, expect, it } from 'vitest'
// import { setupApp } from './setup.tsx'
// import nock from 'nock'

// beforeAll(() => {
//   nock.disableNetConnect()
// })

// describe('The days events list', () => {
//   it('shows some events', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/date/04-08-2024')
//       .reply(200, {
//         events: [
//           {
//             date: '04-08-2024',
//             description: 'surf some waves',
//             endTime: '10am',
//             notes: 'wetsuit',
//             startTime: '5am',
//           },
//           {
//             date: '04-08-2024',
//             description: 'eat',
//             endTime: '6pm',
//             notes: 'bami goreng',
//             startTime: '5pm',
//           },
//           {
//             date: '04-08-2024',
//             description: 'swim',
//             endTime: '12pm',
//             notes: 'sunblock',
//             startTime: '7am',
//           },
//         ],
//       })

//     const screen = setupApp('/date/04-08-2024')

//     const description = await screen.findByText('surf some waves')
//     expect(description).toBe('surf some waves')
//     expect(scope.isDone()).toBe(true)
//   })
// })

// // describe('Add Event to date', () => {
// //   it('should add a new event', () => {
// //     //arrange
// //     const newEvent = {
// //       date: '04-08-2024',
// //       description: 'surf',
// //       endTime: '10am',
// //       notes: 'wetsuit',
// //       startTime: '5am',
// //     }
// //     //assert

// //     //expect
// //   })
// // })

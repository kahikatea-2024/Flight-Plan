// // @vitest-environment jsdom
// import { beforeAll, describe, expect, it, vi } from 'vitest'
// import '../pages/ViewDay.tsx'
// import '../components/App.tsx'

// import { setupApp } from './setup.tsx'
// import nock from 'nock'

// const fakeData = [
//   {
//     id: 1,
//     tripId: 123,
//     date: '04-08-2024',
//     description: 'surf some waves',
//     endTime: '10am',
//     notes: 'wetsuit',
//     startTime: '5am',
//   },
//   {
//     id: 2,
//     tripId: 123,
//     date: '04-08-2024',
//     description: 'eat',
//     endTime: '6pm',
//     notes: 'bami goreng',
//     startTime: '5pm',
//   },
//   {
//     id: 3,
//     tripId: 123,
//     date: '04-08-2024',
//     description: 'swim',
//     endTime: '12pm',
//     notes: 'sunblock',
//     startTime: '7am',
//   },
// ]

// beforeAll(() => {
//   nock.disableNetConnect()
// })

// describe('Add Event to date', () => {
//   it('should render form', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/events/date/123/04-08-2024')
//       .reply(200, fakeData)

//     const screen = setupApp('/tripId/123/date/04-08-2024') //front end route

//     //change getByLabelText to findByLabelText when it's async
//     expect(await screen.findByLabelText('Event Title')).toBeInTheDocument()

//   })

//   it('event handler should be called when form is submitted', async () => {
//     const handleSubmit = vi.fn((form: Event) => {
//       expect(form).toMatchObject({
//         // title: "testTitle",
//         // startHour: ,
//         // startMinutes: ' ',
//         // startAMPM: ' ',
//         // endHour: ' ',
//         // endMinutes: ' ',
//         // endAMPM: ' ',
//         // note: ' ',
//       })
//     })

//   //   const { user } = renderComponent(
//   //     <ProfileForm handleSubmit={handleSubmit} />,
//   //   )

//   //   await user.type(screen.getByLabelText('Nickname *'), 'dummy-nickname')
//   //   await user.type(screen.getByLabelText('First Name *'), 'dummy-firstname')
//   //   await user.type(screen.getByLabelText('Last Name'), 'dummy-lastname')
//   //   await user.click(screen.getByLabelText('Visible to everyone'))

//   //   const form = screen.getByRole('button', { name: 'Save' })
//   //   await user.click(form)

//   //   expect(handleSubmit).toHaveBeenCalled()
//   })
// })

// // @vitest-environment jsdom
// import { beforeAll, describe, expect, it, vi } from 'vitest'
// import { setupApp } from './setup.tsx'
// import nock from 'nock'

// describe('Add Event to date', () => {
//   it('should render form', () => {
//     const handleSubmit = vi.fn()
//     renderComponent(<AddEvent handleSubmit={handleSubmit} />)

//     expect(screen.getByLabelText('title')).toBeInTheDocument()
//     expect(screen.getByLabelText('startHour')).toBeInTheDocument()
//     expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
//     expect(screen.getByLabelText('Visible to everyone')).toBeInTheDocument()
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

//     const { user } = renderComponent(
//       <ProfileForm handleSubmit={handleSubmit} />,
//     )

//     await user.type(screen.getByLabelText('Nickname *'), 'dummy-nickname')
//     await user.type(screen.getByLabelText('First Name *'), 'dummy-firstname')
//     await user.type(screen.getByLabelText('Last Name'), 'dummy-lastname')
//     await user.click(screen.getByLabelText('Visible to everyone'))

//     const form = screen.getByRole('button', { name: 'Save' })
//     await user.click(form)

//     expect(handleSubmit).toHaveBeenCalled()
//   })
// })

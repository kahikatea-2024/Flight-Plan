import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  vi,
  afterEach,
} from 'vitest'
import db from './connection'
import {
  addTrip,
  addUser,
  deleteTrip,
  deleteUser,
  getAllEvents,
  getAllTrips,
  getAllUsers,
  getUserById,
} from './db'

import { TripsData, Users } from '../../models/flightplan.ts'
import request from 'supertest'
import server from '../server.ts'
import { Events } from '../../models/flightplan.ts'
import * as connect from './db.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})
// Restore mocks after each test
afterEach(() => {
  vi.restoreAllMocks()
})

// Test for getUserById
describe('get user by id', () => {
  it('should return user', async () => {
    const user = await getUserById(2)
    console.log(user)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('firstName')
    expect(user).toHaveProperty('email')
  })
})
// Test for deleteUser
describe('deleteUser', () => {
  it('deletes a user from the database', async () => {
    //Arrange
    const id = 1
    //Act
    await deleteUser(id)
    const users = await getAllUsers()
    //Assert
    expect(users.find((user) => user.id === id)).toBe(undefined)
  })
  it('returns a statusCode of 200 on delete and 404 when no user exists', async () => {
    // Arrange
    const id = 1

    const res = await request(server).del(`/api/v1/users/${id}`)
    expect(res.status).toBe(200)

    const res2 = await request(server).get(`/api/v1/users/${id}`)
    expect(res2.status).toBe(404)
  })
})

// Test for addUser
describe('addUser', () => {
  it('adds a user to database', async () => {
    const user = {
      id: 5,
      email: 'bradAC@',
      phoneNumber: '0132566',
      profilePicture: '',
      username: 'Braddad',
      firstName: 'Brad',
      lastName: 'Craig',
    }

    await addUser(user)
    const users = await getAllUsers()
    expect(users).toHaveLength(3)
    expect(users[2].username).toBe('Braddad')
  })
})

//Test for updateUser
describe('updateUser', () => {
  it('patches a user', async () => {
    const id = 1
    const updateUser: Partial<Users> = {
      username: 'jamaica',
    }

    const response = await request(server)
      .patch(`/api/v1/users/${id}`)
      .send(updateUser)
    expect(response.status).toBe(200)
  })
})

// Test for deleteTrip
describe('deleteTrip', () => {
  it('deletes a trip from the database', async () => {
    //Arrange
    const id = 1
    //Act
    await deleteTrip(id)
    const trips = await getAllTrips()
    //Assert
    expect(trips.find((trip) => trip.id === id)).toBe(undefined)
  })
  it('returns a statusCode of 200 on delete and 404 when no trip exists', async () => {
    // Arrange
    const id = 1

    const res = await request(server).del(`/api/v1/trips/${id}`)
    expect(res.status).toBe(200)

    const res2 = await request(server).get(`/api/v1/trips/${id}`)
    expect(res2.status).toBe(404)
  })
})

// Test for addTrip
describe('addTrip', () => {
  it('adds a trip to database', async () => {
    const trip = {
      createdBy: 'Reggie',
      tripName: 'cape',
      startDate: 'aaaaa',
      endDate: 'bbbbb',
    }

    await addTrip(trip)
    const trips = await getAllTrips()

    expect(trips).toHaveLength(2)
    expect(trips[1].trip_name).toBe('cape')
  })
})

//Test for updateTrip
describe('updateTrip', () => {
  it('patches a trip', async () => {
    const id = 1
    const updateTrip: Partial<TripsData> = {
      tripName: 'jamaica',
    }

    const response = await request(server)
      .patch(`/api/v1/trips/${id}`)
      .send(updateTrip)
    expect(response.status).toBe(200)
  })
})
// Test for getAllEvents
describe('get all events', () => {
  it('should return all events', async () => {
    const events = await getAllEvents()
    expect(events).toHaveLength(2)
    expect(events[0]).toHaveProperty('created_by')
    expect(events[1]).toHaveProperty('end_time')
    expect(events[1]).toHaveProperty('notes')
  })
})

describe('Post/Patch/Delete, /api/v1/events', () => {
  it('should return 201 when creating a new event', async () => {
    const id = 2
    const fakeEvent: Events = {
      id: 2,
      tripId: 1,
      createdBy: '1',
      date: '15/8/2024',
      startTime: '1100',
      endTime: '1300',
      description: 'Test Test',
      note: 'Testing Test',
    }
    const respone = await request(server)
      .post(`/api/v1/events/${id}`)
      .send(fakeEvent)
    expect(respone.status).toBe(201)
  })
  it('Should return 200 when updating an event', async () => {
    const id = 2
    const existingEvent: Events = {
      id: 2,
      tripId: 1,
      createdBy: '1',
      date: '15/8/2024',
      startTime: '1100',
      endTime: '1300',
      description: 'Test Test',
      note: 'Testing Test',
    }

    const updatedEvent: Partial<Events> = {
      date: '16/8/2024',
      startTime: '1200',
      endTime: '1400',
      description: 'Updated Test',
      note: 'Updated Testing Test',
    }
    await request(server)
      .post(`/api/v1/events/${id}`)
      .send(existingEvent)
      .expect(201)

    const respone = await request(server)
      .patch(`/api/v1/events/${id}`)
      .send(updatedEvent)

    expect(respone.status).toBe(200)
  })
  it('Should delete the event by id', async () => {
    const id = 2

    const deleteEvent = await request(server).delete(`/api/v1/events/${id}`)

    expect(deleteEvent.status).toBe(200)
  })

  it("should return 500 when event can't be added", async () => {
    vi.spyOn(connect, 'addNewEvent').mockRejectedValue(new Error('test'))

    const respone = await request(server).post(`/api/v1/events/`)
    expect(respone.status).toBe(500)
  })
})

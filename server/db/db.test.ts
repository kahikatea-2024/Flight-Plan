import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import {
  addTrip,
  deleteTrip,
  getAllEvents,
  getAllTrips,
  getUserById,
} from './db'
import request from 'supertest'
import server from '../server.ts'
import { TripsData } from '../../models/flightplan.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
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

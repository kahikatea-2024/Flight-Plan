import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getAllEvents, getUserById } from './db'
import request from 'supertest'
import server from '../server.ts'
import { Events } from '../../models/flightplan.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('get user by id', () => {
  it('should return user', async () => {
    const user = await getUserById(2)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('first_name')
    expect(user).toHaveProperty('email')
  })
})

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
})

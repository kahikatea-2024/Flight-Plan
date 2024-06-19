import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getAllEvents, getUserById } from './db'

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

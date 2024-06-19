import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getUserById } from './db'

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

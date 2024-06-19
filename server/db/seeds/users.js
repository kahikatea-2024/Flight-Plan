/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'callumG',
      email: 'callum@example.com',
      auth0id: 'auth0|xxx123',
      first_name: 'callum',
      last_name: 'green',
      phone_number: '0213456789',
      profile_picture: '',
    },
    {
      id: 2,
      username: 'aimeeK',
      email: 'aimee@example.com',
      auth0id: 'auth0|xxx124',
      first_name: 'aimee',
      last_name: 'kilmartin',
      phone_number: '021987654',
      profile_picture: '',
    },
  ])
}

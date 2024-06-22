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
      username: 'AimeeK',
      email: 'Aimee@example.com',
      auth0id: 'auth0|xxx234',
      first_name: 'Aimee',
      last_name: 'kilmartin',
      phone_number: '021334577',
      profile_picture: '',
    },
    {
      id: 3,
      username: 'BradC',
      email: 'Brad@example.com',
      auth0id: 'auth0|xxx345',
      first_name: 'Brad',
      last_name: 'Craig',
      phone_number: '0213575644',
      profile_picture: '',
    },
    {
      id: 4,
      username: 'RegieM',
      email: 'regie@example.com',
      auth0id: 'auth0|xxx456',
      first_name: 'regie',
      last_name: 'malonzo',
      phone_number: '0213456757',
      profile_picture: '',
    },
  ])
}

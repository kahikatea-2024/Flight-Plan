/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      username: 'callumG',
      email: 'callum@example.com',
      auth0id: 'auth0|xxx123',
      first_name: 'callum',
      last_name: 'green',
      phone_number: '0213456789',
      profile_picture:
        'https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f3fa/u1f3fa_u1f47f.png',
    },
    {
      id: 2,
      username: 'AimeeK',
      email: 'Aimee@example.com',
      auth0id: 'auth0|xxx234',
      first_name: 'Aimee',
      last_name: 'kilmartin',
      phone_number: '021334577',
      profile_picture:
        'https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4ac/u1f4ac_u1f9f3.png',
    },
    {
      id: 3,
      username: 'BradC',
      email: 'Brad@example.com',
      auth0id: 'auth0|xxx345',
      first_name: 'Brad',
      last_name: 'Craig',
      phone_number: '0213575644',
      profile_picture:
        'https://www.gstatic.com/android/keyboard/emojikitchen/20240206/u1f4be/u1f4be_u1f3b6.png',
    },
    {
      id: 4,
      username: 'RegieM',
      email: 'regie@example.com',
      auth0id: 'auth0|xxx456',
      first_name: 'regie',
      last_name: 'malonzo',
      phone_number: '0213456757',
      profile_picture:
        'https://i.pinimg.com/originals/1a/1d/88/1a1d88a880db8670c804e130d7be20d0.png',
    },
  ])
}

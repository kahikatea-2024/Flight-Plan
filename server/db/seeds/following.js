/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('following_list').del()
  await knex('following_list').insert([
    {
      following_id: 'Brad',
      user_id: 'callum',
    },
    {
      following_id: 'Brad',
      user_id: 'Aimee',
    },
    {
      following_id: 'Brad',
      user_id: 'Regie',
    },
  ])
}

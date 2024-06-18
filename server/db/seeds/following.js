/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('trip_users').del()
  await knex('trip_users').insert([
    {
      following_id: 1,
      user_id: 1,
    },
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('following_list').del()
  await knex('following_list').insert([
    {
      following_id: 2,
      user_id: 1,
    },
  ])
}

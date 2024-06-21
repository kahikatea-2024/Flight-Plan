/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  
  await knex('friends_list').del()
  await knex('friends_list').insert([
    {
      friends_id: 2,
      user_id: 1,
    },
    {
      friends_id: 1,
      user_id: 2,
    },
  ])
}

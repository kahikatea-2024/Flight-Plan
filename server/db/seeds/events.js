/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      id: 1,
      trip_id: 1,
      date: '5/7/2024',
      start_time: '1600',
      end_time: '1800',
      description: 'meet at zebra cafe',
      notes: 'bring sunblock',
    },
  ])
}

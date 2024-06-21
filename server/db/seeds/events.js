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
      created_by: 2,
      date: '10-07-2024',
      start_time: '1600',
      end_time: '1800',
      description: 'meet at zebra cafe',
      notes: 'bring sunblock',
    },
    {
      id: 2,
      trip_id: 1,
      created_by: 2,
      date: '15/07/2024',
      start_time: '2000',
      end_time: '0030',
      description: 'sunrise bar and grill',
      notes: 'casual dress',
    },
  ])
}

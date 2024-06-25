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
      created_by: 1,
      date: '2024-06-10',
      start_time: '04:00pm',
      end_time: '06:00pm',
      description: 'meet at zebra cafe',
      notes: 'bring sunblock',
      location: '123 jump street',
      type: 'event',
    },
    {
      id: 2,
      trip_id: 1,
      created_by: 1,
      date: '2024-06-15',
      start_time: '08:00am',
      end_time: '10:00am',
      description: 'sunrise bar and grill',
      notes: 'casual dress',
      location: 'the beach',
      type: 'event',
    },
    {
      id: 3,
      trip_id: 2,
      created_by: 2,
      date: '2024-06-10',
      start_time: '06:00pm',
      end_time: '8:00pm',
      description: 'have a siesta',
      notes: 'bring pjs',
      location: 'by the pool',
      type: 'accommodation',
    },
  ])
}

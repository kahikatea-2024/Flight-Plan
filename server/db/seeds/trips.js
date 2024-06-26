/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('trips').del()
  await knex('trips').insert([
    {
      id: 1,
      created_by: 1,
      trip_name: 'New York',
      start_date: '2024-07-01',
      end_date: '2024-07-26',
    },
    {
      id: 2,
      created_by: 2,
      trip_name: 'Tokyo',
      start_date: '2024-08-02',
      end_date: '2024-08-30',
    },
    {
      id: 3,
      created_by: 3,
      trip_name: 'Paris',
      start_date: '2024-10-10',
      end_date: '2024-10-25',
    },
    {
      id: 4,
      created_by: 4,
      trip_name: 'Rome',
      start_date: '2024-12-15',
      end_date: '2024-12-31',
    },
  ])
}

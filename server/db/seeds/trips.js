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
      trip_name: 'Fiji Baby',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
    {
      id: 2,
      created_by: 2,
      trip_name: 'Fiji Baby',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
    {
      id: 3,
      created_by: 3,
      trip_name: 'Michigan',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
  ])
}

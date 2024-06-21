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
      created_by: 'callum',
      trip_name: 'Fiji Baby',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
    {
      id: 2,
      created_by: 'Regie',
      trip_name: 'Fiji Baby',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
    {
      id: 3,
      created_by: 'Brad',
      trip_name: 'Michigan',
      start_date: '01/07/2024',
      end_date: '26/07/2024',
    },
  ])
}

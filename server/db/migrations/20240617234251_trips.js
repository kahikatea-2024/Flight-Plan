/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('trips', (table) => {
    table.increments('id').primary()
    table.string('created_by')
    table.string('trip_name')
    table.string('start_date')
    table.string('end_date')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('trips')
}

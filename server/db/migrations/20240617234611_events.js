/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary()
    table.integer('trip_id')
    table.integer('created_by')
    table.string('date')
    table.string('start_time')
    table.string('end_time')
    table.string('description')
    table.string('notes')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('events')
}

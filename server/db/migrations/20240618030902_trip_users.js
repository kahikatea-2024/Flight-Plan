/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('trip_users', (table) => {
    table.increments('id').primary()
    table.integer('trip_id')
    table.integer('user_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('trip_users')
}
;``

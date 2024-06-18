/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('email')
    table.string('auth0id')
    table.string('first_name')
    table.string('last_name')
    table.string('phone_number')
    table.string('profile_picture')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}

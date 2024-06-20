/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('friends_list', (table) => {
    table.primary(['user_id', 'friends_id'])
    table.string('friends_id')
    table.string('user_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('following_list')
}

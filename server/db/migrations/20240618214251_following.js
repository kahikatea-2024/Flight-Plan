/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('following_list', (table) => {
    table.primary(['user_id', 'following_id'])
    table.string('following_id')
    table.string('user_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('following_list')
}

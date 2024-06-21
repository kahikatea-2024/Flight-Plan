/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**

 */
export async function up(knex) {
  return knex.schema.createTable('friends_list', (table) => {
    table.integer('user_id').unsigned().notNullable()
    table.integer('friends_id').unsigned().notNullable()
    table.primary(['user_id', 'friends_id'])
  })
}

export async function down(knex) {
  return knex.schema.dropTable('friends_list')
}

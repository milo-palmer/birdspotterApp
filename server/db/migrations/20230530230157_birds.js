/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('birds', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.text('image')
    table.string('description')
    table.string('auth_id')
    table.string('lat')
    table.string('lng')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('birds')
}

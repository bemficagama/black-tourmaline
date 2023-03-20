/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('key_has_categories', table => {
        table.integer('key_id').unsigned().references('id').inTable('keys')
        table.integer('category_id').unsigned().references('id').inTable('categories')
        table.primary(['key_id', 'category_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('key_has_categories')
};
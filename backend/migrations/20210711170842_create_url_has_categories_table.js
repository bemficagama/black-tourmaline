/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('url_has_categories', table => {
        table.integer('url_id').unsigned().references('id').inTable('urls')
        table.integer('category_id').unsigned().references('id').inTable('categories')
        table.primary(['url_id', 'category_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('url_has_categories')
};
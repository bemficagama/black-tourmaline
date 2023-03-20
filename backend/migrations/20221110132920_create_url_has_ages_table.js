/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('url_has_ages', table => {
        table.integer('url_id').unsigned().references('id').inTable('urls')
        table.integer('age_id').unsigned().references('id').inTable('ages')
        table.primary(['url_id', 'age_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('url_has_ages')
};

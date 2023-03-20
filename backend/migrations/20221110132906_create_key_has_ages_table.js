/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('key_has_ages', table => {
        table.integer('key_id').unsigned().references('id').inTable('keys')
        table.integer('age_id').unsigned().references('id').inTable('ages')
        table.primary(['key_id', 'age_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('key_has_ages')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ages').del()
  await knex('ages').insert([
    { id: 001, name: 'Faixa Etária de 00 à 10 anos', description: 'Sites inadequados para essa faixa etária.' },
    { id: 002, name: 'Faixa Etária de 11 à 12 anos', description: 'Sites inadequados para essa faixa etária.' },
    { id: 003, name: 'Faixa Etária de 13 à 14 anos', description: 'Sites inadequados para essa faixa etária.' },
    { id: 004, name: 'Faixa Etária de 15 à 16 anos', description: 'Sites inadequados para essa faixa etária.' }
  ]);
};

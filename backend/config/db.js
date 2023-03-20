const config = require('../knexfile.js')
const knex = require('knex')(config)

//console.log('Migrando Banco...')
//knex.migrate.latest([config])

knex.migrate.latest()
  .then(_ => {
    console.log('Populando Banco de Dados...')
    //return knex.seed.run();
  })
  .then(_ => {
    console.log('Banco de Dados Migrado com sucesso...')
  });

module.exports = knex
const bcrypt = require('bcryptjs')

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}


exports.seed = function (knex, Promisse) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { id: 1, name: 'Administrador', email: 'admin@local', password: encryptPassword('123456') }
        ]);
      });
  };
  
  
  
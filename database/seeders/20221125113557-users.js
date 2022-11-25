'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
        id: 1,
        name: 'dr. Giadefa Imam Cesyo',
        user_name: 'imam',
        password: await bcrypt.hash('1234', 10),
        created_at: new Date(),
        updated_at: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
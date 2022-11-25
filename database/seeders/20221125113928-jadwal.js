'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jadwal', [{
        id: 1,
        id_users: 1,
        name: 'dr. Giadefa Imam Cesyo',
        day: 'Senin',
        time_start: '13:00',
        time_finish: '14:00',
        quota: 10,
        date: '2022-11-21',
        created_at: new Date(),
        updated_at: new Date(), 
     },{
        id: 2,
        id_users: 1,
        name: 'dr. Giadefa Imam Cesyo',
        day: 'Senin',
        time_start: '13:00',
        time_finish: '14:00',
        quota: 10,
        date: '2022-11-28',
        created_at: new Date(),
        updated_at: new Date(), 
     },{
        id: 3,
        id_users: 1,
        name: 'dr. Giadefa Imam Cesyo',
        day: 'Senin',
        time_start: '13:00',
        time_finish: '14:00',
        quota: 10,
        date: '2022-12-05',
        created_at: new Date(),
        updated_at: new Date(), 
   }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('jadwal', null, {});
  }
};

        
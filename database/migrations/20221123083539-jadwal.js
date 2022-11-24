'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jadwal', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_users: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // nama table
            key: 'id', // nama column
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      day: {
        type: Sequelize.ENUM,
        values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      },
      time_start: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      time_finish: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      date: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jadwal');
  },
};

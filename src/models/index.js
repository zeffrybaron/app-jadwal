const sequelize = require('./sequelize')
const Users = require('./users')
const Jadwal = require('./jadwal')

Users.hasMany(Jadwal, { 
  as: 'users',
  foreignKey: 'id',
})

Jadwal.belongsTo(Users, {
  as: 'jadwal',
  foreignKey: 'id_users',
})

module.exports = {
  sequelize,
  Users,
  Jadwal
}
const { Model, DataTypes } = require('sequelize');
const connection = require('./sequelize');

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection, //ini adalh sequelize dari config di atas
    timestamps: true, // aktifin update_at dan create_at
    underscored: true, // biar colom-colomnya pake <_>
    paranoid: true, // untuk mengaktifi softdelete yg delete_at
    freezeTableName: true,
    tableName: 'users',
});

module.exports = Users;
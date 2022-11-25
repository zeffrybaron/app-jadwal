const { Model, DataTypes } = require('sequelize');
const connection = require('./sequelize');

class Jadwal extends Model {}

Jadwal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // nama table
            key: 'id', // nama column
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
    },
    day: {
        type: DataTypes.ENUM,
        values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    },
    time_start: {
        type: DataTypes.TEXT
    },
    time_finish: {
        type: DataTypes.TEXT
    },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        default: new Date(),
    },
}, {
    sequelize: connection, //ini adalh sequelize dari config di atas
    timestamps: true, // aktifin update_at dan create_at
    underscored: true, // biar colom-colomnya pake <_>
    paranoid: true, // untuk mengaktifi softdelete yg delete_at
    freezeTableName: true,
    tableName: 'jadwal',
});

module.exports = Jadwal;
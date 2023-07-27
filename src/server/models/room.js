const {DataTypes} = require('sequelize')
const {sequelize} = require("../DB")


const Room = sequelize.define('room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: 'Room'
    },
}, {
    tableName: 'room',
    timestamps: false,
})
module.exports = Room

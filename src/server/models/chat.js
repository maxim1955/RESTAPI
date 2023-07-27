const {sequelize} = require('../DB')
const {DataTypes} = require('sequelize')

const Chat = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true,
    }

}, {
    tableName: 'message',
    timestamps: false,
})
module.exports = Chat

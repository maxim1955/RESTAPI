const Chat = require('../models/chat')
const Room = require('../models/room')

class ChatService {

    async getRooms(name) {
        console.log(name)
        try {
            return await Room.findAll({
                where: {
                    name: name
                }
            })
        } catch (err) {
            throw err
        }
    }

    async getAllRooms(name) {
        console.log(name)
        try {
            return await Room.findAll({
            })
        } catch (err) {
            throw err
        }
    }

    async CreateRoom(name) {
        try {
            const rooms = await Room.create(name)
            return rooms
        } catch (e) {
            throw e
        }
    }

    async getMessage(id) {
        try {
            const messages = Chat.findAll({
                where: {
                    room_id: id
                },
                order: [['created_at', 'desc']]
            })
            return messages
        } catch (err) {
            throw err
        }
    }
    async getAllMessage(id) {
        try {
            const messages = Chat.findAll({
                where: {
                    room_id: id

                },
                order: [['created_at', 'desc']]
            })
            return messages
        } catch (err) {
            throw err
        }
    }

    async saveMessages(data) {
        try {
            const message = await Chat.create(data)
            return message
        } catch (err) {
            throw err
        }
    }
    async messageFromAdmin(data) {
        try {
            const message = await Chat.create(data)
            return message
        } catch (err) {
            throw err
        }
    }
}

module.exports = ChatService

const chatService = require('../service/chatService')
const instance = new chatService()

async function getMessage(req, res) {
    try {
        const message = await instance.getMessage()
        return res.json(message)
    } catch (err) {
        throw err
    }
}

module.exports = {getMessage}

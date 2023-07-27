const express = require('express')
const adminChat = express.Router()

const {getMessage} = require('../controller/ChatController')

adminChat.get('/',getMessage)


module.exports = adminChat

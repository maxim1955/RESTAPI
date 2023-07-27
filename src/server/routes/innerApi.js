
const express = require('express')
const innerApi = express.Router()

const {login, getUser} = require('../controller/Users_controller')
const {checkRoles} = require('../middlewars/checkRoles')
const {getCoin} = require('../controller/Catalog_controller')

innerApi.post('/', login)
innerApi.get('/admin', checkRoles, getUser)
innerApi.get('/admins', checkRoles, getCoin)


module.exports = innerApi

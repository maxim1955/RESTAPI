/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The auto-generated id of the book
 *         password:
 *           type: string
 *           description: The title of your book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         email: example@mail.ru
 *         password: userpass
 *         createdAt: 2020-03-10T04:05:06.157Z
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Catalog:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Id item
 *         name:
 *           type: price
 *           description: price of item
 *         price:
 *           type: price
 *           description: price of item
 *         marketcap:
 *           type: price
 *           description: at the moment price
 *         image:
 *           type: url
 *           description: url image
 *         quantity:
 *           type: integer
 *           description: quantity in the basket
 *         stock:
 *           type: integer
 *           description: quantity in the basket
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *            id: 1
 *            name: USDT
 *            price: 1
 *            marketcap: 1
 *            image: urlImage.com
 *            quantity: 1
 *            stock: 2
 *            description: another text
 *            createdAt: 2020-03-10T04:05:06.157Z
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Catalog:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Id item
 *         name:
 *           type: price
 *           description: price of item
 *         price:
 *           type: price
 *           description: price of item
 *         marketcap:
 *           type: price
 *           description: at the moment price
 *         image:
 *           type: url
 *           description: url image
 *         quantity:
 *           type: integer
 *           description: quantity in the basket
 *         stock:
 *           type: integer
 *           description: quantity in the basket
 *         stock:
 *           type: integer
 *           description: quantity in the basket
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: 1
 *         name: USDT
 *         price: 1
 *         marketcap: 1
 *         image: urlImage.com
 *         quantity: 1
 *         stock: 2
 *         description: another text
 *         createdAt: 2020-03-10T04:05:06.157Z
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Работа с пользователями
 * /create:
 *   post:
 *     summary: Создание пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /:
 *   get:
 *     summary: запрос на получение всех карточек товаров
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catalog'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catalog'
 *       500:
 *         description: Some server error
 *
 */
const express = require('express')
const outerApi = express.Router()

const {createUser,updateUser,deleteUser} = require('../controller/Users_controller')
const {getCoin} = require('../controller/Catalog_controller')
const {authenticateJWT} = require('../middlewars/authenticateJWT')

outerApi.post('/create', createUser)
outerApi.delete('/delete', deleteUser)
outerApi.put('/update', updateUser)
outerApi.get('/', authenticateJWT, getCoin)


module.exports = outerApi

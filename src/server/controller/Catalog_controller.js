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
 *         - marketcap
 *         - image
 *         - quantity
 *         - stock
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: Id item
 *         name:
 *           type: price
 *           description: price of item
 *         marketcap:
 *           type: price
 *           description: at the moment price
 *         image:
 *           type: url
 *           description: url image
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         quantity:
 *           type: integer
 *           description: quantity in the basket
 *         stock:
 *           type: integer
 *           description: quantity in the basket
 *         stock:
 *           type: integer
 *           description: quantity in the basket
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
 */

const modelsService = require('../service/Catalog_service')
const instance = new modelsService()

async function getCoin(req, res) {
    try {
        const coin = await instance.getAll()
        return res.json(coin)
    } catch (err) {
        throw err
    }
}

module.exports = {getCoin}

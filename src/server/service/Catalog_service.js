const Catalog = require('../models/catalog_item_models')

class Catalog_service {
    async getAll() {
        const coin = await Catalog.getAll()
        return coin
    }
}

module.exports = Catalog_service

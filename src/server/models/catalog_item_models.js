const {DataTypes} = require('sequelize');
const {sequelize} = require('../DB')

const Catalog_item = sequelize.define('Catalog', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    marketcap: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'catalog',
    timestamps: false
});

async function getAll() {
    try {
        const coin = await Catalog_item.findAll()
        return coin
    } catch (err) {
        throw err
    }
}

module.exports = {Catalog_item, getAll}

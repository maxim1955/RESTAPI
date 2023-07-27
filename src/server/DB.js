const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('legend_market', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
;(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
module.exports = {sequelize}

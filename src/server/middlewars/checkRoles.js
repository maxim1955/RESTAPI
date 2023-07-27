const jwt = require("jsonwebtoken");
const accessTokenSecret = 'youraccesstokensecret';
const checkRoles = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        let tokens = await jwt.decode(token, accessTokenSecret, algorithms = "HS256")
        if (tokens.roles !== null) {
            next()
        } else {
            alert('У вас нет прав доступа')
        }
    } catch (err) {
        console.log('токена нет')
    }
};
module.exports = {checkRoles}

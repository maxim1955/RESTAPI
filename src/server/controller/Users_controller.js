
const Userservice = require('../service/Users_service')
const instance = new Userservice()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';


async function getUser(req, res) {
    const items = await instance.getAll()
    return res.json(items)
}
async function updateUser(req,res){
    const user = await instance.updateUser(req.body)
    return res.json(user)
}
async function createUser(req, res) {
    try {
        const payload = req.body
        const candidate = await instance.getUsersByEmail(req.body.email)
        if (candidate) {
            console.log("такой email есть")
            return
        }
        const hashPassword = await bcrypt.hash(payload.password, 5)
        const user = await instance.createUser({...payload, password: hashPassword})
        console.log(user)
        return res.status(201).json({user})

    } catch (err) {
        throw err
    }
}

async function login(req, res) {
    try {
        const users = req.body;
        const user = await instance.login(users)
        if (user) {
            const accessToken = jwt.sign({
                name: user.dataValues.first_name,
                last_name: user.dataValues.last_name,
                roles: user.dataValues.roles_id,
                user_id: user.dataValues.id,
            }, accessTokenSecret);
            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }
    } catch (e) {
        throw e
    }
}
async function deleteUser (req,res){
    try {
        const userId = req.body
        console.log(userId)
        const user = await instance.deleteUser(userId)
        console.log(user)
        return res.json({user}).status(200)
    }
    catch (err){
        console.log(err)
    }

}
module.exports = {getUser, createUser, login,updateUser,deleteUser}

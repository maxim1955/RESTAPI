const User = require('../models/user_models')

class Users_service {
    async getAll() {
        const items = await User.getAll()
        return items
    }

    async createUser(item) {
        const user = await User.createUser(item)
        return user
    }

    async getUsersByEmail(email) {
        const user = await User.getUsersByEmail(email)
        return user
    }

    async login(user) {
        const authUser = await User.login(user)
        return authUser
    }
    async updateUser(user){
        const newUser = await User.updateUser(user)
        return newUser
    }
    async deleteUser(userId){
        console.log(userId)
        const deleteUser = await User.deleteUser(userId)
        return deleteUser
    }

}

module.exports = Users_service

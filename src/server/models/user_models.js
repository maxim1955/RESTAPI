const {DataTypes} = require('sequelize');
const {sequelize} = require('../DB')
const bcrypt = require("bcrypt");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    roles_id: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,

    },
    password: {
        type: DataTypes.STRING,

    }
}, {
    tableName: 'users',
    timestamps: false
});

async function createUser(item) {
    try {
        const newUser = await User.create(item)
        return newUser
    } catch (err) {
        console.log(err)
    }

}

async function getAll() {
    try {
        const item = await User.findAll()
        return item
    } catch (err) {
        throw err
    }
}

// Проверка есть ли такой email
async function getUsersByEmail(email) {
    try {
        const user = await User.findOne({
            where: {email},
            include: {all: true},
        });
        return user
    } catch (err) {
        throw err
    }
}
async function updateUser(user){
    try {
        const newUser = await User.update({email: user.email,first_name: user.first_name,last_name:user.last_name,roles_id: user.roles_id}, {
            where: {
                id: user.id
            },
        });
        console.log(user)
        return newUser
    } catch (err){
        console.log(err)
    }
}

async function login(user) {
    try {
        const checkPass = await User.findOne({
            where: {
                email: user.email,
            }
        })
        if(checkPass){
            const hashPass = await bcrypt.compare(user.password, checkPass.password)
            if (hashPass) {
                const authUser = await User.findOne({
                    where: {
                        email: user.email,
                    }
                })
                return authUser
            }
        }else {
            console.log('такой email отсутствует')
        }


    } catch (err) {
        throw err
    }

}

async function deleteUser(userId){
    console.log(userId)
    try {
        console.log(userId)
       const deleteUser =  await User.destroy({
            where:{
                id:userId.id
            }
        })
        return deleteUser
    }catch (err){
        console.log(err)
    }
}

module.exports = {User, getAll, createUser, getUsersByEmail, login,updateUser,deleteUser}

require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Users, sequelize } = require('../models')

const register = async (req, res, next) => {
    try {
        const { name, user_name, password } = req.body
        
        const isUserExist = await Users.findOne({
            where: {
                user_name: user_name
            },
            attributes: ['id']
        })

        if (isUserExist) {
            return res.status(400).json({
                message: 'User already exist'
            })
        }

        const hashPassword = bcrypt.hashSync(password, 12)
        const user = await Users.create({
            name,
            user_name,
            password: hashPassword
        }) 

        return res.status(200).json({
            code: 200,
            message: "Success create user",
            data: {
                id_users: user.id_users,
                name: user.name,
                user_name: user.user_name
            }
        })
    } catch (error){
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { user_name, password } = req.body
        const user = await Users.findOne({
            where: { user_name }
        })
        
        if(!user) {
            return res.status(404).json({
                message: 'User not exist'
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(404).json ({
                message: 'Password not valid'
            })
        }

        const token = jwt.sign(
            { user_name: user.user_name, user_id: user.id }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            })

        return res.status(200).json({
            message: 'Login succses',
            data: {
                token,
                user: {
                    id_users: user.id_users,
                    name: user.name,
                    user_name: user.user_name
                }
            }
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports ={
    register,
    login
}
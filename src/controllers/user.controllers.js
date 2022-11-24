const bcrypt = require('bcryptjs')
const { Users } = require('../models')

const getAllUsers = async (req, res, next) => {
    const findAll = await Users.findAll({
        attributes: ['id', 'name'],
    })

    if (findAll) {
        return res.status(200).json({
            status: true,
            data: findAll,
        })
    }

    return res.status(404).json({
        status: false,
        message: 'Users not found',
    })
}

const getOneUser = async (req, res) => {
    const id = req.params.id
    const findOne = await Users.findByPk(id, {
        attributes: ['id', 'name'],
    })

    if (findOne) {
        return res.status(200).json({
            status: true,
            data: findOne,
        })
    }

    return res.status(404).json({
        status: false,
        message: 'User not found',
    })
}

const updateUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const findOne = await Users.findByPk(id, {
            attributes: ['id', 'name'],
        })
        if (!findOne) {
            return res.status(200).json({
                status: false,
                message: 'User not found',
            })
        }

        findOne.update(req.body)
        return res.status(200).json({
            status: true,
            message: 'Success update user',
            data: findOne,
        })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id
    const findOne = await Users.findByPk(id)
    if (!findOne) {
        return res.status(404).json({
            status: false,
            message: 'User not found',
        })
    }

    findOne.destroy()
    return res.status(200).json({
        status: true,
        message: 'Success delete user',
    })
}



module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}
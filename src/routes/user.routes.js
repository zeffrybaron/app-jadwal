const router = require('express').Router()
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../../src/controllers/user.controllers')

router.get('/',  getAllUsers)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router

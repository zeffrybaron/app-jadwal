const express = require('express')
const app = express()

const auth = require('./auth.routes')
const user = require('./user.routes')
const jadwal = require('./jadwal.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.group('/api/v1', (router) => {
    router.use('/auth', auth)
})

app.group('/api/v1', (router) => {
    router.use('/users', user)
    router.use('/jadwal', jadwal)
})

module.exports = app
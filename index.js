require('dotenv').config()
require('express-group-routes')

const { notFound,error } = require('./src/middlewares/errorHandling.middleware')
const routes = require('./src/routes/index.routes')
const express = require('express')

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use('*', notFound)
app.use(error)

module.exports = {
    app,
    port,
}
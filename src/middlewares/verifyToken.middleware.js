require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorization = (user) => (req, res, next) => {
    try {
        const {authorization} = req.headers
        const token = authorization.split(" ")[1]   
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        
        req.user_id = decoded.user_id

        
        next()
    } catch (error) {
        next({code: 401, message: 'invalid token'})
    }
}

module.exports = {
    authorization
}
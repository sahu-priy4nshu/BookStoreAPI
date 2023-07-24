const jwt = require('jsonwebtoken')
const User = require('../models/users')

//User Authorisation

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') //Access incoming headers
        const decoded = jwt.verify(token, 'this is my book store') //Decoded Token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) //Finding Users

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        req.role = decoded
        if(decoded.role === 'Admin' || decoded.role === 'admin' || decoded.role === 'ADMIN')
        {
            next()
        }
        else{
            throw new Error('Only admin is allowed')
        }
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = adminAuth
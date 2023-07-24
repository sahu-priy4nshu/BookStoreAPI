const jwt = require('jsonwebtoken')
const User = require('../models/users')

//User Authorisation

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') //Access incoming headers
        const decoded = jwt.verify(token, 'this is my book store') //Decoded Token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) //Finding Users

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        req.role = req.decoded
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
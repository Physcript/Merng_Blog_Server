require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.generateToken = (id,firstName) => {
    const token  = jwt.sign({ _id: id, firstName }, process.env.JWT_SECRET)
    return token
}
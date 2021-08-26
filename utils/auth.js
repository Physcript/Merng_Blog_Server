require('dotenv').config()

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const {AuthenticationError} = require('apollo-server-express')

const auth = async (context) => {
    try{
        if(!context.req.headers.authorization){
            throw new AuthenticationError('Unauthorized Request')
        }
        const token = context.req.headers.authorization.split('Bearer ')[1]
        const decode = jwt.verify(token,process.env.JWT_SECRET, (error,decoded) => {
            if(error){
                throw new AuthenticationError('Unauthorized Request')
            }else{
                return decoded
            }
        })

        const user = await User.findById(decode._id)
        if(!user){
            throw new AunthicationError('Unauthorized Request')
        }
        
        return user
    
    }catch(e){
        throw new AuthenticationError(e)
    }
}


module.exports = auth
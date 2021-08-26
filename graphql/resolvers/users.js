const {createUserValidation} = require('../../utils/validation')
const {UserInputError} = require('apollo-server-express')
const {generateToken} = require('../../utils/token')
const User = require('../../models/User')
const bcrypt = require('bcrypt')


module.exports = {
    Mutation:{
        async createUser(_,{email,password,confirmPassword,firstName,lastName}) {
            try {
                const {errors,valid} = await createUserValidation(email,password,confirmPassword,firstName,lastName)
                if(!valid){
                    throw new UserInputError('Error',{
                        errors
                    })
                }
                const validEmail = await User.findOne({email})
                if(validEmail){
                    throw new UserInputError('Error', {
                        errors:{
                            'email': 'Email Already Exists'
                        }
                    })
                }
                const encrypt = await bcrypt.hash(password,8)
                const user = new User({
                    password:encrypt,
                    firstName,
                    lastName,
                    email,
                    createdAt: new Date().toISOString()
                })

                await user.save()

                return user
            }catch(e){
                return e
            }
        },
        async login(_,{email,password}){
            try {
                const user = await User.findOne({email})
                if(!user){
                throw new UserInputError('Error', {
                    errors:{
                        'email':'Invalid Username/Password'
                        }
                    })
                }
                const isMatch = await bcrypt.compare(password,user.password)
                if(!isMatch){
                    throw new UserInputError('Error',{
                        errors:{
                            'email':'Invalid Username/Password'
                        }
                    })
                }
                const token = generateToken(user._id, user.firstName)
                user.token = token
                await user.save()
                return user
            }
            catch(e){
                return e
            }
        }
    }
}
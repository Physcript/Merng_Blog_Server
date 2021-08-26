const validator = require('validator')

module.exports.createUserValidation = async (email,password,confirmPassword,firstName,lastName) => {
    const errors = {}
    if(email.trim() == ''){
        errors.email = 'Email is Required' 
    }else if(!validator.isEmail(email)){
        errors.email = 'Invalid Email'
    }
    if(password.trim() == ''){
        errors.password = 'Password is Required'
    }else if(password !== confirmPassword){
        errors.password = 'Password not Match'
    } else if (password.length <= 5){
        errors.password = 'Password Minimum Length 6'
    }
    if(confirmPassword.trim() == ''){
        errors.confirmPassword = 'Confirm Password is Required'
    }
    if(firstName.trim() == ''){
        errors.firstName = 'Firstname is Required'
    }
    if(lastName.trim() == ''){
        errors.lastName = 'Lastname is Required'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}

// module.exports.loginValidation =  async(email,password) => {
//     const errors = {}

//     if(email.trim())

//     return {
//         errors,
//         valid: Object.keys(errors).length < 1
//     }
// }


const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    body:String,
    firstName:String,
    createdAt:String,
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})
const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment
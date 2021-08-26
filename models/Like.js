const mongoose = require('mongoose')
const likeSchema = mongoose.Schema({
  firstName:String,
  post:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
  },
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  }
})

const Like = mongoose.model('Like',likeSchema)

module.exports = Like
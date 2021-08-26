const auth = require('../../utils/auth')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')

const {AuthenticationError} = require('apollo-server-express')

const mongoose = require('mongoose')

module.exports = {
    Mutation: {
        async createComment(_,{postId,body},context){
            try{
                const user = await auth(context)
                const post = await Post.findById(postId)
                if(!post){
                    throw new Error('Post not found')
                }

                const comment = new Comment({
                    body,
                    firstName: user.firstName,
                    createdAt: new Date().toISOString(),
                    post: post._id
                })

                await comment.save()
                return comment

            }
            catch(e){
                return e
            }
        }
    }
}
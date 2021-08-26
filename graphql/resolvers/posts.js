
const auth = require('../../utils/auth')
const Post = require('../../models/Post')
const Like = require('../../models/Like') 
const Comment = require('../../models/Comment')
const {UserInputError} = require('apollo-server-express')
const mongoose = require('mongoose')

module.exports = {
    Query:{
        async getPosts(){
            const posts = await Post.aggregate([
                {
                    $project:{
                        "_id":"$_id",
                        "body":"$body",
                        "createdAt":"$createdAt",
                        "firstName":"$firstName"
                    }
                },
                {
                    $lookup:{
                        from:"likes",
                        localField:"_id",
                        foreignField:"post",
                        as:"likes"
                    }
                },
                {
                    $lookup:{
                        from:"comments",
                        let:{
                            "postId": '$_id'
                        },
                        pipeline:[
                            {
                                "$match": { "$expr" : { "$eq" : ["$post", '$$postId']} }
                            },
                            {
                                '$sort':{
                                    'createdAt': -1
                                }
                            }
                        ],
                        as: 'comments'
                    }
                },
                {
                    $project:{
                        "_id":1,
                        "body":1,
                        "firstName":1,
                        "createdAt":1,
                        "like": ["$likes"],
                        "comment": ["$comments"],
                        "countLike": { $size: { $ifNull: ["$likes",[]] } },
                        "countComment": {  $size: { $ifNull: ["$comments", []] }}
                    }
                },
                {
                    $unwind: "$like"
                },
                {
                    $unwind: "$comment"
                }
            ]).sort({createdAt:-1}).limit(10)
            return posts
        }
    },
    Mutation: {
        async getComments(_,{postId,limit,skip},context){
            try{
            // const comment = await Comment.find({post: mongoose.Types.ObjectId(postId)}).limit(limit).skip(skip)
            const comment = await Comment.find({post:postId}).limit(limit).skip(skip).sort({createdAt:-1})
            return comment
            }
            catch(e){
                console.log(e)
                return e
            }
        },
        async createPost(_,{body},context){
            try{
                const user = await auth(context)
                if(body.trim() == ''){
                    throw new UserInputError('Error', {
                        errors: {
                            'body':'Message required'
                        }
                    })
                }
                console.log(user)
                const post = new Post({
                    body,
                    firstName: user.firstName,
                    user: user._id,
                    createdAt: new Date().toISOString()
                })

                await post.save()
                
                return post
            }catch(e){
                return e
            }
        },
        async likePost(_,{postId},context){
            try{
                const user = await auth(context)
                const like = await Like.findOne({ user : user._id , post: postId  })
                if(!like){
                    const likePost = new Like({
                        fisrtName: user.firstName,
                        user:user._id,
                        post:postId,
                    })
                    await likePost.save()
                    return likePost
                }else{
                    await like.delete()
                    return like
                }

            }catch(e){
                return e
            }
        }
    }
}
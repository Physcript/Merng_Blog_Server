const {gql} = require('apollo-server-express')


module.exports = gql`  
    type User {
        _id:ID!
        email:String
        firstName:String
        lastName:String
        verified:Boolean
        token:String
        refreshToken:String
        activeToken:String
        createdAt:String
    }
    type Post {
        _id:ID!
        body:String
        firstName:String
        user:String
        createdAt:String
        like:[Like]
        comment:[Comment]
        countLike:Int
        countComment:Int
    }
    type Comment {
        _id: ID
        body:String
        firstName:String
        createdAt:String
        post:ID
    }
    type Like {
        _id:ID
        post:String
        user:String
    }
    input RegisterUser {
        email:String!
        password:String!
        confirmPassword:String!
        firstName:String!
        lastName:String!
    }
    type Query {
        getPosts:[Post]
       
    }   
    type Mutation {
        getComments(postId:String,limit:Int,skip:Int):[Comment]
        createUser(email:String,password:String,confirmPassword:String,firstName:String,lastName:String):User
        login(email:String,password:String):User
        createPost(body:String):Post
        createComment(postId:String,body:String):Comment
        likePost(postId:String):Like
        
    }
`
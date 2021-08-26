const userResolver = require('./users')
const postResolver = require('./posts')
const commentResolver = require('./comments')

module.exports = {
    Query:{
        ...postResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation
    }
}
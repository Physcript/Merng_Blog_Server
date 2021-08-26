require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')



async function startApolloServer (typeDefs,resolvers) {

    const app = express()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

    await server.start();

    server.applyMiddleware({
        app,
        path:'/'
    })

    const PORT = process.env.PORT || 5000

    mongoose.connect(process.env.MONGO_DB_URL,{
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then( () => {
        console.log(`DATABASE CONNECTED`)
        app.listen(PORT, () => {
            console.log(`SERVER PORT: ${PORT}`)
        })  
    } )
}
startApolloServer(typeDefs,resolvers)


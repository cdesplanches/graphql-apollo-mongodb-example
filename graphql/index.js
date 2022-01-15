const { ApolloServer } = require ('apollo-server');
const { buildSubgraphSchema } = require ('@apollo/subgraph');
const { PORT, environment } = require ('./app-config.js');
const mongoose = require('mongoose');
const typeDefs = require ("./Schema/gql-type");
const resolvers = require ("./Schema/gql-resolver");


const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose
  .connect(environment[env].dbString, options)
  .then ( () => {
    console.log('MongoDB connected successfully at ' + environment[env].dbString)
  })
  .catch( (err) => {
      console.error(err);
  })

/**
 * Apollo Server
**/
const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });
  
server.listen({ port: PORT })
    .then(({ url }) => {
        console.log(`GQL Example service ready at url: ${url}`);
    });
const { gql } = require('apollo-server')

const gqlType = gql `
    type GqlType @key(fields: "_id") {
        _id:ID!
        name:String!
        desc:String
    }
    type Query {
        get(id:ID!):GqlType
        getAll:[GqlType]
    }
    type Mutation{
        addEntry(name:String!, desc:String):GqlType
        removeEntry(id:ID!):GqlType
        clearAll:Boolean
    }
`;
module.exports = gqlType

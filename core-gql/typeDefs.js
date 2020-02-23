const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  type Query {
    self: User
  }

  type Mutation {
    login(username: String!, password: String!): User!
    logout: Boolean!
  }

  type User {
    id: ID!
    username: String!
  }
`;

const { ApolloServer } = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { context } = require("./context");

module.exports.server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context,
  subscriptions: false,
  introspection: true,
  playground: true
});

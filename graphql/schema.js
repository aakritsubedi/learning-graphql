const { GraphQLSchema } = require("graphql");

const RootQueryType = require("./rootQuery");
const RootMutationType = require("./mutations");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;

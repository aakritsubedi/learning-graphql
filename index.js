const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const app = express();

const schema =  new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld',
    fields: () => ({
      message: { 
        type: GraphQLString,
        resolve: () => {
          return 'Hello World'
        }
       }
    })
  })
})

app.get("/", (req, res, next) => {
  res.status(200).json({
    name: "Learning GraphQL",
    version: "v1.0.0"
  });
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const PORT = 5000;
app.listen(5000, () => {
  console.log(`The server is running at ${PORT}`);
});

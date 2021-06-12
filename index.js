const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");

const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({
    name: "Learning GraphQL",
    version: "v1.0.0",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(5000, () => {
  console.log(`The server is running at ${PORT}`);
});

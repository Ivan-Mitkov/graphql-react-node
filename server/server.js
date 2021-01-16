const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const app = express();
//to create server need types and resolvers
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
//types qyery/mutation/subscription
const typeDefs = gql`
  type Query {
    totalPosts: Int!
  }
`;
//resolvers
const resolvers = {
  Query: {
    totalPosts: () => 52,
  },
};

//graphql server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

//apply express app as middleware to apollo server
// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.json({ Hi: "There" });
});

const PORT = process.env.PORT;
// port
app.listen(PORT, () => {
  console.log(`server is ready at http://localhost:${PORT}`);
  console.log(
    `graphql server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
});

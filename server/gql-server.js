const { ApolloServer } = require("apollo-server");
require("dotenv").config();

//to create server need types and resolvers
//types qyery/mutation/subscription
const typeDefs = `
type Query{
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

const PORT = process.env.PORT;
apolloServer.listen(PORT, () => {
  console.log(`Graphql server listen on port ${PORT}`);
});

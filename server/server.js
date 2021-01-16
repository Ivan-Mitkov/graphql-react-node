const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

require("dotenv").config();

const app = express();
//DB
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
};
db();
//to create server need types and resolvers
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// usage
// typedefs autoloader
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));
//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

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

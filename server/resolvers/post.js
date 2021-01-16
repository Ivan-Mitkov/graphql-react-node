const { posts } = require("../temp.js");

const totalPosts = () => posts.length;
const allPosts = () => posts;
const newPost = (parent, args, context) => {
  //create new post object
  const post = {
    id: posts.length + 1,
    title: args.input.title,
    description: args.input.description,
  };
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};

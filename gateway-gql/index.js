const express = require("express");
const { server } = require("./server");

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

const port = 7000;
app.listen({ port }, () => {
  console.log(`gateway-gql listening at :${port}...`);
});

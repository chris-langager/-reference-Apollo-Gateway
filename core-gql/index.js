const express = require("express");
const { server } = require("./server");

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

const port = 6001;
app.listen({ port }, () => {
  console.log(`pos-config-gql listening at :${port}...`);
});

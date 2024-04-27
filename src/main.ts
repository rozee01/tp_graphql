import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query, CV } from "../resolvers/Query";
import { mock_database } from "./tables";
import { Database } from "./tables";
import { Mutation } from "../resolvers/Mutation";
import { Subscription } from "../resolvers/Subscription";
const fs = require("fs");
const path = require("path");
const pubSub = createPubSub();

export const schema = createSchema({
typeDefs: fs.readFileSync(path.join(__dirname, "../schema/schema.graphql"),"utf-8"),
resolvers: {
    Query,
    CV,
    Mutation,
    Subscription
  }
});
function main() {
const yoga = createYoga({ schema, context: {pubSub, mock_database}});
const server = createServer(yoga);
server.listen(4000, () => {
console.info("Server is running on http://localhost:4000/graphql");
});
}
main();
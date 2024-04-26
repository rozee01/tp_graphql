import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query, CV } from "../resolvers/Query";
import { mock_database } from "./tables";
import { Database } from "./tables";
import { Mutation } from "../resolvers/Mutation";
const fs = require("fs");
const path = require("path");

interface Context {
  mock_database: {
    cvs: typeof mock_database.cvs;
    users: typeof mock_database.users;
    skills: typeof mock_database.skills;
  };
}
export const schema = createSchema<Context>({
typeDefs: fs.readFileSync(path.join(__dirname, "../schema/schema.graphql"),"utf-8"),
resolvers: {
    Query,
    CV,
    Mutation
  }
});
function main() {
const yoga = createYoga({ schema, context: {mock_database}});
const server = createServer(yoga);
server.listen(4000, () => {
console.info("Server is running on http://localhost:4000/graphql");
});
}
main();
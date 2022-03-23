import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { rateLimitDirective } from "graphql-rate-limit-directive";

import http from "http";
import express from "express";
import cors from "cors";

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const resolvers = {
  Query: {
    hello: () => "hello world from @chenrui333/apollo-server-vercel",
  },
};

let schema = makeExecutableSchema({
  typeDefs: [
    rateLimitDirectiveTypeDefs,
    `type Query @rateLimit(limit: 1, duration: 15) {
      hello: String
    }`,
  ],
  resolvers,
});

schema = rateLimitDirectiveTransformer(schema);

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;

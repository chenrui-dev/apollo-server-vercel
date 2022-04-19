import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { rateLimitDirective } from "graphql-rate-limit-directive";
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import http from "http";
import express from "express";
import cors from "cors";

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/graphql', (req, res, next) => {
//   console.log(req.body.query)
//   console.log(req.headers["session-id"])
//   return next()
// })
const httpServer = http.createServer(app);

const resolvers = {
  Query: {
    hello: () => "hello world from @chenrui333/apollo-server-vercel",
  },
};

let schema = makeExecutableSchema({
  typeDefs: [
    rateLimitDirectiveTypeDefs,
    `# CACHE CONTROL SCOPE ENUM
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    # CACHE CONTROL DIRECTIVE
    directive @cacheControl(maxAge: Int, scope: CacheControlScope) on OBJECT | FIELD_DEFINITION

    type Query @rateLimit(limit: 100, duration: 15) {
      hello: String @cacheControl(maxAge: 60, scope: PUBLIC)
    }`,
  ],
  resolvers,
});

schema = rateLimitDirectiveTransformer(schema);

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      responseCachePlugin.default({
        sessionId: (requestContext) => (requestContext.request.http.headers.get('session-id') || null),
      })
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;

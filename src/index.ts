import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { context } from "./context";

import { schema } from "./schema";

export const server = new ApolloServer({
  schema: schema,
  context: context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({
    port: 3000,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

import { ApolloServer, gql } from 'apollo-server-micro';
import * as Mutation from './src/mutations';
import * as Query from './src/queries';
import { typeDefs } from './src/typedefs';
import { getUserByJWT } from './src/utils/getUserByJWT';
import { initStripe } from './src/configs/stripe';
import cors from 'micro-cors';

initStripe();

const resolvers = {
  Query,
  Mutation,
  MutationResponse: {
    __resolveType: () => {
      throw new Error(
        'MutationResponse interface should not be used as a return type',
      );
    },
  },
};

const server = new ApolloServer({
  debug: true,
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const user = await getUserByJWT(req.headers.authorization);

    return { user };
  },
  formatError: error => {
    console.log(error);
    return new Error('Ooopsie');
  },
});

// export default createCORSHandler()(server.createHandler());

export default cors({
  allowMethods: ['POST', 'GET', 'OPTIONS'],
})((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  return server.createHandler()(req, res);
});

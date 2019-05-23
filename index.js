import { ApolloServer, gql } from 'apollo-server-micro';
import * as Mutation from './src/mutations';
import * as Query from './src/queries';
import { typeDefs } from './src/typedefs';
import { getUserByJWT } from './src/utils/getUserByJWT';
import { initStripe } from './src/configs/stripe';

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
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const user = await getUserByJWT(req.headers.authorization);

    return { user };
  },
});

export default server.createHandler();

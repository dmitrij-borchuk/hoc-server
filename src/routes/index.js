import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import Joi from 'joi';
import users from './users';
import { init } from '../controllers/common';
import { schema } from '../gql';

export default async (server) => {
  users(server);

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/api/graphql',
      graphqlOptions: async request => ({
        schema,
        context: request,
      }),
      route: {
        cors: true,
      },
    },
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/api/graphql',
      },
      route: {
        cors: true,
        auth: false,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => 'hello world',
    config: {
      auth: false,
    },
  });

  server.route({
    method: 'POST',
    path: '/api/init',
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          username: Joi.string().required(),
        },
      },
      auth: false,
    },
    handler: async (req) => {
      try {
        await init(req.payload);
        return true;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};

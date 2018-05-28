import Joi from 'joi';
import users from './users';
import { init } from '../controllers/common';

export default async (server) => {
  users(server);

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

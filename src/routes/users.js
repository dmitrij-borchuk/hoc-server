import JWT from 'jsonwebtoken';
import R from 'ramda';
import passwordHash from 'password-hash';
import Boom from 'boom';
import Joi from 'joi';
import {
  getByEmail,
  getAll,
} from '../controllers/users';
import { getUserRoles } from '../controllers/roles';

export default (server) => {
  const BASE_PATH = '/api';

  // POST login
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users/login`,
    options: {
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().email().required(),
        },
      },
      auth: false,
    },
    handler: async (req) => {
      const data = req.payload;
      const user = await getByEmail(data.email);
      if (user) {
        const passwordsMatched = passwordHash.verify(
          data.password,
          user.password,
        );

        if (passwordsMatched) {
          const roles = await getUserRoles(user.id);

          return JWT.sign(
            {
              ...user.toJSON(),
              roles: R.pluck('name', roles),
            },
            process.env.JWT_SECRET,
          );
        }
        return Boom.unauthorized();
      }
      return Boom.unauthorized();
    },
  });

  // GET users
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/users`,
    handler: async () => getAll(),
  });
};

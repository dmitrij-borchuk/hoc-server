import JWT from 'jsonwebtoken';
import R from 'ramda';
import passwordHash from 'password-hash';
import Boom from 'boom';
import Joi from 'joi';
import {
  getByEmail,
  getAll,
  createUser,
} from '../controllers/users';
import { getUserRoles } from '../controllers/roles';
import { SEQUELIZE_ERRORS, REQUEST_ERRORS } from '../constants';

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
    handler: () => getAll(),
  });

  // POST users
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users`,
    handler: async (req) => {
      try {
        const data = req.payload;
        return await createUser(data);
      } catch (error) {
        if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR) {
          const boomError = Boom.badRequest(REQUEST_ERRORS.VALIDATION_ERROR);
          boomError.output.payload.data = error.errors;
          return boomError;
        }
        return error;
      }
    },
  });
};

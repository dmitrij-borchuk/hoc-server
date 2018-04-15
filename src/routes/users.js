import JWT from 'jsonwebtoken';
import passwordHash from 'password-hash';
import Boom from 'boom';
import Joi from 'joi';
import { getByEmail } from '../controllers/users';

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
          return JWT.sign(
            user.toJSON(),
            process.env.JWT_SECRET,
          );
        }
        return Boom.unauthorized();
      }
      return Boom.unauthorized();
    },
  });
};

import JWT from 'jsonwebtoken';
import Boom from 'boom';
import Joi from 'joi';
import { getByEmail } from '../controllers/users';

export default (server) => {
  const BASE_PATH = '/api';
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users/login`,
    options: {
      validate: {
        payload: {
          password: Joi.string().required(),
          email: Joi.string().required(),
        },
      },
      auth: false,
    },
    handler: async (req) => {
      const data = req.payload;
      const user = await getByEmail(data.email);
      if (user) {
        const token = JWT.sign(
          user.get({
            plain: true,
          }),
          process.env.JWT_SECRET,
        );
        return token;
      }
      return Boom.unauthorized();
    },
  });
};

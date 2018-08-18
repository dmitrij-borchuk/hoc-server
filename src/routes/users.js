import JWT from 'jsonwebtoken';
import R from 'ramda';
import passwordHash from 'password-hash';
import Boom from 'boom';
import Joi from 'joi';
import { OAuth2Client } from 'google-auth-library';
import {
  getByEmail,
  getAll,
  editUser,
  createUser,
} from '../controllers/users';
import { getUserRoles } from '../controllers/roles';
import createUserTpl from '../communication/templates/createUser';
// import resetPassword from '../communication/templates/resetPassword';
import { createToken } from '../utils';
import sendEmail from '../communication/email';
import {
  JoiValidationError,
  parseValidationError,
  // joiValidateThrowable,
} from '../utils/errors';
import {
  SEQUELIZE_ERRORS,
  REQUEST_ERRORS,
} from '../constants';

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

  // POST OAuth login
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users/oauth-login`,
    options: {
      auth: false,
      payload: {
        parse: false,
      },
    },
    handler: async (req) => {
      const buffer = req.payload;

      try {
        const token = buffer.toString('utf8');
        const CLIENT_ID = '368978317118-17h4u0v4f4qe9bq4l6sp0ljujslfr525.apps.googleusercontent.com';
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await getByEmail(email);
        if (!user) {
          const data = {
            roles: [],
            email,
            username: name,
          };
          const userData = {
            ...data,
            resetToken: token,
          };
          user = await createUser(userData);
        }
        const roles = await getUserRoles(user.id);

        return JWT.sign(
          {
            ...user.toJSON(),
            roles: R.pluck('name', roles),
          },
          process.env.JWT_SECRET,
        );
      } catch (error) {
        console.log('=-= error', error);
        return Boom.unauthorized();
      }
    },
  });

  // // POST reset password
  // server.route({
  //   method: 'POST',
  //   path: `${BASE_PATH}/users/reset`,
  //   options: {
  //     auth: false,
  //   },
  //   handler: async (req) => {
  //     try {
  //       const data = req.payload;
  //       joiValidateThrowable(data, {
  //         email: Joi.string().email().required(),
  //       });
  //       const user = await getByEmail(data.email);
  //       const to = user.email;
  //       const token = createToken();
  //       await editUser(user.id, {
  //         ...user,
  //         resetToken: token,
  //       });
  //       const text = resetPassword({
  //         email: user.email,
  //         token,
  //       });
  //       return sendEmail(to, text);
  //     } catch (error) {
  //       return parseValidationError(error);
  //     }
  //   },
  // });

  // GET users
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/users`,
    handler: async () => getAll(),
  });

  // POST users
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users`,
    handler: async (req) => {
      try {
        const data = req.payload;
        const validationResult = Joi.validate(data, {
          roles: Joi.array().min(1).required(),
          email: Joi.string().email().required(),
          username: Joi.string().required(),
        });
        if (validationResult.error) {
          throw new JoiValidationError(validationResult.error.details);
        }
        const token = createToken();
        const userData = {
          ...data,
          resetToken: token,
        };
        const user = await createUser(userData);
        const to = user.email;
        const text = createUserTpl({
          email: user.email,
          token: user.resetToken,
        });
        sendEmail(to, text);
        return user;
      } catch (error) {
        return parseValidationError(error);
      }
    },
  });

  // PUT users
  server.route({
    method: 'PUT',
    path: `${BASE_PATH}/users/{id}`,
    handler: async (req) => {
      const { id } = req.params;
      const data = req.payload;
      try {
        return await editUser(id, data);
      } catch (error) {
        if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR) {
          const boomError = Boom.badRequest(REQUEST_ERRORS.VALIDATION_ERROR);
          boomError.output.payload.data = error.errors;
          return boomError;
        } else if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR_CONFLICT) {
          const boomError = Boom.conflict(REQUEST_ERRORS.VALIDATION_ERROR_CONFLICT);
          boomError.output.payload.data = error.errors;
          return boomError;
        }
        return error;
      }
    },
  });
};

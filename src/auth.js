import authJwt from 'hapi-auth-jwt2';
import R from 'ramda';
import { getById } from './controllers/users';

const validate = async (decoded) => {
  const user = await getById(decoded.id);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true };
};

const registerAuth = async (validateFunc, server) => {
  await server.register(authJwt);
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate: validateFunc,
    verifyOptions: {
      // only allow HS256 algorithm
      algorithms: ['HS256'],
    },
    urlKey: 'token',
  });
  server.auth.default('jwt');
};

export default R.curry(registerAuth)(validate);

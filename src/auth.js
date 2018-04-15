import authJwt from 'hapi-auth-jwt2';
import R from 'ramda';
import { getById } from './dal/users';

// TODO: move to ENV
const PRIVATE_KEY = 'privateKey';

const validate = async (decoded) => {
  const user = await getById(decoded.accountId);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true };
};

const registerAuth = async (validateFunc, server) => {
  await server.register(authJwt);
  server.auth.strategy('jwt', 'jwt', {
    key: PRIVATE_KEY,
    validate: validateFunc,
    verifyOptions: {
      // only allow HS256 algorithm
      algorithms: ['HS256'],
    },
  });
  server.auth.default('jwt');
};

export default R.curry(registerAuth)(validate);

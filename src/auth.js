import authJwt from 'hapi-auth-jwt2';
import R from 'ramda';
import { getById } from './dal/users';

// TODO: move to ENV
const PRIVATE_KEY = 'privateKey';

const validate = (request, decodedToken, callback) => {
  const credentials = getById(decodedToken.accountId);

  if (!credentials) {
    return callback(null, false, credentials);
  }

  return callback(null, true, credentials);
};

const registerAuth = async (validateFunc, server) => {
  await server.register(authJwt);
  server.auth.strategy('token', 'jwt', {
    key: PRIVATE_KEY,
    validate: validateFunc,
    verifyOptions: {
      // only allow HS256 algorithm
      algorithms: ['HS256'],
    },
  });
};

export default R.curry(registerAuth)(validate);

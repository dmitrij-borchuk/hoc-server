import Boom from 'boom';
import passwordHash from 'password-hash';
import { getByKey, set } from './system';
import { SYSTEM_KEYS, ROLES } from '../constants';
import { createUser } from './users';
import { createRole } from './roles';

// eslint-disable-next-line import/prefer-default-export
export const init = async (data) => {
  const initiated = await getByKey(SYSTEM_KEYS.INITIATED);

  if (parseInt(initiated.value, 10)) {
    return Boom.badRequest('App already initiated');
  }

  const user = await createUser({
    email: data.email,
    username: data.username,
    password: passwordHash.generate(data.password),
  });

  const adminRole = await createRole({
    name: ROLES.SYSTEM_ADMIN,
  });

  await user.addRole(adminRole);

  return set({
    key: SYSTEM_KEYS.INITIATED,
    value: 1,
  });
};
import Boom from 'boom';
import { getByKey, set } from './system';
import { SYSTEM_KEYS } from '../constants';
import { createUser } from './users';

// eslint-disable-next-line import/prefer-default-export
export const init = async (data) => {
  const initiated = await getByKey(SYSTEM_KEYS.INITIATED);

  if (initiated) {
    return Boom.badRequest('App already initiated');
  }

  await createUser({
    email: data.email,
    username: data.username,
  });
  return set({
    key: SYSTEM_KEYS.INITIATED,
    value: 1,
  });
};

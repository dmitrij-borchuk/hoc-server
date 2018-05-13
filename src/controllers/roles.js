import R from 'ramda';
import { RoleModel } from '../utils/db';
import { getUserById } from './users';

export const createRole = R.bind(RoleModel.create, RoleModel);

export const getUserRoles = async (id) => {
  const user = await getUserById(id);

  return user.getRoles();
};

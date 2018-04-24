import R from 'ramda';
import { RoleModel, RoleToUserModel } from '../utils/db';

export const create = R.bind(RoleModel.create, RoleModel);

export const addRoleToUser = R.bind(RoleToUserModel.create, RoleToUserModel);

export const getUserRoles = async (id) => {
  const rolesToUser = await RoleToUserModel.findAll({ where: { user: id } });
  const roleIds = R.pluck('role', rolesToUser);

  return RoleModel.findAll({
    where: {
      id: roleIds,
    },
  });
};

import R from 'ramda';
import { create as createRole, addRoleToUser } from '../controllers/roles';
import { getByEmail } from '../controllers/users';
import { ROLES } from '../constants';

const data = [
  { name: ROLES.SYSTEM_ADMIN },
  { name: ROLES.ADMIN },
  { name: ROLES.TEACHER },
  { name: ROLES.MENTOR },
];

export default async () => {
  const createdRoles = await Promise.all(R.map(createRole, data));
  const admin = await getByEmail('admin@hour-of-code.com');

  return addRoleToUser({
    user: admin.id,
    role: createdRoles[0].id,
  });
};

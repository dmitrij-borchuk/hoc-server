import passwordHash from 'password-hash';
import env from '../utils/env';
import { ROLES, FIRST_ADMIN_USERNAME } from '../constants';
import { createUser } from '../controllers/users';
import { getRole } from '../controllers/roles';

export default async () => {
  const user = await createUser({
    email: env.ADMIN,
    username: FIRST_ADMIN_USERNAME,
    password: passwordHash.generate(env.ADMIN_PASSWORD),
  });

  const adminRole = await getRole(ROLES.SYSTEM_ADMIN);

  await user.addRole(adminRole);
};

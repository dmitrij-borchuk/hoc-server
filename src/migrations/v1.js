import R from 'ramda';
import { createRole } from '../controllers/roles';
import { ROLES } from '../constants';

const data = [
  { name: ROLES.SYSTEM_ADMIN },
  { name: ROLES.ADMIN },
  { name: ROLES.TEACHER },
  { name: ROLES.MENTOR },
];

export default async () => Promise.all(R.map(createRole, data));

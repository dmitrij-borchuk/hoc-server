import R from 'ramda';
// import passwordHash from 'password-hash';
import { UserModel } from '../utils/db';

export const getUserById = R.bind(UserModel.findById, UserModel);

export const getByEmail = R.pipe(
  email => ({ where: { email } }),
  R.bind(UserModel.findOne, UserModel),
);

export const createUser = data => UserModel.create(data);

export const getAll = R.pipe(
  R.bind(UserModel.findAll, UserModel),
);

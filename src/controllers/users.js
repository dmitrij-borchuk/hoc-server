import R from 'ramda';
import passwordHash from 'password-hash';
import { UserModel } from '../utils/db';

export const getById = R.bind(UserModel.findById, UserModel);

export const getByEmail = R.pipe(
  email => ({ where: { email } }),
  R.bind(UserModel.findOne, UserModel),
);

export const create = R.pipe(
  data => ({
    ...data,
    password: passwordHash.generate(data.password),
  }),
  R.bind(UserModel.create, UserModel),
);

export const getAll = R.pipe(
  R.bind(UserModel.findAll, UserModel),
);

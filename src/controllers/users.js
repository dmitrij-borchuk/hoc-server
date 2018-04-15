import R from 'ramda';
import { UserModel } from '../utils/db';

export const getById = R.bind(UserModel.findById, UserModel);

export const getByEmail = R.pipe(
  email => ({ where: { email } }),
  R.curry(R.bind(UserModel.findOne, UserModel)),
);

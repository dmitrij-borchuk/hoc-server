import R from 'ramda';
import { UserModel } from '../utils/db';

// eslint-disable-next-line import/prefer-default-export
export const getById = R.bind(UserModel.findById, UserModel);

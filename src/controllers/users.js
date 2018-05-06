import R from 'ramda';
// import passwordHash from 'password-hash';
import { UserModel } from '../utils/db';
import sendEmail from '../communication/email';
import createUserTemplate from '../communication/templates/createUser';
import { createToken } from '../utils';

export const getById = R.bind(UserModel.findById, UserModel);

export const getByEmail = R.pipe(
  email => ({ where: { email } }),
  R.bind(UserModel.findOne, UserModel),
);

export const createUser = async (data) => {
  const token = createToken();
  const user = await UserModel.create({
    ...data,
    resetToken: token,
  });

  const template = createUserTemplate({
    email: user.email,
    token,
  });
  return sendEmail(user.email, template);
};

export const getAll = R.pipe(
  R.bind(UserModel.findAll, UserModel),
);

import R from 'ramda';
import { UserModel } from '../utils/db';

const usersData = [
  { username: 'admin', email: 'admin@hour-of-code.com', password: 'admin' },
  { username: 'Waylon Dalton', email: 'teacher1@hour-of-code.com', password: 'teacher' },
  { username: 'Justine Henderson', email: 'teacher2@hour-of-code.com', password: 'teacher' },
  { username: 'Abdullah Lang', email: 'teacher3@hour-of-code.com', password: 'teacher' },
  { username: 'Marcus Cruz', email: 'teacher4@hour-of-code.com', password: 'teacher' },
  { username: 'Thalia Cobb', email: 'Mentor1@hour-of-code.com', password: 'mentor' },
  { username: 'Mathias Little', email: 'Mentor2@hour-of-code.com', password: 'mentor' },
  { username: 'Eddie Randolph', email: 'Mentor3@hour-of-code.com', password: 'mentor' },
  { username: 'Angela Walker', email: 'Mentor4@hour-of-code.com', password: 'mentor' },
];

const createUser = R.bind(UserModel.create, UserModel);
export default R.pipe(
  R.curry(R.map)(createUser),
  R.bind(Promise.all, Promise),
).bind(null, usersData);

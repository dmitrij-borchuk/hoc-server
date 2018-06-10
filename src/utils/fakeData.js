import faker from 'faker';
import passwordHash from 'password-hash';
import { createUser } from '../controllers/users';

export default () => {
  const usersToGenerate = 5;
  const generateUser = () => ({
    username: faker.name.findName(),
    email: faker.internet.email(),
  });

  const usersData = [];
  for (let i = 0; i < usersToGenerate; i += 1) {
    usersData.push(generateUser());
  }

  usersData.push({
    username: 'mentor',
    email: 'mentor@hoc.com',
    password: passwordHash.generate('123456'),
  });

  return usersData.reduce(
    (acc, item) => acc.then(result => createUser(item).then(user => [...result, user])),
    Promise.resolve([]),
  );
};

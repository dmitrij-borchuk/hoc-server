import faker from 'faker';
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
  return usersData.reduce(
    (acc, item) => acc.then(result => createUser(item).then(user => [...result, user])),
    Promise.resolve([]),
  );
};

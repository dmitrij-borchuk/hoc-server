import faker from 'faker';
import passwordHash from 'password-hash';
import { createUser } from '../controllers/users';
import { createGroup } from '../controllers/groups';
import { createVenue } from '../controllers/venues';

const addUsers = () => {
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

const addGroups = async () => {
  const itemsToGenerate = 5;

  const venuesData = [];
  for (let i = 0; i < itemsToGenerate; i += 1) {
    venuesData.push({
      name: `School #${i}`,
      address: faker.address.streetAddress(),
    });
  }
  const venues = await venuesData.reduce(
    (acc, item) => acc.then(result => createVenue(item).then(obj => [...result, obj])),
    Promise.resolve([]),
  );

  const groupsData = [];
  for (let i = 0; i < itemsToGenerate; i += 1) {
    groupsData.push({
      name: `Group #${i}`,
      venueId: Math.round(Math.random() * (venues.length - 1)),
    });
  }
  return groupsData.reduce(
    (acc, item) => acc.then(result => createGroup(item).then(obj => [...result, obj])),
    Promise.resolve([]),
  );
};

export default async () => {
  await addUsers();
  await addGroups();
};

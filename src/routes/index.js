import users from './users';
import groups from './groups';
import venues from './venues';
import roles from './roles';

export default async (server) => {
  users(server);
  groups(server);
  venues(server);
  roles(server);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => 'hello world',
    config: {
      auth: false,
    },
  });
};

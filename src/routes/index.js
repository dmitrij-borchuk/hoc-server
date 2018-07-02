import users from './users';
import groups from './groups';
import venues from './venues';

export default async (server) => {
  users(server);
  groups(server);
  venues(server);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => 'hello world',
    config: {
      auth: false,
    },
  });
};

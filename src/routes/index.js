import users from './users';
import groups from './groups';

export default async (server) => {
  users(server);
  groups(server);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => 'hello world',
    config: {
      auth: false,
    },
  });
};

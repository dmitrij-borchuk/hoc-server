import users from './users';

export default async (server) => {
  users(server);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: () => 'hello world',
    config: {
      auth: false,
    },
  });
};

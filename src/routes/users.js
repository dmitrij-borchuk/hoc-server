export default (server) => {
  const BASE_PATH = '/api';
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/users/login`,
    handler: () => 'Login post',
  });
};

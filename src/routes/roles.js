import { getAllRoles } from '../controllers/roles';

export default (server) => {
  const BASE_PATH = '/api';

  // GET roles
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/roles`,
    handler: async () => getAllRoles(),
  });
};

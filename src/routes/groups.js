import { getAllGroups } from '../controllers/groups';

export default (server) => {
  const BASE_PATH = '/api';

  // GET groups
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/groups`,
    handler: async () => getAllGroups(),
  });
};

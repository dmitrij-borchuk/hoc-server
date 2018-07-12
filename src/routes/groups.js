import Boom from 'boom';
import {
  getAllGroups,
  getGroupById,
  editGroup,
  createGroup,
} from '../controllers/groups';
import { parseValidationError } from '../utils/errors';
import { SEQUELIZE_ERRORS, REQUEST_ERRORS } from '../constants';

export default (server) => {
  const BASE_PATH = '/api';

  // GET groups
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/groups`,
    handler: async () => getAllGroups(),
  });

  // GET group by id
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/groups/{id}`,
    handler: async req => getGroupById(req.params.id),
  });

  // POST group
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/groups`,
    handler: async (req) => {
      try {
        return await createGroup(req.payload);
      } catch (error) {
        return parseValidationError(error);
      }
    },
  });

  // PUT group by id
  server.route({
    method: 'PUT',
    path: `${BASE_PATH}/groups/{id}`,
    handler: async (req) => {
      const { id } = req.params;
      const data = req.payload;
      try {
        return await editGroup(id, data);
      } catch (error) {
        if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR) {
          const boomError = Boom.badRequest(REQUEST_ERRORS.VALIDATION_ERROR);
          boomError.output.payload.data = error.errors;
          return boomError;
        } else if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR_CONFLICT) {
          const boomError = Boom.conflict(REQUEST_ERRORS.VALIDATION_ERROR_CONFLICT);
          boomError.output.payload.data = error.errors;
          return boomError;
        }
        return error;
      }
    },
  });
};

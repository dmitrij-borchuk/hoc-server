import Boom from 'boom';
import {
  createVenue,
  getAllVenues,
} from '../controllers/venues';
import { SEQUELIZE_ERRORS, REQUEST_ERRORS } from '../constants';

export default (server) => {
  const BASE_PATH = '/api';

  // GET venues
  server.route({
    method: 'GET',
    path: `${BASE_PATH}/venues`,
    handler: async () => getAllVenues(),
  });

  // POST venue
  server.route({
    method: 'POST',
    path: `${BASE_PATH}/venues`,
    handler: async (req) => {
      try {
        return await createVenue(req.payload);
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

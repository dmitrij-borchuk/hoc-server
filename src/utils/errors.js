import Boom from 'boom';
import Joi from 'joi';
import {
  SEQUELIZE_ERRORS,
  REQUEST_ERRORS,
  JOI_ERRORS,
} from '../constants';

export class JoiValidationError extends Error {
  constructor(errors) {
    super(JOI_ERRORS.VALIDATION_ERROR, errors);
    this.name = JOI_ERRORS.VALIDATION_ERROR;
    this.errors = errors;
  }
}

const createErrorResponse = {
  sequelize: error => error.errors.map(errorItem => ({
    ...errorItem,
    path: [errorItem.path],
  })),
  joi: error => error.errors,
};

export const parseValidationError = (error) => {
  if (error.name === 'TypeError') {
    throw error;
  } else if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR) {
    const boomError = Boom.badRequest(REQUEST_ERRORS.VALIDATION_ERROR);
    boomError.output.payload.data = createErrorResponse.sequelize(error);
    return boomError;
  } else if (error.name === SEQUELIZE_ERRORS.VALIDATION_ERROR_CONFLICT) {
    const boomError = Boom.conflict(REQUEST_ERRORS.VALIDATION_ERROR_CONFLICT);
    boomError.output.payload.data = createErrorResponse.sequelize(error);
    return boomError;
  } else if (error.name === JOI_ERRORS.VALIDATION_ERROR) {
    const boomError = Boom.badRequest(REQUEST_ERRORS.VALIDATION_ERROR);
    boomError.output.payload.data = createErrorResponse.joi(error);
    return boomError;
  }
  return error;
};

export const joiValidateThrowable = (data, schema) => {
  const validationResult = Joi.validate(data, schema);
  if (validationResult.error) {
    throw new JoiValidationError(validationResult.error.details);
  }
  return validationResult;
};

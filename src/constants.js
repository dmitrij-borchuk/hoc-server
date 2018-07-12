export const ROLES = {
  SYSTEM_ADMIN: 'system-admin',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  MENTOR: 'mentor',
};

export const ACTIONS = {
  SEE_ALL_USERS: 'SEE_ALL_USERS',
};

export const SYSTEM_KEYS = {
  INITIATED: 'initiated',
};

export const FIRST_ADMIN_USERNAME = 'Sys-admin';

export const SEQUELIZE_ERRORS = {
  VALIDATION_ERROR: 'SequelizeValidationError',
  VALIDATION_ERROR_CONFLICT: 'SequelizeUniqueConstraintError',
};

export const JOI_ERRORS = {
  VALIDATION_ERROR: 'ValidationError',
};

export const REQUEST_ERRORS = {
  VALIDATION_ERROR: 'ValidationError',
  VALIDATION_ERROR_CONFLICT: 'Conflict',
};

export const ENVIRONMENT = {
  DEVELOP: 'develop',
};

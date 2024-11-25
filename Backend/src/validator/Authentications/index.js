const {
  loginSchema,
  putRefreshTokenSchema,
  logoutSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validateLoginPayload: (payload) => {
    const validationResult = loginSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutRefreshTokenPayload: (payload) => {
    const validationResult = putRefreshTokenSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateLogoutPayload: (payload) => {
    const validationResult = logoutSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;

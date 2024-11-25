const { registerSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
  validateRegisterPayload: (payload) => {
    const validationResult = registerSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
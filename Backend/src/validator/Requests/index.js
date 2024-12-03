const InvariantError = require('../../exceptions/InvariantError');
const { RequestPayloadSchema } = require('./schema');

class RequestsValidator {
  validateRequestPayload(payload) {
    const validationResult = RequestPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = RequestsValidator;

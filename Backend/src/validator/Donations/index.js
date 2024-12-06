const InvariantError = require('../../exceptions/InvariantError');
const { donationPayloadSchema } = require('./schema');

const DonationsValidator = {
  validateDonationPayload: (payload) => {
    const validationResult = donationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = DonationsValidator;

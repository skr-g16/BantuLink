const Joi = require('joi');

const createDonationResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Donasi berhasil dibuat'),
  data: Joi.object({
    donationId: Joi.string()
      .required()
      .description('Donation ID')
      .example('donation-123'),
  }),
});

module.exports = { createDonationResponse };

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

const getDonationByOwnerResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  data: Joi.object({
    donationId: Joi.string()
      .required()
      .description('Donation ID')
      .example('donation-123'),
  }),
});

const getDonationByIdResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  data: Joi.object({
    donationId: Joi.string()
      .required()
      .description('Donation ID')
      .example('donation-123'),
  }),
});

const updateDonationsResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Donasi berhasil diperbarui'),
});

const deleteDonationsResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Donasi berhasil dihapus'),
});
module.exports = {
  createDonationResponse,
  getDonationByOwnerResponse,
  getDonationByIdResponse,
  updateDonationsResponse,
  deleteDonationsResponse,
};

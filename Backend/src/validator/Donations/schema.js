const Joi = require('joi');

const donationPayloadSchema = Joi.object({
  requestId: Joi.string().required(),
  description: Joi.string().required(),
  donationItems: Joi.array()
    .items(
      Joi.object({
        requestItemId: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { donationPayloadSchema };
